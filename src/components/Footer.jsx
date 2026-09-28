import React from 'react';
import { useAmica } from '../context/AmicaContext';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { setCurrentView, setIsDemoModalOpen } = useAmica();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Medical Disclaimer Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            <strong className="text-amber-400">Emergency Notice:</strong> Amica provides conversational companionship and supportive wellness tracking. It is NOT a replacement for emergency medical services (911) or professional medical diagnosis. In a medical emergency, immediately call 911.
          </p>
          <div className="shrink-0 flex items-center gap-3 font-semibold text-slate-300">
            <span>US Lifeline: <strong>988</strong></span>
            <span>•</span>
            <span>Emergency: <strong>911</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Amica</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empathetic AI companion care designed with warmth for older adults, providing continuous reassurance, routine structure, and safety alerts for family caregivers.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                HIPAA-Security Design
              </span>
              <span>•</span>
              <span>SOC2 Type II Ready</span>
            </div>
          </div>

          {/* Nav Col: Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Sitemap</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentView('elderly')} className="hover:text-white transition-colors text-left text-amber-400 font-medium">
                  → Senior Portal (Tablet)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('caregiver')} className="hover:text-white transition-colors text-left text-teal-400 font-medium">
                  → Caregiver Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('provider')} className="hover:text-white transition-colors text-left text-indigo-400 font-medium">
                  → Clinical Provider (Phase 2)
                </button>
              </li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features Grid</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Nav Col: Who We Serve */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Who We Serve</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#caregivers" className="hover:text-white transition-colors">Adult Children & Caregivers</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Aging in Place Seniors</a></li>
              <li><button onClick={() => setIsDemoModalOpen(true)} className="hover:text-white transition-colors text-left">Assisted Living Communities</button></li>
              <li><button onClick={() => setIsDemoModalOpen(true)} className="hover:text-white transition-colors text-left">Home Health Agencies</button></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Case Studies & Research</a></li>
            </ul>
          </div>

          {/* Nav Col: Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#testimonials" className="hover:text-white transition-colors">About Our Team</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Medical Advisory Board</a></li>
              <li><button onClick={() => setIsDemoModalOpen(true)} className="hover:text-white transition-colors text-left">Contact & Support</button></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Amica Health Technologies, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>English (US)</span>
            <span>Accessibility Certified (WCAG 2.1 AAA)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
