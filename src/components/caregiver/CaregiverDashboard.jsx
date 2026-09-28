import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { 
  ShieldCheck, 
  Pill, 
  Activity, 
  Video, 
  MessageCircleHeart, 
  Users, 
  Home, 
  BatteryCharging,
  Wifi,
  MapPin
} from 'lucide-react';
import AlertsCenter from './AlertsCenter';
import AdherenceTracker from './AdherenceTracker';
import VitalsAnalytics from './VitalsAnalytics';
import SendLoveNoteModal from './SendLoveNoteModal';
import VideoCallModal from '../elderly/VideoCallModal';

export default function CaregiverDashboard() {
  const { 
    todayMood, 
    medications, 
    waterGlasses, 
    alerts, 
    setIsVideoCallActive, 
    setCurrentView 
  } = useAmica();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'medications' | 'vitals' | 'network'
  const [isLoveNoteOpen, setIsLoveNoteOpen] = useState(false);

  const takenMeds = medications.filter(m => m.taken).length;
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            
            {/* Senior Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('marketing')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="Return to Marketing Landing"
              >
                <Home className="w-5 h-5" />
              </button>

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xl shadow-xs">
                  EV
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">Eleanor Vance</h1>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Safe & Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Age 78 • Denver, CO</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Wifi className="w-3.5 h-3.5 text-emerald-600" /> Tablet Online
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" /> 94% Battery
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsVideoCallActive(true)}
                className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Video Call Mom</span>
              </button>

              <button
                onClick={() => setIsLoveNoteOpen(true)}
                className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <MessageCircleHeart className="w-4 h-4" />
                <span>Send Love Note</span>
              </button>

              <button
                onClick={() => setCurrentView('elderly')}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs"
              >
                View Eleanor's Screen →
              </button>
            </div>

          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 sm:gap-6 border-t border-slate-100 pt-1 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'overview'
                  ? 'border-teal-700 text-teal-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Overview & Alerts</span>
              {unreadAlerts > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('medications')}
              className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'medications'
                  ? 'border-teal-700 text-teal-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medications ({takenMeds}/{medications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vitals')}
              className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'vitals'
                  ? 'border-teal-700 text-teal-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Vitals & Mood Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('network')}
              className={`py-3 px-2 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'network'
                  ? 'border-teal-700 text-teal-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Care Network & Protocol</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB 1: OVERVIEW & ALERTS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Morning Check-In</span>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-3xl">😄</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{todayMood.mood}</h4>
                    <p className="text-xs text-slate-500">Completed at {todayMood.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prescriptions Taken</span>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-3xl font-extrabold text-teal-800">{takenMeds} / {medications.length}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs text-emerald-700">On Track</h4>
                    <p className="text-xs text-slate-500">Next: Metformin at 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hydration Intake</span>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-3xl font-extrabold text-cyan-700">{waterGlasses} <span className="text-sm font-normal text-slate-500">cups</span></span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Goal: 6 cups</h4>
                    <p className="text-xs text-slate-500">67% of daily target</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Visit</span>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-2xl">🩺</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Dr. Robert Hayes</h4>
                    <p className="text-xs text-slate-500">Tomorrow at 10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Anomaly Center Component */}
            <AlertsCenter />

            {/* Quick Link to Prescription tracker */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-400" />
                  <span>Scheduled Regimen Adherence</span>
                </h4>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  You can remotely adjust dosages, times, and frequency without visiting. Eleanor will receive an updated schedule instantly.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('medications')}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all shrink-0"
              >
                Manage Medication Schedule →
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: MEDICATIONS */}
        {activeTab === 'medications' && (
          <AdherenceTracker />
        )}

        {/* TAB 3: VITALS */}
        {activeTab === 'vitals' && (
          <VitalsAnalytics />
        )}

        {/* TAB 4: CARE NETWORK */}
        {activeTab === 'network' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Family & Clinical Care Circle</h3>
              <p className="text-xs text-slate-500">Designated responders notified in case of anomaly or emergency SOS</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-800 uppercase">Primary Contact</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">Sarah Vance-Miller</h4>
                <p className="text-xs text-slate-600">Daughter • (555) 234-8901</p>
                <p className="text-[11px] text-teal-700 mt-2 font-medium">Receives SMS + Phone Escalation</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Secondary Contact</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">Mark Vance</h4>
                <p className="text-xs text-slate-600">Son • (555) 345-6789</p>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">Receives Email Summaries</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-800 uppercase">Attending Physician</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">Dr. Robert Hayes, MD</h4>
                <p className="text-xs text-slate-600">Cardiology • (555) 890-1234</p>
                <p className="text-[11px] text-indigo-700 mt-2 font-medium">St. Jude Medical Center, Suite 402</p>
              </div>
            </div>

            {/* Address stamp */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-sm flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-slate-900">Registered Residence for Emergency Dispatch:</h5>
                <p className="text-slate-600 text-xs mt-0.5">742 Evergreen Terrace, Apt 3B, Denver, CO 80203 • Key lockbox code: 4921</p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Love note modal */}
      <SendLoveNoteModal isOpen={isLoveNoteOpen} onClose={() => setIsLoveNoteOpen(false)} />
      <VideoCallModal />

    </div>
  );
}
