// Web Audio API Synthesizer for rich, beautiful, and subtle ambient soundscapes and interactions
// This engine is completely self-contained and uses zero external audio files.

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeStopId: number | null = null;
  private isPlayingAmbient: boolean = false;
  private isMuted: boolean = false;
  private ambientIntervalId: any = null;

  // Active ambient synthesis nodes for smooth running loops
  private bgNodes: {
    noiseSource?: AudioBufferSourceNode;
    noiseFilter?: BiquadFilterNode;
    noiseGain?: GainNode;
    oscList?: (OscillatorNode | GainNode)[];
    lfo?: OscillatorNode;
  } = {};

  constructor() {
    // Lazy initialize to bypass browser autoplay blocks
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn("Failed to initialize Web Audio Context:", e);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public getPlayingState(): boolean {
    return this.isPlayingAmbient;
  }

  // Create a reusable Pink Noise buffer (sounds much warmer and softer than white noise)
  private createPinkNoiseBuffer(duration: number = 3): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink noise approximation filter values
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      data[i] = pink * 0.11; // Normalize
    }
    return buffer;
  }

  // Start continuous, beautiful ambient soundscape for a specific stop
  public startAmbient(stopId: number) {
    this.initContext();
    if (!this.ctx) return;

    // Resume context if suspended (browser security restriction)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Stop current stop's ambient loop first
    this.stopAmbient();

    this.activeStopId = stopId;
    this.isPlayingAmbient = true;

    try {
      if (stopId === 1) {
        // Meadow: Soft wind + Singing birds
        this.setupWindAmbient(350, 800, 0.05, 0.03);
        this.startBirdChirpLoop();
      } 
      else if (stopId === 2) {
        // Bridge: Gentle river running + leaves rustling
        this.setupRiverRunningAmbient(0.08);
      } 
      else if (stopId === 3) {
        // Forest of Doubt: Melancholic rain falling + soft distant thunder
        this.setupRainAmbient(0.08);
      } 
      else if (stopId === 4) {
        // Travelers: Warm field breeze + wind chimes
        this.setupWindAmbient(300, 750, 0.05, 0.03);
        this.startDistantWindChimeLoop();
      } 
      else if (stopId === 5) {
        // Heartbeat of Hope: Continuous slow rhythmic heartbeats + deep peace pad
        this.startHeartbeatLoop();
      } 
      else if (stopId === 6) {
        // Glowing Tree: Mystical shimmering fairy chime + warm sacred hum
        this.setupCapillaAmbient(); // Rich golden hum
        this.startFairyShimmerLoop();
      }
      else if (stopId === 7) {
        // Mountain Summit: Majestic mountain peak breeze + soft angelic choir pad
        this.setupWindAmbient(200, 1100, 0.04, 0.04, 0.09);
        this.setupChoirPadAmbient();
      }
    } catch (err) {
      console.warn("Error starting synthesized ambient sound:", err);
    }
  }

  public stopAmbient() {
    // Clear scheduled intervals
    if (this.ambientIntervalId) {
      clearInterval(this.ambientIntervalId);
      this.ambientIntervalId = null;
    }

    // Clean up active noise sources
    try {
      if (this.bgNodes.noiseSource) {
        this.bgNodes.noiseSource.stop();
        this.bgNodes.noiseSource.disconnect();
      }
      if (this.bgNodes.noiseFilter) {
        this.bgNodes.noiseFilter.disconnect();
      }
      if (this.bgNodes.noiseGain) {
        this.bgNodes.noiseGain.disconnect();
      }
      if (this.bgNodes.lfo) {
        this.bgNodes.lfo.stop();
        this.bgNodes.lfo.disconnect();
      }
      if (this.bgNodes.oscList) {
        this.bgNodes.oscList.forEach(node => {
          try {
            (node as any).stop?.();
            node.disconnect();
          } catch(e) {}
        });
      }
    } catch(e) {
      // already stopped/disconnected
    }

    this.bgNodes = {};
    this.isPlayingAmbient = false;
  }

  // --- BIRD CHIRP SYNTHESIZER ---
  private startBirdChirpLoop() {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);
    this.ambientIntervalId = setInterval(() => {
      if (Math.random() > 0.4) {
        this.triggerBirdChirp();
      }
    }, 2000);
  }

  private triggerBirdChirp() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const count = 2 + Math.floor(Math.random() * 3);
      const baseFreq = 2000 + Math.random() * 800;
      for (let i = 0; i < count; i++) {
        const time = now + i * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, time);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 700, time + 0.08);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.015, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.10);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.12);
      }
    } catch (e) {}
  }

  // --- RIVER BUBBLING GENERATOR ---
  private setupRiverRunningAmbient(maxVolume: number = 0.08) {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createPinkNoiseBuffer(4);
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(6.0, this.ctx.currentTime); // 6 Hz bubbling
    lfo.type = 'sine';

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(maxVolume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noiseSource.start();
    lfo.start();

    this.bgNodes.noiseSource = noiseSource;
    this.bgNodes.noiseFilter = filter;
    this.bgNodes.noiseGain = gainNode;
    this.bgNodes.lfo = lfo;
  }

  // --- RAIN DROPLET & THUNDER GENERATOR ---
  private setupRainAmbient(maxVolume: number = 0.08) {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createPinkNoiseBuffer(4);
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(maxVolume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noiseSource.start();

    this.bgNodes.noiseSource = noiseSource;
    this.bgNodes.noiseFilter = filter;
    this.bgNodes.noiseGain = gainNode;

    this.ambientIntervalId = setInterval(() => {
      if (Math.random() > 0.7) {
        this.triggerThunderRumble();
      }
    }, 4500);
  }

  private triggerThunderRumble() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(25 + Math.random() * 15, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 2.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(70, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.9);
    } catch (e) {}
  }

  // --- CONTINUOUS HEARTBEAT LOOP ---
  public startHeartbeatLoop() {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);
    
    // Play warm peaceful low pad
    this.setupCapillaAmbient(); 
    if (this.bgNodes.noiseGain) {
      this.bgNodes.noiseGain.gain.setValueAtTime(0.003, this.ctx!.currentTime);
    }

    this.ambientIntervalId = setInterval(() => {
      this.triggerHeartbeatDouble();
    }, 1300);
  }

  public triggerHeartbeatDouble() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      this.triggerSingleBeat(now, 0.08);
      this.triggerSingleBeat(now + 0.16, 0.09);
    } catch(e) {}
  }

  private triggerSingleBeat(time: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(50, time);
    osc.frequency.exponentialRampToValueAtTime(15, time + 0.18);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(90, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  // --- FAIRY SHIMMER CHIME ---
  private startFairyShimmerLoop() {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);
    this.ambientIntervalId = setInterval(() => {
      if (Math.random() > 0.35) {
        this.triggerFairyChime();
      }
    }, 1500);
  }

  private triggerFairyChime() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const notes = [880, 987.77, 1174.66, 1318.51, 1567.98];
      const f = notes[Math.floor(Math.random() * notes.length)];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.012, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    } catch(e) {}
  }

  // --- CHOIR PAD GENERATOR ---
  private setupChoirPadAmbient() {
    if (!this.ctx || !this.masterGain) return;
    const frequencies = [130.81, 196.00, 261.63, 329.63, 392.00, 493.88];
    const oscs: (OscillatorNode | GainNode)[] = [];

    frequencies.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.04 + i * 0.01, this.ctx!.currentTime);
      lfoGain.gain.setValueAtTime(0.004, this.ctx!.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.006, this.ctx!.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      lfo.start();

      oscs.push(osc);
      oscs.push(lfo);
      oscs.push(gain);
    });

    this.bgNodes.oscList = oscs;
  }

  // --- SUBTLE WIND GENERATOR ---
  private setupWindAmbient(
    baseFreq: number, 
    maxFreq: number, 
    baseGain: number, 
    varGain: number, 
    lfoSpeed: number = 0.07
  ) {
    if (!this.ctx || !this.masterGain) return;

    const noiseBuffer = this.createPinkNoiseBuffer(4);
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime); // resonant whistle
    filter.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(baseGain, this.ctx.currentTime);

    // LFO to sweep wind filter frequency (creates realistic whistling)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(lfoSpeed, this.ctx.currentTime); // very slow sweep
    lfo.type = 'sine';

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime((maxFreq - baseFreq) / 2, this.ctx.currentTime);

    // LFO modulates the filter's cutoff frequency
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Connect audio graph
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Start everything
    noiseSource.start();
    lfo.start();

    // Store references
    this.bgNodes.noiseSource = noiseSource;
    this.bgNodes.noiseFilter = filter;
    this.bgNodes.noiseGain = gainNode;
    this.bgNodes.lfo = lfo;
  }

  // --- SUBTLE OCEAN WAVE SYNTHESIZER ---
  private setupOceanWaveAmbient(maxVolume: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const noiseBuffer = this.createPinkNoiseBuffer(5);
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);

    // Slow LFO simulating waves rolling in and out (approx. 7-second wave period)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.14, this.ctx.currentTime); // ~7 seconds
    lfo.type = 'sine';

    // Map LFO to swell volume and open filter slightly
    const lfoGainVol = this.ctx.createGain();
    lfoGainVol.gain.setValueAtTime(maxVolume / 2, this.ctx.currentTime);
    
    const biasGainVol = this.ctx.createGain();
    biasGainVol.gain.setValueAtTime(maxVolume / 2 + 0.01, this.ctx.currentTime);

    lfo.connect(lfoGainVol);
    lfoGainVol.connect(gainNode.gain); // Modulates volume

    // Slightly open filter as volume swells for "crashing spray" effect
    const lfoGainFilter = this.ctx.createGain();
    lfoGainFilter.gain.setValueAtTime(150, this.ctx.currentTime);
    lfo.connect(lfoGainFilter);
    lfoGainFilter.connect(filter.frequency);

    // Connect graph
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noiseSource.start();
    lfo.start();

    this.bgNodes.noiseSource = noiseSource;
    this.bgNodes.noiseFilter = filter;
    this.bgNodes.noiseGain = gainNode;
    this.bgNodes.lfo = lfo;
  }

  // --- SUBTLE CAPILLA ATMOSPHERE (Sacred Reverb Hum) ---
  private setupCapillaAmbient() {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    // Sacred organ fifth hum
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2
    gain1.gain.setValueAtTime(0.04, this.ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(165, this.ctx.currentTime); // E3 (perfect fifth)
    gain2.gain.setValueAtTime(0.02, this.ctx.currentTime);

    // Soft highpass filter on white noise to simulate soft candle sizzling/cavern air
    const noiseBuffer = this.createPinkNoiseBuffer(3);
    let noiseSource: AudioBufferSourceNode | undefined = undefined;
    if (noiseBuffer) {
      noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.5, this.ctx.currentTime);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, this.ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noiseSource.start();

      this.bgNodes.noiseSource = noiseSource;
      this.bgNodes.noiseFilter = noiseFilter;
      this.bgNodes.noiseGain = noiseGain;
    }

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);

    osc1.start();
    osc2.start();

    this.bgNodes.oscList = [osc1, osc2, gain1, gain2];
  }

  // --- REPEATED LOOPS & TRIGGERS ---
  private startFireCrackleLoop(volume: number) {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);
    
    this.ambientIntervalId = setInterval(() => {
      if (Math.random() > 0.45) {
        this.triggerSingleCrackle(volume);
      }
    }, 250);
  }

  private triggerSingleCrackle(volume: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const crackleOsc = this.ctx.createOscillator();
      const crackleGain = this.ctx.createGain();
      crackleOsc.type = 'triangle';
      crackleOsc.frequency.setValueAtTime(1500 + Math.random() * 2000, this.ctx.currentTime);
      
      crackleGain.gain.setValueAtTime(volume * (0.3 + Math.random() * 0.7), this.ctx.currentTime);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.015);

      crackleOsc.connect(crackleGain);
      crackleGain.connect(this.masterGain);
      crackleOsc.start();
      crackleOsc.stop(this.ctx.currentTime + 0.02);
    } catch(e) {}
  }

  private startJungleAmbientLoop() {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);

    this.ambientIntervalId = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.85) {
        // Trigger high-pitched cricket chirp
        this.triggerCricketChirp();
      } else if (rand > 0.7) {
        // Trigger a rainforest water droplet sound
        this.triggerWaterDrop();
      }
    }, 1200);
  }

  private triggerCricketChirp() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const chirpFreq = 2200 + Math.random() * 400;
      
      // Cricket chirping has multiple pulses
      for (let i = 0; i < 4; i++) {
        const time = now + i * 0.04;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(chirpFreq, time);
        
        gain.gain.setValueAtTime(0.0, time);
        gain.gain.linearRampToValueAtTime(0.02, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(time);
        osc.stop(time + 0.04);
      }
    } catch(e) {}
  }

  private triggerWaterDrop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80 + Math.random() * 60, this.ctx.currentTime);
      // Fast exponential frequency rise for the droplet "plop" effect
      osc.frequency.exponentialRampToValueAtTime(350 + Math.random() * 150, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch(e) {}
  }

  private startDistantWindChimeLoop() {
    if (this.ambientIntervalId) clearInterval(this.ambientIntervalId);

    this.ambientIntervalId = setInterval(() => {
      if (Math.random() > 0.8) {
        this.triggerWindChimeSingle();
      }
    }, 2000);
  }

  private triggerWindChimeSingle() {
    if (!this.ctx || !this.masterGain) return;
    try {
      // Overlapping high harmonic beautiful frequencies
      const frequencies = [880, 1100, 1320, 1650, 1980];
      const selectedFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(selectedFreq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);
    } catch(e) {}
  }

  // --- INTERACTIVE CLICK-TRIGGERED AMBIENT SOUNDS ---
  // Plays tactile, immersive soundscape cues when the traveler clicks interactive parts of the page!
  public triggerInteractiveSound(stopId: number, actionType: string) {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;

      if (stopId === 1) {
        // Cabaña wood logs / options -> Cozy fire crackle burst + warm wind draft
        this.playCozyWoodBurnEffect();
      } 
      else if (stopId === 2) {
        // Ocean waves / sequence ordering -> Soft, lush wave crash & splash
        this.playWaterSplashEffect();
      } 
      else if (stopId === 3) {
        // Xilitla structures / stairs -> Whimsical, surreal dreamy bells (surrealism)
        this.playSurrealDreamBell();
      } 
      else if (stopId === 4) {
        // Village table / bread & coffee selection -> Warm acoustic ceramic cup "clink" + bread warmth
        this.playCozyTableClink();
      } 
      else if (stopId === 5) {
        // Mountain hiking trail steps -> Heavy alpine mountain breeze whistle + golden rise chime
        this.playMountainStepChime();
      } 
      else if (stopId === 6) {
        // Candle shielding / shield click -> Mystical candle flame pop + comforting temple bell reverberation
        this.playComfortTempleBell();
      } 
      else if (stopId === 7) {
        // Lighthouse rotating / lighthouse click -> Distant warm lighthouse foghorn + sea spray swell
        this.playLighthouseFoghorn();
      }
    } catch (e) {
      console.warn("Could not play click interaction ambient:", e);
    }
  }

  private playCozyWoodBurnEffect() {
    if (!this.ctx || !this.masterGain) return;
    // Cracking dry logs sound
    for (let i = 0; i < 5; i++) {
      const delay = i * 0.03 + Math.random() * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 + Math.random() * 1500, this.ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + delay + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.015);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + 0.03);
    }

    // Gentle draft "whoosh" sound
    const noise = this.createPinkNoiseBuffer(0.8);
    if (noise) {
      const src = this.ctx.createBufferSource();
      src.buffer = noise;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(150, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.8);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      src.start();
      src.stop(this.ctx.currentTime + 0.8);
    }
  }

  private playWaterSplashEffect() {
    if (!this.ctx || !this.masterGain) return;

    const noise = this.createPinkNoiseBuffer(1.2);
    if (noise) {
      const src = this.ctx.createBufferSource();
      src.buffer = noise;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
      filter.frequency.setValueAtTime(250, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3); // Wave crest
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 1.2); // Wave wash

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      src.start();
      src.stop(this.ctx.currentTime + 1.2);
    }
  }

  private playSurrealDreamBell() {
    if (!this.ctx || !this.masterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Beautiful C Major chord arpeggio (magical)
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = i * 0.12;

      // Triangle for dreamy, flute-like tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + 1.25);
    });
  }

  private playCozyTableClink() {
    if (!this.ctx || !this.masterGain) return;

    // Ceramic coffee cup clink: high pitch, rapid decay, metallic resonance
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, this.ctx.currentTime); // High clink

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(2850, this.ctx.currentTime); // Harmonic overtone

    gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    subOsc.start();
    osc.stop(this.ctx.currentTime + 0.2);
    subOsc.stop(this.ctx.currentTime + 0.2);

    // Crackling crunch representing warm fresh bread
    for (let i = 0; i < 3; i++) {
      const crunchOsc = this.ctx.createOscillator();
      const crunchGain = this.ctx.createGain();
      const delay = 0.05 + i * 0.04;
      crunchOsc.type = 'triangle';
      crunchOsc.frequency.setValueAtTime(400 + Math.random() * 800, this.ctx.currentTime + delay);
      crunchGain.gain.setValueAtTime(0.015, this.ctx.currentTime + delay);
      crunchGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.03);

      crunchOsc.connect(crunchGain);
      crunchGain.connect(this.masterGain);
      crunchOsc.start(this.ctx.currentTime + delay);
      crunchOsc.stop(this.ctx.currentTime + delay + 0.04);
    }
  }

  private playMountainStepChime() {
    if (!this.ctx || !this.masterGain) return;

    // Golden sunshine chord chime
    const scale = [440, 554.37, 659.25, 880]; // A major
    scale.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 1.0);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + 1.1);
    });

    // Whistling wind gust on step
    const noise = this.createPinkNoiseBuffer(0.6);
    if (noise) {
      const src = this.ctx.createBufferSource();
      src.buffer = noise;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(8.0, this.ctx.currentTime); // highly resonant whistling
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.25);
      filter.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      src.start();
      src.stop(this.ctx.currentTime + 0.6);
    }
  }

  private playComfortTempleBell() {
    if (!this.ctx || !this.masterGain) return;

    // Deep, soothing, meditative cathedral bell sound
    const tones = [146.83, 220.00, 293.66, 370.00, 440.00]; // D chord harmonics
    tones.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Warm sine tones
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      
      // Decay speed is slower for lower frequencies
      const decayTime = 2.5 - i * 0.3;

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07 / (i + 1), this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decayTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start();
      osc.stop(this.ctx.currentTime + decayTime + 0.1);
    });

    // Flickering pop representing the candle flame sealing
    const oscPop = this.ctx.createOscillator();
    const gainPop = this.ctx.createGain();
    oscPop.type = 'triangle';
    oscPop.frequency.setValueAtTime(80, this.ctx.currentTime);
    oscPop.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
    gainPop.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gainPop.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    oscPop.connect(gainPop);
    gainPop.connect(this.masterGain);
    oscPop.start();
    oscPop.stop(this.ctx.currentTime + 0.07);
  }

  private playLighthouseFoghorn() {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Deep harmonic warm foghorn (triangle + sine)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(140, this.ctx.currentTime); // Low F

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(142, this.ctx.currentTime); // Detuned sine for warm beating resonance

    gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.2); // soft attack
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5); // long warm fade out

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 1.6);
    osc2.stop(this.ctx.currentTime + 1.6);

    // Background sea spray wash
    const noise = this.createPinkNoiseBuffer(1.5);
    if (noise) {
      const src = this.ctx.createBufferSource();
      src.buffer = noise;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 1.4);

      const gainSwell = this.ctx.createGain();
      gainSwell.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gainSwell.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 0.5);
      gainSwell.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

      src.connect(filter);
      filter.connect(gainSwell);
      gainSwell.connect(this.masterGain);
      src.start();
      src.stop(this.ctx.currentTime + 1.5);
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
