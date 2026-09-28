import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const { setCurrentView, setIsDemoModalOpen } = useAmica();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const plans = [
    {
      id: 'free',
      name: 'Free Companion',
      tagline: 'Basic companionship for every senior',
      priceMonthly: 0,
      priceAnnual: 0,
      badge: 'Freemium',
      isPopular: false,
      ctaText: 'Start Free Trial',
      action: () => setCurrentView('elderly'),
      features: [
        'Friendly AI companion chat (text & voice)',
        '1 daily morning check-in',
        'Nostalgic trivia and soothing ambient music',
        'Basic photo memories slideshow',
        'Tablet and mobile browser access'
      ],
      notIncluded: [
        'Caregiver dashboard & live alerts',
        'Medication reminder scheduling',
        'Real-time distress keyword escalation',
        '1-click family video calls'
      ]
    },
    {
      id: 'family',
      name: 'Family Peace of Mind',
      tagline: 'Complete safety & proactive monitoring for families',
      priceMonthly: 19,
      priceAnnual: 15,
      badge: 'Most Loved by Families',
      isPopular: true,
      ctaText: 'Start 14-Day Free Family Trial',
      action: () => setCurrentView('caregiver'),
      features: [
        'Everything in Free Companion',
        'Full Caregiver Dashboard with live status',
        'Unlimited scheduled medication & doctor reminders',
        'Intelligent distress keyword & anomaly detection',
        'Instant SMS & email alerts to up to 5 family members',
        '1-Click video call with family members',
        'Longitudinal mood & self-reported vitals charts',
        'Send love notes and photos directly to their screen'
      ],
      notIncluded: [
        'EHR/RPM clinical portal integration'
      ]
    },
    {
      id: 'enterprise',
      name: 'Senior Living & Clinicians',
      tagline: 'B2B2C for assisted living, home health & insurers',
      priceMonthly: 49,
      priceAnnual: 39,
      badge: 'Enterprise / B2B2C',
      isPopular: false,
      ctaText: 'Request Facility Demo',
      action: () => setIsDemoModalOpen(true),
      features: [
        'Everything in Family Peace of Mind',
        'Multi-resident aggregated cohort management portal',
        'EHR & Remote Patient Monitoring (RPM) data sync',
        'HIPAA Business Associate Agreement (BAA)',
        'Staff escalation triage & clinical protocol triggers',
        'Dedicated account manager & staff onboarding training',
        'Custom facility branding & activity calendars'
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-800 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Transparent, Compassionate Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Invest in Everyday Safety & Human Connection
          </h2>
          <p className="text-slate-600 text-lg mt-3">
            Choose a plan that fits your family's needs or senior living organization. Cancel or upgrade anytime with zero hidden fees.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-teal-900 to-slate-950 text-white shadow-2xl scale-105 border-2 border-teal-500 ring-4 ring-teal-500/20'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md">
                    ★ {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      plan.isPopular ? 'bg-teal-800/80 text-teal-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {plan.name}
                    </span>
                    {!plan.isPopular && (
                      <span className="text-xs text-slate-500 font-medium">{plan.badge}</span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm mb-6 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                      ${price}
                    </span>
                    <span className={`text-sm font-medium ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.id === 'enterprise' ? '/resident /month' : '/month'}
                    </span>
                  </div>

                  <button
                    onClick={plan.action}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 mb-8 ${
                      plan.isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="space-y-3 pt-6 border-t border-slate-200/20">
                    <p className={`text-xs font-bold uppercase tracking-wider ${plan.isPopular ? 'text-teal-300' : 'text-slate-400'}`}>
                      What's Included:
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm opacity-40 line-through">
                        <span className="w-4 h-4 shrink-0 text-center font-bold">✕</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                <div className={`mt-8 pt-4 border-t text-[11px] text-center ${plan.isPopular ? 'text-slate-400' : 'text-slate-400'}`}>
                  {plan.id === 'family' ? '30-day money-back guarantee • No contract' : 
                   plan.id === 'enterprise' ? 'Volume discounts for 50+ residents available' : 'Always free forever'}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
