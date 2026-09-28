import React from 'react';
import { useAmica } from '../context/AmicaContext';
import { Heart, ShieldCheck, Users, Stethoscope, Sparkles, PhoneCall, Home, Bell } from 'lucide-react';

export default function Navbar() {
  const { currentView, setCurrentView, alerts, setIsDemoModalOpen } = useAmica();
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('marketing')}
              className="flex items-center gap-2.5 text-left group transition-all"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  Amica
                </span>
                <span className="block text-xs font-medium text-teal-700 tracking-wider uppercase">
                  Care & Companion
                </span>
              </div>
            </button>

            {/* View Mode Tag */}
            {currentView !== 'marketing' && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Portal: {currentView === 'elderly' ? 'Senior Tablet View' : currentView === 'caregiver' ? 'Caregiver Dashboard' : 'Clinical Provider'}
              </span>
            )}
          </div>

          {/* Navigation Links (Marketing view) */}
          {currentView === 'marketing' && (
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-teal-700 transition-colors">How It Works</a>
              <a href="#features" className="hover:text-teal-700 transition-colors">Features</a>
              <a href="#companion-demo" className="hover:text-teal-700 transition-colors flex items-center gap-1 text-teal-700 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Try Nora AI
              </a>
              <a href="#caregivers" className="hover:text-teal-700 transition-colors">For Families</a>
              <a href="#pricing" className="hover:text-teal-700 transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-teal-700 transition-colors">Stories</a>
            </nav>
          )}

          {/* Persona Switchers & Portals */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentView !== 'marketing' ? (
              <button
                onClick={() => setCurrentView('marketing')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                title="Return to Marketing Landing"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>
            ) : null}

            {/* Senior Portal Launcher */}
            <button
              onClick={() => setCurrentView('elderly')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'elderly'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 ring-2 ring-amber-500'
                  : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
              }`}
              title="Switch to Older Adult Tablet View"
            >
              <Heart className="w-4 h-4 text-amber-700 fill-amber-700/20" />
              <span>Senior Portal</span>
            </button>

            {/* Caregiver Portal Launcher */}
            <button
              onClick={() => setCurrentView('caregiver')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'caregiver'
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/25 ring-2 ring-teal-600'
                  : 'bg-teal-50 text-teal-900 border border-teal-300 hover:bg-teal-100'
              }`}
              title="Switch to Family Caregiver Dashboard"
            >
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Caregiver</span>
              {unreadAlerts > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* Provider Portal Preview */}
            <button
              onClick={() => setCurrentView('provider')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'provider'
                  ? 'bg-indigo-700 text-white shadow-md ring-2 ring-indigo-500'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
              title="Phase 2 Clinician / Senior Living Cohort View"
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span>Clinical</span>
            </button>

            {/* Request Demo / CTA */}
            {currentView === 'marketing' && (
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm"
              >
                <span>Request Demo</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
