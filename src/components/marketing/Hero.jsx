import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Heart, ShieldCheck, Sparkles, Volume2, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { getCompanionResponse } from '../../utils/companionAI';

export default function Hero() {
  const { setCurrentView, speakText } = useAmica();
  const [heroReply, setHeroReply] = useState("Good morning! I'm Nora, your friendly companion. How did you sleep last night?");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleQuickQuestion = (text) => {
    const res = getCompanionResponse(text, "Eleanor", "Nora");
    setHeroReply(res.reply);
    setIsSpeaking(true);
    speakText(res.reply);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/20">
      
      {/* Decorative Warm Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Generation Elder Care AI & Family Connectedness</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
              Companionship for them. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 font-serif-warm italic">
                Complete peace of mind
              </span> for you.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              An intelligent, warm AI companion character that gently checks in on elderly loved ones, reminds them of medications and hydration, and continuously safeguards their wellbeing — keeping family caregivers seamlessly informed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentView('elderly')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base shadow-lg shadow-amber-600/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <Heart className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>Launch Senior Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('caregiver')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-base shadow-lg shadow-teal-800/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Explore Caregiver Dashboard</span>
              </button>
            </div>

            {/* Persona Target Breakdown */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80">
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60 shadow-2xs">
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Older Adult</p>
                <p className="text-xs text-slate-600 mt-1">Huge buttons, friendly voice, daily morning check-ins</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-teal-200/60 shadow-2xs">
                <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Family Member</p>
                <p className="text-xs text-slate-600 mt-1">Medication adherence, mood trends & instant SMS alerts</p>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-2xs col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Care Provider</p>
                <p className="text-xs text-slate-600 mt-1">Aggregated vitals cohort & automated escalation</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                HIPAA-Security Design
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Tech Skills Required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Works on Tablet, Phone, & PC
              </span>
            </div>

          </div>

          {/* Right Column: Live Interactive Avatar Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-100/80">
              
              {/* Header inside simulated screen */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-white shadow-md flex items-center justify-center text-3xl">
                      👵🏼
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-1.5">
                      Nora
                      <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">AI Companion</span>
                    </h3>
                    <p className="text-xs text-slate-500">Checking on Eleanor Vance • 78 yrs</p>
                  </div>
                </div>

                <button
                  onClick={() => speakText(heroReply)}
                  className={`p-2.5 rounded-full transition-all ${
                    isSpeaking 
                      ? 'bg-teal-600 text-white animate-pulse' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Listen to Nora's Voice"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Avatar Dialogue Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 mb-5 relative min-h-[110px] flex items-center">
                <p className="text-slate-800 text-base leading-relaxed font-medium">
                  "{heroReply}"
                </p>
                {isSpeaking && (
                  <div className="absolute bottom-2 right-3 flex items-center gap-1">
                    <span className="w-1 h-3 bg-teal-600 rounded-full wave-bar-1"></span>
                    <span className="w-1 h-5 bg-teal-600 rounded-full wave-bar-2"></span>
                    <span className="w-1 h-4 bg-teal-600 rounded-full wave-bar-3"></span>
                  </div>
                )}
              </div>

              {/* Interactive Prompt Pills */}
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Try tapping a prompt:
              </p>
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => handleQuickQuestion("Good morning Nora! I slept like a baby.")}
                  className="w-full text-left text-xs sm:text-sm font-medium p-2.5 rounded-xl bg-slate-50 hover:bg-amber-100/60 border border-slate-200/80 hover:border-amber-300 text-slate-700 transition-all flex items-center justify-between group"
                >
                  <span>"Good morning Nora! I slept like a baby."</span>
                  <span className="text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
                <button
                  onClick={() => handleQuickQuestion("Did I take my blood pressure pills today?")}
                  className="w-full text-left text-xs sm:text-sm font-medium p-2.5 rounded-xl bg-slate-50 hover:bg-amber-100/60 border border-slate-200/80 hover:border-amber-300 text-slate-700 transition-all flex items-center justify-between group"
                >
                  <span>"Did I take my blood pressure pills today?"</span>
                  <span className="text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
                <button
                  onClick={() => handleQuickQuestion("Nora, I feel a little dizzy right now.")}
                  className="w-full text-left text-xs sm:text-sm font-medium p-2.5 rounded-xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-rose-900 transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    "Nora, I feel a little dizzy right now." (Safety Test)
                  </span>
                  <span className="text-rose-600 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Lisinopril 10mg Taken (8:12 AM)
                </span>
                <span className="text-teal-700 font-semibold cursor-pointer hover:underline" onClick={() => setCurrentView('elderly')}>
                  Open Full Screen →
                </span>
              </div>

            </div>

            {/* Floating Caregiver Preview Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-teal-100 items-center gap-3 animate-warm-float">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Caregiver Push Alert</p>
                <p className="text-[11px] text-slate-500">Sarah received: "Check-in Complete • Mood: Great"</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
