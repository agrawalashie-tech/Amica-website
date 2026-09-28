import React, { useState, useEffect } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { AlertOctagon, PhoneCall, Check } from 'lucide-react';

export default function SosModal() {
  const { isSosActive, setIsSosActive, addAlert } = useAmica();
  const [countdown, setCountdown] = useState(10);
  const [isDispatched, setIsDispatched] = useState(false);

  useEffect(() => {
    if (!isSosActive) {
      setCountdown(10);
      setIsDispatched(false);
      return;
    }

    if (isDispatched) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDispatched(true);
          addAlert('emergency', 'EMERGENCY SOS: Eleanor initiated emergency alert. Caregiver & 911 contact protocol active.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSosActive, isDispatched, addAlert]);

  if (!isSosActive) return null;

  const handleCancel = () => {
    setIsSosActive(false);
    setCountdown(10);
    setIsDispatched(false);
  };

  const handleInstantDispatch = () => {
    setCountdown(0);
    setIsDispatched(true);
    addAlert('emergency', 'EMERGENCY SOS: Eleanor clicked immediate dispatch.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-rose-500 text-center">
        
        {!isDispatched ? (
          <div>
            <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-6 animate-gentle-pulse">
              <AlertOctagon className="w-14 h-14 stroke-[2.5]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Emergency SOS Triggered
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl mb-6">
              Notifying your daughter <strong>Sarah</strong> and emergency contacts in:
            </p>

            {/* Big Countdown Number */}
            <div className="text-7xl sm:text-8xl font-black text-rose-600 my-4 tracking-tighter">
              {countdown}
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-8 uppercase tracking-wider">
              Seconds remaining to cancel if accidental
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="w-full sm:w-1/2 py-5 px-6 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xl shadow-md transition-all active:scale-95"
              >
                Cancel (I'm Okay)
              </button>

              <button
                onClick={handleInstantDispatch}
                className="w-full sm:w-1/2 py-5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xl shadow-xl shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-6 h-6" />
                <span>Call Sarah Now</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Emergency Alerts Sent!
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-md mx-auto">
              Your daughter <strong>Sarah</strong> and neighbor <strong>Robert</strong> have been alerted via high-priority SMS and automated call with your address:
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left text-sm space-y-1">
              <p className="font-bold text-slate-900">📍 742 Evergreen Terrace, Apt 3B</p>
              <p className="text-slate-600">Primary Contact: Sarah Vance — (555) 234-8901</p>
              <p className="text-slate-600">Local EMS dispatch notified.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:911"
                className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-rose-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-rose-700"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Dial 911 Direct</span>
              </a>
              <button
                onClick={handleCancel}
                className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-slate-200 text-slate-800 font-bold text-lg hover:bg-slate-300"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
