import React from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Activity, Heart, Moon, Zap, Download, TrendingUp } from 'lucide-react';

export default function VitalsAnalytics() {
  const { vitals } = useAmica();

  // 7-day mood history data
  const moodHistory = [
    { day: 'Mon', score: 85, mood: '😄 Great', note: 'Walked in garden' },
    { day: 'Tue', score: 70, mood: '☕ Good', note: 'Read mystery novel' },
    { day: 'Wed', score: 90, mood: '😄 Joyful', note: 'Sarah phone call' },
    { day: 'Thu', score: 65, mood: '☕ Mild ache', note: 'Rainy day' },
    { day: 'Fri', score: 80, mood: '😄 Great', note: 'Pancake breakfast' },
    { day: 'Sat', score: 95, mood: '😄 Wonderful', note: 'Grandkids visited' },
    { day: 'Sun', score: 90, mood: '😄 Joyful', note: 'Church & music' },
  ];

  const handleExport = () => {
    alert("Geriatric Clinical Report generated! Pre-formatted for Dr. Robert Hayes with 30-day vitals logs, medication adherence, and mood trends.");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xl">Wellness & Vitals Longitudinal Trends</h3>
            <p className="text-xs text-slate-500">Self-reported biometric and emotional telemetry</p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-300"
        >
          <Download className="w-4 h-4" />
          <span>Export Clinical Summary</span>
        </button>
      </div>

      {/* 4 Biometric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        {/* Blood Pressure */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Blood Pressure</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {vitals.bloodPressureSys}/{vitals.bloodPressureDia}
          </p>
          <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            ● Normal (Stage 1 Controlled)
          </span>
        </div>

        {/* Blood Glucose */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Blood Glucose</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {vitals.bloodSugar} <span className="text-xs font-normal text-slate-500">mg/dL</span>
          </p>
          <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            ● Fasting In Target
          </span>
        </div>

        {/* Sleep Duration */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Rest & Sleep</span>
            <Moon className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {vitals.hoursSlept} <span className="text-xs font-normal text-slate-500">hrs</span>
          </p>
          <span className="inline-block mt-1 text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
            ● Restful Night
          </span>
        </div>

        {/* Pain / Discomfort Score */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Pain Rating</span>
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {vitals.painLevel} <span className="text-xs font-normal text-slate-500">/ 10</span>
          </p>
          <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            ● Mild (Right Knee)
          </span>
        </div>

      </div>

      {/* 7-Day Mood Trend Bar Chart */}
      <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>7-Day Mood & Wellbeing Trajectory</span>
            </h4>
            <p className="text-xs text-slate-500">Consistently positive emotional affect with high companion engagement</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            Average: 82/100 (Optimal)
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4 pb-2 border-b border-slate-200">
          {moodHistory.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group relative">
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                {item.mood}: {item.note}
              </div>

              <div
                className="w-full bg-gradient-to-t from-teal-700 to-emerald-500 rounded-t-xl transition-all duration-500 hover:brightness-110 shadow-xs"
                style={{ height: `${item.score}%` }}
              ></div>

              <span className="text-xs font-bold text-slate-600">{item.day}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Emotional Stability: Stable (No depression or cognitive disorientation flags)</span>
          <span className="text-teal-700 font-semibold cursor-pointer hover:underline" onClick={handleExport}>
            View Monthly Archive →
          </span>
        </div>
      </div>

    </div>
  );
}
