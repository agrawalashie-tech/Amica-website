import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { X, CheckCircle2, Sparkles, Building2, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoModal() {
  const { isDemoModalOpen, setIsDemoModalOpen, setCurrentView } = useAmica();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'family',
    residentsCount: '1',
    message: ''
  });

  if (!isDemoModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const handleClose = () => {
    setIsDemoModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-teal-100 text-teal-800">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Schedule a Guided Demo
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              See how Amica customizes to your family's routine or your senior care community's clinical workflow.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Miller"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    I am a...
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm bg-white"
                  >
                    <option value="family">Family Caregiver</option>
                    <option value="facility">Senior Living Exec</option>
                    <option value="homehealth">Home Health Agency</option>
                    <option value="clinician">Geriatric Physician</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Loved Ones / Beds
                  </label>
                  <select
                    value={formData.residentsCount}
                    onChange={(e) => setFormData({ ...formData, residentsCount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm bg-white"
                  >
                    <option value="1">1 Loved One</option>
                    <option value="2-5">2-5 (Extended Family)</option>
                    <option value="10-50">10-50 (Small Facility)</option>
                    <option value="50+">50+ (Enterprise Cohort)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Any specific concerns or questions?
                </label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Mom forgets afternoon pills; needs large visual prompts..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md shadow-teal-800/20 transition-all mt-2"
              >
                Schedule My 15-Minute Demo
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Demo Request Confirmed!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, {formData.name || 'friend'}. Our geriatric care specialist will email you within 2 business hours with a direct calendar invite.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => { handleClose(); setCurrentView('elderly'); }}
                className="py-3 px-4 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700"
              >
                Test Senior Portal Now →
              </button>
              <button
                onClick={handleClose}
                className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
