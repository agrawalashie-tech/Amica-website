import React, { useState } from 'react';
import { 
  Bot, 
  Pill, 
  Activity, 
  AlertTriangle, 
  LayoutDashboard, 
  Video, 
  Music, 
  Sparkles, 
  Check, 
  ChevronRight,
  Droplets,
  HeartHandshake,
  CalendarCheck
} from 'lucide-react';

export default function Features() {
  const [activeCategory, setActiveCategory] = useState('companion');

  const featureTabs = [
    { id: 'companion', label: 'AI Avatar Companion', icon: Bot },
    { id: 'reminders', label: 'Smart Reminders', icon: Pill },
    { id: 'monitoring', label: 'Health & Mood Vitals', icon: Activity },
    { id: 'alerts', label: 'Safety & Anomaly Alerts', icon: AlertTriangle },
    { id: 'caregiver', label: 'Caregiver Portal', icon: LayoutDashboard },
    { id: 'video', label: '1-Click Video Visits', icon: Video },
    { id: 'extras', label: 'Companionship Extras', icon: Music },
  ];

  const contentMap = {
    companion: {
      badge: "Heart of Amica",
      title: "Friendly AI Avatar Character with Real Voice",
      description: "Nora (or Oliver) isn't a robotic sterile assistant. She is an empathetic, warm digital companion designed with gentle pacing, clear speech, and active listening to reduce loneliness and foster cognitive vitality.",
      bullets: [
        "Natural 2-way speech: speak naturally using your microphone or simple large buttons",
        "Gentle morning check-ins asking about rest, mood, and daily plans",
        "Empathetic contextual memory that recalls family names, favorite pets, and routines",
        "Safety guardrails: listens for indicators of distress, falls, or cognitive confusion"
      ],
      previewImg: "👵🏼 Warm, smiling digital character with dynamic speaking animations and positive reinforcement."
    },
    reminders: {
      badge: "Adherence Assurance",
      title: "Medication, Hydration & Routine Reminders",
      description: "Never worry whether morning blood pressure medicine or evening vitamins were taken. Amica pairs gentle audible chimes with large visual cues and positive confetti reinforcement.",
      bullets: [
        "Medication logs with photo verification and one-touch confirmation",
        "Interactive hydration cup counter with visual water fill animations",
        "Gentle seated stretching and mobility reminders",
        "Upcoming doctor appointments and family visit countdowns"
      ],
      previewImg: "💊 High-contrast medication cards with large 'I Took It' confirmation buttons."
    },
    monitoring: {
      badge: "Wellness Tracking",
      title: "Self-Reported Vitals & Mood Analytics",
      description: "Lightweight, non-intrusive health tracking that elderly loved ones can easily log in seconds without complex medical equipment.",
      bullets: [
        "Simple touch logging for Blood Pressure, Blood Sugar, Sleep, and Comfort/Pain level",
        "Emoji-based daily mood tracking capturing emotional wellbeing trends",
        "Automatic weekly trend summaries compiled for upcoming doctor visits",
        "Phase 2 ready: integration hooks for Bluetooth pulse oximeters and blood pressure cuffs"
      ],
      previewImg: "📊 Clean longitudinal graphs revealing sleep patterns and vitals stability over time."
    },
    alerts: {
      badge: "Proactive Protection",
      title: "Intelligent Anomaly Detection & Immediate Alerts",
      description: "Unlike passive emergency pendants that rely on seniors pushing a button after disaster strikes, Amica detects irregularities proactively.",
      bullets: [
        "Automated alerts if morning check-in is missed past a designated hour",
        "Real-time safety keyword scanner ('fell', 'dizzy', 'chest hurts', 'can't breathe')",
        "10-second cancel countdown on the Senior SOS button to avoid false 911 dispatches",
        "Multi-channel caregiver delivery via SMS, Email, and Push Notifications"
      ],
      previewImg: "🚨 Urgent escalation banner with one-click direct phone dial and location stamp."
    },
    caregiver: {
      badge: "Family Peace of Mind",
      title: "Real-Time Family & Caregiver Dashboard",
      description: "Adult children and family members get complete visibility without feeling like they are hovering or invading their parent's privacy.",
      bullets: [
        "Live status indicators: 'Eleanor is active & well' with last check-in timestamp",
        "Remote reminder manager: schedule medications and doctor visits from anywhere",
        "Caregiver Love Notes: send warm photo cards and encouraging notes directly to their tablet",
        "Multi-family coordination: share access among siblings and home care aides"
      ],
      previewImg: "📱 Responsive portal displaying adherence percentages and recent alert logs."
    },
    video: {
      badge: "Effortless Connection",
      title: "1-Click Video Calls Without App Confusion",
      description: "Eliminate the frustration of complicated video apps, forgotten passwords, or tiny buttons. One huge button connects directly to family.",
      bullets: [
        "Zero logins or meeting IDs required for the senior",
        "Direct connection to authorized family contacts (e.g. 'Call Daughter Sarah')",
        "Auto-answer option for pre-approved caregivers in urgent situations",
        "High-definition video with crystal-clear audio boost"
      ],
      previewImg: "📹 Fullscreen video interface with high-contrast 'End Call' and volume controls."
    },
    extras: {
      badge: "Cognitive Vitality",
      title: "Nostalgic Music, Daily Trivia & Photo Memories",
      description: "Healthy aging requires joy, laughter, and mental stimulation. Amica provides delightful daily extras tailored to their generation.",
      bullets: [
        "Comforting classic music, nature streams, and gentle harp melodies",
        "Golden era trivia quizzes with uplifting commentary and celebration",
        "Digital family photo frame showing cherished memories with captions",
        "Daily conversation starters reminiscing about childhood and favorite life stories"
      ],
      previewImg: "🎵 Built-in audio player and nostalgic photo memories slideshow."
    }
  };

  const current = contentMap[activeCategory];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
            Comprehensive Care Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Every Feature Built for Warmth, Simplicity & Safety
          </h2>
          <p className="text-slate-600 text-lg mt-4">
            Designed specifically for older adults who don't like complicated technology, and for families who need trusted real-time reassurance.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {featureTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-teal-800 text-white shadow-md shadow-teal-800/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-200' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Detail Showcase Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/80">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {current.title}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Callout Box */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-amber-50 to-teal-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200/70 text-slate-800 flex flex-col justify-center min-h-[300px]">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl mb-4">
                ✨
              </div>
              <h4 className="font-bold text-lg text-slate-900 mb-2">
                Built For Real Seniors
              </h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {current.previewImg}
              </p>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Ease of Use Rating</span>
                  <span className="text-emerald-700 font-bold">99.4% Senior Approval</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[99%]"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
