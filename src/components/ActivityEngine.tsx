import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from '../types';
import { ambientAudio } from '../utils/ambientAudio';

// Web Audio API Sound Synthesizer for high-end tactile feedback
const playSynthesizedSound = (type: 'tap' | 'stamp' | 'success') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'tap') {
      // Warm woody click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'stamp') {
      // Heavy rubber stamp "thud" with a high frequency click
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      // Low thump
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(85, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
      gain1.gain.setValueAtTime(0.7, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Paper slap click
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(600, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      // Beautiful harmonic harp chime (pentatonic scale ascending)
      const freqs = [330, 392, 440, 523, 587, 659];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.6);
      });
    }
  } catch (e) {
    // Graceful fallback for browsers blocking audio
  }
};

interface ActivityEngineProps {
  stopId: number;
  activity: Activity;
  isSolved: boolean;
  onSolved: (feedbackText: string, extraData?: any) => void;
  // State links back to Drawings
  drawingState: any;
  setDrawingState: (state: any) => void;
}

export function ActivityEngine({ stopId, activity, isSolved, onSolved, drawingState, setDrawingState }: ActivityEngineProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [orderSequence, setOrderSequence] = useState<number[]>([]);
  const [orderWrongShake, setOrderWrongShake] = useState<boolean>(false);
  const [tapCounter, setTapCounter] = useState<number>(0);
  const [windGust, setWindGust] = useState<boolean>(false);

  // Trigger occasional wind gust for the Candle shielding activity
  useEffect(() => {
    if (activity.type !== 'tap-counter') return;
    if (isSolved) {
      setWindGust(false);
      return;
    }

    setWindGust(true);
    const interval = setInterval(() => {
      setWindGust(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [activity.type, isSolved]);

  const handleSelectOne = (index: number) => {
    if (isSolved) return;
    playSynthesizedSound('tap');
    ambientAudio.triggerInteractiveSound(stopId, 'select');
    setSelectedOption(index);
    const opt = activity.options?.[index];
    if (opt) {
      playSynthesizedSound('stamp');
      onSolved(opt.feedback, index);
    }
  };

  const handleSelectMultiToggle = (optionText: string) => {
    if (isSolved) return;
    playSynthesizedSound('tap');
    ambientAudio.triggerInteractiveSound(stopId, 'select');
    
    let next: string[];
    if (selectedMulti.includes(optionText)) {
      next = selectedMulti.filter(t => t !== optionText);
    } else {
      next = [...selectedMulti, optionText];
    }
    
    setSelectedMulti(next);
    // Link back to DrawingState
    setDrawingState(next);
  };

  const handleConfirmMulti = () => {
    if (isSolved || selectedMulti.length === 0) return;
    playSynthesizedSound('stamp');
    ambientAudio.triggerInteractiveSound(stopId, 'confirm');
    onSolved(`Has elegido compartir: ${selectedMulti.join(', ')}. ¡Poniendo la mesa!`, selectedMulti);
  };

  const handleOrderClick = (itemIndex: number) => {
    if (isSolved) return;
    playSynthesizedSound('tap');
    ambientAudio.triggerInteractiveSound(stopId, 'order');

    const expectedNextOrder = orderSequence.length;
    const clickedItem = activity.orderItems?.[itemIndex];

    if (!clickedItem) return;

    if (clickedItem.order === expectedNextOrder) {
      const nextSeq = [...orderSequence, itemIndex];
      setOrderSequence(nextSeq);
      
      // Update linked drawingState
      setDrawingState(nextSeq);

      if (nextSeq.length === (activity.orderItems?.length || 0)) {
        playSynthesizedSound('stamp');
        onSolved("Perfecto, en el orden correcto de tu viaje. ¡Qué bonito!", nextSeq);
      }
    } else {
      // Shake animation
      setOrderWrongShake(true);
      setTimeout(() => setOrderWrongShake(false), 400);
    }
  };

  const handleShieldTap = () => {
    if (isSolved) return;
    playSynthesizedSound('tap');
    ambientAudio.triggerInteractiveSound(stopId, 'shield');

    const nextCount = tapCounter + 1;
    setTapCounter(nextCount);
    
    // Link back to DrawingState
    setDrawingState(nextCount);

    if (nextCount >= (activity.targetCount || 5)) {
      playSynthesizedSound('stamp');
      setWindGust(false);
      onSolved("La llama se mantiene viva frente a todas las tempestades gracias a ti.", nextCount);
    }
  };

  // Helper shuffle for rendering Order game
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  useEffect(() => {
    if (activity.type === 'order' && activity.orderItems) {
      const indices = Array.from({ length: activity.orderItems.length }).map((_, i) => i);
      // Simple seed-based shuffle or random
      const shuffled = indices.sort(() => Math.random() - 0.5);
      setShuffledIndices(shuffled);
    }
  }, [activity.type, activity.orderItems]);

  return (
    <>
      {stopId >= 1 && stopId <= 7 ? (
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-stone-200/50 p-4 my-4 shadow-sm relative overflow-hidden">
          <div className="absolute inset-2 border border-dashed border-stone-300/30 rounded-lg pointer-events-none" />
          
          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] text-stone-500 uppercase mb-1 z-10 relative font-bold">
            <span className="text-[#C9A24B]">✦</span> Bitácora de Viaje
          </div>
          
          <h3 className="font-serif italic text-[13px] text-stone-800 font-medium mb-3 leading-relaxed z-10 relative">
            {activity.prompt}
          </h3>

          <div className="flex items-center gap-3 bg-white/90 border border-stone-200/40 p-3 rounded-lg z-10 relative shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-lg shadow-sm">
              {isSolved ? '✨' : '🎨'}
            </div>
            <div className="flex-grow">
              <span className="block font-sans text-[11px] font-bold text-stone-700 leading-tight">
                {isSolved ? '¡Sello de la Bitácora Obtenido! ✦' : 'Interacción en Vivo'}
              </span>
              <span className="block font-serif text-[10.5px] text-stone-500 italic mt-0.5">
                {isSolved 
                  ? 'El testimonio de Dios ha quedado sellado en tu libreta.' 
                  : 'Interactúa directamente con la ilustración anime arriba para abrir el cofre del recuerdo.'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FAF2E3]/70 rounded-xl border border-[#D5C2A5] p-4 my-4 shadow-sm relative">
          <div className="absolute inset-2 border border-dashed border-[#D5C2A5]/40 rounded-lg pointer-events-none" />

          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#8A7963] uppercase mb-1 z-10 relative">
            <span className="text-[#C9A24B]">✦</span> {activity.label}
          </div>
          <h3 className="font-serif italic text-[14px] text-[#2A2118] font-bold mb-3 leading-relaxed z-10 relative">
            {activity.prompt}
          </h3>

      {/* --- SELECT ONE ACTIVITY --- */}
      {activity.type === 'select-one' && activity.options && (
        <div className="flex flex-col gap-2 z-10 relative">
          {activity.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            return (
              <motion.button
                key={i}
                onClick={() => handleSelectOne(i)}
                disabled={isSolved && !isSelected}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-[#2A2118] text-[#F6EBD9] border-[#2A2118] shadow-sm'
                    : isSolved
                    ? 'bg-[#EFE0C4]/40 border-transparent opacity-40 cursor-default'
                    : 'bg-white text-[#2A2118] border-[#D5C2A5] hover:border-[#C9A24B] active:bg-[#F6EBD9]/30'
                }`}
                whileHover={!isSolved ? { x: 3 } : {}}
              >
                <span>{opt.text}</span>
                {isSelected && <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold">✓ ELEGIDO</span>}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* --- SELECT MULTI ACTIVITY --- */}
      {activity.type === 'select-multi' && activity.multiOptions && (
        <div className="flex flex-col gap-3 z-10 relative">
          <div className="flex flex-wrap gap-2">
            {activity.multiOptions.map((opt, i) => {
              const isSelected = selectedMulti.includes(opt);
              return (
                <button
                  key={i}
                  onClick={() => handleSelectMultiToggle(opt)}
                  disabled={isSolved}
                  className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#2A2118] text-[#F6EBD9] border-[#2A2118] shadow-sm'
                      : isSolved
                      ? 'bg-[#EFE0C4]/40 border-transparent opacity-50 cursor-default'
                      : 'bg-white text-[#2A2118] border-[#D5C2A5] hover:border-[#C9A24B] active:bg-[#F6EBD9]/30'
                  }`}
                >
                  <span className="mr-1">{isSelected ? '✓' : '+'}</span> {opt}
                </button>
              );
            })}
          </div>

          {!isSolved && (
            <motion.button
              onClick={handleConfirmMulti}
              disabled={selectedMulti.length === 0}
              className="w-full bg-[#C9A24B] hover:bg-[#B38F3D] text-white text-xs font-bold tracking-wider uppercase py-2.5 rounded-lg border-b-2 border-[#A27F33] transition-all disabled:opacity-40"
              whileTap={{ y: 1 }}
            >
              {activity.confirmLabel || 'Confirmar'}
            </motion.button>
          )}
        </div>
      )}

      {/* --- ORDER SEQUENCE ACTIVITY --- */}
      {activity.type === 'order' && activity.orderItems && (
        <div className="flex flex-col gap-2.5 z-10 relative">
          <div className={`flex flex-col gap-2 ${orderWrongShake ? 'animate-[shake_0.35s_ease-in-out]' : ''}`}>
            {shuffledIndices.map((origIdx) => {
              const item = activity.orderItems![origIdx];
              const solvedPosition = orderSequence.indexOf(origIdx);
              const isItemPlaced = solvedPosition !== -1;

              return (
                <button
                  key={origIdx}
                  onClick={() => handleOrderClick(origIdx)}
                  disabled={isSolved || isItemPlaced}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center gap-3 transition-all ${
                    isItemPlaced
                      ? 'bg-[#EFE0C4]/60 text-[#5B4F3F] border-transparent cursor-default'
                      : isSolved
                      ? 'bg-[#EFE0C4]/40 border-transparent opacity-40 cursor-default'
                      : 'bg-white text-[#2A2118] border-[#D5C2A5] hover:border-[#C9A24B] active:bg-[#F6EBD9]/30'
                  }`}
                >
                  {/* Circle number badge */}
                  <div className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                    isItemPlaced ? 'bg-[#C9A24B] text-white' : 'bg-stone-100 text-stone-500 border border-stone-200'
                  }`}>
                    {isItemPlaced ? solvedPosition + 1 : '?'}
                  </div>
                  <span>{item.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAP SHIELD COUNTER ACTIVITY --- */}
      {activity.type === 'tap-counter' && (
        <div className="flex flex-col items-center py-2 z-10 relative">
          {!isSolved && (
            <div className="text-center w-full">
              {/* Shield Tapping button representation */}
              <button
                onClick={handleShieldTap}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-dashed transition-all active:scale-95 ${
                  windGust
                    ? 'bg-blue-50 border-blue-400 text-blue-600 animate-pulse'
                    : 'bg-amber-50 border-[#D5C2A5] text-[#2A2118]'
                }`}
              >
                <span>{activity.icon || '🕯️'}</span>
                
                {windGust && (
                  <motion.div
                    className="absolute inset-[-6px] border border-blue-400 rounded-full opacity-60"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </button>
              <p className="text-[10px] font-mono tracking-wider text-[#5B4F3F] uppercase mt-2.5 font-bold">
                {windGust ? "⚠️ ¡Ráfaga activa! Toca para colocar escudo" : "Protege la llama de las ráfagas"}
              </p>
            </div>
          )}
        </div>
      )}
        </div>
      )}
    </>
  );
}
export { playSynthesizedSound };
