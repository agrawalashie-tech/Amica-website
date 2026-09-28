import React from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Bell, Activity, Pill, ArrowRight } from 'lucide-react';

export default function CaregiverPreview() {
  const { setCurrentView, medications } = useAmica();
  const takenCount = medications.filter(m => m.taken).length;

  return (
    <section id="caregivers" className="py-20 lg:py-28 bg-gradient-to-b from-white to-teal-50/40 border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-800 uppercase bg-teal-100 px-3.5 py-1.5 rounded-full border border-teal-300">
              For Families & Caregivers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Stay Close and Informed Without Hovering
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              You want to ensure mom or dad is safe, hydrated, taking their prescriptions, and feeling happy — without constantly nagging or making them feel like they've lost their independence.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Instant Anomaly & Missed Check-In Alerts</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Receive immediate SMS or push notifications only when intervention is truly needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Remote Medication Scheduling</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Easily adjust dosages or add new appointments from your phone; updates instantly reflect on their screen.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Longitudinal Mood & Wellbeing Trends</h4>
                  <p className="text-sm text-slate-600 mt-0.5">Identify gradual cognitive or emotional shifts before they become acute medical emergencies.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentView('caregiver')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold shadow-lg shadow-teal-800/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Full Caregiver Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-lg">
                    EV
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Eleanor Vance (Mother)</h3>
                    <p className="text-xs text-slate-500">Live Status: Checked in at 8:45 AM • Well</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Safe & Active
                </span>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Medication</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{takenCount}/{medications.length}</p>
                  <p className="text-[11px] text-teal-700 font-medium">On Track Today</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Today's Mood</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">Joyful</p>
                  <p className="text-[11px] text-emerald-700 font-medium">7-Day High</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Water Intake</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">4 / 6</p>
                  <p className="text-[11px] text-amber-700 font-medium">Glasses Logged</p>
                </div>
              </div>

              {/* Recent Activity Timeline Preview */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Live Activity Telemetry
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                    <span className="flex items-center gap-2 font-medium text-emerald-900">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Morning Lisinopril 10mg confirmed taken
                    </span>
                    <span className="text-emerald-700">8:12 AM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs">
                    <span className="flex items-center gap-2 font-medium text-teal-900">
                      <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                      Daily Check-in: "Slept well, feeling cheerful"
                    </span>
                    <span className="text-teal-700">8:45 AM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Upcoming: Metformin 500mg due at lunch
                    </span>
                    <span className="text-slate-500">1:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('caregiver')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs text-center transition-colors"
                >
                  Manage Reminders & View Full Clinical Graphs →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
