import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Stethoscope, Search, Download, Home } from 'lucide-react';

export default function ProviderPortal() {
  const { setCurrentView } = useAmica();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const cohort = [
    { id: 'p-1', name: 'Eleanor Vance', age: 78, room: 'Apt 3B', risk: 'low', bp: '122/78', glucose: '104 mg/dL', adherence: '96%', status: 'Active & Stable', lastCheckIn: '8:45 AM' },
    { id: 'p-2', name: 'Harold Miller', age: 84, room: 'Room 112', risk: 'high', bp: '154/92', glucose: '185 mg/dL', adherence: '62%', status: 'Missed Morning Doses', lastCheckIn: 'Yesterday 6 PM' },
    { id: 'p-3', name: 'Beatrice Kowalski', age: 81, room: 'Apt 2A', risk: 'medium', bp: '138/84', glucose: '118 mg/dL', adherence: '88%', status: 'Reported Joint Pain', lastCheckIn: '9:15 AM' },
    { id: 'p-4', name: 'Arthur Pendelton', age: 76, room: 'Room 204', risk: 'low', bp: '118/74', glucose: '98 mg/dL', adherence: '98%', status: 'Active & Stable', lastCheckIn: '8:05 AM' },
    { id: 'p-5', name: 'Gladys Robinson', age: 89, room: 'Room 105', risk: 'high', bp: '162/96', glucose: '210 mg/dL', adherence: '71%', status: 'Low Hydration Flag', lastCheckIn: '10:00 AM' }
  ];

  const filtered = cohort.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || p.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      
      {/* Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('marketing')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Return to Landing"
            >
              <Home className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              <Stethoscope className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">Amica Clinical Portal</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Phase 2 Preview
                </span>
              </div>
              <p className="text-xs text-slate-400">Evergreen Senior Living & Remote Patient Monitoring (RPM)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('caregiver')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              ← Caregiver View
            </button>
            <button
              onClick={() => setCurrentView('elderly')}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
            >
              Senior View →
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Banner Overview */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Resident Cohort Telemetry</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Real-time stratification of 48 active residents. Alerts automatically prioritize high-risk patients with missed medication windows or out-of-range vitals.
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-700">
              <span className="text-2xl font-bold text-rose-400">2</span>
              <p className="text-xs text-slate-400 mt-0.5">High Risk Triage</p>
            </div>
            <div className="bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-700">
              <span className="text-2xl font-bold text-amber-400">1</span>
              <p className="text-xs text-slate-400 mt-0.5">Moderate Attention</p>
            </div>
            <div className="bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-700">
              <span className="text-2xl font-bold text-emerald-400">45</span>
              <p className="text-xs text-slate-400 mt-0.5">Stable & Monitored</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resident by name or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRiskFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${riskFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              All Residents
            </button>
            <button
              onClick={() => setRiskFilter('high')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${riskFilter === 'high' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              High Risk
            </button>
            <button
              onClick={() => setRiskFilter('low')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${riskFilter === 'low' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Stable
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-slate-800/80 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/90 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="py-4 px-6">Resident</th>
                  <th className="py-4 px-6">Risk Triage</th>
                  <th className="py-4 px-6">Latest Vitals (BP / Sugar)</th>
                  <th className="py-4 px-6">Med Adherence</th>
                  <th className="py-4 px-6">Current Status</th>
                  <th className="py-4 px-6 text-right">EHR Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filtered.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-base">{patient.name}</div>
                      <div className="text-xs text-slate-400">Age {patient.age} • {patient.room}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        patient.risk === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        patient.risk === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {patient.risk.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-300">
                      <div>BP: {patient.bp}</div>
                      <div className="text-xs text-slate-400">Glu: {patient.glucose}</div>
                    </td>

                    <td className="py-4 px-6 font-bold text-white">
                      {patient.adherence}
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-slate-200">{patient.status}</div>
                      <div className="text-xs text-slate-400">Checked: {patient.lastCheckIn}</div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alert(`Exported clinical summary for ${patient.name} to Epic/Cerner EHR.`)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
