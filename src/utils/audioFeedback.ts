/**
 * Tactile Web Audio UI feedback synthesizer
 * Provides subtle, non-intrusive 'click', 'ping', and 'pop' feedback
 * when users click navigation links, interact with project cards, or toggle controls.
 */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/** Check if global audio is enabled */
export function isAudioEnabled(): boolean {
  try {
    const saved = localStorage.getItem('arcade-audio-enabled');
    return saved !== null ? saved === 'true' : true;
  } catch {
    return true;
  }
}

let lastClickTimestamp = 0;

/**
 * Subtle tactile mechanical click (tap / switch)
 * Crisp, low-latency, warm transient (~30ms)
 */
export function playUiClick(volume = 0.12) {
  if (!isAudioEnabled()) return;
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (nowMs - lastClickTimestamp < 35) return; // Prevent double-triggering
  lastClickTimestamp = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Dual sweep: fast transient drop from 1400Hz to 380Hz for crisp physical button feel
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.028);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(1.4, now);

    // Fast exponential decay
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/**
 * Card Pull Up Sound
 * Simulates a realistic mechanical lanyard tension recoil,
 * upward cord slide whoosh, and satisfying badge latch snap!
 */
export function playCardPullUpSound(volume = 0.16) {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Component 1: Upward Cord Recoil Whoosh (220Hz gliding rapidly up to 720Hz)
    const cordOsc = ctx.createOscillator();
    const cordGain = ctx.createGain();
    const cordFilter = ctx.createBiquadFilter();

    cordOsc.type = 'triangle';
    cordOsc.frequency.setValueAtTime(240, now);
    cordOsc.frequency.exponentialRampToValueAtTime(680, now + 0.09);

    cordFilter.type = 'lowpass';
    cordFilter.frequency.setValueAtTime(800, now);
    cordFilter.frequency.linearRampToValueAtTime(1600, now + 0.09);

    cordGain.gain.setValueAtTime(volume * 0.7, now);
    cordGain.gain.linearRampToValueAtTime(volume * 0.9, now + 0.05);
    cordGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    cordOsc.connect(cordFilter);
    cordFilter.connect(cordGain);
    cordGain.connect(ctx.destination);

    cordOsc.start(now);
    cordOsc.stop(now + 0.12);

    // Component 2: Crisp Mechanical Latch Snap / Clip Click (arriving as card clicks into locked top position)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    const snapFilter = ctx.createBiquadFilter();

    const snapStart = now + 0.065;
    snapOsc.type = 'sine';
    snapOsc.frequency.setValueAtTime(1450, snapStart);
    snapOsc.frequency.exponentialRampToValueAtTime(420, snapStart + 0.045);

    snapFilter.type = 'bandpass';
    snapFilter.frequency.setValueAtTime(1200, snapStart);
    snapFilter.Q.setValueAtTime(2.2, snapStart);

    snapGain.gain.setValueAtTime(volume * 1.1, snapStart);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, snapStart + 0.05);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapOsc.start(snapStart);
    snapOsc.stop(snapStart + 0.055);
  } catch {
    // Graceful fallback
  }
}

/**
 * Card Pull Down Sound
 * Elastic lanyard cord stretch & downward tension slide
 */
export function playCardPullDownSound(volume = 0.14) {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Downward elastic slide from 540Hz down to 220Hz
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(210, now + 0.11);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);

    gain.gain.setValueAtTime(volume * 0.85, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Graceful fallback
  }
}

/**
 * Subtle crystal ping (bell / chime feedback)
 * Clean high-resonance sine wave (~80ms)
 */
export function playUiPing(freq = 1980, volume = 0.045) {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 0.08);

    // Clean exponential decay envelope
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.095);
  } catch {
    // Graceful fallback
  }
}

/**
 * Subtle soft pop (pill / filter tab feedback)
 */
export function playUiPop(volume = 0.04) {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.035);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // Graceful fallback
  }
}
