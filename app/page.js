"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Zap,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronDown,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";
import { creditBenefits, features, testimonials } from "@/lib/data";
import React from "react";

import { Plus, Minus } from "lucide-react";
const topDoctors = [
  {
    name: "Dr. Ariful Islam",
    specialist: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    rating: "4.9",
    experience: "12+ Years",
  },
  {
    name: "Dr. Nusrat Jahan",
    specialist: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
    rating: "5.0",
    experience: "10+ Years",
  },
  {
    name: "Dr. Sajid Ahmed",
    specialist: "AI Diagnostic Expert",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    rating: "4.8",
    experience: "8+ Years",
  },
];

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] pt-24 lg:pt-32 pb-16">
        {/* Background Glows - Only Green-400/500 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full shadow-[0_0_100px_rgba(34,197,94,0.1)]" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-green-600/5 blur-[100px] rounded-full shadow-[0_0_100px_rgba(22,163,74,0.05)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content (7 columns) */}
            <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center space-x-2 bg-green-500/5 border border-green-500/20 px-3 py-1 rounded-full backdrop-blur-xl">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span className="text-green-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
                  Trustworthy Digital Healthcare
                </span>
              </div>

              <div className="max-w-3xl space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  Connect with doctors <br />
                  <span className="text-green-400">anytime, anywhere.</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed font-light">
                  Skip the waiting room. Access top-tier medical specialists via
                  secure video consultations and diagnostic solutions, all from the comfort of your home.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-500 text-white h-14 px-10 text-md font-semibold rounded-2xl transition-all shadow-lg shadow-green-900/20 active:scale-95"
                >
                  <Link href="/onboarding">
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-14 px-8 text-md font-medium rounded-2xl backdrop-blur-md active:scale-95 transition-all hover:border-green-500/30"
                >
                  <Link href="/doctors">Find Specialists</Link>
                </Button>
              </div>

              {/* Stats Section with Green-400 Accents */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 max-w-md">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tighter">
                    50k+
                  </h3>
                  <p className="text-[10px] text-green-400/80 uppercase font-bold tracking-widest">
                    Patients Served
                  </p>
                </div>
                <div className="space-y-1 border-x border-white/5 px-8">
                  <h3 className="text-2xl font-bold text-white tracking-tighter">
                    500+
                  </h3>
                  <p className="text-[10px] text-green-400/80 uppercase font-bold tracking-widest">
                    Verified Doctors
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tighter">
                    99%
                  </h3>
                  <p className="text-[10px] text-green-400/80 uppercase font-bold tracking-widest">
                    Success Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual (5 columns) */}
            <div className="lg:col-span-5 relative animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="relative group p-4">
                {/* Green Neon Glow */}
                <div className="absolute inset-0 bg-green-500/10 rounded-[3rem] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl overflow-hidden">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
                    <Image
                      src="/banner2.png"
                      alt="Healthcare Consultation"
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Darker Gradient Overlay to match Pure Black */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent opacity-90" />

                    {/* Floating Professional Info Card */}
                    <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-green-500/20 flex items-center justify-between shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                          <Stethoscope className="text-green-400 h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">
                            Expert Care
                          </h4>
                          <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase">
                            Available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - Clean Glassmorphism & Solid Hover */}
      <section className="py-24 relative bg-[#080808] border-y border-white/5">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#10b98105,transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold tracking-[0.3em] text-green-400 uppercase">
                Why Choose SmartDR
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Redefining the{" "}
                <span className="text-gray-500">Patient Experience</span>
              </h3>
            </div>
            <p className="text-gray-400 text-lg max-w-sm font-light border-l-2 border-green-500 pl-6">
              Our ecosystem is designed to put you back in control of your
              health journey.
            </p>
          </div>

          {/* Glassmorphism Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-10 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2.5rem] hover:border-green-500/30 transition-all duration-500"
              >
                <div className="relative z-10 space-y-8">
                  {/* Icon Box - আপনার রিকুইজিশন অনুযায়ী হোভারে Green-600 */}
                  <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:scale-105 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <div className="h-8 w-8 flex items-center justify-center">
                      {/* Lucide Icons হলে strokeWidth={2.5} ব্যবহার করলে আইকন ক্লিয়ার হবে */}
                      {feature.icon}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-200">
                      {feature.description}
                    </p>
                  </div>

                  {/* Step Marker */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-700 group-hover:text-green-500/50">
                      0{index + 1} // CAPABILITY
                    </span>
                    <div className="h-[1px] flex-1 bg-white/5 mx-4 group-hover:bg-green-500/20 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Black & Green-400 Medical Styling */}
      <section
        id="pricing"
        className="py-24 bg-[#000000] relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#16a34a15,transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 bg-green-500/5 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                Affordable Healthcare
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Consultation <span className="text-green-400">Packages</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Choose the perfect consultation package that fits your healthcare
              needs with our AI-powered medical ecosystem.
            </p>
          </div>

          <div className="mx-auto">
            <div className="relative">
              <Pricing />
            </div>

            {/* Credit System Description - Glassmorphism Card */}
            <div className="mt-16 relative group">
              <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity" />

              <Card className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/[0.01] p-8">
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center mr-4 border border-green-500/20">
                      <Stethoscope className="h-6 w-6 text-green-400" />
                    </div>
                    How Our Credit System Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {creditBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start group/item">
                        <div className="mr-4 mt-1 bg-green-500/20 p-1.5 rounded-full group-hover/item:bg-green-500 transition-colors duration-300">
                          <svg
                            className="h-3.5 w-3.5 text-green-400 group-hover/item:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p
                          className="text-gray-400 group-hover/item:text-gray-200 transition-colors leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: benefit }}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Doctors Section - linked images */}
      <section className="py-24 relative bg-black-600 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-green-400 uppercase mb-4">
              Our Specialists
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Consult with the{" "}
              <span className="text-green-400">Best Doctors</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topDoctors.map((doc, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-green-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 overflow-hidden hover:border-green-500/30 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative h-90 w-full rounded-2xl overflow-hidden mb-6 bg-[#111]">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-green-400/80 text-sm font-medium tracking-wide">
                          {doc.specialist}
                        </p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">
                        <span className="text-green-400 text-xs font-bold">
                          ★ {doc.rating}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">
                        {doc.experience}
                      </span>
                      <button className="text-white text-sm font-bold flex items-center gap-2 group/btn hover:text-green-400 transition-colors">
                        Book Now
                        <ArrowRight className="w-4 h-4 text-green-400 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Black & Green-400 Glass Style */}
      <section className="py-24 relative bg-[#000000] border-y border-white/5 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 bg-green-500/5 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 text-xs font-bold uppercase tracking-[0.2em]">
                Success Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-green-400">Users Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Hear from patients and doctors who experience healthcare through
              our AI-driven ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group bg-white/[0.02] backdrop-blur-xl border-white/10 hover:border-green-500/40 transition-all duration-500 rounded-[2rem] overflow-hidden"
              >
                <CardContent className="pt-8 p-8 relative">
                  {/* Quote Icon Background */}
                  <div className="absolute top-4 right-8 text-green-500/10 group-hover:text-green-500/20 transition-colors">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C20.6739 4 22.017 5.34315 22.017 7V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H3.017C2.46472 8 2.017 7.55228 2.017 7V5C2.017 4.44772 2.46472 4 3.017 4H7.017C8.67386 4 10.017 5.34315 10.017 7V15C10.017 18.3137 7.33072 21 4.017 21H2.017Z" />
                    </svg>
                  </div>

                  <div className="flex items-center mb-8">
                    {/* Initials Circle with Sharp Green Border */}
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mr-4 group-hover:bg-green-500 transition-all duration-500">
                      <span className="text-green-400 font-bold text-lg group-hover:text-black transition-colors">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg group-hover:text-green-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-green-500/70 font-medium tracking-wide">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed italic font-light group-hover:text-gray-200 transition-colors">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Wide FAQ Section */}
      {(() => {
        const [openIndex, setOpenIndex] = React.useState(0);
        const faqs = [
          {
            question: "How reliable is the AI diagnostic assistance?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            question: "Which medical conditions can the AI analyze?",
            answer:
              "Currently, our ecosystem is specialized in multi-class diagnostics including respiratory issues, skin conditions, and cardiac anomalies. We are constantly expanding our model database to cover more specialized fields.",
          },
          {
            question: "Is SmartDR a replacement for a physical doctor visit?",
            answer:
              "No, SmartDR is a powerful diagnostic assistant designed to enhance the healthcare journey. It provides instant AI insights and connects you with specialists, but final clinical decisions should always be made by a human professional.",
          },
          {
            question: "Is there a mobile app available for SmartDR?",
            answer:
              "We are currently a web-first platform optimized for all mobile browsers. However, our dedicated iOS and Android apps are in the final stages of beta testing and will be launched soon.",
          },
        ];

        return (
          <section className="py-24 relative bg-gray border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#10b98105,transparent_50%)]" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-sm font-bold tracking-[0.4em] text-green-400 uppercase mb-4">
                    Knowledge Base
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Frequently Asked{" "}
                    <span className="text-gray-500">Questions</span>
                  </h3>
                  <p className="text-gray-400 max-w-xl mx-auto font-light">
                    Everything you need to know about our AI-driven medical
                    ecosystem and how it simplifies your life.
                  </p>
                </div>

                <div className="grid gap-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`group border transition-all duration-500 rounded-[2rem] overflow-hidden ${
                        openIndex === index
                          ? "bg-white/[0.04] border-green-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                          : "bg-white/[0.01] border-white/5 hover:border-white/20"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="w-full flex items-center justify-between p-7 md:p-9 text-left transition-all"
                      >
                        <span
                          className={`text-xl md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                            openIndex === index
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          {faq.question}
                        </span>

                        <div
                          className={`flex-shrink-0 ml-4 transition-transform duration-500 ${
                            openIndex === index
                              ? "rotate-180 text-green-400"
                              : "rotate-0 text-gray-600"
                          }`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-500 ease-in-out ${
                          openIndex === index
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-9 pt-0 text-gray-400 text-lg leading-relaxed font-light border-t border-white/5 mx-9 mt-2">
                          <div className="py-6">{faq.answer}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Final Healthcare CTA - Updated Design */}
      <section
        id="get-started"
        className="py-24 relative overflow-hidden bg-[#000000]"
      >
        {/* Background Gradient & Glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-emerald-900/10 pointer-events-none"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-green-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300 font-medium tracking-wide">
              Start Your Health Success Story Today
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight text-white tracking-tight">
            Ready to Take Control of <br />
            <span className="text-green-400 text-glow">Your Healthcare?</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of patients and doctors who have simplified their
            medical journey with SmartDR. Get AI-powered insights in minutes and
            professional consultations in hours.
          </p>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-12 py-5 bg-green-500 hover:bg-green-400 text-white rounded-2xl font-black text-l transition-all transform hover:scale-105 flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-95">
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Bottom Trust Indicators */}
          <p className="text-gray-500 text-sm mt-10 font-medium tracking-widest uppercase">
            Secure Data • AI Verified • 24/7 Specialist Support
          </p>
        </div>
      </section>

      {/* Premium Dark Footer */}
      <footer className="bg-[#000000] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="relative h-12 w-auto group">
                <img
                  src="/smrtdr.png"
                  alt="SmartDR Logo"
                  className="h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-green-500/15 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Revolutionizing healthcare with AI-driven diagnostics and expert
                consultations. Experience the future of medical care today.
              </p>
              <div className="flex gap-4">
                {/* Social Icons with Lucide React */}
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-4">
                {[
                  "AI Diagnostic",
                  "Doctor Search",
                  "Pricing Plans",
                  "Success Stories",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4">
                {[
                  "Help Center",
                  "Privacy Policy",
                  "Terms of Service",
                  "Contact Us",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Status Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
                System Status
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">
                    Our AI Performance
                  </span>
                  <span className="text-green-400 text-xs font-bold">
                    98.0% Acc
                  </span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[98%] shadow-[0_0_10px_#22c55e]" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">
                    Systems Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
            <p className="text-gray-500 text-xs font-medium">
              © 2026 SmartDR. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                Built for Future
              </span>
              <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
