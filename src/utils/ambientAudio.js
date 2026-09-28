// Lightweight Web Audio API synthesizers for comforting sounds (gentle stream, piano chime, lullaby)
let audioCtx = null;
let currentOscillators = [];
let noiseNode = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopAmbientSound() {
  currentOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // ignore
    }
  });
  currentOscillators = [];
  if (noiseNode) {
    try {
      noiseNode.stop();
      noiseNode.disconnect();
    } catch {
      // ignore
    }
    noiseNode = null;
  }
  isPlaying = false;
}

// Gentle Harmonic Chimes
export function playChimes() {
  stopAmbientSound();
  const ctx = getAudioContext();
  const chords = [261.63, 329.63, 392.00, 523.25]; // C major chord frequencies
  
  chords.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), ctx.currentTime + 1 + idx * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4 + idx * 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime + idx * 0.3);
    osc.stop(ctx.currentTime + 5 + idx * 0.5);
    currentOscillators.push(osc);
  });
  isPlaying = true;
}

// Gentle Babbling Brook / Pink Noise Stream
export function playNatureStream() {
  stopAmbientSound();
  const ctx = getAudioContext();
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.04;
    b6 = white * 0.115926;
  }
  
  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;
  whiteNoise.loop = true;

  // Gentle low-pass filter to sound like soft water stream
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, ctx.currentTime);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
  noiseNode = whiteNoise;
  isPlaying = true;
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    // AudioContext permission guard
  }
}
