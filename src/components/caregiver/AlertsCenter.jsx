import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { AlertTriangle, CheckCircle2, Info, Bell, ShieldAlert, Check, Phone } from 'lucide-react';

export default function AlertsCenter() {
  const { alerts, addAlert } = useAmica();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'emergency'

  const filtered = alerts.filter(a => {
    if (filter === 'unread') return !a.read;
    if (filter === 'emergency') return a.type === 'emergency' || a.type === 'warning';
    return true;
  });

  const triggerTestAlert = () => {
    addAlert('warning', 'Simulation: Eleanor mentioned feeling lightheaded during morning conversation.');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
      
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xl">Caregiver Safety & Anomaly Center</h3>
            <p className="text-xs text-slate-500">Live escalation feed and distress notifications</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerTestAlert}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors"
          >
            + Simulate Alert
          </button>
          
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('emergency')}
              className={`px-3 py-1 rounded-lg ${filter === 'emergency' ? 'bg-white shadow-xs text-rose-700 font-bold' : 'text-slate-600'}`}
            >
              Alerts Only
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filtered.map((alert) => {
          const isEmergency = alert.type === 'emergency';
          const isWarning = alert.type === 'warning';
          const isSuccess = alert.type === 'success';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                isEmergency
                  ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-500/20'
                  : isWarning
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : isSuccess
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isEmergency ? 'bg-rose-600 text-white' :
                  isWarning ? 'bg-amber-500 text-white' :
                  isSuccess ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {isEmergency ? <ShieldAlert className="w-4 h-4" /> :
                   isWarning ? <AlertTriangle className="w-4 h-4" /> :
                   isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isEmergency ? 'bg-rose-200 text-rose-900' :
                      isWarning ? 'bg-amber-200 text-amber-900' : 'bg-white/80 text-slate-700'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm font-semibold mt-1">
                    {alert.message}
                  </p>
                </div>
              </div>

              {isEmergency && (
                <a
                  href="tel:5552348901"
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Mom</span>
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* SMS & Dispatch Settings Note */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span>Delivery active: <strong>SMS to (555) 234-8901</strong> and <strong>sarah.vance@gmail.com</strong></span>
        <span className="text-emerald-700 font-semibold">● Real-time WebSocket sync</span>
      </div>

    </div>
  );
}
