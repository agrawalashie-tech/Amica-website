import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Eye, Type, Volume2, Heart, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function ElderlyUiPreview() {
  const { setCurrentView } = useAmica();
  const [demoFontSize, setDemoFontSize] = useState('large'); // 'normal', 'large', 'huge'
  const [demoHighContrast, setDemoHighContrast] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Accessibility Demo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl border-4 ${
              demoHighContrast 
                ? 'bg-black text-white border-yellow-400' 
                : 'bg-amber-50/70 text-slate-900 border-amber-200'
            }`}>
              
              {/* Accessibility Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-300/40">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-amber-700" />
                  <span className="text-xs font-bold uppercase tracking-wider">Font Size:</span>
                  <div className="flex items-center gap-1 bg-white/40 p-1 rounded-xl">
                    <button
                      onClick={() => setDemoFontSize('normal')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        demoFontSize === 'normal' ? 'bg-amber-600 text-white' : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setDemoFontSize('large')}
                      className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                        demoFontSize === 'large' ? 'bg-amber-600 text-white' : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      A+
                    </button>
                    <button
                      onClick={() => setDemoFontSize('huge')}
                      className={`px-3.5 py-1 rounded-lg text-base font-bold transition-all ${
                        demoFontSize === 'huge' ? 'bg-amber-600 text-white' : 'text-slate-700 hover:bg-white/60'
                      }`}
                    >
                      A++
                    </button>
                  </div>
                </div>

                {/* Contrast Toggle */}
                <button
                  onClick={() => setDemoHighContrast(!demoHighContrast)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    demoHighContrast 
                      ? 'bg-yellow-400 text-black border-yellow-300' 
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>High Contrast</span>
                </button>
              </div>

              {/* Simulated Senior UI Card */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-4xl shadow-md shrink-0">
                    👵🏼
                  </div>
                  <div>
                    <h3 className={`font-bold leading-tight ${
                      demoFontSize === 'huge' ? 'text-2xl sm:text-3xl' :
                      demoFontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                    }`}>
                      "Good morning, Eleanor!"
                    </h3>
                    <p className={`opacity-80 mt-1 ${
                      demoFontSize === 'huge' ? 'text-lg' :
                      demoFontSize === 'large' ? 'text-base' : 'text-sm'
                    }`}>
                      Have you taken your 8:00 AM blood pressure pill?
                    </p>
                  </div>
                </div>

                {/* Big Tactile Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-md ${
                    demoHighContrast
                      ? 'bg-yellow-400 text-black border-2 border-white text-lg'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white text-lg shadow-emerald-600/25'
                  }`}>
                    <Check className="w-6 h-6 stroke-[3]" />
                    <span>Yes, I Took It!</span>
                  </button>

                  <button className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-md ${
                    demoHighContrast
                      ? 'bg-slate-800 text-white border-2 border-yellow-400 text-lg'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 text-lg'
                  }`}>
                    <Volume2 className="w-6 h-6" />
                    <span>Ask Nora to Read</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
              Geriatric Design Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Technology Designed For Aging Eyes & Shaky Fingers
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Most health apps fail older adults because they are cluttered with microscopic fonts, complex dropdowns, and confusing gestures. Amica is radically simplified.
            </p>

            <div className="space-y-3.5 pt-2 text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Zero confusing passwords — launches with a single tap or homescreen bookmark</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Dynamic font scaling and high-contrast yellow/black mode for macular degeneration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span>Voice-first fallback: users can just talk out loud naturally if typing is difficult</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('elderly')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg shadow-amber-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Experience Senior View Full Screen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
