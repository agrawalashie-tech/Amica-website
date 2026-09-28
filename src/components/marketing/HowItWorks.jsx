import React, { useState } from 'react';
import { Sparkles, HeartHandshake, BellRing, Smartphone, ShieldCheck, Check, Clock, Calendar } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: "Quick 2-Minute Family Setup",
      subtitle: "Set up on any tablet, phone, or computer",
      desc: "Family members or caregivers input essential details: daily medication schedule, emergency contacts, doctor appointments, and personalized avatar preference (Nora or Oliver). No tech expertise needed.",
      icon: Sparkles,
      color: "amber",
      highlights: ["Add medication times & dosages", "Sync emergency & doctor phone numbers", "Zero installation — runs in any modern browser"]
    },
    {
      num: 2,
      title: "Friendly Daily Companion Interaction",
      subtitle: "Voice-first, large-print, warm companionship",
      desc: "Every morning, Nora greets your loved one with a warm smile and conversational check-in. She gently reminds them of medications, celebrates hydration, plays nostalgic music, and engages their mind with trivia.",
      icon: HeartHandshake,
      color: "teal",
      highlights: ["Voice talkback and big tactile buttons", "Celebratory chimes when medication is taken", "Nostalgic trivia, soothing sounds & memory photos"]
    },
    {
      num: 3,
      title: "Continuous Peace of Mind & Escalation",
      subtitle: "Instant notifications and caregiver transparency",
      desc: "Caregivers view a real-time dashboard tracking daily adherence, mood logs, and vitals. If a check-in is missed, or distress keywords ('I fell', 'chest pain') are spoken, caregivers are alerted immediately.",
      icon: BellRing,
      color: "rose",
      highlights: ["Real-time medication adherence tracking", "Intelligent anomaly & distress keyword alerts", "1-Click video call connection to family"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-700 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            How Amica Brings Warmth & Safety to Every Day
          </h2>
          <p className="text-slate-600 text-lg mt-4">
            Designed from the ground up for simplicity, warmth, and cognitive ease — empowering seniors to live independently while keeping loved ones close.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.num;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`cursor-pointer rounded-3xl p-8 transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-2 border-amber-500 shadow-xl shadow-amber-500/10 transform -translate-y-1'
                    : 'bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs ${
                      step.color === 'amber' ? 'bg-amber-500 text-white' :
                      step.color === 'teal' ? 'bg-teal-600 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      0{step.num}
                    </span>
                    <div className="p-3 bg-white rounded-xl shadow-2xs border border-slate-100">
                      <Icon className="w-6 h-6 text-slate-700" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-teal-800 mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/60">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Workflow Infographic Box */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="text-xl font-bold flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Independent Living with an Unobtrusive Safety Net</span>
            </h4>
            <p className="text-slate-300 text-sm max-w-xl">
              No intrusive cameras or wearable discomfort. Just warm daily conversations and proactive reminders that respect dignity while preventing emergency oversights.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/10">
              ⚡ 100% Web-Based
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/10">
              🎙️ Built-in Speech Recognition
            </span>
            <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/10">
              🔒 Encrypted HIPAA-Ready Cloud
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
