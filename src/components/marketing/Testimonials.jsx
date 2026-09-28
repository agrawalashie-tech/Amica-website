import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const stories = [
    {
      quote: "Before Amica, my daughter called three times a day worried sick. Now Nora greets me with a sunny smile every morning, reminds me of my pills, and even plays 1950s jazz while I make breakfast. It gives me my dignity back.",
      author: "Eleanor Vance, 78",
      role: "Primary User (Retired Librarian, Denver, CO)",
      avatar: "👵🏼",
      highlight: "100% On-time Medication for 120 Days"
    },
    {
      quote: "As a working mom living two hours away from my mother, the constant pit in my stomach was exhausting. Amica gave our family our lives back. I can check her morning check-in at 9:00 AM between meetings and know she is thriving.",
      author: "Sarah Vance-Miller",
      role: "Family Caregiver & Daughter",
      avatar: "👩🏻‍💼",
      highlight: "Zero Emergency Room Visits This Year"
    },
    {
      quote: "Loneliness and missed medications are the two greatest drivers of preventable hospital readmissions in older adults. Amica's pairing of warm conversational AI with light telemetry is the most human tech solution I've seen in geriatric care.",
      author: "Dr. Miriam Stone, MD",
      role: "Geriatrician & Clinical Advisor",
      avatar: "🩺",
      highlight: "Clinical Advisory Member"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-amber-50/30 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
            Real Stories & Clinical Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Loved by Loved Ones. Trusted by Families.
          </h2>
          <p className="text-slate-600 text-lg mt-3">
            See how Amica transforms the daily lives of older adults, family caregivers, and physicians.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg border border-amber-100 flex flex-col justify-between relative hover:shadow-xl transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-base leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl shadow-xs">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.author}</h4>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Metrics Banner */}
        <div className="mt-14 bg-white rounded-3xl p-8 border border-slate-200 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-800">98.2%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Medication Adherence</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-800">76%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Reduction in Caregiver Anxiety</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-800">4.9 / 5</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Senior Companion Warmth Rating</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-800">&lt; 30 sec</p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Average Distress Alert Dispatch</p>
          </div>
        </div>

      </div>
    </section>
  );
}
