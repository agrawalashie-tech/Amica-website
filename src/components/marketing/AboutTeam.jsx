import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutTeam() {
  const team = [
    {
      name: "Julian Chen",
      role: "Founder & CEO",
      bio: "Former healthcare systems engineer. Founded Amica after struggling to coordinate care for his grandfather across three time zones.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Miriam Stone, MD",
      role: "Chief Medical & Geriatric Advisor",
      bio: "Board-certified geriatrician with 22 years of clinical research in cognitive longevity, fall prevention, and home-based patient adherence.",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Elena Ramos",
      role: "Head of Accessibility & Senior Experience",
      bio: "12 years pioneering inclusive interfaces for older adults and individuals with visual, auditory, and motor impairments.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-800 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Our Purpose & Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Created with Love for the People Who Raised Us
          </h2>
          <p className="text-slate-600 text-lg mt-3">
            We believe aging at home should be full of dignity, conversation, and joy — not isolation and anxiety.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all">
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white shadow-md"
              />
              <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">{member.role}</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Core Values Strip */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Dignity First</h4>
              <p className="text-xs text-slate-500 mt-1">We empower independence, never treating seniors as helpless or surveillance subjects.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Privacy by Architecture</h4>
              <p className="text-xs text-slate-500 mt-1">End-to-end encrypted health data compliant with HIPAA guidelines. Your family's data is never sold.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Radical Simplicity</h4>
              <p className="text-xs text-slate-500 mt-1">Zero clutter, zero complex passwords, and joyful warm interactions accessible to all ages.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
