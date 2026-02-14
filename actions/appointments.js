"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deductCreditsForAppointment } from "@/actions/credits";
import { SDK } from "@100mslive/server-sdk";
import { addDays, addMinutes, format, isBefore, endOfDay } from "date-fns";

// 100ms Server SDK initialization
const hms = new SDK(
  process.env.HMS_ACCESS_KEY, 
  process.env.HMS_SECRET_KEY
);

export async function bookAppointment(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const patient = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    const doctorId = formData.get("doctorId");
    const startTime = new Date(formData.get("startTime"));
    const endTime = new Date(formData.get("endTime"));
    const patientDescription = formData.get("description") || null;

    if (!doctorId || !startTime || !endTime) {
      throw new Error("Doctor, start time, and end time are required");
    }


    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }


    if (patient.credits < 2) {
      throw new Error("Insufficient credits to book an appointment");
    }

    
    const overlappingAppointment = await db.appointment.findFirst({
      where: {
        doctorId: doctorId,
        status: "SCHEDULED",
        OR: [
          { startTime: { lte: startTime }, endTime: { gt: startTime } },
          { startTime: { lt: endTime }, endTime: { gte: endTime } },
          { startTime: { gte: startTime }, endTime: { lte: endTime } },
        ],
      },
    });

    if (overlappingAppointment) {
      throw new Error("This time slot is already booked");
    }

    
    const roomId = await createVideoSession();

    
    const { success, error } = await deductCreditsForAppointment(
      patient.id,
      doctor.id
    );

    if (!success) {
      throw new Error(error || "Failed to deduct credits");
    }

    
    const appointment = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        startTime,
        endTime,
        patientDescription,
        status: "SCHEDULED",
        videoSessionId: roomId, 
      },
    });

    revalidatePath("/appointments");
    return { success: true, appointment: appointment };
  } catch (error) {
    console.error("Failed to book appointment:", error);
    throw new Error(error.message);
  }
}


async function createVideoSession() {
  try {
    const room = await hms.rooms.create({ 
      name: `smartdr-${Date.now()}`,
      description: "Secure Telemedicine Consultation",
      enabled: true
    });
    return room.id;
  } catch (error) {
    throw new Error("Failed to create video session: " + error.message);
  }
}


export async function generateVideoToken(formData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    const appointmentId = formData.get("appointmentId");
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new Error("Appointment not found");

    const now = new Date();
    const appointmentTime = new Date(appointment.startTime);
    if ((appointmentTime - now) / (1000 * 60) > 30) {
      throw new Error("Call available 30 minutes before start time");
    }

    const roleFor100ms = user.role.toLowerCase(); 
    
    const tokenResponse = await hms.auth.getAuthToken({
      roomId: appointment.videoSessionId,
      role: roleFor100ms,
      userId: user.id,
    });

    const finalToken = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse.token;

    await db.appointment.update({
      where: { id: appointmentId },
      data: { videoSessionToken: finalToken }, 
    });

    return {
      success: true,
      videoSessionId: appointment.videoSessionId,
      token: finalToken, 
    };
  } catch (error) {
    console.error("Token Error:", error);
    throw new Error(error.message);
  }
}

export async function getDoctorById(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) throw new Error("Doctor not found");
    return { doctor };
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    throw new Error("Failed to fetch doctor details");
  }
}

export async function getAvailableTimeSlots(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) throw new Error("Doctor not found or not verified");

    const availabilities = await db.availability.findMany({
      where: { doctorId: doctor.id, status: "AVAILABLE" },
    });

    if (!availabilities || availabilities.length === 0) return { days: [] };

    const now = new Date();
    const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];
    const lastDay = endOfDay(days[3]);

    const existingAppointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
        startTime: { lte: lastDay },
      },
    });

    const availableSlotsByDay = {};

    for (const day of days) {
      const dayString = format(day, "yyyy-MM-dd");
      availableSlotsByDay[dayString] = [];

      for (const availability of availabilities) {
        const availabilityStart = new Date(availability.startTime);
        const availabilityEnd = new Date(availability.endTime);

        availabilityStart.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
        availabilityEnd.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());

        let current = new Date(availabilityStart);
        const end = new Date(availabilityEnd);

        while (addMinutes(current, 30) <= end) {
          const next = addMinutes(current, 30);
          if (isBefore(current, now)) { current = next; continue; }

          const overlaps = existingAppointments.some((app) => {
            const aStart = new Date(app.startTime);
            const aEnd = new Date(app.endTime);
            return (current >= aStart && current < aEnd) || (next > aStart && next <= aEnd);
          });

          if (!overlaps) {
            availableSlotsByDay[dayString].push({
              startTime: current.toISOString(),
              endTime: next.toISOString(),
              formatted: `${format(current, "h:mm a")} - ${format(next, "h:mm a")}`,
              day: format(current, "EEEE, MMMM d"),
            });
          }
          current = next;
        }
      }
    }

    return {
      days: Object.entries(availableSlotsByDay).map(([date, slots]) => ({
        date,
        displayDate: slots.length > 0 ? slots[0].day : format(new Date(date), "EEEE, MMMM d"),
        slots,
      }))
    };
  } catch (error) {
    console.error("Slots Error:", error);
    return { days: [] };
  }
}