import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Heart, X, Image, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SendLoveNoteModal({ isOpen, onClose }) {
  const { addLoveNote, speakText } = useAmica();
  const [senderName, setSenderName] = useState('Sarah (Daughter)');
  const [noteText, setNoteText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addLoveNote(senderName, noteText, photoUrl);
    setSentSuccess(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    speakText(`Eleanor, you received a new love note from ${senderName}!`);

    setTimeout(() => {
      setSentSuccess(false);
      onClose();
      setNoteText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {!sentSuccess ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Send a Love Note to Eleanor
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              This message and photo will immediately light up on Eleanor's screen to brighten her day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name / Relationship
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Warm Message
                </label>
                <textarea
                  rows="3"
                  required
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Thinking of you Mom! Can't wait to hear how your garden flowers are blooming today. Love you lots!"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-slate-500" />
                  <span>Attach Photo URL (Sample included)</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {photoUrl && (
                <div className="relative rounded-xl overflow-hidden h-28 bg-slate-100 border border-slate-200">
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                    Photo Preview
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md shadow-pink-600/25 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Deliver Note to Eleanor's Screen</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Love Note Delivered!</h4>
            <p className="text-sm text-slate-600">Nora is now reading your note out loud to Eleanor.</p>
          </div>
        )}

      </div>
    </div>
  );
}
