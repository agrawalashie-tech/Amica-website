import React, { useState, useEffect, useRef } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

export default function VideoCallModal() {
  const { isVideoCallActive, setIsVideoCallActive, addAlert } = useAmica();
  const [recipient, setRecipient] = useState('Sarah Vance (Daughter)');
  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting' | 'connected'
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isVideoCallActive) {
      // Connect after 2.5 seconds
      const connectTimeout = setTimeout(() => {
        setCallStatus('connected');
        addAlert('info', `Video call with ${recipient} started.`);
      }, 2500);

      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      const currentVideoNode = videoRef.current;

      // Attempt optional camera stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            if (currentVideoNode) {
              currentVideoNode.srcObject = stream;
            }
          })
          .catch(() => {
            // Camera not available or denied, fallback to simulated stream
          });
      }

      return () => {
        clearTimeout(connectTimeout);
        clearInterval(timer);
        if (currentVideoNode && currentVideoNode.srcObject) {
          const tracks = currentVideoNode.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [isVideoCallActive, addAlert, recipient]);

  if (!isVideoCallActive) return null;

  const handleEndCall = () => {
    setIsVideoCallActive(false);
    setCallStatus('connecting');
    setCallDuration(0);
  };

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700 flex flex-col h-[90vh] max-h-[750px]">
        
        {/* Call Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-lg">
              {recipient.startsWith('Sarah') ? '👩🏻' : '🩺'}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{recipient}</h3>
              <p className="text-xs text-slate-400">
                {callStatus === 'connecting' ? 'Calling...' : `Connected • ${formatDuration(callDuration)}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRecipient(recipient.startsWith('Sarah') ? 'Dr. Robert Hayes (Cardiologist)' : 'Sarah Vance (Daughter)')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Switch: {recipient.startsWith('Sarah') ? 'Dr. Hayes' : 'Sarah'}
            </button>
          </div>
        </div>

        {/* Video Canvas Area */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
          
          {callStatus === 'connecting' ? (
            <div className="text-center space-y-4 text-white">
              <div className="w-24 h-24 rounded-full bg-teal-500/20 text-teal-400 border-2 border-teal-500 flex items-center justify-center mx-auto text-4xl animate-pulse">
                {recipient.startsWith('Sarah') ? '👩🏻' : '🩺'}
              </div>
              <h4 className="text-xl font-bold">Calling {recipient}...</h4>
              <p className="text-sm text-slate-400">One moment please, connecting your video...</p>
            </div>
          ) : (
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Simulated remote caregiver camera feed */}
              <div className="relative w-full h-full">
                <img
                  src={
                    recipient.startsWith('Sarah')
                      ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1000&auto=format&fit=crop&q=80"
                  }
                  alt={recipient}
                  className="w-full h-full object-cover"
                />
                
                {/* Heartwarming overlay caption */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{recipient} is listening to you</span>
                </div>
              </div>

              {/* Picture-in-Picture: Senior's own camera */}
              <div className="absolute bottom-6 right-6 w-36 h-48 sm:w-44 sm:h-56 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl">
                {!videoOff ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                    <VideoOff className="w-6 h-6 mb-1" />
                    <span>Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                  You (Eleanor)
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Video Call Controls Bar (Ultra Accessible) */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 sm:gap-8">
          
          <button
            onClick={() => setMicMuted(!micMuted)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${
              micMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title="Mute Microphone"
          >
            {micMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            <span className="text-xs font-bold">{micMuted ? 'Muted' : 'Mute'}</span>
          </button>

          {/* Big Red End Call Button */}
          <button
            onClick={handleEndCall}
            className="px-8 sm:px-12 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-rose-600/30 flex items-center gap-3 transition-transform active:scale-95"
          >
            <PhoneOff className="w-7 h-7" />
            <span>End Call</span>
          </button>

          <button
            onClick={() => setVideoOff(!videoOff)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${
              videoOff ? 'bg-rose-500/20 text-rose-400 border border-rose-500' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
            title="Toggle Camera"
          >
            {videoOff ? <VideoOff className="w-7 h-7" /> : <Video className="w-7 h-7" />}
            <span className="text-xs font-bold">{videoOff ? 'Video Off' : 'Camera'}</span>
          </button>

        </div>

      </div>
    </div>
  );
}
