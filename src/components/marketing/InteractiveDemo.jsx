import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Mic, MicOff, Volume2, Send, ShieldAlert, RotateCcw } from 'lucide-react';
import { getCompanionResponse } from '../../utils/companionAI';

export default function InteractiveDemo() {
  const { speakText, addAlert, setCurrentView } = useAmica();
  const [character, setCharacter] = useState('Nora');
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'avatar', text: "Hello there! I'm Nora. Go ahead and say hello, or ask me about your medications, doctor visits, or tell me how you are feeling today!" }
  ]);
  const [detectedAnomaly, setDetectedAnomaly] = useState(null);

  // Web Speech Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition isn't supported in this browser. Please type your message below.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setInputMessage('');

    // Generate companion response
    const result = getCompanionResponse(text, "Eleanor", character);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'avatar', text: result.reply }]);
      setIsAvatarSpeaking(true);
      speakText(result.reply);

      if (result.triggerAlert) {
        setDetectedAnomaly(result.alertText);
        addAlert(result.safetyFlag, result.alertText);
      } else {
        setDetectedAnomaly(null);
      }

      setTimeout(() => setIsAvatarSpeaking(false), 4500);
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      { sender: 'avatar', text: `Hello! I'm ${character}. Try asking me how I can help you today!` }
    ]);
    setDetectedAnomaly(null);
  };

  return (
    <section id="companion-demo" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-teal-800 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Live Interactive Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Experience the Warmth of Amica Firsthand
          </h2>
          <p className="text-slate-600 text-lg mt-3">
            Speak to Nora using your microphone, type a message, or test our proactive emergency keyword scanner.
          </p>
        </div>

        {/* Interactive Chat Console */}
        <div className="max-w-4xl mx-auto bg-amber-50/40 rounded-3xl border-2 border-amber-200/80 shadow-2xl overflow-hidden">
          
          {/* Console Header */}
          <div className="bg-white p-5 border-b border-amber-100 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs">
                  {character === 'Nora' ? '👵🏼' : '🐶'}
                </div>
                {isAvatarSpeaking && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white animate-ping"></span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-lg">{character}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Online & Listening
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isAvatarSpeaking ? 'Speaking warm audio response...' : 'Ready for conversation'}
                </p>
              </div>
            </div>

            {/* Avatar Persona Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setCharacter('Nora'); handleReset(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  character === 'Nora'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                👵🏼 Nora (Nurse Companion)
              </button>
              <button
                onClick={() => { setCharacter('Oliver'); handleReset(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  character === 'Oliver'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🐶 Oliver (Friendly Companion)
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Safety Alert Trigger Banner */}
          {detectedAnomaly && (
            <div className="bg-rose-50 border-b border-rose-200 p-4 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                    Live Anomaly Detected & Dispatched
                  </p>
                  <p className="text-xs text-rose-700">
                    {detectedAnomaly} → Sent to Sarah's Caregiver Dashboard.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('caregiver')}
                className="text-xs font-bold text-rose-800 underline hover:text-rose-950"
              >
                View in Dashboard →
              </button>
            </div>
          )}

          {/* Chat Messages Log */}
          <div className="p-6 space-y-4 max-h-[360px] min-h-[260px] overflow-y-auto bg-amber-50/20">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'avatar' && (
                  <div className="w-9 h-9 rounded-full bg-amber-200 text-lg flex items-center justify-center shrink-0">
                    {character === 'Nora' ? '👵🏼' : '🐶'}
                  </div>
                )}

                <div
                  className={`max-w-lg p-4 rounded-2xl text-sm sm:text-base leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-none border border-amber-200/80 shadow-xs font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isAvatarSpeaking && (
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full w-fit">
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Nora is speaking out loud via Text-to-Speech...</span>
              </div>
            )}
          </div>

          {/* Quick Click Prompts */}
          <div className="px-6 py-3 bg-white border-t border-amber-100 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Sample prompts:
            </span>
            <button
              onClick={() => handleSend("Good morning! What are my appointments tomorrow?")}
              className="text-xs px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
            >
              📅 "What are my appointments?"
            </button>
            <button
              onClick={() => handleSend("Did I take my morning Lisinopril?")}
              className="text-xs px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
            >
              💊 "Did I take my pills?"
            </button>
            <button
              onClick={() => handleSend("Nora, I fell down and my hip hurts.")}
              className="text-xs px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 font-medium transition-colors"
            >
              🚨 "I fell down..." (Emergency test)
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-2xl transition-all ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
              }`}
              title="Speak with Microphone"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening to your voice now..." : "Type a message or question for Nora..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm sm:text-base"
            />

            <button
              onClick={() => handleSend()}
              className="px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
