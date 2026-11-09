/**
 * Luxury Audio & Ambient Soundscape Manager
 * Features:
 * - HTML5 Audio playback for custom MP3s
 * - Built-in Web Audio API generative ambient piano synthesizer (100% reliable fallback)
 * - Tactile luxury sound effects (Gift Unboxing celestial chime, Polaroid shutter, Envelope unfold, Champagne toast chime)
 * - Smart audio ducking / pausing when the personal cinematic video plays
 */

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.bgAudio = null;
    this.synthInterval = null;
    this.gainNode = null;
    this.listeners = new Set();
    this.wasPlayingBeforeVideo = false;
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        this.gainNode.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb({ isPlaying: this.isPlaying, isMuted: this.isMuted }));
  }

  startMusic(url) {
    this.initAudioContext();
    this.isPlaying = true;

    // Try HTML5 audio first if url is provided
    if (url) {
      if (!this.bgAudio) {
        this.bgAudio = new Audio(url);
        this.bgAudio.loop = true;
        this.bgAudio.volume = 0.45;
      }
      this.bgAudio.play().catch((err) => {
        console.warn("HTML5 audio playback restricted, falling back to Web Audio Ambient Synthesizer", err);
        this.startAmbientSynth();
      });
    } else {
      this.startAmbientSynth();
    }

    this.notify();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientSynth();
    this.notify();
  }

  togglePlay(url) {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic(url);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.3, this.audioCtx.currentTime);
    }
    this.notify();
  }

  // Coordination when video plays
  pauseForVideo() {
    if (this.isPlaying) {
      this.wasPlayingBeforeVideo = true;
      this.stopMusic();
    }
  }

  resumeAfterVideo(url) {
    if (this.wasPlayingBeforeVideo) {
      this.wasPlayingBeforeVideo = false;
      this.startMusic(url);
    }
  }

  // Generative Warm Ambient Pad & Velvet Chords using Web Audio API
  startAmbientSynth() {
    if (this.synthInterval) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const chordFrequencies = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [164.81, 196.00, 246.94, 293.66], // Em7
      [146.83, 174.61, 220.00, 261.63], // Dm7
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || this.isMuted || !this.audioCtx) return;
      const freqs = chordFrequencies[chordIndex % chordFrequencies.length];
      chordIndex++;

      freqs.forEach((freq, idx) => {
        try {
          const osc = this.audioCtx.createOscillator();
          const noteGain = this.audioCtx.createGain();
          const filter = this.audioCtx.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600 + idx * 100, this.audioCtx.currentTime);

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

          const now = this.audioCtx.currentTime;
          const duration = 5.5;
          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 1.2 + idx * 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.gainNode);

          osc.start(now + idx * 0.15);
          osc.stop(now + duration + 0.5);
        } catch (e) {
          // ignore oscillator errors
        }
      });
    };

    playChord();
    this.synthInterval = setInterval(playChord, 5200);
  }

  stopAmbientSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // --- Sound Effects ---

  playGiftOpenSound() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime + i * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + 1.5);
    });
  }

  playShutterSound() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playPaperSound() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const bufferSize = this.audioCtx.sampleRate * 0.15;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    noise.start();
  }

  playToastSound() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    [2489, 2960].forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.02);

      gain.gain.setValueAtTime(0.15, now + idx * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now + idx * 0.02);
      osc.stop(now + 2.3);
    });
  }
}

export const audioManager = new AudioManager();
