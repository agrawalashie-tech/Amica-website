# Amica — Warm AI Companion & Peace of Mind for Families

**Amica** is an empathetic AI companion and light health-monitoring platform designed for aging adults living independently and the families who love them. It pairs warm, voice-interactive conversational care with intelligent safety escalation and real-time caregiver reassurance.

---

## 🌟 Key Personas & Experiences

### 1. 👵🏼 Older Adult Experience ("Senior Portal")
- **Extreme Accessibility**: One-touch text sizing (`Normal`, `Large`, `Huge` up to 2.75rem) and High-Contrast mode for visual comfort.
- **Voice-First Avatar Companion**: Switchable between **Nora** (empathetic nurse persona) and **Oliver** (gentle companion). Supports browser **Speech-to-Text** (talk naturally with your microphone) and **Text-to-Speech** audio playback.
- **Daily Morning Check-In**: Big emoji-based mood and comfort logging.
- **Tactile Medication Reminders**: High-contrast pill cards with large "I Took It" confirmation buttons, audible celebratory chimes, and confetti.
- **Hydration Tracker**: Interactive 6-glass water counter.
- **1-Click Video Visit**: Instantly calls daughter Sarah or Dr. Robert Hayes with zero login friction.
- **Emergency SOS with 10-Second Guard**: Loud countdown to cancel accidental presses before alerting emergency contacts.
- **Companionship Hub**:
  - 🎵 **Web Audio Synthesizer**: Calming babbling brook stream & harmonic wind chimes.
  - 🧠 **Golden Era Trivia**: Uplifting nostalgic multiple-choice questions.
  - 📸 **Family Photo Memories**: Slideshow of cherished family moments.

### 2. 🛡️ Family Caregiver Dashboard
- **Live Status & Telemetry**: Instant view of Eleanor's active status, tablet connectivity, and last check-in timestamp.
- **Prescription & Schedule Manager**: Remote scheduling tool allows caregivers to add or adjust medication times from anywhere, instantly updating the senior's tablet.
- **Safety & Anomaly Center**: Proactive alerts for missed check-ins, hydration warnings, and distress keyword detections (`fell`, `dizzy`, `chest pain`, etc.).
- **Longitudinal Biometric & Mood Analytics**: 7-day mood scores, blood pressure, fasting glucose, sleep duration, and one-click clinical report export.
- **Caregiver Love Notes**: Send encouraging photos and warm messages that pop up directly on Eleanor's screen.

### 3. 🩺 Clinical Care Provider Portal (Phase 2 Preview)
- **Resident Cohort Telemetry**: Aggregated health monitoring across 48 residents.
- **Risk Stratification Triage**: High Risk, Moderate Attention, and Stable categorization.
- **EHR Integration Hooks**: Fast export to Epic/Cerner electronic health records.

---

## 🚀 Getting Started

The project is built using **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide React**.

### Install Dependencies:
```bash
npm install
```

### Start Development Server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build Production Bundle:
```bash
npm run build
```

---

## 🧭 Navigation & Portal Switching

Use the top navigation bar to seamlessly toggle between all three core portals:
- **Landing Page**: Full public sitemap (Hero, How It Works, Features, Live Avatar Sandbox, Pricing, Testimonials, About Team, Demo Request).
- **Senior Portal**: Tap the amber **"Senior Portal"** button.
- **Caregiver Dashboard**: Tap the teal **"Caregiver"** button (includes unread alert counter).
- **Clinical Portal**: Tap the indigo **"Clinical"** button for the multi-resident cohort view.
