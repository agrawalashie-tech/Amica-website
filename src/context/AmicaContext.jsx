import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AmicaContext = createContext();

const INITIAL_MEDICATIONS = [
  { id: 'med-1', name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', purpose: 'Blood Pressure', taken: true, takenAt: '8:12 AM', color: 'teal' },
  { id: 'med-2', name: 'Metformin', dosage: '500mg', time: '1:00 PM', purpose: 'Blood Sugar', taken: false, takenAt: null, color: 'blue' },
  { id: 'med-3', name: 'Multivitamin & Calcium', dosage: '1 tablet', time: '7:00 PM', purpose: 'Bone Health', taken: false, takenAt: null, color: 'amber' }
];

const INITIAL_APPOINTMENTS = [
  { id: 'apt-1', title: 'Dr. Robert Hayes (Cardiology)', date: 'Tomorrow, Oct 14', time: '10:30 AM', location: 'St. Jude Medical Pavilion, Suite 402', notes: 'Bring recent blood pressure logs' },
  { id: 'apt-2', title: 'Physical Therapy with Brenda', date: 'Thursday, Oct 16', time: '2:00 PM', location: 'Evergreen Wellness Center', notes: 'Wear comfortable walking sneakers' }
];

const INITIAL_ALERTS = [
  { id: 'alt-1', type: 'info', message: 'Morning check-in completed on time. Mood rated as Joyful.', timestamp: '8:45 AM Today', read: true },
  { id: 'alt-2', type: 'warning', message: 'Hydration goal was 2 glasses below target yesterday.', timestamp: '6:30 PM Yesterday', read: false },
  { id: 'alt-3', type: 'success', message: 'Morning Lisinopril medication confirmed taken.', timestamp: '8:12 AM Today', read: true }
];

const INITIAL_LOVE_NOTES = [
  { id: 'note-1', from: 'Sarah (Daughter)', text: 'Good morning Mom! Looking forward to having lunch with you on Sunday. Have a lovely sunny day!', photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80', timestamp: '7:30 AM' }
];

export function AmicaProvider({ children }) {
  // Navigation / Active View: 'marketing' | 'elderly' | 'caregiver' | 'provider'
  const [currentView, setCurrentView] = useState('marketing');
  
  // Accessibility settings for Senior Portal
  const [seniorFontSize, setSeniorFontSize] = useState('large'); // 'normal', 'large', 'huge'
  const [highContrast, setHighContrast] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('Nora'); // 'Nora' or 'Oliver'
  
  // Data state
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('amica_medications');
    return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
  });
  
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('amica_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });
  
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem('amica_water');
    return saved ? Number(saved) : 4;
  });
  
  const [todayMood, setTodayMood] = useState(() => {
    const saved = localStorage.getItem('amica_mood');
    return saved ? JSON.parse(saved) : { mood: 'Great', note: 'Slept well, looking out at the autumn leaves.', checkedIn: true, time: '8:45 AM' };
  });

  const [vitals, setVitals] = useState({
    bloodPressureSys: 122,
    bloodPressureDia: 78,
    bloodSugar: 104,
    hoursSlept: 7.5,
    painLevel: 2,
    lastLogged: 'Today, 8:40 AM'
  });
  
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('amica_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [loveNotes, setLoveNotes] = useState(() => {
    const saved = localStorage.getItem('amica_notes');
    return saved ? JSON.parse(saved) : INITIAL_LOVE_NOTES;
  });

  // Active Modals
  const [isSosActive, setIsSosActive] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('amica_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('amica_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('amica_water', waterGlasses.toString());
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem('amica_mood', JSON.stringify(todayMood));
  }, [todayMood]);

  // Actions
  const toggleMedication = (id) => {
    const medToUpdate = medications.find(m => m.id === id);
    if (!medToUpdate) return;
    const nextState = !medToUpdate.taken;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (nextState) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 }
      });
      addAlert('success', `Eleanor confirmed taking ${medToUpdate.name} (${medToUpdate.dosage}).`);
      speakText(`Wonderful job Eleanor! I've marked your ${medToUpdate.name} as taken.`);
    }

    setMedications(prev => prev.map(med => {
      if (med.id === id) {
        return {
          ...med,
          taken: nextState,
          takenAt: nextState ? currentTime : null
        };
      }
      return med;
    }));
  };

  const addMedication = (newMed) => {
    const med = {
      id: `med-${Date.now()}`,
      name: newMed.name,
      dosage: newMed.dosage,
      time: newMed.time,
      purpose: newMed.purpose || 'Health Maintenance',
      taken: false,
      takenAt: null,
      color: newMed.color || 'teal'
    };
    setMedications(prev => [...prev, med]);
    addAlert('info', `Caregiver added new scheduled medication: ${med.name} at ${med.time}.`);
  };

  const addAppointment = (newApt) => {
    const apt = {
      id: `apt-${Date.now()}`,
      title: newApt.title,
      date: newApt.date,
      time: newApt.time,
      location: newApt.location,
      notes: newApt.notes || ''
    };
    setAppointments(prev => [...prev, apt]);
  };

  const logWater = () => {
    const next = Math.min(waterGlasses + 1, 8);
    setWaterGlasses(next);
    speakText(`Great hydration! Glass number ${next} logged.`);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
  };

  const addAlert = (type, message) => {
    const newAlert = {
      id: `alt-${Date.now()}`,
      type, // 'emergency' | 'warning' | 'info' | 'success'
      message,
      timestamp: 'Just now',
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const triggerEmergencySos = (reason = 'SOS Emergency Button Activated by Senior') => {
    setIsSosActive(true);
    addAlert('emergency', `URGENT: ${reason}. Immediate caregiver response requested.`);
  };

  const submitCheckIn = (mood, note) => {
    const checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTodayMood({
      mood,
      note,
      checkedIn: true,
      time: checkInTime
    });
    addAlert('info', `Morning Check-in completed. Eleanor feels "${mood}". Note: ${note || 'None'}`);
    setIsCheckInOpen(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    speakText(`Thank you for checking in with me, Eleanor! You are doing great today.`);
  };

  const logVitals = (data) => {
    setVitals({
      ...data,
      lastLogged: 'Just now'
    });
    addAlert('info', `Self-reported vitals updated: BP ${data.bloodPressureSys}/${data.bloodPressureDia}, Sugar ${data.bloodSugar}.`);
  };

  const addLoveNote = (from, text, photo) => {
    const note = {
      id: `note-${Date.now()}`,
      from,
      text,
      photo: photo || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
      timestamp: 'Just now'
    };
    setLoveNotes(prev => [note, ...prev]);
    addAlert('info', `New love note sent to Eleanor by ${from}.`);
  };

  // Text to Speech
  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Zira') || v.name.includes('Female')));
    if (friendlyVoice) {
      utterance.voice = friendlyVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AmicaContext.Provider
      value={{
        currentView,
        setCurrentView,
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
        addMedication,
        appointments,
        setAppointments,
        addAppointment,
        waterGlasses,
        logWater,
        todayMood,
        submitCheckIn,
        vitals,
        logVitals,
        alerts,
        addAlert,
        loveNotes,
        addLoveNote,
        isSosActive,
        setIsSosActive,
        isVideoCallActive,
        setIsVideoCallActive,
        isCheckInOpen,
        setIsCheckInOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        triggerEmergencySos,
        speakText
      }}
    >
      {children}
    </AmicaContext.Provider>
  );
}

export function useAmica() {
  const context = useContext(AmicaContext);
  if (!context) {
    throw new Error('useAmica must be used within an AmicaProvider');
  }
  return context;
}
