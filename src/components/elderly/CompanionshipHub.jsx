import React, { useState } from 'react';
import { useAmica } from '../../context/AmicaContext';
import { Music, Brain, Image, Play, Square, Award } from 'lucide-react';
import { playNatureStream, playChimes, stopAmbientSound } from '../../utils/ambientAudio';
import confetti from 'canvas-confetti';

const TRIVIA_QUESTIONS = [
  {
    q: "Which legendary musician sang the timeless hit 'What a Wonderful World' in 1967?",
    options: ["Louis Armstrong", "Frank Sinatra", "Nat King Cole", "Bing Crosby"],
    answer: 0,
    funFact: "Louis Armstrong's gravelly, soulful voice brought pure joy to millions worldwide!"
  },
  {
    q: "In what year did the Apollo 11 mission first land humans on the Moon?",
    options: ["1965", "1969", "1972", "1961"],
    answer: 1,
    funFact: "'That's one small step for man, one giant leap for mankind!' - Neil Armstrong, July 1969."
  },
  {
    q: "Which classic American film features the line: 'There's no place like home'?",
    options: ["Casablanca", "Gone with the Wind", "The Wizard of Oz", "Singin' in the Rain"],
    answer: 2,
    funFact: "Judy Garland wore the famous ruby slippers in the magical 1939 classic."
  }
];

const PHOTO_MEMORIES = [
  {
    title: "Summer Vacation at Cape Cod",
    date: "July 2024",
    caption: "Sarah and your grandchildren Maya & Leo building sandcastles at the beach.",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Eleanor's 75th Birthday Celebration",
    date: "October 2022",
    caption: "Surrounded by your former library colleagues with the strawberry shortcake you love.",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Leo's First Piano Recital",
    date: "May 2024",
    caption: "Little Leo playing Ode to Joy with Grandma Eleanor in the front row cheering!",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
  }
];

export default function CompanionshipHub() {
  const { speakText } = useAmica();
  const [activeTab, setActiveTab] = useState('music'); // 'music' | 'trivia' | 'photos'
  
  // Audio state
  const [currentSound, setCurrentSound] = useState(null);

  // Trivia state
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [triviaFeedback, setTriviaFeedback] = useState(null);

  // Photo state
  const [photoIndex, setPhotoIndex] = useState(0);

  const handlePlaySound = (type) => {
    if (currentSound === type) {
      stopAmbientSound();
      setCurrentSound(null);
    } else {
      if (type === 'stream') {
        playNatureStream();
        speakText("Playing gentle babbling stream sounds.");
      } else if (type === 'chimes') {
        playChimes();
        speakText("Playing peaceful wind chimes.");
      }
      setCurrentSound(type);
    }
  };

  const handleTriviaAnswer = (idx) => {
    setSelectedOption(idx);
    const curr = TRIVIA_QUESTIONS[triviaIndex];
    if (idx === curr.answer) {
      setTriviaFeedback({ correct: true, text: `Correct! ${curr.funFact}` });
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      speakText(`Splendid! That is correct. ${curr.funFact}`);
    } else {
      setTriviaFeedback({ correct: false, text: `Close! The answer was ${curr.options[curr.answer]}. ${curr.funFact}` });
      speakText(`Good try! The answer was ${curr.options[curr.answer]}.`);
    }
  };

  const nextTrivia = () => {
    setSelectedOption(null);
    setTriviaFeedback(null);
    setTriviaIndex((prev) => (prev + 1) % TRIVIA_QUESTIONS.length);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200/80">
      
      {/* Hub Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-amber-100">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>✨ Companionship & Joy Corner</span>
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Music, trivia games, and memories to brighten your day
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('music')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'music' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Soothing Audio</span>
          </button>
          <button
            onClick={() => setActiveTab('trivia')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'trivia' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Golden Trivia</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'photos' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Family Album</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Soothing Music */}
      {activeTab === 'music' && (
        <div className="space-y-4">
          <p className="text-slate-600 text-sm font-medium">
            Listen to calming nature sounds or peaceful piano chimes to relax your mind:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => handlePlaySound('stream')}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                currentSound === 'stream'
                  ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-teal-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl">
                  🌊
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Babbling Brook Stream</h4>
                  <p className="text-xs text-slate-500">Gentle water flowing in the woods</p>
                </div>
              </div>
              <div className={`p-3 rounded-full ${currentSound === 'stream' ? 'bg-rose-500 text-white' : 'bg-teal-700 text-white'}`}>
                {currentSound === 'stream' ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </div>
            </button>

            <button
              onClick={() => handlePlaySound('chimes')}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                currentSound === 'chimes'
                  ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                  🎐
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Harmonic Wind Chimes</h4>
                  <p className="text-xs text-slate-500">Peaceful porch bells and harp chime</p>
                </div>
              </div>
              <div className={`p-3 rounded-full ${currentSound === 'chimes' ? 'bg-rose-500 text-white' : 'bg-amber-600 text-white'}`}>
                {currentSound === 'chimes' ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </div>
            </button>
          </div>
          {currentSound && (
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                Audio playing smoothly in background
              </span>
              <button
                onClick={() => handlePlaySound(currentSound)}
                className="font-bold underline text-teal-800"
              >
                Stop Sound
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Nostalgic Trivia */}
      {activeTab === 'trivia' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Question {triviaIndex + 1} of {TRIVIA_QUESTIONS.length}
            </span>
            <span className="text-xs text-slate-500 font-semibold">Brain Fitness</span>
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {TRIVIA_QUESTIONS[triviaIndex].q}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRIVIA_QUESTIONS[triviaIndex].options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isCorrect = idx === TRIVIA_QUESTIONS[triviaIndex].answer;
              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleTriviaAnswer(idx)}
                  className={`p-4 rounded-2xl border-2 text-left font-bold text-base transition-all ${
                    selectedOption !== null
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : isChosen
                        ? 'bg-rose-100 border-rose-400 text-rose-950'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-400 text-slate-800'
                  }`}
                >
                  <span className="inline-block w-7 h-7 rounded-lg bg-white/70 text-center leading-7 mr-2 text-sm border border-slate-200">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {triviaFeedback && (
            <div className={`p-4 rounded-2xl border flex items-start gap-3 animate-fadeIn ${
              triviaFeedback.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <Award className="w-6 h-6 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-sm sm:text-base">{triviaFeedback.text}</p>
                <button
                  onClick={nextTrivia}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Photo Memories */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-video max-h-72 bg-slate-100 shadow-md">
            <img
              src={PHOTO_MEMORIES[photoIndex].url}
              alt={PHOTO_MEMORIES[photoIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                {PHOTO_MEMORIES[photoIndex].date}
              </span>
              <h4 className="text-lg sm:text-xl font-bold">
                {PHOTO_MEMORIES[photoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {PHOTO_MEMORIES[photoIndex].caption}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setPhotoIndex((prev) => (prev - 1 + PHOTO_MEMORIES.length) % PHOTO_MEMORIES.length)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              ← Previous Photo
            </button>
            <span className="text-xs font-bold text-slate-500">
              {photoIndex + 1} of {PHOTO_MEMORIES.length}
            </span>
            <button
              onClick={() => setPhotoIndex((prev) => (prev + 1) % PHOTO_MEMORIES.length)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Next Photo →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
