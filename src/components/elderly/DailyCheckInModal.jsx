import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { X, Heart, Sparkles, Smile, Coffee, Frown, Check } from 'lucide-react';

export default function DailyCheckInModal() {
  const { isCheckInOpen, setIsCheckInOpen, submitCheckIn, todayMood } = useAmica();
  const [selectedMood, setSelectedMood] = useState(todayMood.mood || 'Great');
  const [note, setNote] = useState(todayMood.note || '');

  if (!isCheckInOpen) return null;

  const moodOptions = [
    { label: 'Great & Cheerful', emoji: '😄', color: 'emerald', desc: 'Feeling energetic, peaceful, and ready for today' },
    { label: 'A Bit Tired / Normal', emoji: '☕', color: 'amber', desc: 'A little slow this morning, taking it easy' },
    { label: 'Not Feeling Well', emoji: '🤕', color: 'rose', desc: 'In pain, discomfort, or feeling down' },
  ];

  const handleSubmit = () => {
    submitCheckIn(selectedMood, note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-200">
        
        <button
          onClick={() => setIsCheckInOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-3xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            👵🏼
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Daily Morning Check-In
          </h2>
          <p className="text-slate-600 text-base mt-1">
            "Good morning Eleanor! How are you feeling in your heart and body today?"
          </p>
        </div>

        {/* 3 Large Touch Mood Options */}
        <div className="space-y-3 mb-6">
          {moodOptions.map((opt) => {
            const isSelected = selectedMood === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedMood(opt.label)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                  isSelected
                    ? opt.color === 'emerald'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : opt.color === 'amber'
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-rose-50 border-rose-500 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">{opt.label}</h4>
                  <p className="text-xs sm:text-sm text-slate-500">{opt.desc}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Optional text or voice thought */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Anything you want to share with Sarah? (Optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Had delicious scrambled eggs, slept very peacefully..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 px-6 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-lg shadow-lg shadow-teal-800/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5 fill-white/20" />
          <span>Save Today's Check-In</span>
        </button>

      </div>
    </div>
  );
}
