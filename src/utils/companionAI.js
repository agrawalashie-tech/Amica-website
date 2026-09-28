// AI Companion logic with warm empathy, health context, and safety keyword analysis

export const SAFETY_KEYWORDS = [
  { word: 'fell', severity: 'emergency', reply: "Oh goodness, Eleanor! Are you hurt right now? Please stay still. I am alerting Sarah immediately." },
  { word: 'fall', severity: 'emergency', reply: "Eleanor, did you take a fall? Please don't try to get up if you feel pain. I am notifying Sarah right this second." },
  { word: 'dizzy', severity: 'warning', reply: "I hear that you're feeling dizzy. Please sit down in your comfortable chair and take slow, deep breaths. I will let Sarah know so she can check on you." },
  { word: 'chest', severity: 'emergency', reply: "Chest discomfort is something we must take very seriously. Eleanor, please sit comfortably. Would you like me to connect you to emergency services right now?" },
  { word: 'pain', severity: 'warning', reply: "I am sorry you are in pain today. Where is it hurting? Let's make sure you rest comfortably, and I have made a note for your caregiver dashboard." },
  { word: 'lonely', severity: 'info', reply: "I am right here with you, my dear friend. You are never alone. Sarah also sent you a lovely note this morning. Would you like to read it or listen to some soothing music?" },
  { word: 'confused', severity: 'warning', reply: "Take a gentle breath, Eleanor. Today is Monday, and you are safe at home. Everything is peaceful." }
];

export const CONVERSATION_STARTERS = [
  "How did your morning tea or coffee taste today?",
  "Would you like to hear today's gentle trivia question?",
  "Did you know the sun is shining outside? How is the weather through your window?",
  "Would you like me to play some peaceful classical music for you?",
  "Have you had a fresh glass of water recently?"
];

export function getCompanionResponse(userInput, seniorName = "Eleanor", avatarName = "Nora") {
  const cleanInput = userInput.trim().toLowerCase();

  // 1. Safety & distress checks
  for (const item of SAFETY_KEYWORDS) {
    if (cleanInput.includes(item.word)) {
      return {
        reply: item.reply,
        safetyFlag: item.severity,
        triggerAlert: true,
        alertText: `Distress keyword detected ("${item.word}") in senior conversation: "${userInput}"`
      };
    }
  }

  // 2. Medication queries
  if (cleanInput.includes('medication') || cleanInput.includes('pill') || cleanInput.includes('medicine')) {
    return {
      reply: `You took your morning Lisinopril at 8:12 AM! Your next medication is Metformin at 1:00 PM with lunch. You are right on track, ${seniorName}.`,
      safetyFlag: null
    };
  }

  // 3. Appointment queries
  if (cleanInput.includes('doctor') || cleanInput.includes('appointment') || cleanInput.includes('calendar')) {
    return {
      reply: `You have an appointment with Dr. Robert Hayes tomorrow at 10:30 AM for your cardiology checkup. Sarah is driving you there!`,
      safetyFlag: null
    };
  }

  // 4. Hydration queries
  if (cleanInput.includes('water') || cleanInput.includes('drink') || cleanInput.includes('thirst')) {
    return {
      reply: `You've logged 4 glasses of water today, ${seniorName}! Just 2 more glasses to hit your healthy goal of 6. Would you like a sip of water now?`,
      safetyFlag: null
    };
  }

  // 5. Family queries
  if (cleanInput.includes('sarah') || cleanInput.includes('daughter') || cleanInput.includes('family')) {
    return {
      reply: `Sarah sent you a beautiful photo and note this morning saying she can't wait for Sunday dinner! Would you like to place a 1-click video call to her?`,
      safetyFlag: null
    };
  }

  // 6. Good morning / greeting
  if (cleanInput.includes('good morning') || cleanInput.includes('hello') || cleanInput.includes('hi') || cleanInput.includes('nora') || cleanInput.includes('oliver')) {
    return {
      reply: `Good day, ${seniorName}! It is so wonderful to hear your voice. I'm right here beside you. How are you feeling in your body and mind right now?`,
      safetyFlag: null
    };
  }

  // 7. General friendly responses
  const generalReplies = [
    `That is so lovely to hear, ${seniorName}. Thank you for sharing that with me. It warms my heart to chat with you today!`,
    `I'm listening closely, ${seniorName}. It sounds like today has a nice rhythm to it. Remember to take gentle moments to stretch and relax.`,
    `You always have such wonderful wisdom, ${seniorName}. I'm recording a note in your daily journal so you and Sarah can look back on this happy thought.`
  ];

  const randomReply = generalReplies[Math.floor(Math.random() * generalReplies.length)];
  return {
    reply: randomReply,
    safetyFlag: null
  };
}
