import { motion } from 'motion/react';

interface CabinDrawingProps {
  fireIntensity: number; // 1 to 3
  isSolved: boolean;
}

export function CabinDrawing({ fireIntensity, isSolved }: CabinDrawingProps) {
  // Generate random embers
  const embers = Array.from({ length: fireIntensity * 4 });

  return (
    <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden border border-amber-900/30 shadow-inner flex items-center justify-center">
      {/* Night Sky with twinkling stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#091118] to-[#122534] opacity-90" />
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${(i * 17) % 80 + 10}%`,
              left: `${(i * 23) % 90 + 5}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Snowy Mountains in Background */}
        <polygon points="40,160 110,60 180,160" fill="#1b2a3a" />
        <polygon points="75,110 110,60 145,110" fill="#e2e8f0" opacity="0.8" />
        <polygon points="160,160 230,80 300,160" fill="#182736" />
        <polygon points="195,120 230,80 265,120" fill="#e2e8f0" opacity="0.8" />

        {/* Snow covered Pine Trees */}
        <g transform="translate(30, 110) scale(0.6)">
          <polygon points="30,80 10,130 50,130" fill="#0f1f1a" />
          <polygon points="30,50 15,90 45,90" fill="#142b23" />
          <polygon points="30,20 20,55 40,55" fill="#1a3a2f" />
          <path d="M25,130 L35,130 L35,150 L25,150 Z" fill="#2d1c10" />
          {/* Snow caps */}
          <polygon points="30,20 25,35 35,35" fill="#f8fafc" />
          <polygon points="30,50 22,65 38,65" fill="#f8fafc" />
        </g>
        
        <g transform="translate(310, 100) scale(0.7)">
          <polygon points="30,80 10,130 50,130" fill="#0f1f1a" />
          <polygon points="30,50 15,90 45,90" fill="#142b23" />
          <path d="M25,130 L35,130 L35,150 L25,150 Z" fill="#2d1c10" />
          <polygon points="30,50 22,65 38,65" fill="#f8fafc" />
        </g>

        {/* Snowy Ground */}
        <path d="M 0 160 Q 150 145 250 165 T 400 155 L 400 200 L 0 200 Z" fill="#f1f5f9" />

        {/* The Wooden Cabin */}
        <g transform="translate(140, 85)">
          {/* Cabin Base */}
          <rect x="20" y="40" width="100" height="45" fill="#6d4c41" rx="2" />
          {/* Logs layers */}
          <line x1="20" y1="50" x2="120" y2="50" stroke="#4e342e" strokeWidth="2" />
          <line x1="20" y1="60" x2="120" y2="60" stroke="#4e342e" strokeWidth="2" />
          <line x1="20" y1="70" x2="120" y2="70" stroke="#4e342e" strokeWidth="2" />
          <line x1="20" y1="80" x2="120" y2="80" stroke="#4e342e" strokeWidth="2" />

          {/* Door */}
          <rect x="85" y="52" width="22" height="33" fill="#3e2723" rx="1" />
          <circle cx="102" cy="68" r="1.5" fill="#d4af37" />

          {/* Window with golden glow */}
          <rect x="35" y="50" width="25" height="20" fill="#ffb300" rx="2" opacity="0.9" />
          <line x1="47.5" y1="50" x2="47.5" y2="70" stroke="#3e2723" strokeWidth="1" />
          <line x1="35" y1="60" x2="60" y2="60" stroke="#3e2723" strokeWidth="1" />
          {/* Window Light cast */}
          <polygon points="35,60 0,105 45,105 60,60" fill="#ffd54f" opacity="0.15" />

          {/* Chimney */}
          <rect x="100" y="10" width="12" height="25" fill="#424242" />
          <rect x="97" y="7" width="18" height="4" fill="#212121" />

          {/* Roof */}
          <polygon points="10,40 70,10 130,40" fill="#8d6e63" />
          <polygon points="12,40 70,12 128,40" stroke="#4e342e" strokeWidth="1" />
          {/* Snow on Roof */}
          <path d="M 10 40 Q 70 10 130 40 L 125 35 Q 70 8 15 35 Z" fill="#f8fafc" />

          {/* Chimney Smoke */}
          <g transform="translate(106, 5)">
            <motion.circle
              cx="0"
              cy="-10"
              r="4"
              fill="#e2e8f0"
              opacity="0.6"
              animate={{ y: [-5, -45], x: [0, 8, -5], scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="0"
              cy="-10"
              r="3"
              fill="#cbd5e1"
              opacity="0.5"
              animate={{ y: [-5, -55], x: [0, -6, 10], scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
          </g>
        </g>

        {/* Campfire outside */}
        <g transform="translate(115, 155)">
          {/* Campfire Logs */}
          <line x1="-15" y1="5" x2="15" y2="-5" stroke="#3e2723" strokeWidth="5" strokeLinecap="round" />
          <line x1="15" y1="5" x2="-15" y2="-5" stroke="#3e2723" strokeWidth="5" strokeLinecap="round" />
          
          {/* Fire Glow behind */}
          <circle cx="0" cy="-5" r={15 + fireIntensity * 10} fill="#ff6d00" opacity="0.25" />
          <circle cx="0" cy="-5" r={8 + fireIntensity * 6} fill="#ffb300" opacity="0.4" />

          {/* Flickering Fire Flame */}
          <motion.path
            d="M -10,0 Q -15,-20 0,-35 Q 15,-20 10,0 Z"
            fill="#ff3d00"
            animate={{
              scaleY: [1, 1.2, 0.9, 1.1, 1],
              scaleX: [1, 0.9, 1.1, 0.95, 1],
              skewX: [-2, 2, -1, 3, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            originY={1}
          />
          <motion.path
            d="M -6,0 Q -10,-15 0,-28 Q 10,-15 6,0 Z"
            fill="#ff9100"
            animate={{
              scaleY: [1, 1.3, 0.85, 1.15, 1],
              scaleX: [1, 0.85, 1.1, 0.9, 1],
              skewX: [2, -2, 3, -1, 0]
            }}
            transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            originY={1}
          />
          <motion.path
            d="M -3,0 Q -5,-10 0,-18 Q 5,-10 3,0 Z"
            fill="#ffea00"
            animate={{
              scaleY: [1, 1.4, 0.8, 1.2, 1],
              originY: 1
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            originY={1}
          />
        </g>
      </svg>

      {/* Floating Animated Sparks/Embers based on Fire Intensity */}
      <div className="absolute inset-x-0 bottom-4 h-24 pointer-events-none z-20">
        {embers.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
            style={{
              bottom: "20px",
              left: `${35 + (i * 123) % 30}%`, // Centered around the campfire (which is at roughly 115px / 400px ~ 28%)
            }}
            animate={{
              y: [-10, -90 - (i % 3) * 20],
              x: [0, (i % 2 === 0 ? 15 : -15) + (i % 5)],
              opacity: [1, 0.8, 0],
              scale: [1, 1.5, 0.5],
            }}
            transition={{
              duration: 1.5 + (i % 2) * 0.8,
              repeat: Infinity,
              delay: (i * 0.35) % 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-emerald-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-emerald-400/40 z-30 flex items-center gap-1 animate-bounce">
          <span>🔥</span> CALIENTITA
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface OceanDrawingProps {
  currentWaveIndex: number;
  selectedOrder: number[];
  isSolved: boolean;
  onWaveClick?: (waveIndex: number) => void;
}

export function OceanDrawing({ currentWaveIndex, selectedOrder, isSolved, onWaveClick }: OceanDrawingProps) {
  return (
    <div className="relative w-full h-48 bg-cyan-950 rounded-xl overflow-hidden border border-cyan-800/30 shadow-inner flex items-center justify-center">
      {/* Sunset sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f97316] via-[#ec4899] to-[#083344] opacity-90" />
      
      {/* Sun sinking */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-t from-[#fef08a] to-[#f59e0b] shadow-[0_0_40px_rgba(245,158,11,0.6)]"
        style={{ bottom: "25%" }}
        animate={isSolved ? { y: [0, 8, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Clouds */}
      <motion.div
        className="absolute h-6 w-32 bg-white/20 rounded-full blur-[1px]"
        style={{ top: "15%", left: "10%" }}
        animate={{ x: [-20, 30, -20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-4 w-24 bg-white/10 rounded-full blur-[1px]"
        style={{ top: "25%", right: "12%" }}
        animate={{ x: [20, -30, 20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Golden sea reflection */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0e7490]/40 to-transparent pointer-events-none" />

      {/* SVG Waves */}
      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Palm tree silhouettes at edges */}
        <path d="M -10,200 Q 30,120 10,70 Q -5,110 -15,200 Z" fill="#082f49" />
        <path d="M 10,70 C 15,60 35,55 55,65 C 40,70 25,75 10,70 Z" fill="#082f49" />
        <path d="M 10,70 C 5,60 -15,55 -35,65 C -20,70 -5,75 10,70 Z" fill="#082f49" />
        <path d="M 10,70 C 20,80 35,90 40,110 C 30,100 20,90 10,70 Z" fill="#082f49" />

        {/* Wave 3 (Back) */}
        <motion.path
          d="M 0 140 Q 100 130 200 140 T 400 140 L 400 200 L 0 200 Z"
          fill="#164e63"
          opacity="0.8"
          className="cursor-pointer hover:fill-cyan-800 transition-colors"
          onClick={() => onWaveClick?.(2)}
          animate={{
            d: [
              "M 0 140 Q 100 130 200 140 T 400 140 L 400 200 L 0 200 Z",
              "M 0 143 Q 100 135 200 138 T 400 143 L 400 200 L 0 200 Z",
              "M 0 140 Q 100 130 200 140 T 400 140 L 400 200 L 0 200 Z"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Stamp order indicator on wave 3 */}
        {selectedOrder.includes(2) && (
          <circle cx="280" cy="155" r="10" fill="#e4c87a" />
        )}
        {selectedOrder.includes(2) && (
          <text x="280" y="159" fill="#1e1b4b" fontSize="11" fontWeight="bold" textAnchor="middle">
            {selectedOrder.indexOf(2) + 1}
          </text>
        )}

        {/* Wave 2 (Middle) */}
        <motion.path
          d="M 0 155 Q 100 165 200 150 T 400 160 L 400 200 L 0 200 Z"
          fill="#0e7490"
          opacity="0.9"
          className="cursor-pointer hover:fill-cyan-700 transition-colors"
          onClick={() => onWaveClick?.(1)}
          animate={{
            d: [
              "M 0 155 Q 100 165 200 150 T 400 160 L 400 200 L 0 200 Z",
              "M 0 150 Q 100 155 200 155 T 400 152 L 400 200 L 0 200 Z",
              "M 0 155 Q 100 165 200 150 T 400 160 L 400 200 L 0 200 Z"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {selectedOrder.includes(1) && (
          <circle cx="200" cy="170" r="10" fill="#e4c87a" />
        )}
        {selectedOrder.includes(1) && (
          <text x="200" y="174" fill="#1e1b4b" fontSize="11" fontWeight="bold" textAnchor="middle">
            {selectedOrder.indexOf(1) + 1}
          </text>
        )}

        {/* Wave 1 (Front) */}
        <motion.path
          d="M 0 175 Q 100 168 200 178 T 400 172 L 400 200 L 0 200 Z"
          fill="#0891b2"
          className="cursor-pointer hover:fill-cyan-600 transition-colors"
          onClick={() => onWaveClick?.(0)}
          animate={{
            d: [
              "M 0 175 Q 100 168 200 178 T 400 172 L 400 200 L 0 200 Z",
              "M 0 178 Q 100 176 200 170 T 400 179 L 400 200 L 0 200 Z",
              "M 0 175 Q 100 168 200 178 T 400 172 L 400 200 L 0 200 Z"
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {selectedOrder.includes(0) && (
          <circle cx="100" cy="186" r="10" fill="#e4c87a" />
        )}
        {selectedOrder.includes(0) && (
          <text x="100" y="190" fill="#1e1b4b" fontSize="11" fontWeight="bold" textAnchor="middle">
            {selectedOrder.indexOf(0) + 1}
          </text>
        )}

        {/* Small sailing boat drifting */}
        <g transform="translate(130, 115) scale(0.6)">
          <motion.g
            animate={{
              y: [0, 5, 0],
              rotate: [-4, 6, -4]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon points="10,20 30,-5 30,20" fill="#f8fafc" />
            <path d="M 5 20 Q 25 28 45 20 L 40 28 L 10 28 Z" fill="#78350f" />
          </motion.g>
        </g>
      </svg>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-amber-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-amber-400/40 z-30 flex items-center gap-1 animate-pulse">
          <span>🌊</span> FIEL MAREA
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface XilitlaDrawingProps {
  selectedStairs: string | null;
  isSolved: boolean;
  onStairsClick?: (stairId: string) => void;
}

export function XilitlaDrawing({ selectedStairs, isSolved, onStairsClick }: XilitlaDrawingProps) {
  return (
    <div className="relative w-full h-48 bg-[#1e1428] rounded-xl overflow-hidden border border-purple-900/30 shadow-inner flex items-center justify-center">
      {/* Surreal starry space glow in the background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#130722] via-[#2d1440] to-[#122e23] opacity-90" />
      
      {/* Big glowing neon portal at the top center */}
      <div className="absolute top-4 w-16 h-28 rounded-t-full bg-gradient-to-b from-[#e879f9]/20 to-transparent blur-[6px] border-t border-x border-fuchsia-400/30" />

      {/* Distant stars */}
      <div className="absolute inset-x-0 top-0 h-28">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-fuchsia-200 rounded-full"
            style={{
              top: `${(i * 12) % 60 + 5}%`,
              left: `${(i * 19) % 90 + 5}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5 + (i % 2), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Surreal Pillars (Xilitla style Concrete Columns) */}
        <g opacity="0.8">
          <rect x="50" y="30" width="16" height="150" fill="#3c2f4c" rx="2" />
          <path d="M 45,30 Q 58,15 71,30 Z" fill="#2d223a" />
          <rect x="330" y="40" width="16" height="140" fill="#3c2f4c" rx="2" />
          <path d="M 325,40 Q 338,25 351,40 Z" fill="#2d223a" />
          <rect x="192" y="10" width="16" height="60" fill="#3c2f4c" rx="2" />
          <path d="M 187,10 Q 200,-5 213,10 Z" fill="#2d223a" />
        </g>

        {/* Left stair group: Spiral Stairs (A) */}
        <g
          className="cursor-pointer group"
          onClick={() => onStairsClick?.('spiral')}
        >
          <motion.path
            d="M 50,150 L 90,135 L 90,140 L 50,155 Z"
            fill={selectedStairs === 'spiral' ? '#e4c87a' : '#4f3e62'}
            stroke="#11081c"
            whileHover={{ y: -2 }}
          />
          <path d="M 55,140 L 95,125 L 95,130 L 55,145 Z" fill={selectedStairs === 'spiral' ? '#e4c87a' : '#433454'} stroke="#11081c" />
          <path d="M 60,130 L 100,115 L 100,120 L 60,135 Z" fill={selectedStairs === 'spiral' ? '#e4c87a' : '#392a4a'} stroke="#11081c" />
          <path d="M 65,120 L 105,105 L 105,110 L 65,125 Z" fill={selectedStairs === 'spiral' ? '#e4c87a' : '#2f213f'} stroke="#11081c" />
          <path d="M 70,110 L 110,95 L 110,100 L 70,115 Z" fill={selectedStairs === 'spiral' ? '#e4c87a' : '#2a1c38'} stroke="#11081c" />
          
          <text x="80" y="165" fill="#f6ebd9" fontSize="9" fontFamily="monospace" opacity="0.7">
            A [Espiral]
          </text>
        </g>

        {/* Center surreal arch & door stairs (B) */}
        <g
          className="cursor-pointer"
          onClick={() => onStairsClick?.('sky_door')}
        >
          {/* Portal Stairs climbing up into center sky */}
          <path d="M 170,120 L 230,120 L 225,125 L 175,125 Z" fill={selectedStairs === 'sky_door' ? '#e4c87a' : '#4d4a4d'} stroke="#11081c" />
          <path d="M 175,110 L 225,110 L 220,115 L 180,115 Z" fill={selectedStairs === 'sky_door' ? '#e4c87a' : '#423f42'} stroke="#11081c" />
          <path d="M 180,100 L 220,100 L 215,105 L 185,105 Z" fill={selectedStairs === 'sky_door' ? '#e4c87a' : '#383538'} stroke="#11081c" />
          <path d="M 185,90 L 215,90 L 210,95 L 190,95 Z" fill={selectedStairs === 'sky_door' ? '#e4c87a' : '#2e2b2e'} stroke="#11081c" />
          <path d="M 190,80 L 210,80 L 205,85 L 195,85 Z" fill={selectedStairs === 'sky_door' ? '#e4c87a' : '#242124'} stroke="#11081c" />

          {/* Doorway frame */}
          <path d="M 190,80 L 190,50 Q 200,38 210,50 L 210,80 Z" fill="none" stroke={selectedStairs === 'sky_door' ? '#e4c87a' : '#713f12'} strokeWidth="2.5" />
          
          {/* Glow inside door */}
          <path d="M 191,80 L 191,51 Q 200,40 209,51 L 209,80 Z" fill="#f43f5e" opacity={selectedStairs === 'sky_door' ? 0.8 : 0.2} />

          <text x="200" y="142" fill="#f6ebd9" fontSize="9" fontFamily="monospace" opacity="0.7" textAnchor="middle">
            B [Puerta]
          </text>
        </g>

        {/* Right surreal tilted tower stairs (C) */}
        <g
          className="cursor-pointer"
          onClick={() => onStairsClick?.('tilted')}
        >
          {/* Tilted column stairs */}
          <g transform="rotate(-15, 300, 120)">
            <rect x="290" y="60" width="22" height="110" fill="#3b2b4c" rx="1" />
            <line x1="290" y1="80" x2="312" y2="80" stroke="#11081c" strokeWidth="2" />
            <line x1="290" y1="100" x2="312" y2="100" stroke="#11081c" strokeWidth="2" />
            <line x1="290" y1="120" x2="312" y2="120" stroke="#11081c" strokeWidth="2" />
            <line x1="290" y1="140" x2="312" y2="140" stroke="#11081c" strokeWidth="2" />
            <line x1="290" y1="160" x2="312" y2="160" stroke="#11081c" strokeWidth="2" />
          </g>
          {/* Light glow on steps if selected */}
          {selectedStairs === 'tilted' && (
            <g transform="rotate(-15, 300, 120)" opacity="0.7">
              <rect x="290" y="60" width="22" height="110" fill="#e4c87a" rx="1" />
            </g>
          )}

          <text x="300" y="165" fill="#f6ebd9" fontSize="9" fontFamily="monospace" opacity="0.7" textAnchor="middle">
            C [Torre]
          </text>
        </g>

        {/* Jungle Leaves hanging down */}
        <g fill="#14532d" opacity="0.8">
          {/* Top-left vine */}
          <path d="M 0,0 Q 40,20 60,0 C 50,15 30,20 0,0 Z" />
          <path d="M 30,8 Q 50,45 25,60 C 20,40 25,20 30,8 Z" />
          <path d="M 50,5 Q 70,30 85,15 C 75,10 65,5 50,5 Z" />
          {/* Top-right vine */}
          <path d="M 400,0 Q 360,30 330,0 C 350,20 380,10 400,0 Z" />
          <path d="M 350,10 Q 330,55 355,70 C 365,45 360,25 350,10 Z" />
        </g>
      </svg>

      {/* Little floating fireflies in the jungle */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-lime-400 blur-[1px]"
            style={{
              bottom: "20%",
              left: `${15 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 10, -10, 0],
              x: [0, 10, -15, 5, 0],
              opacity: [0.2, 0.9, 0.3, 0.9, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-purple-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-purple-400/40 z-30 flex items-center gap-1">
          <span>🌿</span> CURIO-SELVA
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface VillageTableDrawingProps {
  selectedItems: string[];
  isSolved: boolean;
}

export function VillageTableDrawing({ selectedItems, isSolved }: VillageTableDrawingProps) {
  return (
    <div className="relative w-full h-48 bg-[#3d261c] rounded-xl overflow-hidden border border-amber-950/30 shadow-inner flex items-center justify-center">
      {/* Background cozy rustic kitchen / wall texture */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1f100a] via-[#3d2115] to-[#2c1a10] opacity-90" />
      
      {/* Warm hanging pendant lamp glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-radial-gradient from-amber-500/20 to-transparent blur-xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-zinc-600" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-4 bg-zinc-700 rounded-t-full" />
      <div className="absolute top-14 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-200 rounded-full blur-[2px] animate-pulse" />

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Wildflower pot on shelf in background */}
        <g transform="translate(40, 40) scale(0.7)" opacity="0.6">
          <rect x="-20" y="40" width="40" height="5" fill="#1e0f0a" />
          <rect x="-10" y="20" width="20" height="20" fill="#a0522d" rx="2" />
          {/* Leaves */}
          <path d="M -5,20 Q -20,-10 -5,-5 Z" fill="#1b4332" />
          <path d="M 5,20 Q 20,-10 5,-5 Z" fill="#1b4332" />
          <path d="M 0,20 Q 0,-15 10,-10 Z" fill="#2d6a4f" />
        </g>

        {/* The Wooden Table (Perspective plate) */}
        <polygon points="50,130 350,130 380,200 20,200" fill="#8b5a2b" stroke="#5c3a21" strokeWidth="2.5" />
        {/* Table cloth (checkered pattern overlay runner) */}
        <polygon points="130,130 270,130 290,200 110,200" fill="#fee2e2" opacity="0.9" />
        {/* Red checkers lines */}
        <g stroke="#ef4444" strokeWidth="1.5" opacity="0.3">
          <line x1="150" y1="130" x2="135" y2="200" />
          <line x1="170" y1="130" x2="160" y2="200" />
          <line x1="190" y1="130" x2="185" y2="200" />
          <line x1="210" y1="130" x2="210" y2="200" />
          <line x1="230" y1="130" x2="235" y2="200" />
          <line x1="250" y1="130" x2="260" y2="200" />
          {/* Horizontals */}
          <line x1="125" y1="140" x2="275" y2="140" />
          <line x1="120" y1="155" x2="280" y2="155" />
          <line x1="115" y1="170" x2="285" y2="170" />
          <line x1="110" y1="185" x2="290" y2="185" />
        </g>

        {/* --- Table Items that spawn when selected --- */}
        
        {/* 1. Pan (Bread) */}
        <g transform="translate(145, 150)" opacity={selectedItems.includes('🍞 Pan') ? 1 : 0.08} className="transition-opacity duration-300">
          {/* Wood Board */}
          <ellipse cx="0" cy="15" rx="25" ry="10" fill="#a0522d" />
          {/* Bread loaf */}
          <path d="M -15,12 C -18,0 18,0 15,12 Z" fill="#d2b48c" stroke="#8b5a2b" strokeWidth="1" />
          <path d="M -15,12 Q 0,16 15,12 L 12,18 Q 0,22 -12,18 Z" fill="#cd853f" />
          {/* Score marks on bread */}
          <line x1="-8" y1="6" x2="-4" y2="12" stroke="#5c3a21" strokeWidth="1.5" />
          <line x1="-1" y1="5" x2="3" y2="11" stroke="#5c3a21" strokeWidth="1.5" />
          <line x1="6" y1="6" x2="10" y2="12" stroke="#5c3a21" strokeWidth="1.5" />
        </g>

        {/* 2. Café (Coffee cup) */}
        <g transform="translate(255, 155)" opacity={selectedItems.includes('☕ Café') ? 1 : 0.08} className="transition-opacity duration-300">
          {/* Saucer */}
          <ellipse cx="0" cy="15" rx="16" ry="7" fill="#f8fafc" stroke="#e2e8f0" />
          {/* Cup body */}
          <path d="M -10,3 L 10,3 L 8,13 Q 0,16 -8,13 Z" fill="#0284c7" />
          {/* Cup handle */}
          <path d="M 9,5 Q 14,8 8,11" fill="none" stroke="#0284c7" strokeWidth="2.5" />
          {/* Coffee inside liquid */}
          <ellipse cx="0" cy="3" rx="9" ry="3" fill="#3e2723" />
          
          {/* Steam puffs */}
          {selectedItems.includes('☕ Café') && (
            <g transform="translate(0, -5)">
              <motion.path
                d="M -2,0 Q 2,-10 -2,-20 T 2,-30"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ y: [0, -10], opacity: [0.8, 0], scale: [0.8, 1.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.path
                d="M 2,-2 Q -2,-12 2,-22 T -2,-32"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ y: [0, -12], opacity: [0.8, 0], scale: [0.7, 1.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
            </g>
          )}
        </g>

        {/* 3. Una historia (A book) */}
        <g transform="translate(200, 175) scale(0.9)" opacity={selectedItems.includes('📖 Una historia') ? 1 : 0.08} className="transition-opacity duration-300">
          {/* Open Book */}
          <path d="M -25,12 Q -12,5 0,12 Q 12,5 25,12 L 22,25 Q 11,18 0,25 Q -11,18 -22,25 Z" fill="#fafaf9" stroke="#d6d3d1" />
          <path d="M -25,14 L -25,12 Q -12,5 0,12" fill="none" stroke="#ef4444" strokeWidth="2" /> {/* Red cover spine */}
          <path d="M 25,14 L 25,12 Q 12,5 0,12" fill="none" stroke="#ef4444" strokeWidth="2" />
          {/* Written line lines */}
          <line x1="-18" y1="12" x2="-6" y2="10" stroke="#78716c" strokeWidth="1" />
          <line x1="-18" y1="15" x2="-8" y2="13" stroke="#78716c" strokeWidth="1" />
          <line x1="-18" y1="18" x2="-5" y2="16" stroke="#78716c" strokeWidth="1" />
          
          <line x1="6" y1="10" x2="18" y2="12" stroke="#78716c" strokeWidth="1" />
          <line x1="8" y1="13" x2="18" y2="15" stroke="#78716c" strokeWidth="1" />
          <line x1="5" y1="16" x2="18" y2="18" stroke="#78716c" strokeWidth="1" />
        </g>

        {/* 4. Silla Extra (Behind the table) */}
        <g transform="translate(200, 110) scale(0.7)" opacity={selectedItems.includes('🪑 Silla extra') ? 1 : 0.08} className="transition-opacity duration-300">
          {/* Cozy wooden chair back rest */}
          <rect x="-18" y="0" width="36" height="5" fill="#5c3a21" rx="1" />
          <line x1="-12" y1="5" x2="-12" y2="35" stroke="#5c3a21" strokeWidth="3.5" />
          <line x1="12" y1="5" x2="12" y2="35" stroke="#5c3a21" strokeWidth="3.5" />
          <line x1="0" y1="5" x2="0" y2="35" stroke="#5c3a21" strokeWidth="2" />
          {/* Chair seat */}
          <polygon points="-22,35 22,35 25,45 -25,45" fill="#a16207" stroke="#854d0e" strokeWidth="1" />
        </g>
      </svg>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-amber-700/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-amber-500/40 z-30 flex items-center gap-1">
          <span>🍞</span> COSECHA CÁLIDA
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface SunriseDrawingProps {
  currentStepIndex: number;
  isSolved: boolean;
  onStepClick?: (stepIndex: number) => void;
}

export function SunriseDrawing({ currentStepIndex, isSolved, onStepClick }: SunriseDrawingProps) {
  // Sunrise color interpolations:
  // Step 0: Night (dark purple/indigo)
  // Step 1: Deep blue with faint glow
  // Step 2: Dawn (magenta/purple border)
  // Step 3: Early light (orange horizon)
  // Solved: Full bright golden yellow daylight
  
  let skyGradient = 'from-[#0f172a] via-[#1e1b4b] to-[#311042]';
  if (currentStepIndex === 1) skyGradient = 'from-[#0b1329] via-[#15203f] to-[#3a1d4a]';
  if (currentStepIndex === 2) skyGradient = 'from-[#111c3a] via-[#331c4e] to-[#702443]';
  if (currentStepIndex === 3) skyGradient = 'from-[#14234c] via-[#5b2245] to-[#c2410c]';
  if (isSolved) skyGradient = 'from-[#0369a1] via-[#bae6fd] to-[#fed7aa]';

  return (
    <div className={`relative w-full h-48 rounded-xl overflow-hidden border border-orange-950/20 shadow-inner flex items-center justify-center transition-all duration-1000 bg-gradient-to-b ${skyGradient}`}>
      {/* Sun rising */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-b from-amber-200 to-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.8)]"
        initial={{ bottom: "-15%" }}
        animate={{
          bottom: isSolved ? "28%" : (currentStepIndex * 10 - 15) + "%",
          scale: isSolved ? 1.2 : 1,
        }}
        transition={{ duration: 1.5, type: "spring" }}
      />

      {/* Twinkling Moon & Stars (fades out as steps advance) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: isSolved ? 0 : Math.max(0, 1 - currentStepIndex * 0.3) }}
      >
        {/* Crescent Moon */}
        <div className="absolute top-4 right-6 w-8 h-8 rounded-full bg-slate-100 shadow-[0_0_15px_rgba(241,245,249,0.5)] flex items-center justify-center">
          <div className="absolute top-0 right-2 w-7 h-8 rounded-full bg-[#111c3a] translate-x-1" />
        </div>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-yellow-100 rounded-full"
            style={{
              top: `${(i * 13) % 40 + 5}%`,
              left: `${(i * 27) % 85 + 5}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Mountain Silhouettes */}
        <polygon points="-20,200 80,100 200,200" fill={isSolved ? "#075985" : "#111827"} className="transition-colors duration-1000" />
        <polygon points="120,200 240,70 380,200" fill={isSolved ? "#0369a1" : "#0f172a"} className="transition-colors duration-1000" opacity="0.9" />
        <polygon points="250,200 320,120 420,200" fill={isSolved ? "#0284c7" : "#030712"} className="transition-colors duration-1000" opacity="0.95" />

        {/* Golden Sunrays in Solved mode */}
        {isSolved && (
          <g opacity="0.25" stroke="#fef08a" strokeWidth="2" strokeDasharray="4 2">
            <line x1="200" y1="120" x2="50" y2="40" />
            <line x1="200" y1="120" x2="120" y2="20" />
            <line x1="200" y1="120" x2="200" y2="10" />
            <line x1="200" y1="120" x2="280" y2="20" />
            <line x1="200" y1="120" x2="350" y2="40" />
          </g>
        )}

        {/* Trail points (interactive markers) */}
        {/* Step 1: Midnight Path */}
        <circle
          cx="60"
          cy="120"
          r="9"
          fill={currentStepIndex >= 1 ? "#e4c87a" : "#4b5563"}
          stroke="#1e293b"
          strokeWidth="1.5"
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onStepClick?.(0)}
        />
        <text x="60" y="123" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" className="pointer-events-none font-mono">1</text>

        {/* Step 2: Middle climb */}
        <circle
          cx="170"
          cy="110"
          r="9"
          fill={currentStepIndex >= 2 ? "#e4c87a" : "#4b5563"}
          stroke="#1e293b"
          strokeWidth="1.5"
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onStepClick?.(1)}
        />
        <text x="170" y="113" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" className="pointer-events-none font-mono">2</text>

        {/* Step 3: Near peak */}
        <circle
          cx="240"
          cy="85"
          r="9"
          fill={currentStepIndex >= 3 ? "#e4c87a" : "#4b5563"}
          stroke="#1e293b"
          strokeWidth="1.5"
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onStepClick?.(2)}
        />
        <text x="240" y="88" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" className="pointer-events-none font-mono">3</text>

        {/* Step 4: Peak (The sunrise view) */}
        <circle
          cx="320"
          cy="130"
          r="9"
          fill={isSolved ? "#e4c87a" : "#4b5563"}
          stroke="#1e293b"
          strokeWidth="1.5"
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onStepClick?.(3)}
        />
        <text x="320" y="133" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" className="pointer-events-none font-mono">4</text>

        {/* Tiny backpacker hiker icon climbing on trail */}
        <g transform={`translate(${currentStepIndex === 0 ? 40 : currentStepIndex === 1 ? 145 : currentStepIndex === 2 ? 220 : 300}, ${currentStepIndex === 0 ? 122 : currentStepIndex === 1 ? 112 : currentStepIndex === 2 ? 88 : 132}) scale(0.4)`}>
          <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
            <circle cx="10" cy="5" r="4" fill="#f43f5e" />
            <path d="M 5,10 Q 10,25 15,10 L 12,25 L 8,25 Z" fill="#3b82f6" />
            <rect x="2" y="10" width="4" height="8" fill="#f59e0b" rx="1" /> {/* backpack */}
          </motion.g>
        </g>
      </svg>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-sky-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-sky-400/40 z-30 flex items-center gap-1">
          <span>🌅</span> SABIO AMANECER
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface CandleDrawingProps {
  tapCount: number;
  targetCount: number;
  isSolved: boolean;
  windActive: boolean;
  onShieldClick?: () => void;
}

export function CandleDrawing({ tapCount, targetCount, isSolved, windActive, onShieldClick }: CandleDrawingProps) {
  return (
    <div className="relative w-full h-48 bg-[#181124] rounded-xl overflow-hidden border border-fuchsia-950/30 shadow-inner flex items-center justify-center">
      {/* Gothic stone chapel background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a18] via-[#1a1128] to-[#120c1d] opacity-90" />
      
      {/* Stone Arch Window outline */}
      <div className="absolute inset-y-4 inset-x-20 rounded-t-full border-4 border-zinc-800 bg-gradient-to-b from-purple-900/10 to-transparent flex items-center justify-center opacity-85">
        <div className="absolute inset-0.5 rounded-t-full border border-zinc-900" />
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none">
        {/* Candle Stand */}
        <rect x="185" y="145" width="30" height="6" fill="#78350f" rx="1" />
        <path d="M 195,145 L 197,125 L 203,125 L 205,145 Z" fill="#92400e" />
        
        {/* Wax candle body */}
        <rect x="192" y="75" width="16" height="50" fill="#fef08a" rx="1" />
        {/* Melting wax drips */}
        <path d="M 192,85 C 194,95 197,95 196,87" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 205,92 C 206,102 208,102 207,94" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />

        {/* Wick */}
        <line x1="200" y1="75" x2="200" y2="70" stroke="#374151" strokeWidth="1.5" />

        {/* Flame Halo Glow */}
        <circle cx="200" cy="62" r={24 + (windActive ? -5 : 4)} fill="#f59e0b" opacity="0.25" className="transition-all duration-300" />
        <circle cx="200" cy="62" r={14 + (windActive ? -3 : 2)} fill="#fef08a" opacity="0.35" className="transition-all duration-300" />

        {/* Candle Flame with interactive wind tilt */}
        <g transform="translate(200, 70)">
          <motion.path
            d="M -5,0 Q -8,-15 0,-25 Q 8,-15 5,0 Z"
            fill="#ea580c"
            animate={{
              scaleY: windActive ? [0.6, 0.9, 0.6] : [1, 1.15, 0.95, 1.05, 1],
              skewX: windActive ? [20, 28, 20] : [-3, 3, -2, 4, 0],
              x: windActive ? [4, 7, 4] : [0, 0.5, -0.5, 0],
            }}
            transition={{ duration: windActive ? 0.4 : 1, repeat: Infinity, ease: "easeInOut" }}
            originY={1}
          />
          <motion.path
            d="M -3,0 Q -5,-10 0,-18 Q 5,-10 3,0 Z"
            fill="#eab308"
            animate={{
              scaleY: windActive ? [0.7, 0.9, 0.7] : [1, 1.2, 0.9, 1.1, 1],
              skewX: windActive ? [18, 24, 18] : [2, -2, 3, -1, 0],
              x: windActive ? [3, 5, 3] : [0, 0.2, -0.2, 0],
            }}
            transition={{ duration: windActive ? 0.35 : 0.8, repeat: Infinity, ease: "easeInOut" }}
            originY={1}
          />
          <circle cx="0" cy="-3" r="2" fill="#0284c7" opacity="0.6" />
        </g>

        {/* Animated wind lines swooping from left to right */}
        {windActive && (
          <g stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
            <motion.line
              x1="-50" y1="50" x2="30" y2="52"
              animate={{ x: [-50, 450] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="-100" y1="70" x2="-20" y2="71"
              animate={{ x: [-50, 450] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
            />
            <motion.line
              x1="-80" y1="90" x2="0" y2="89"
              animate={{ x: [-50, 450] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.1 }}
            />
          </g>
        )}

        {/* Shield outline when user taps / clicks to protect */}
        {!isSolved && (
          <g
            className="cursor-pointer group"
            onClick={onShieldClick}
          >
            {/* Clickable transparent barrier shield around the flame */}
            <circle
              cx="200"
              cy="62"
              r="40"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4 2"
              className="group-hover:stroke-blue-400 transition-colors"
              opacity={windActive ? 0.8 : 0.25}
            />
            {/* Shield click invitation text */}
            <text x="200" y="112" fill="#93c5fd" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">
              {windActive ? "¡TOCA PARA PROTEGER!" : "[Toca para resguardar]"}
            </text>
          </g>
        )}
      </svg>

      {/* Progress Dots / Sparkles */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < tapCount
                ? "bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-110"
                : "bg-zinc-700"
            }`}
          />
        ))}
      </div>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-indigo-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-indigo-400/40 z-30 flex items-center gap-1">
          <span>🕯️</span> FE INQUEBRANTABLE
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------

interface LighthouseDrawingProps {
  beamAngle: number; // degrees -90 to 90
  isSolved: boolean;
  onRotateBeam?: (angle: number) => void;
}

export function LighthouseDrawing({ beamAngle, isSolved, onRotateBeam }: LighthouseDrawingProps) {
  // Let's create an interactive lighthouse beam!
  // Clicking left/right side of the scene updates the angle of rotation.
  
  // Is a lost boat lit? Let's say the boat is at roughly -45 degrees
  const isBoatLit = beamAngle < -20 && beamAngle > -65;
  // Is a whale lit? At roughly 45 degrees
  const isWhaleLit = beamAngle > 20 && beamAngle < 65;

  return (
    <div className="relative w-full h-48 bg-[#091524] rounded-xl overflow-hidden border border-sky-950/30 shadow-inner flex items-center justify-center">
      {/* Night Sky with deep oceanic blue gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040c1a] via-[#09182d] to-[#030912] opacity-95" />

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-200 rounded-full"
            style={{
              top: `${(i * 14) % 50 + 5}%`,
              left: `${(i * 26) % 90 + 5}%`,
            }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-full z-10 select-none" onClick={(e) => {
        // Calculate click angle to rotate beam!
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        // Center-x of lighthouse is around 200
        const relativeX = clickX - (rect.width / 2);
        const angle = Math.max(-80, Math.min(80, (relativeX / (rect.width / 2)) * 90));
        onRotateBeam?.(angle);
      }}>
        {/* Rocky Cliff */}
        <polygon points="160,200 180,130 220,130 240,200" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        <path d="M 150,200 Q 185,140 200,130 Q 215,140 250,200" fill="#0f172a" />

        {/* Seawater waves washing the cliff */}
        <path d="M 0,195 Q 100,185 200,195 T 400,195 L 400,200 L 0,200 Z" fill="#082f49" />

        {/* --- Hidden Objects illuminated by lighthouse beam --- */}
        
        {/* 1. Sailboat on the left (light up when beam points left) */}
        <g transform="translate(80, 160) scale(0.65)" opacity={isBoatLit ? 1 : 0.15} className="transition-all duration-300">
          <polygon points="10,20 30,-5 30,20" fill="#f8fafc" stroke="#94a3b8" />
          <path d="M 5,20 Q 25,26 45,20 L 40,28 L 10,28 Z" fill="#7c2d12" />
          {isBoatLit && (
            <circle cx="25" cy="5" r="22" fill="#fef08a" opacity="0.15" />
          )}
        </g>
        {isBoatLit && (
          <text x="80" y="140" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.9">
            ⛵ ¡Barco guiado!
          </text>
        )}

        {/* 2. Happy Whale on the right (light up when beam points right) */}
        <g transform="translate(300, 175) scale(0.55)" opacity={isWhaleLit ? 1 : 0.15} className="transition-all duration-300">
          {/* Whale body */}
          <path d="M 0,10 Q 15,-10 40,-5 Q 55,0 65,15 Q 50,25 35,20 L 0,10 Z" fill="#38bdf8" />
          {/* Tail */}
          <path d="M 62,15 L 75,5 L 70,20 L 62,15 Z" fill="#0284c7" />
          {/* Spout */}
          {isWhaleLit && (
            <motion.path
              d="M 25,-8 Q 25,-18 20,-16 M 25,-8 Q 30,-20 35,-16"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </g>
        {isWhaleLit && (
          <text x="320" y="150" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.9">
            🐳 ¡Salió a saludar!
          </text>
        )}

        {/* Lighthouse Tower Structure */}
        <g transform="translate(185, 45)">
          {/* Body columns */}
          <polygon points="3,85 7,15 23,15 27,85" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
          {/* Red Stripes */}
          <polygon points="4.2,65 5.5,45 24.5,45 25.8,65" fill="#ef4444" />
          <polygon points="6,25 6.6,15 23.4,15 24,25" fill="#ef4444" />

          {/* Gallery balcony */}
          <rect x="2" y="10" width="26" height="5" fill="#1e293b" rx="0.5" />
          
          {/* Lantern Room glass box */}
          <rect x="6" y="-5" width="18" height="15" fill="#cbd5e1" opacity="0.4" stroke="#1e293b" strokeWidth="1" />
          <line x1="15" y1="-5" x2="15" y2="10" stroke="#1e293b" />

          {/* Dome Roof */}
          <path d="M 5,-5 Q 15,-18 25,-5 Z" fill="#ef4444" stroke="#1e293b" strokeWidth="1" />
          <line x1="15" y1="-18" x2="15" y2="-22" stroke="#1e293b" strokeWidth="1.5" />

          {/* Glowing lens center */}
          <circle cx="15" cy="2" r="5" fill="#fef08a" className="animate-pulse" />
        </g>

        {/* Sweep Beacon Beam projecting from Lantern room (center is at x=200, y=47) */}
        <g transform="translate(200, 47)">
          <g transform={`rotate(${beamAngle})`}>
            {/* The sweeping triangle of bright golden fog light */}
            <polygon
              points="0,0 -80,220 80,220"
              fill="url(#beamGlow)"
              opacity="0.35"
              style={{ mixBlendMode: "screen" }}
            />
            {/* Central beam focus lines */}
            <line x1="0" y1="0" x2="-20" y2="220" stroke="#fef08a" strokeWidth="1.5" opacity="0.3" />
            <line x1="0" y1="0" x2="20" y2="220" stroke="#fef08a" strokeWidth="1.5" opacity="0.3" />
          </g>
        </g>

        {/* Grad definitions */}
        <defs>
          <linearGradient id="beamGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="40%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Guide label */}
      <div className="absolute bottom-2 text-[10px] text-sky-300 font-mono opacity-80 bg-sky-950/70 px-2 py-0.5 rounded-full border border-sky-800/40">
        Mueve el faro o toca a los lados para guiar barcos
      </div>

      {isSolved && (
        <div className="absolute top-2 right-2 bg-sky-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-sky-400/40 z-30 flex items-center gap-1">
          <span>🗼</span> FARO DE AMOR
        </div>
      )}
    </div>
  );
}
