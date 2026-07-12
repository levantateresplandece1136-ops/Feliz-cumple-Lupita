import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// 1. MEADOW DRAWING (CAPÍTULO 1)
// ==========================================
interface MeadowDrawingProps {
  collectedFlowers: string[];
  onCollect: (flower: string) => void;
  isSolved: boolean;
}

export function MeadowDrawing({ collectedFlowers, onCollect, isSolved }: MeadowDrawingProps) {
  const flowersData = [
    { id: 'esperanza', name: 'Flor de la Esperanza', color: '#60A5FA', x: 80, y: 140, path: 'M0,-10 C5,-5 15,-5 10,5 C5,15 -5,15 -10,5 C-15,-5 -5,-5 0,-10 Z' },
    { id: 'proposito', name: 'Flor del Propósito', color: '#F472B6', x: 200, y: 155, path: 'M0,-12 C6,-6 14,-10 10,2 C6,14 -6,14 -10,2 C-14,-10 -6,-6 0,-12 Z' },
    { id: 'amor', name: 'Flor del Amor', color: '#FBBF24', x: 310, y: 145, path: 'M0,-10 C8,-8 12,-12 10,0 C8,12 -8,12 -10,0 C-12,-12 -8,-8 0,-10 Z' }
  ];

  return (
    <div className="relative w-full h-56 bg-slate-950 rounded-2xl overflow-hidden border border-emerald-900/20 shadow-inner">
      {/* Anime Dawn sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#475569] to-[#065F46] opacity-90" />
      
      {/* Sun rays effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(251,191,36,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating clouds */}
      <motion.div 
        className="absolute w-24 h-6 bg-white/10 blur-sm rounded-full top-6 left-10"
        animate={{ x: [-20, 280, -20] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute w-32 h-8 bg-white/10 blur-md rounded-full top-12 right-12"
        animate={{ x: [20, -240, 20] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Stars twinkling in top dawn sky */}
      <div className="absolute inset-0 h-1/2">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-100 rounded-full"
            style={{
              top: `${(i * 13) % 40 + 5}%`,
              left: `${(i * 19) % 90 + 5}%`,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 1.5 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* Soft rolling hills */}
        <path d="M 0 170 Q 120 140 240 165 T 400 150 L 400 200 L 0 200 Z" fill="#064E3B" opacity="0.9" />
        <path d="M 0 180 Q 150 160 280 185 T 400 175 L 400 200 L 0 200 Z" fill="#047857" />

        {/* Golden Sunbeams */}
        <polygon points="150,0 120,200 170,200" fill="#FBBF24" opacity="0.08" />
        <polygon points="250,0 220,200 290,200" fill="#FBBF24" opacity="0.05" />

        {/* Small silhouette of little girl admiring the sky */}
        <g transform="translate(45, 135) scale(0.65)">
          {/* Dress */}
          <polygon points="15,45 5,80 25,80" fill="#111827" />
          {/* Head & Hair */}
          <circle cx="15" cy="30" r="8" fill="#111827" />
          <path d="M 9 28 Q 12 21 17 28 L 19 36 Q 15 39 10 36 Z" fill="#111827" />
          {/* Legs */}
          <line x1="12" y1="80" x2="12" y2="92" stroke="#111827" strokeWidth="2.5" />
          <line x1="18" y1="80" x2="18" y2="92" stroke="#111827" strokeWidth="2.5" />
        </g>

        {/* The 3 interactive flowers */}
        {flowersData.map((f, i) => {
          const isCollected = collectedFlowers.includes(f.id);
          return (
            <g key={f.id} transform={`translate(${f.x}, ${f.y})`}>
              {/* Stem */}
              <path d="M0,0 Q-5,20 0,45" fill="none" stroke="#047857" strokeWidth="2.5" />
              <path d="M0,20 Q10,12 5,8" fill="#047857" />

              {/* Glowing background aura if not collected */}
              {!isCollected && (
                <motion.circle
                  cx="0"
                  cy="0"
                  r="18"
                  fill={f.color}
                  opacity="0.15"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              )}

              {/* Flower Head */}
              <motion.g
                onClick={() => !isCollected && onCollect(f.id)}
                className={isCollected ? 'pointer-events-none' : 'cursor-pointer'}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                animate={isCollected ? { rotate: 360, scale: 0.8, opacity: 0.5 } : { y: [0, -3, 0] }}
                transition={isCollected ? { duration: 0.8 } : { duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                {/* 5 Petals */}
                {[...Array(5)].map((_, idx) => (
                  <path
                    key={idx}
                    d={f.path}
                    fill={f.color}
                    transform={`rotate(${idx * 72})`}
                    opacity={isCollected ? 0.6 : 0.95}
                  />
                ))}
                {/* Flower Center */}
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="3" fill="#FBBF24" />
              </motion.g>

              {/* Checkmark or sparkly indicator if collected */}
              {isCollected && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} transform="translate(0, -22)">
                  <circle cx="0" cy="0" r="7" fill="#FFFFFF" shadow-sm="true" />
                  <path d="M-4,-1 L-1,2 L4,-3" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              )}
            </g>
          );
        })}

        {/* Ghibli-style shining Badge if solved */}
        {isSolved && (
          <g transform="translate(200, 70)">
            <motion.circle
              cx="0"
              cy="0"
              r="34"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="28"
              fill="rgba(251, 191, 36, 0.15)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            />
            {/* Spinning Star Badge */}
            <motion.path
              d="M0,-22 L5,-5 L22,-5 L8,5 L14,22 L0,12 L-14,22 L-8,5 L-22,-5 L-5,-5 Z"
              fill="#FBBF24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 80 }}
            />
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          </g>
        )}
      </svg>
      
      {/* Bottom text helper */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '✨ ¡Insignia del Comienzo Revelada! ✨' : '🌸 Toca cada flor para cosechar tus virtudes'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 2. BRIDGE DRAWING (CAPÍTULO 2)
// ==========================================
interface BridgeDrawingProps {
  stepCount: number;
  discoveredMemories: string[];
  onStep: () => void;
  onDiscoverMemory: (memoryId: string) => void;
  isSolved: boolean;
}

export function BridgeDrawing({ stepCount, discoveredMemories, onStep, onDiscoverMemory, isSolved }: BridgeDrawingProps) {
  const memories = [
    { id: 'abrazomama', label: 'Abrazo de Mamá', color: '#F472B6', x: 220, y: 145 },
    { id: 'tardesol', label: 'Tardes de Sol', color: '#FBBF24', x: 280, y: 155 },
    { id: 'risasamigos', label: 'Risas Compartidas', color: '#60A5FA', x: 340, y: 142 }
  ];

  // Girl silhouette translation based on steps
  const girlX = 40 + Math.min(stepCount, 5) * 28;
  const isFallen = stepCount >= 5;

  return (
    <div className="relative w-full h-56 bg-[#0B151E] rounded-2xl overflow-hidden border border-amber-900/10 shadow-inner">
      {/* Evening golden-orange anime sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#701A2F] via-[#B45309] to-[#F59E0B] opacity-80" />
      
      {/* Distant mountains silhouette */}
      <div className="absolute bottom-12 inset-x-0 h-16 bg-[#3F1B0B] clip-mountain opacity-60" />

      {/* Falling sakura blossoms */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-60"
            style={{
              top: '-10px',
              left: `${(i * 15) % 100}%`,
            }}
            animate={{
              y: ['0vh', '45vh'],
              x: ['0px', `${(Math.random() - 0.5) * 60}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* River creek rushing below */}
        <path d="M 0 165 Q 200 155 400 170 L 400 200 L 0 200 Z" fill="#1E3A8A" opacity="0.8" />
        <path d="M 0 172 Q 180 165 400 178 L 400 200 L 0 200 Z" fill="#2563EB" />
        
        {/* River sparkle ripples */}
        <motion.line x1="20" y1="180" x2="100" y2="180" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.line x1="180" y1="188" x2="260" y2="188" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" animate={{ opacity: [0.8, 0.2, 0.8] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }} />

        {/* Rolling grass hills around river */}
        <path d="M 0 145 C 80 145 120 165 140 165 L 0 165 Z" fill="#78350F" />
        <path d="M 280 165 C 320 165 370 145 400 145 L 400 170 C 370 170 320 165 280 165 Z" fill="#78350F" />

        {/* The Wooden Arch Bridge */}
        <path d="M 40 145 Q 160 100 280 145" fill="none" stroke="#451A03" strokeWidth="10" />
        {/* Bridge pillars */}
        <line x1="90" y1="125" x2="90" y2="165" stroke="#451A03" strokeWidth="4" />
        <line x1="160" y1="112" x2="160" y2="160" stroke="#451A03" strokeWidth="4" />
        <line x1="230" y1="125" x2="230" y2="165" stroke="#451A03" strokeWidth="4" />

        {/* Bridge walkway top line */}
        <path d="M 40 141 Q 160 96 280 141" fill="none" stroke="#D97706" strokeWidth="2" />

        {/* Girl Silhouette on Bridge or on ground */}
        {!isFallen ? (
          <g transform={`translate(${girlX}, ${115 - (girlX > 160 ? (280 - girlX) * 0.15 : (girlX - 40) * 0.15)}) scale(0.65)`}>
            {/* Walk animation using slight swing */}
            <motion.g animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
              <polygon points="15,45 5,80 25,80" fill="#1E293B" />
              <circle cx="15" cy="30" r="8" fill="#1E293B" />
              <line x1="12" y1="80" x2="10" y2="92" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="18" y1="80" x2="20" y2="92" stroke="#1E293B" strokeWidth="2.5" />
            </motion.g>
          </g>
        ) : (
          /* Fallen state, sitting safely on the grass on right side of bridge, looking up */
          <g transform="translate(180, 138) scale(0.65)">
            <motion.g initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
              {/* Sitting dress */}
              <path d="M 5 60 Q 15 45 25 60 Q 35 75 15 75 Q -5 75 5 60 Z" fill="#1E293B" />
              <circle cx="15" cy="38" r="8" fill="#1E293B" />
              {/* Bent leg */}
              <path d="M 20 72 Q 28 72 26 78" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          </g>
        )}

        {/* Happy Memories Flowers blooming where she fell */}
        {isFallen && memories.map((m, i) => {
          const isDiscovered = discoveredMemories.includes(m.id);
          return (
            <g key={m.id} transform={`translate(${m.x}, ${m.y})`}>
              {/* Pulsing glow around flower */}
              {!isDiscovered && (
                <motion.circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill={m.color}
                  opacity="0.2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                />
              )}

              {/* Glowing Sakura bloom */}
              <motion.g
                onClick={() => onDiscoverMemory(m.id)}
                className="cursor-pointer"
                whileHover={{ scale: 1.3 }}
                animate={isDiscovered ? { scale: 0.9, opacity: 0.7 } : { y: [0, -2, 0] }}
                transition={isDiscovered ? {} : { duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                {/* 5 rounded petals */}
                {[...Array(5)].map((_, idx) => (
                  <path
                    key={idx}
                    d="M0,-8 C3,-4 7,-4 5,2 C3,8 -3,8 -5,2 C-7,-4 -3,-4 0,-8 Z"
                    fill={m.color}
                    transform={`rotate(${idx * 72})`}
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Control overlay */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        {!isFallen ? (
          <button
            onClick={onStep}
            className="pointer-events-auto mx-auto bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-mono font-bold text-[10px] tracking-wider uppercase py-1.5 px-4 rounded-full shadow-md cursor-pointer border border-amber-400"
          >
            👣 Caminar sobre el puente ({stepCount}/5)
          </button>
        ) : (
          <div className="mx-auto bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-center">
            <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
              {isSolved ? '🌸 ¡Camino Sellado con Recuerdos de Gracia!' : '✨ ¡Caíste a salvo! Toca las flores de sakura para recordar'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. FOREST DOUBT DRAWING (CAPÍTULO 3)
// ==========================================
interface ForestDoubtDrawingProps {
  unlockedLights: string[];
  onUnlockLight: (lightId: string) => void;
  isSolved: boolean;
}

export function ForestDoubtDrawing({ unlockedLights, onUnlockLight, isSolved }: ForestDoubtDrawingProps) {
  const lanterns = [
    { id: 'paz', label: 'Linterna de la Paz', x: 90, y: 130 },
    { id: 'fuerza', label: 'Linterna de la Fuerza', x: 200, y: 110 },
    { id: 'guia', label: 'Linterna de la Guía', x: 310, y: 135 }
  ];

  return (
    <div className="relative w-full h-56 bg-zinc-950 rounded-2xl overflow-hidden border border-slate-900 shadow-inner">
      {/* Dark rainy blueish forest background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

      {/* Dynamic Rain effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1.5px] bg-slate-300 opacity-30"
            style={{
              height: '24px',
              top: `${Math.random() * -20}%`,
              left: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`0px`, `${(Math.random() - 0.5) * 20}px`],
            }}
            transition={{
              duration: 1 + Math.random() * 0.8,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.12,
            }}
          />
        ))}
      </div>

      {/* Deep forest silhouette trees */}
      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* Tree Trunk silhouettes */}
        <path d="M 30 200 L 45 40 L 55 40 L 70 200 Z" fill="#020617" opacity="0.85" />
        <path d="M 120 200 L 130 20 L 138 20 L 150 200 Z" fill="#020617" opacity="0.6" />
        <path d="M 270 200 L 278 10 L 286 10 L 300 200 Z" fill="#020617" opacity="0.5" />
        <path d="M 350 200 L 362 50 L 370 50 L 385 200 Z" fill="#020617" opacity="0.85" />

        {/* Horizon glowing light represents God's constant warm guiding light */}
        <circle cx="200" cy="90" r="14" fill="#FEF08A" opacity="0.25" />
        <motion.circle
          cx="200"
          cy="90"
          r="6"
          fill="#FDE047"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <line x1="200" y1="90" x2="200" y2="200" stroke="#FDE047" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

        {/* Girl with Umbrella silhouette walking toward the constant light */}
        <g transform="translate(180, 115) scale(0.6)">
          {/* Umbrella */}
          <path d="M 5 25 Q 20 -2 35 25 Z" fill="#475569" />
          <line x1="20" y1="20" x2="20" y2="45" stroke="#1E293B" strokeWidth="2.5" />
          {/* Figure */}
          <polygon points="17,45 10,75 24,75" fill="#0F172A" />
          <circle cx="17" cy="38" r="6" fill="#0F172A" />
          <line x1="14" y1="75" x2="14" y2="85" stroke="#0F172A" strokeWidth="2" />
          <line x1="20" y1="75" x2="20" y2="85" stroke="#0F172A" strokeWidth="2" />
        </g>

        {/* Rain ripples on the swamp ground */}
        <ellipse cx="200" cy="180" rx="40" ry="4" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.3" />
        <ellipse cx="80" cy="185" rx="20" ry="2" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.2" />

        {/* The 3 Clickable Lanterns */}
        {lanterns.map((l, i) => {
          const isUnlocked = unlockedLights.includes(l.id);
          return (
            <g key={l.id} transform={`translate(${l.x}, ${l.y})`}>
              {/* Hanging Rope */}
              <line x1="0" y1="-50" x2="0" y2="-12" stroke="#1E293B" strokeWidth="1.5" />
              
              {/* Lantern housing */}
              <rect x="-8" y="-12" width="16" height="24" fill="#334155" rx="2" stroke="#0F172A" strokeWidth="1.5" />
              <polygon points="-11,-12 11,-12 0,-20" fill="#1E293B" />
              <rect x="-5" y="12" width="10" height="2" fill="#1E293B" />

              {/* Lantern glow core */}
              <motion.circle
                cx="0"
                cy="0"
                r="6"
                fill={isUnlocked ? '#FDE047' : '#93C5FD'}
                animate={isUnlocked ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : { opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                className="cursor-pointer"
                onClick={() => onUnlockLight(l.id)}
              />

              {/* Giant warm halo when unlocked */}
              {isUnlocked && (
                <circle cx="0" cy="0" r="24" fill="#FEF08A" opacity="0.12" pointerEvents="none" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating prompt helper */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '⚡ ¡El Bosque Brilla con la Luz de la Promesa! ⚡' : '🕯️ Enciende las linternas en la tormenta'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 4. TRAVELERS DRAWING (CAPÍTULO 4)
// ==========================================
interface TravelersDrawingProps {
  companions: { [key: string]: string };
  onSaveCompanion: (itemKey: string, name: string) => void;
  isSolved: boolean;
}

export function TravelersDrawing({ companions, onSaveCompanion, isSolved }: TravelersDrawingProps) {
  const travelers = [
    { key: 'brújula', label: 'Brújula', icon: '🧭', x: 50, y: 135, desc: 'Mantiene el rumbo' },
    { key: 'lámpara', label: 'Lámpara', icon: '💡', x: 125, y: 140, desc: 'Ilumina lo oscuro' },
    { key: 'pluma', label: 'Pluma', icon: '🪶', x: 200, y: 132, desc: 'Brinda alegría' },
    { key: 'pan', label: 'Pan', icon: '🍞', x: 275, y: 142, desc: 'Sustento diario' },
    { key: 'flor', label: 'Flor', icon: '🌸', x: 350, y: 137, desc: 'Siembra belleza' }
  ];

  const [activeTraveler, setActiveTraveler] = useState<typeof travelers[0] | null>(null);
  const [nameInput, setNameInput] = useState('');

  const handleSave = () => {
    if (activeTraveler && nameInput.trim()) {
      onSaveCompanion(activeTraveler.key, nameInput.trim());
      setActiveTraveler(null);
      setNameInput('');
    }
  };

  return (
    <div className="relative w-full h-56 bg-amber-950 rounded-2xl overflow-hidden border border-amber-900/10 shadow-inner">
      {/* Dawn pink sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2994A] via-[#F2C94C] to-[#E5E7EB] opacity-60" />
      
      {/* Soft sunrise rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(242,201,76,0.35)_0%,transparent_80%)] pointer-events-none" />

      {/* Floating dandelion petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-200 rounded-full"
            style={{
              bottom: '15px',
              left: `${(i * 18) % 100}%`,
            }}
            animate={{
              y: ['0px', '-180px'],
              x: ['0px', '45px'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* Grassy fields at sunrise */}
        <path d="M 0 160 Q 150 145 280 155 T 400 150 L 400 200 L 0 200 Z" fill="#93C5FD" opacity="0.4" />
        <path d="M 0 168 Q 120 158 240 168 T 400 162 L 400 200 L 0 200 Z" fill="#E2E8F0" />

        {/* Silhouette travelers standing side by side */}
        {travelers.map((t) => {
          const name = companions[t.key];
          const hasName = !!name;
          return (
            <g key={t.key} transform={`translate(${t.x}, ${t.y})`}>
              {/* Traveler Figure */}
              <motion.g
                onClick={() => setActiveTraveler(t)}
                className="cursor-pointer"
                whileHover={{ y: -6 }}
              >
                {/* Body cloak */}
                <polygon points="0,15 -12,45 12,45" fill={hasName ? '#B45309' : '#475569'} opacity="0.9" />
                <circle cx="0" cy="5" r="7" fill={hasName ? '#B45309' : '#475569'} />
                
                {/* Glowing Aura if saved */}
                {hasName && (
                  <motion.circle
                    cx="0"
                    cy="18"
                    r="20"
                    fill="#FDE047"
                    opacity="0.12"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Floating Item icon over head */}
                <g transform="translate(0, -20)">
                  <circle cx="0" cy="0" r="10" fill="#FFFFFF" className="shadow-md" stroke="#E5E7EB" strokeWidth="1" />
                  <text x="0" y="3.5" textAnchor="middle" fontSize="10">{t.icon}</text>
                </g>

                {/* Custom Name tag */}
                {hasName && (
                  <g transform="translate(0, 56)">
                    <rect x="-24" y="-7" width="48" height="11" fill="#FAF5EA" rx="2" stroke="#B45309" strokeWidth="0.5" />
                    <text x="0" y="1" textAnchor="middle" fontSize="6.5" fill="#1F2937" fontWeight="bold" fontFamily="monospace">
                      {name.length > 9 ? name.substring(0, 7) + '..' : name}
                    </text>
                  </g>
                )}
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Name Input Card Overlay */}
      <AnimatePresence>
        {activeTraveler && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute inset-0 bg-[#FAF5EA]/95 backdrop-blur-sm p-4 flex flex-col items-center justify-center z-20"
          >
            <div className="text-center mb-2">
              <span className="text-2xl filter drop-shadow">{activeTraveler.icon}</span>
              <h4 className="font-serif italic font-bold text-xs text-[#2A2118] mt-1">
                Compañero: {activeTraveler.label}
              </h4>
              <p className="text-[10px] text-stone-500 italic max-w-xs">
                "{activeTraveler.desc}" — ¿Quién ha sido esta bendición en tu vida?
              </p>
            </div>
            
            <div className="flex gap-2 w-full max-w-xs">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Escribe su nombre..."
                className="flex-grow text-xs py-1.5 px-3 rounded-full border border-stone-300 bg-white text-[#2A2118] focus:outline-none focus:ring-1 focus:ring-amber-500 font-serif"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={!nameInput.trim()}
                className="bg-[#2A2118] hover:bg-black text-white text-[10px] font-mono uppercase px-3.5 rounded-full disabled:opacity-40 transition-all font-bold cursor-pointer"
              >
                Sellar
              </button>
              <button
                onClick={() => { setActiveTraveler(null); setNameInput(''); }}
                className="text-stone-500 hover:text-stone-800 text-[10px] font-mono uppercase px-2"
              >
                X
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating helper */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '👥 ¡Todos tus compañeros han sido grabados con amor!' : '👥 Toca a cada compañero para asignarle un nombre'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 5. HEARTBEAT DRAWING (CAPÍTULO 5)
// ==========================================
interface HeartbeatDrawingProps {
  pulseCount: number;
  onPulse: () => void;
  isSolved: boolean;
}

export function HeartbeatDrawing({ pulseCount, onPulse, isSolved }: HeartbeatDrawingProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; scale: number }>>([]);

  const handlePulseClick = () => {
    onPulse();
    const newRipple = { id: Date.now(), scale: 0 };
    setRipples(prev => [...prev, newRipple]);
  };

  return (
    <div className="relative w-full h-56 bg-slate-950 rounded-2xl overflow-hidden border border-sky-900/20 shadow-inner flex flex-col items-center justify-center">
      {/* Infinite reflection white/luminous lake sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111A2E] via-[#1E293B] to-[#0A0E1A]" />
      
      {/* Symmetrical water reflection lines */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#0F172A]/50 border-t border-sky-500/20 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.7, 0.1],
              y: [0, -40, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Concentric ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="absolute border border-amber-300/40 rounded-full"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 320, height: 160, opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            onAnimationComplete={() => setRipples(prev => prev.filter(p => p.id !== r.id))}
          />
        ))}
      </div>

      {/* Giant pulsing beautiful gold heart */}
      <motion.div
        onClick={handlePulseClick}
        className="cursor-pointer z-20 p-6 flex flex-col items-center justify-center rounded-full bg-amber-500/5 hover:bg-amber-500/10 active:scale-95 transition-all duration-300 border border-amber-500/20 shadow-lg"
        animate={{
          scale: [1, 1.14, 1, 1.18, 1],
          boxShadow: [
            '0 0 15px rgba(245,158,11,0.1)',
            '0 0 35px rgba(245,158,11,0.3)',
            '0 0 15px rgba(245,158,11,0.1)',
            '0 0 45px rgba(245,158,11,0.4)',
            '0 0 15px rgba(245,158,11,0.1)'
          ]
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Heart SVG */}
        <svg viewBox="0 0 32 32" className="w-16 h-16 fill-[#FBBF24] drop-shadow-[0_0_15px_rgba(251,191,38,0.6)]">
          <path d="M16 28.5C16 28.5 2 20.5 2 11.5C2 7.5 5 4.5 9 4.5C11.5 4.5 13.5 5.5 16 8C18.5 5.5 20.5 4.5 23 4.5C27 4.5 30 7.5 30 11.5C30 20.5 16 28.5 16 28.5Z" />
        </svg>
        
        {/* Heartbeat label inside heart */}
        <span className="font-mono text-[9px] text-[#2A2118] bg-white font-extrabold uppercase px-2 py-0.5 rounded-full mt-2 tracking-widest pointer-events-none">
          Pulsar ({pulseCount}/5)
        </span>
      </motion.div>

      {/* Overlay status label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none z-20">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '❤️ ¡Latido Sincronizado con Su Gracia!' : '👉 Mantén el compás: Sincroniza 5 latidos'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 6. GLOWING TREE DRAWING (CAPÍTULO 6)
// ==========================================
interface GlowingTreeDrawingProps {
  harvestedLeaves: string[];
  onHarvestLeaf: (leafId: string) => void;
  isSolved: boolean;
}

export function GlowingTreeDrawing({ harvestedLeaves, onHarvestLeaf, isSolved }: GlowingTreeDrawingProps) {
  const leaves = [
    { id: 'sonrisa', text: 'Sonrisa', color: '#FCD34D', cx: 140, cy: 55 },
    { id: 'amistad', text: 'Amistad', color: '#F472B6', cx: 185, cy: 40 },
    { id: 'oracion', text: 'Oración', color: '#60A5FA', cx: 220, cy: 65 },
    { id: 'milagro', text: 'Milagro', color: '#34D399', cx: 255, cy: 50 },
    { id: 'reconciliacion', text: 'Paz', color: '#A78BFA', cx: 175, cy: 75 }
  ];

  return (
    <div className="relative w-full h-56 bg-[#061517] rounded-2xl overflow-hidden border border-teal-950 shadow-inner">
      {/* Night deep emerald sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F292F] via-[#0D1E22] to-[#061517] opacity-90" />

      {/* Floating ambient fireflies */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FDE047] rounded-full"
            style={{
              bottom: '10px',
              left: `${(i * 12) % 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, (Math.random() - 0.5) * 40, 0],
              opacity: [0.1, 0.9, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* Soft ground landscape */}
        <path d="M 0 170 Q 150 160 270 172 T 400 165 L 400 200 L 0 200 Z" fill="#0D1E22" />

        {/* The Giant Sacred Tree of Ghibli-inspiration */}
        {/* Trunk */}
        <path d="M 185 175 Q 185 130 170 100 T 195 80 Q 200 110 205 135 T 205 175 Z" fill="#0A0F10" />
        <path d="M 160 175 Q 170 165 185 175" stroke="#0A0F10" strokeWidth="4" fill="none" />
        <path d="M 220 175 Q 210 165 205 175" stroke="#0A0F10" strokeWidth="4" fill="none" />

        {/* Tree canopy shape backing */}
        <circle cx="200" cy="65" r="50" fill="#0F2A30" opacity="0.6" />
        <circle cx="160" cy="75" r="40" fill="#0F2A30" opacity="0.5" />
        <circle cx="240" cy="70" r="42" fill="#0F2A30" opacity="0.5" />

        {/* Glowing aura around tree */}
        <circle cx="200" cy="65" r="70" fill="#2DD4BF" opacity="0.04" />

        {/* Clickable Glowing Leaves */}
        {leaves.map((leaf, i) => {
          const isHarvested = harvestedLeaves.includes(leaf.id);
          return (
            <g key={leaf.id} transform={`translate(${leaf.cx}, ${leaf.cy})`}>
              {/* Pulsing halo if not harvested */}
              {!isHarvested && (
                <motion.circle
                  cx="0"
                  cy="0"
                  r="14"
                  fill={leaf.color}
                  opacity="0.2"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                />
              )}

              {/* Leaf item */}
              <motion.g
                onClick={() => !isHarvested && onHarvestLeaf(leaf.id)}
                className={isHarvested ? 'pointer-events-none' : 'cursor-pointer'}
                whileHover={{ scale: 1.3 }}
                animate={isHarvested ? {
                  y: [0, 80, 105],
                  x: [0, -30, -50],
                  rotate: [0, 120, 240, 360],
                  opacity: [1, 0.9, 0]
                } : { y: [0, -2, 0] }}
                transition={isHarvested ? { duration: 2.2, ease: 'easeOut' } : { duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                {/* Leaf Shape */}
                <path
                  d="M0,-8 C5,-4 5,4 0,8 C-5,4 -5,-4 0,-8 Z"
                  fill={leaf.color}
                  transform="rotate(45)"
                  opacity={isHarvested ? 0.3 : 0.9}
                />
                
                {/* Leaf micro text tag */}
                {!isHarvested && (
                  <text x="0" y="16" textAnchor="middle" fontSize="6.5" fill="#FAF5EA" fontFamily="monospace" fontWeight="bold">
                    {leaf.text}
                  </text>
                )}
              </motion.g>
            </g>
          );
        })}

        {/* Miniature altar bowl/basket at the bottom on left where leaves fall */}
        <g transform="translate(130, 168) scale(0.65)">
          <path d="M 0 5 Q 15 -10 30 5 L 25 15 L 5 15 Z" fill="#0A0F10" />
          <ellipse cx="15" cy="5" rx="15" ry="3" fill="#2DD4BF" opacity="0.3" />
        </g>
      </svg>

      {/* Floating help text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '🌳 ¡Bendiciones Cosechadas del Árbol de la Fidelidad! 🌳' : '🍂 Toca las hojas doradas para cosechar las bendiciones'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 7. MOUNTAIN VIEW DRAWING (CAPÍTULO 7)
// ==========================================
interface MountainViewDrawingProps {
  litRegions: string[];
  onToggleRegion: (regionId: string) => void;
  isSolved: boolean;
}

export function MountainViewDrawing({ litRegions, onToggleRegion, isSolved }: MountainViewDrawingProps) {
  const regions = [
    { id: 'meadow', label: 'Prado del Comienzo', color: '#10B981', x: 80, y: 155, icon: '🌸' },
    { id: 'bridge', label: 'Puente de Gracia', color: '#F59E0B', x: 160, y: 145, icon: '🌉' },
    { id: 'forest', label: 'Bosque del Silencio', color: '#3B82F6', x: 240, y: 152, icon: '🌲' },
    { id: 'tree', label: 'Árbol Sagrado', color: '#8B5CF6', x: 320, y: 148, icon: '🌳' }
  ];

  return (
    <div className="relative w-full h-56 bg-[#040814] rounded-2xl overflow-hidden border border-indigo-950 shadow-inner">
      {/* Twilight deep stellar sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0518] via-[#0E162D] to-[#1D1B44]" />

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${(i * 11) % 45 + 3}%`,
              left: `${(i * 17) % 95 + 2}%`,
            }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>

      {/* Falling star effect */}
      <motion.div
        className="absolute w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent rotate-[-25deg]"
        style={{ top: '15%', left: '-10%' }}
        animate={{ x: ['0vw', '110vw'], y: ['0vh', '50vh'] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 12, ease: 'easeIn' }}
      />

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 relative select-none">
        {/* Panoramic mountain silhouettes below */}
        {/* Left tall peak */}
        <polygon points="0,200 90,95 180,200" fill="#0C1020" />
        {/* Middle valley hill */}
        <path d="M 80 200 Q 200 130 320 200 Z" fill="#070A16" />

        {/* Beacon areas lit up dynamically based on state */}
        {regions.map((r) => {
          const isLit = litRegions.includes(r.id);
          return (
            <g key={r.id}>
              {isLit && (
                <g>
                  {/* Glowing beam of light from sky down to region */}
                  <polygon
                    points={`${r.x},0 ${r.x - 20},200 ${r.x + 20},200`}
                    fill={r.color}
                    opacity="0.06"
                  />
                  {/* Region land glow halo */}
                  <ellipse cx={r.x} cy={r.y} rx="32" ry="12" fill={r.color} opacity="0.18" />
                  <motion.circle
                    cx={r.x}
                    cy={r.y}
                    r="8"
                    fill={r.color}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </g>
              )}

              {/* Beacon Clickable button */}
              <g transform={`translate(${r.x}, ${r.y})`}>
                <motion.g
                  onClick={() => onToggleRegion(r.id)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.25 }}
                >
                  <circle cx="0" cy="0" r="11" fill="#FAF5EA" stroke={isLit ? r.color : '#4B5563'} strokeWidth="1.5" className="shadow" />
                  <text x="0" y="3" textAnchor="middle" fontSize="9">{r.icon}</text>
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* Peak Summit on top right with girl silhouette */}
        <g transform="translate(230, 60)">
          {/* Summit rock ledge */}
          <path d="M 0 50 L 50 15 L 120 25 L 170 140 Z" fill="#060A16" />
          <path d="M 50 15 Q 80 18 120 25" stroke="#1D243A" strokeWidth="2.5" fill="none" />

          {/* Girl silhouette standing tall, hair blowing, hands slightly open in thanksgiving */}
          <g transform="translate(80, -32) scale(0.68)">
            {/* Hair strands waving */}
            <motion.path
              d="M 12 30 Q -2 33 -6 45 M 12 25 Q -6 20 -10 32"
              fill="none"
              stroke="#040814"
              strokeWidth="2.5"
              animate={{ rotate: [-2, 4, -2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Cloak / Dress blowing in wind */}
            <motion.path
              d="M 15 45 C 5 80 -12 75 0 80 Q 25 80 23 45 Z"
              fill="#040814"
              animate={{ skewX: [-3, 3, -3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="15" cy="30" r="8" fill="#040814" />
            <line x1="12" y1="80" x2="11" y2="92" stroke="#040814" strokeWidth="2.5" />
            <line x1="18" y1="80" x2="19" y2="92" stroke="#040814" strokeWidth="2.5" />
          </g>
        </g>
      </svg>

      {/* Helper text bottom */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none select-none">
        <span className="font-mono text-[9px] text-[#F3F4F6] uppercase tracking-widest font-bold">
          {isSolved ? '🏔️ ¡Toda tu vida resplandece bajo Su Fidelidad!' : '🏔️ Toca los iconos abajo para iluminar las paradas de tu camino'}
        </span>
      </div>
    </div>
  );
}
