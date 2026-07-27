"use server";

import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askAIConsultant(symptoms) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: clerkId },
    });

    if (!user) throw new Error("User not found");

    const systemPrompt = `আপনি একটি 'ডাক্তার অ্যাপয়েন্টমেন্ট অ্যাপ্লিকেশনের' জন্য তৈরি করা অত্যন্ত সহানুভূতির সাথে কথা বলা 'AI স্বাস্থ্য সহকারী'।
আপনার প্রধান কাজ হলো সাধারণ মানুষের লক্ষণ শুনে সহজ ও বোধগম্য ভাষায় প্রাথমিক স্বাস্থ্য পরামর্শ দেওয়া।

মেনে চলার মতো গুরুত্বপূর্ণ নির্দেশনা:
১. **ভাষা (সবচেয়ে গুরুত্বপূর্ণ নিয়ম):** রোগী নিচে যে ভাষায় তার লক্ষণ লিখেছে বা বলেছে, আপনার সম্পূর্ণ উত্তর অবশ্যই ঠিক সেই একই ভাষায় দিতে হবে।
   - যদি রোগী বাংলায় লেখে, উত্তর সম্পূর্ণ বিশুদ্ধ ও সহজ বাংলায় দিন।
   - যদি রোগী ইংরেজিতে লেখে, উত্তর সম্পূর্ণ ইংরেজিতে দিন।
   - রোগী অন্য কোনো ভাষায় লিখলে, সেই ভাষাতেই উত্তর দিন।
   - কোনো অবস্থাতেই দুই ভাষা মিশিয়ে উত্তর দেবেন না, এবং রোগীর ভাষা ছাড়া অন্য কোনো ভাষায় উত্তর দেবেন না।
২. **ডিসক্লেইমার (বাধ্যতামূলক):** উত্তরের শুরুতেই সংক্ষেপে জানিয়ে দিন যে আপনি একজন AI এবং এটি কোনো চূড়ান্ত ডাক্তারি ব্যবস্থাপত্র নয় (এটিও রোগীর ভাষাতেই বলুন)।
৩. **বিশ্লেষণ:** রোগীর বলা লক্ষণগুলো শুনে সম্ভাব্য সাধারণ কারণগুলো সহজ ভাষায় বুঝিয়ে বলুন।
৪. **বিশেষজ্ঞ ডাক্তারের সুপারিশ:** তার লক্ষণের ওপর ভিত্তি করে কোন ধরণের বিশেষজ্ঞ ডাক্তারের অ্যাপয়েন্টমেন্ট নেওয়া উচিত তা জানান।
৫. **পরামর্শ:** ঘরোয়া প্রাথমিক কী কী সতর্কতা বা পদক্ষেপ নেওয়া যেতে পারে তা গুছিয়ে বলুন।
৬. **টোন:** আপনার ব্যবহার যেন অত্যন্ত বিনয়ী, আন্তরিক ও আশ্বস্তকর হয়।`;

    const fullPrompt = `${systemPrompt}\n\nরোগীর সমস্যা/লক্ষণ: ${symptoms}`;

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      contents: fullPrompt,
    });

    const aiText = result.text;

    const consultation = await db.aIConsultation.create({
      data: {
        userId: user.id,
        symptoms: symptoms,
        aiResponse: aiText,
      },
    });

    return { success: true, data: consultation };
  } catch (error) {
    console.error("AI Consultancy Error:", error);
    return {
      success: false,
      error: error.message || "পরামর্শ তৈরি করতে সমস্যা হয়েছে।",
    };
  }
}

export async function getAIConsultationHistory() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: clerkId },
    });

    if (!user) return { success: false, data: [] };

    const history = await db.aIConsultation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: history };
  } catch (error) {
    return { success: false, error: error.message };
  }
}