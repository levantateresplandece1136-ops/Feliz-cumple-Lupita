import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playSynthesizedSound } from './ActivityEngine';

interface FinalCardProps {
  onReplay: () => void;
  coverImage?: string;
}

export function FinalCard({ onReplay, coverImage }: FinalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; duration: number; delay: number; shape: string }>>([]);
  const [step, setStep] = useState<'suitcase' | 'letter'>('suitcase');

  // Fire sound effect and launch confetti on load
  useEffect(() => {
    playSynthesizedSound('success');
    
    // Set up confetti pieces
    const colors = ['#C9A24B', '#0E6E7A', '#C9558B', '#E8985E', '#F6EBD9', '#10B981', '#F59E0B'];
    const shapes = ['rect', 'circle', 'triangle'];
    const pieces = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 0.5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfetti(pieces);
  }, [step]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const packedItems = [
    { icon: '🧭', name: 'Una brújula', reason: 'porque tu lealtad siempre marca el norte para quienes te rodean' },
    { icon: '🔑', name: 'Una llave', reason: 'porque contigo las puertas del corazón se abren sin miedo' },
    { icon: '📖', name: 'Un mapa viejo', reason: 'porque tu inteligencia siempre encuentra la ruta, aunque nadie más la vea' },
    { icon: '🎒', name: 'Una mochila resistente', reason: 'porque tu espíritu emprendedor siempre está listo para el siguiente salto' },
    { icon: '🐚', name: 'Una concha de mar', reason: 'porque tus consejos, como el mar, siempre dejan algo hermoso detrás' },
    { icon: '🕯️', name: 'Un farol pequeño', reason: 'porque tu interés genuino ilumina a quien esté cerca de ti' }
  ];

  const LETTER_TEXT = `Lupita...

Hoy quiero que sepas todo lo que veo en ti: tu lealtad que no se dobla, tu inteligencia que no descansa, tu manera de emprender sin miedo, la confianza que inspiras en quienes te rodean, tu palabra sabia cuando alguien la necesita, y ese interés genuino que tienes por las personas, siempre.

Este viaje no es solo un regalo, es un espejo. Cada lugar, cada cosa en tu maleta, es algo que ya llevas contigo.

Feliz cumpleaños, viajera. Que este nuevo año te lleve a lugares tan hermosos como los que tú creas para los demás.

Con todo mi cariño,
Tu amigo, Josue`;

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4">
      {/* Confetti canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute w-2 h-3"
            style={{
              left: `${c.left}%`,
              top: '-15px',
              backgroundColor: c.color,
              borderRadius: c.shape === 'circle' ? '50%' : '1px',
              clipPath: c.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 540 + Math.random() * 360],
              x: ['0px', `${(Math.random() - 0.5) * 80}px`],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              ease: 'linear',
              repeat: 1,
            }}
          />
        ))}
      </div>

      {/* Holographic wrapper */}
      <div
        className="w-full max-w-lg rounded-[24px] p-0.5 shadow-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #C9A24B, #0E6E7A, #C9558B, #E8985E, #C9A24B)',
          backgroundSize: '400% 400%',
          animation: 'holoGrad 8s ease infinite',
        }}
      >
        <style>{`
          @keyframes holoGrad {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>

        {/* The Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative rounded-[22px] bg-[#0E171E] text-white p-6 md:p-8 flex flex-col items-center select-none overflow-hidden min-h-[580px]"
        >
          {/* Holographic overlay layer driven by state mouse position */}
          <div
            className="absolute inset-0 rounded-[22px] pointer-events-none opacity-20 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0.15,
              background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.8) 0%, rgba(201,162,75,0.4) 30%, rgba(14,110,122,0.4) 60%, transparent 100%)`,
            }}
          />

          <div className="absolute inset-4 border border-white/5 rounded-[18px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {step === 'suitcase' ? (
              <motion.div
                key="suitcase"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center z-10"
              >
                {/* Profile Picture Frame */}
                {coverImage && (
                  <motion.div
                    className="relative w-20 h-20 rounded-full border-4 border-[#C9A24B] shadow-[0_0_20px_rgba(201,162,75,0.3)] overflow-hidden mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={coverImage} 
                      alt="Lupita" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}

                <div className="font-mono text-[9px] tracking-[0.3em] text-[#E4C87A] uppercase mb-1 text-center">
                  ✦ Tu maleta está lista ✦
                </div>
                <h2 className="font-serif italic font-bold text-2xl tracking-wide text-white text-center mb-1">
                  Todo esto ya lo llevas
                </h2>
                <p className="font-sans text-[11px] text-stone-300 text-center mb-6 max-w-sm">
                  No tuviste que empacar nada de esto. Siempre lo has traído contigo a donde sea que vayas.
                </p>

                {/* Grid of packed items */}
                <div className="grid grid-cols-2 gap-3 w-full mb-6">
                  {packedItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 100 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center hover:border-[#C9A24B]/50 transition-all group"
                      whileHover={{ y: -3, scale: 1.02 }}
                    >
                      <span className="text-2xl mb-1.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <strong className="text-[11px] text-[#E4C87A] tracking-wider uppercase font-mono mb-1">
                        {item.name}
                      </strong>
                      <span className="text-[9.5px] leading-relaxed text-stone-300 font-sans">
                        {item.reason}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => {
                    playSynthesizedSound('success');
                    setStep('letter');
                  }}
                  className="w-full max-w-[260px] py-3 bg-[#C9A24B] hover:bg-[#B38F3D] text-white rounded-full font-serif font-bold text-xs tracking-widest uppercase shadow-lg border-b-2 border-[#A27F33] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span>Leer una carta ✦</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center z-10"
              >
                <div className="font-mono text-[9px] tracking-[0.3em] text-[#E4C87A] uppercase mb-1 text-center">
                  ✦ Para ti, viajera ✦
                </div>
                <h2 className="font-serif italic font-bold text-2xl tracking-wide text-white text-center mb-4">
                  Feliz Cumpleaños
                </h2>

                {/* Letter Box styled like a elegant envelope letter paper */}
                <div className="w-full bg-[#FAF5EA] text-[#2A2118] rounded-xl p-6 md:p-8 shadow-2xl text-left border border-[#D5C2A5]/50 max-h-[340px] overflow-y-auto mb-6 relative">
                  <div className="absolute top-2 right-3 opacity-15 font-serif italic text-3xl font-extrabold select-none">
                    L
                  </div>
                  <pre className="font-serif text-[12.5px] leading-[1.8] text-justify whitespace-pre-wrap text-stone-800 italic">
                    {LETTER_TEXT}
                  </pre>
                </div>

                <div className="w-full flex flex-col gap-2.5 max-w-[280px]">
                  <motion.button
                    onClick={() => {
                      playSynthesizedSound('success');
                      setStep('suitcase');
                      onReplay();
                    }}
                    className="w-full py-2.5 rounded-full border border-[#E4C87A]/30 hover:bg-[#E4C87A]/10 active:bg-[#E4C87A]/20 text-[#E4C87A] font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>🔄 Volver a recorrer el viaje</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default FinalCard;
