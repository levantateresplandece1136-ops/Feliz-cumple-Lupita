import { motion } from 'motion/react';

interface PassportHeaderProps {
  currentStopIndex: number;
  completedStops: number[];
  totalStops: number;
  onJumpToStop?: (index: number) => void;
}

export function PassportHeader({ currentStopIndex, completedStops, totalStops, onJumpToStop }: PassportHeaderProps) {
  const stampStyles = [
    { name: '🔥', label: 'NIEVE', color: 'border-rose-600 text-rose-600 bg-rose-500/5 rotate-[-6deg]' },
    { name: '🌊', label: 'MAREA', color: 'border-cyan-600 text-cyan-600 bg-cyan-500/5 rotate-[4deg]' },
    { name: '🌿', label: 'SURREAL', color: 'border-emerald-600 text-emerald-600 bg-emerald-500/5 rotate-[-12deg]' },
    { name: '🍞', label: 'MESA', color: 'border-amber-700 text-amber-700 bg-amber-600/5 rotate-[8deg]' },
    { name: '🌅', label: 'DAWN', color: 'border-orange-600 text-orange-600 bg-orange-500/5 rotate-[-4deg]' },
    { name: '🕯️', label: 'FE', color: 'border-violet-600 text-violet-600 bg-violet-500/5 rotate-[10deg]' },
    { name: '🗼', label: 'FARO', color: 'border-sky-600 text-sky-600 bg-sky-500/5 rotate-[-5deg]' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-6 select-none border-b border-amber-900/10 pb-4">
      {/* Traveler Header */}
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#5B4F3F] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
          Bitácora de Viaje
        </div>
        <div className="text-[11px] font-mono tracking-widest text-[#C9A24B] font-bold">
          PASAPORTE: {completedStops.length} / {totalStops} SELLOS
        </div>
      </div>

      {/* Stamp container */}
      <div className="w-full flex justify-between items-center gap-1.5 px-1 py-2 overflow-x-auto no-scrollbar">
        {Array.from({ length: totalStops }).map((_, i) => {
          const isCompleted = completedStops.includes(i + 1);
          const isActive = currentStopIndex === i + 1;
          const style = stampStyles[i] || { name: '📍', label: 'PARADA', color: 'border-zinc-500 text-zinc-500' };

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1 flex-1 min-w-[48px]"
            >
              {/* Stamp Circle */}
              <motion.button
                onClick={() => isCompleted || isActive ? onJumpToStop?.(i + 1) : null}
                disabled={!isCompleted && !isActive}
                className={`relative w-11 h-11 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  isCompleted
                    ? `${style.color} border-solid shadow-sm cursor-pointer`
                    : isActive
                    ? 'border-[#C9A24B] text-[#C9A24B] bg-[#C9A24B]/5 scale-105 shadow-md shadow-amber-900/5 animate-pulse cursor-default'
                    : 'border-stone-300 text-stone-300 bg-transparent cursor-not-allowed opacity-50'
                }`}
                whileHover={isCompleted ? { scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 } : {}}
                whileTap={isCompleted ? { scale: 0.95 } : {}}
              >
                {/* Stamp symbol */}
                <span className={`text-[17px] ${!isCompleted && 'grayscale opacity-40'}`}>
                  {style.name}
                </span>

                {/* Micro Stamp Stamp-over visual */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 2.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                    className="absolute inset-0 rounded-full border border-current opacity-20 pointer-events-none"
                  />
                )}
              </motion.button>

              {/* Stamp Mini label */}
              <span className={`text-[8px] font-mono tracking-wider text-center uppercase font-bold ${
                isActive ? 'text-[#C9A24B]' : isCompleted ? 'text-[#5B4F3F]' : 'text-stone-300'
              }`}>
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
