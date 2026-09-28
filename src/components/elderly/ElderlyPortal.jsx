import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { 
  Pill, 
  Calendar, 
  PhoneCall, 
  AlertOctagon, 
  Volume2, 
  VolumeX, 
  Type, 
  Eye, 
  Check, 
  Mic, 
  Send, 
  Home,
  MessageCircleHeart
} from 'lucide-react';
import CompanionshipHub from './CompanionshipHub';
import SosModal from './SosModal';
import VideoCallModal from './VideoCallModal';
import DailyCheckInModal from './DailyCheckInModal';
import { getCompanionResponse } from '../../utils/companionAI';

export default function ElderlyPortal() {
  const { 
    seniorFontSize, 
    setSeniorFontSize, 
    highContrast, 
    setHighContrast, 
    voiceEnabled, 
    setVoiceEnabled,
    selectedAvatar,
    setSelectedAvatar,
    medications,
    toggleMedication,
    appointments,
    waterGlasses,
    logWater,
    todayMood,
    loveNotes,
    setIsSosActive,
    setIsVideoCallActive,
    setIsCheckInOpen,
    speakText,
    addAlert,
    setCurrentView
  } = useAmica();

  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatLog, setChatLog] = useState([
    { sender: 'nora', text: `Good morning, Eleanor! It's lovely to see you today. Don't forget your 1:00 PM Metformin pill with lunch. How are you feeling right now?` }
  ]);
  const [isNoraSpeaking, setIsNoraSpeaking] = useState(false);

  // Font scale class
  const fontScaleClass = 
    seniorFontSize === 'huge' ? 'text-elder-2xl' :
    seniorFontSize === 'large' ? 'text-elder-xl' : 'text-elder-lg';

  // Voice recognition
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone recognition is not supported in this browser. Please type in the box.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setChatInput(transcript);
        handleSendChat(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendChat = (messageText) => {
    const text = messageText || chatInput;
    if (!text.trim()) return;

    setChatLog(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');

    const res = getCompanionResponse(text, "Eleanor", selectedAvatar);
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'nora', text: res.reply }]);
      setIsNoraSpeaking(true);
      speakText(res.reply);

      if (res.triggerAlert) {
        addAlert(res.safetyFlag, res.alertText);
      }
      setTimeout(() => setIsNoraSpeaking(false), 4500);
    }, 400);
  };

  return (
    <div className={`min-h-screen pb-20 ${fontScaleClass} ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-b from-amber-50/60 via-amber-50/30 to-amber-100/40 text-slate-900'
    }`}>
      
      {/* Top Elder-Friendly Accessibility Bar */}
      <div className={`sticky top-0 z-40 border-b px-4 py-3 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 ${
        highContrast ? 'bg-black border-yellow-400' : 'bg-white/95 border-amber-200'
      }`}>
        
        {/* Left: Elder Greeting & Return button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('marketing')}
            className={`p-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm transition-all ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
            title="Return to Marketing Landing"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>Eleanor's Companion</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Tablet Mode
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Today is Monday, October 13 • 742 Evergreen Terrace
            </p>
          </div>
        </div>

        {/* Right Accessibility Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Avatar Switch */}
          <button
            onClick={() => {
              const next = selectedAvatar === 'Nora' ? 'Oliver' : 'Nora';
              setSelectedAvatar(next);
              speakText(`Companion changed to ${next}`);
            }}
            className={`px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold border flex items-center gap-1.5 transition-all ${
              highContrast 
                ? 'border-yellow-400 text-yellow-300' 
                : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50'
            }`}
          >
            <span>{selectedAvatar === 'Nora' ? '👵🏼 Nora' : '🐶 Oliver'}</span>
          </button>

          {/* Voice Audio On/Off */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2.5 rounded-2xl border flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all ${
              voiceEnabled 
                ? highContrast ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}
            title="Toggle Voice Readout"
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="hidden md:inline">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
          </button>

          {/* Font Size Cycle */}
          <button
            onClick={() => {
              const next = seniorFontSize === 'normal' ? 'large' : seniorFontSize === 'large' ? 'huge' : 'normal';
              setSeniorFontSize(next);
            }}
            className={`px-3 py-2 rounded-2xl border text-xs sm:text-sm font-extrabold flex items-center gap-1.5 ${
              highContrast ? 'border-yellow-400 text-yellow-400' : 'bg-white border-amber-300 text-amber-900'
            }`}
            title="Adjust Text Size"
          >
            <Type className="w-4 h-4" />
            <span>Size: {seniorFontSize.toUpperCase()}</span>
          </button>

          {/* High Contrast */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`p-2.5 rounded-2xl border font-bold flex items-center gap-1 text-xs sm:text-sm ${
              highContrast 
                ? 'bg-yellow-400 text-black border-yellow-300' 
                : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50'
            }`}
            title="Toggle High Contrast for Eyes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* TOP URGENT / QUICK ACTION HERO BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* 1-Click Video Call Daughter Sarah */}
          <button
            onClick={() => setIsVideoCallActive(true)}
            className={`p-6 rounded-3xl font-extrabold flex items-center justify-between shadow-xl transition-all active:scale-95 text-left border-4 ${
              highContrast
                ? 'bg-emerald-400 text-black border-white'
                : 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-teal-600/50 hover:from-teal-800 hover:to-emerald-800 shadow-teal-700/25'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0">
                👩🏻
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-90 block">1-Click Video Visit</span>
                <h3 className="text-2xl sm:text-3xl font-black">Call Daughter Sarah</h3>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">Online now • Tap to talk face-to-face</p>
              </div>
            </div>
            <PhoneCall className="w-8 h-8 shrink-0 ml-2" />
          </button>

          {/* Big Red Emergency SOS Button */}
          <button
            onClick={() => setIsSosActive(true)}
            className={`p-6 rounded-3xl font-extrabold flex items-center justify-between shadow-xl transition-all active:scale-95 text-left border-4 ${
              highContrast
                ? 'bg-rose-500 text-white border-yellow-400'
                : 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-500/50 hover:from-rose-700 hover:to-red-700 shadow-rose-600/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0 animate-pulse">
                🚨
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-90 block">Emergency Help</span>
                <h3 className="text-2xl sm:text-3xl font-black">EMERGENCY SOS</h3>
                <p className="text-xs sm:text-sm opacity-90 mt-0.5">Alerts Sarah & contacts with 10s cancel</p>
              </div>
            </div>
            <AlertOctagon className="w-9 h-9 stroke-[2.5] shrink-0 ml-2" />
          </button>

        </div>

        {/* TWO COLUMN GRID: Avatar Companion on Left, Reminders & Care on Right */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Nora Avatar Companion & Live Voice Chat (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Avatar Character Card */}
            <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl border-4 transition-all ${
              highContrast ? 'bg-slate-900 border-yellow-400' : 'bg-white border-amber-200'
            }`}>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-amber-200 flex items-center justify-center text-5xl shadow-md border-2 border-white">
                    {selectedAvatar === 'Nora' ? '👵🏼' : '🐶'}
                  </div>
                  {isNoraSpeaking && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-2 border-white animate-ping"></span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    {selectedAvatar}
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-700 font-bold">
                    {isNoraSpeaking ? 'Speaking to you...' : 'Your Companion • Always Here'}
                  </p>
                </div>
              </div>

              {/* Chat Message Bubble Log */}
              <div className={`p-4 rounded-2xl max-h-72 overflow-y-auto space-y-3 mb-4 border ${
                highContrast ? 'bg-black border-slate-700' : 'bg-amber-50/50 border-amber-200/60'
              }`}>
                {chatLog.map((item, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl ${
                      item.sender === 'user'
                        ? 'bg-teal-700 text-white ml-6 rounded-tr-none'
                        : highContrast
                        ? 'bg-slate-800 text-white mr-6 rounded-tl-none border border-yellow-400'
                        : 'bg-white text-slate-800 mr-6 rounded-tl-none shadow-xs border border-amber-200 font-medium'
                    }`}
                  >
                    <p className={seniorFontSize === 'huge' ? 'text-xl' : seniorFontSize === 'large' ? 'text-lg' : 'text-base'}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Voice & Input Controls */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleMicClick}
                    className={`flex-1 py-4 px-4 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-md ${
                      isListening
                        ? 'bg-rose-600 text-white animate-pulse'
                        : highContrast
                        ? 'bg-yellow-400 text-black'
                        : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
                    }`}
                  >
                    <Mic className="w-6 h-6" />
                    <span>{isListening ? 'Listening...' : 'Press & Talk to Nora'}</span>
                  </button>

                  <button
                    onClick={() => speakText(chatLog[chatLog.length - 1]?.text || 'Hello Eleanor!')}
                    className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    title="Repeat Audio"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Text alternative input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Or type a question for Nora..."
                    className={`flex-1 px-4 py-3 rounded-2xl border text-base focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                      highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  <button
                    onClick={() => handleSendChat()}
                    className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Daughter Sarah's Love Note Card */}
            {loveNotes.length > 0 && (
              <div className={`rounded-3xl p-6 shadow-xl border-4 ${
                highContrast ? 'bg-slate-900 border-pink-400' : 'bg-pink-50/70 border-pink-200'
              }`}>
                <div className="flex items-center gap-2 mb-3 text-pink-700 font-extrabold text-sm uppercase tracking-wider">
                  <MessageCircleHeart className="w-5 h-5" />
                  <span>Love Note from Sarah</span>
                </div>
                <div className="space-y-3">
                  <img
                    src={loveNotes[0].photo}
                    alt="Sarah's Note"
                    className="w-full h-44 object-cover rounded-2xl shadow-sm border-2 border-white"
                  />
                  <p className="text-slate-800 font-medium text-lg leading-relaxed">
                    "{loveNotes[0].text}"
                  </p>
                  <p className="text-xs text-slate-500 font-bold">
                    Sent today at {loveNotes[0].timestamp}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Daily Check-in, Medications, Hydration, Companionship (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Daily Morning Check-in Banner */}
            <div className={`rounded-3xl p-6 sm:p-7 shadow-xl border-4 flex flex-col sm:flex-row items-center justify-between gap-5 ${
              highContrast ? 'bg-slate-900 border-emerald-400' : 'bg-gradient-to-r from-amber-100/90 to-emerald-100/80 border-amber-300'
            }`}>
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl shrink-0">
                  {todayMood.mood === 'Great' ? '😄' : '☕'}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-white/70 px-2.5 py-0.5 rounded-full">
                    Today's Mood Status
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {todayMood.checkedIn ? `Feeling ${todayMood.mood}` : 'Ready for Morning Check-in'}
                  </h3>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {todayMood.checkedIn ? `Logged at ${todayMood.time}: "${todayMood.note}"` : 'Takes 10 seconds to share your mood with Sarah'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCheckInOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-md transition-all shrink-0"
              >
                {todayMood.checkedIn ? 'Update Mood' : 'Start Check-In'}
              </button>
            </div>

            {/* Scheduled Medications (Huge Big Buttons) */}
            <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl border-4 ${
              highContrast ? 'bg-slate-900 border-yellow-400' : 'bg-white border-amber-200'
            }`}>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Pill className="w-7 h-7 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Today's Medications</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Tap the large button when you swallow each pill</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className={`p-5 rounded-2xl border-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      med.taken
                        ? 'bg-emerald-50/80 border-emerald-400 text-slate-900'
                        : 'bg-slate-50 border-slate-300 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                          ⏰ {med.time}
                        </span>
                        {med.taken && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ Confirmed at {med.takenAt}
                          </span>
                        )}
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mt-1">
                        {med.name} <span className="text-lg font-bold text-slate-500">({med.dosage})</span>
                      </h4>
                      <p className="text-sm text-slate-600 font-medium">For: {med.purpose}</p>
                    </div>

                    <button
                      onClick={() => toggleMedication(med.id)}
                      className={`py-4 px-6 rounded-2xl font-black text-lg transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-md ${
                        med.taken
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {med.taken ? (
                        <>
                          <Check className="w-6 h-6 stroke-[3]" />
                          <span>Pill Taken!</span>
                        </>
                      ) : (
                        <span>Tap: I Took It</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hydration Tracker */}
            <div className={`rounded-3xl p-6 sm:p-7 shadow-xl border-4 flex flex-col sm:flex-row items-center justify-between gap-6 ${
              highContrast ? 'bg-slate-900 border-cyan-400' : 'bg-cyan-50/70 border-cyan-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-3xl">
                  💧
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Hydration Goal</h3>
                  <p className="text-base text-cyan-900 font-bold mt-0.5">
                    {waterGlasses} of 6 glasses logged today
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-8 rounded-lg border-2 transition-all ${
                          i < waterGlasses
                            ? 'bg-cyan-500 border-cyan-600 shadow-xs'
                            : 'bg-white border-cyan-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={logWater}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-cyan-700 hover:bg-cyan-800 text-white font-black text-lg shadow-lg shadow-cyan-700/25 transition-transform active:scale-95"
              >
                + Drank a Glass of Water
              </button>
            </div>

            {/* Companionship Extras (Music, Trivia, Photos) */}
            <CompanionshipHub />

            {/* Upcoming Doctor Visits */}
            <div className={`rounded-3xl p-6 shadow-xl border-4 ${
              highContrast ? 'bg-slate-900 border-purple-400' : 'bg-white border-amber-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-black text-slate-900">Upcoming Appointments</h3>
              </div>
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                      <span>{apt.date} at {apt.time}</span>
                      <span>Sarah Driving</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">{apt.title}</h4>
                    <p className="text-xs text-slate-600">{apt.location}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded Modals */}
      <SosModal />
      <VideoCallModal />
      <DailyCheckInModal />

    </div>
  );
}
