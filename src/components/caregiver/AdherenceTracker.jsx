import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Pill, Plus, Clock, Check } from 'lucide-react';

export default function AdherenceTracker() {
  const { medications, toggleMedication, addMedication } = useAmica();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    time: '8:00 AM',
    purpose: '',
    color: 'teal'
  });

  const takenCount = medications.filter(m => m.taken).length;
  const adherenceRate = Math.round((takenCount / medications.length) * 100);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMed.name) return;
    addMedication(newMed);
    setNewMed({ name: '', dosage: '', time: '8:00 AM', purpose: '', color: 'teal' });
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Pill className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-xl">Prescription & Adherence Manager</h3>
            <p className="text-xs text-slate-500">Live sync with Eleanor's tablet screen</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder Remotely</span>
        </button>
      </div>

      {/* 30-Day Adherence Stats Bar */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-200/70 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            30-Day Adherence Health Score
          </span>
          <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
            96.4% <span className="text-sm font-semibold text-emerald-700">(Grade A • Excellent)</span>
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Today: {takenCount} of {medications.length} doses confirmed taken.
          </p>
        </div>

        <div className="w-full sm:w-48 bg-white/80 p-2 rounded-xl border border-teal-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
            <span>Today's Progress</span>
            <span className="text-teal-800">{adherenceRate}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${adherenceRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Medication List */}
      <div className="space-y-3">
        {medications.map((med) => (
          <div
            key={med.id}
            className="p-4 rounded-2xl border border-slate-200 hover:border-teal-300 flex items-center justify-between transition-all bg-slate-50/50"
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                med.taken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {med.taken ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-slate-900 text-base">{med.name}</h5>
                  <span className="text-xs font-semibold text-slate-500">({med.dosage})</span>
                  <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700">
                    ⏰ {med.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target: {med.purpose} • {med.taken ? `Confirmed taken at ${med.takenAt}` : 'Pending scheduled window'}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleMedication(med.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                med.taken
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {med.taken ? 'Mark Unconfirmed' : 'Mark as Taken'}
            </button>
          </div>
        ))}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h4 className="text-xl font-bold text-slate-900 mb-1">Add Medication Reminder</h4>
            <p className="text-xs text-slate-500 mb-5">This will immediately appear on Eleanor's tablet screen with voice readout.</p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CoQ10 or Atorvastatin"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20mg"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9:00 AM"
                    value={newMed.time}
                    onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Medical Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cholesterol or Heart Support"
                  value={newMed.purpose}
                  onChange={(e) => setNewMed({ ...newMed, purpose: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-sm"
                >
                  Schedule Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
