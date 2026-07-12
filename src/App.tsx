import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ChevronRight, Award, Heart, Sparkles, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { TravelStop, UserProgress } from './types';
import { ambientAudio } from './utils/ambientAudio';

const lupitaCover = '/lupita_portrait.jpg';
import { PassportHeader } from './components/PassportHeader';
import { ActivityEngine, playSynthesizedSound } from './components/ActivityEngine';
import {
  MeadowDrawing,
  BridgeDrawing,
  ForestDoubtDrawing,
  TravelersDrawing,
  HeartbeatDrawing,
  GlowingTreeDrawing,
  MountainViewDrawing
} from './components/AnimeDrawings';

const stops: TravelStop[] = [
  {
    id: 1,
    place: "CAPÍTULO 1 · EL MILAGRO DEL COMIENZO",
    icon: "🌸",
    title: "El milagro de tu comienzo",
    virtue: "Esperanza, Propósito y Amor",
    text: "Antes de tu primer aliento, Dios ya había planeado tu existir. Exploras un enorme prado lleno de vida, donde cada flor susurra una promesa divina escrita en el Salmo 139. Fuiste creada con amor infinito, guardando un propósito eterno que el Padre trazó con Sus propias manos.",
    stamp: "COMIENZO · TRES FLORES",
    grad: "from-[#0d1f14] via-[#1f3d29] to-[#0a120d]",
    activity: {
      type: 'select-one',
      label: "El prado de la vida",
      prompt: "Recoge las tres flores divinas (Esperanza, Propósito y Amor) haciendo clic sobre ellas directamente en la ilustración para sellar este primer capítulo."
    }
  },
  {
    id: 2,
    place: "CAPÍTULO 2 · LOS PRIMEROS PASOS",
    icon: "🌉",
    title: "Los primeros pasos en el puente",
    virtue: "Resiliencia y Gracia",
    text: "Al cruzar el viejo puente de madera, las caídas y resbalones son inevitables. Pero en la escuela de la fe, la gracia de Dios transforma cada tropiezo: allí donde caes con debilidad, Su Espíritu hace brotar hermosas flores de sakura. Tu caminar está guardado por el Salmo 37: sus pasos son ordenados por el Señor.",
    stamp: "PUENTE · NUEVO CAMINAR",
    grad: "from-[#22150b] via-[#3a2211] to-[#120a05]",
    activity: {
      type: 'select-one',
      label: "El puente de la gracia",
      prompt: "Haz clic en 'Caminar sobre el puente' para avanzar 5 pasos, luego haz clic en cada una de las flores que brotan para recordar tus recuerdos más alegres de la infancia."
    }
  },
  {
    id: 3,
    place: "CAPÍTULO 3 · EL BOSQUE DE LAS DUDAS",
    icon: "🌲",
    title: "El bosque lluvioso de la fe",
    virtue: "Fortaleza y Fe",
    text: "La tormenta de la vida arrecia y el sendero se vuelve gris bajo la densa niebla. En medio de la soledad y la duda, parece que Dios guarda silencio. Pero mira al horizonte con los ojos de la fe: una pequeña luz dorada brilla constante en las alturas, recordándote Isaías 43: 'No temas, porque yo estoy contigo'.",
    stamp: "BOSQUE · LUZ INTERIOR",
    grad: "from-[#0a0f1d] via-[#171f33] to-[#060a14]",
    activity: {
      type: 'select-one',
      label: "Sendero de fe",
      prompt: "Haz clic sobre las 3 linternas de fe suspendidas en la lluvia para encenderlas, disipar la penumbra del bosque lluvioso y encontrar verdadera paz."
    }
  },
  {
    id: 4,
    place: "CAPÍTULO 4 · LOS COMPAÑEROS DEL VIAJE",
    icon: "👥",
    title: "Los compañeros de la ruta",
    virtue: "Comunión y Gratitud",
    text: "El bosque se despeja y la cálida luz del amanecer revela a otros viajeros. Dios ha puesto personas sumamente especiales en tu camino, portadoras de bendiciones únicas representadas en cinco objetos sagrados. Eclesiastés 4 nos recuerda la dulzura de la comunión: 'Mejores son dos que uno solo'.",
    stamp: "VIAJEROS · GRATITUD",
    grad: "from-[#221a0d] via-[#3d2f16] to-[#141008]",
    activity: {
      type: 'select-one',
      label: "Bitácora de compañerismo",
      prompt: "Toca a cada uno de tus 5 compañeros de ruta para conocer su regalo, e ingresa el nombre de la persona real que Dios usó para sostenerte en tu vida."
    }
  },
  {
    id: 5,
    place: "CAPÍTULO 5 · EL LATIDO DE LA ESPERANZA",
    icon: "❤️",
    title: "El latido de la gracia sostenida",
    virtue: "Sostén Divino y Milagro",
    text: "En un paisaje blanco de luz infinita, contemplas el lago del alma. Hubo un momento donde tu corazón físico necesitó ayuda. En medio de la oración unida familiar, la sabiduría de la ciencia médica y el latido que Dios milagrosamente restauró, Su gracia te sostuvo viva. Él sigue siendo el soberano autor de cada latido.",
    stamp: "LATIDO · GRACIA SOSTENIDA",
    grad: "from-[#111929] via-[#1f2b45] to-[#0a101b]",
    activity: {
      type: 'select-one',
      label: "El eco del corazón",
      prompt: "Pulsa sobre el corazón dorado 5 veces para sincronizar tu respiración y sintonizar tu alma con el ritmo de Su amor soberano."
    }
  },
  {
    id: 6,
    place: "CAPÍTULO 6 · LOS TESOROS OCULTOS",
    icon: "🌳",
    title: "Los tesoros ocultos en el árbol",
    virtue: "Gratitud y Gozo",
    text: "Llegas ante un majestuoso árbol antiguo cuyas ramas resplandecen de bendiciones y oraciones contestadas. Santiago 1 nos recuerda: 'Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre'. Cada hoja dorada representa un tesoro eterno provisto para tu vida.",
    stamp: "ÁRBOL · BENDICIÓN",
    grad: "from-[#081714] via-[#10302b] to-[#040e0c]",
    activity: {
      type: 'select-one',
      label: "Cosecha de gratitud",
      prompt: "Haz clic sobre las 5 hojas de gratitud colgantes (Sonrisa, Amistad, Oración, Milagro, Paz) para cosecharlas en tu libreta de recuerdos."
    }
  },
  {
    id: 7,
    place: "CAPÍTULO FINAL · LA CUMBRE DEL RECORRIDO",
    icon: "🏔️",
    title: "La fidelidad eterna en la cumbre",
    virtue: "Fidelidad y Promesa",
    text: "Desde la cima de la montaña, miras atrás y contemplas todo tu caminar iluminado: el prado, el puente, el bosque lluvioso, el lago del latido y el árbol. Filipenses 1:6 resuena con poder en tu espíritu: Aquel que comenzó en ti la buena obra, la perfeccionará hasta el fin. Nunca caminaste sola.",
    stamp: "CIMA · MIRADA AL VIAJE",
    grad: "from-[#111024] via-[#242145] to-[#0b0a17]",
    activity: {
      type: 'select-one',
      label: "Fidelidad eterna",
      prompt: "Toca las 4 paradas históricas de tu viaje en el mapa para encender sus faros y contemplar cómo la mano de Dios te guio con fidelidad en todo momento."
    }
  }
];

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'journey' | 'final' | 'postcredits'>('intro');
  const [progress, setProgress] = useState<UserProgress>({
    currentStopIndex: 1,
    completedStops: [],
    activitiesSolved: {}
  });

  const [drawingState, setDrawingState] = useState<any>({});
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isAmbientActive, setIsAmbientActive] = useState<boolean>(true);
  const [companionList, setCompanionList] = useState<{ [key: string]: string }>({});

  const currentStopIndex = progress.currentStopIndex;
  const currentStop = stops[currentStopIndex - 1];

  // Dynamic sound loops matching chapter view
  useEffect(() => {
    if (screen === 'journey' && isAmbientActive && currentStop) {
      ambientAudio.startAmbient(currentStop.id);
    } else if (screen === 'intro' && isAmbientActive) {
      // Intro special synthesized peaceful heartbeat interval
      ambientAudio.startHeartbeatLoop();
    } else {
      ambientAudio.stopAmbient();
    }
    return () => {
      ambientAudio.stopAmbient();
    };
  }, [currentStopIndex, isAmbientActive, screen, currentStop?.id]);

  // Handle defaults when changing stops
  useEffect(() => {
    if (screen !== 'journey') return;
    setFeedbackText('');
    
    const solved = progress.activitiesSolved[currentStopIndex] || false;
    
    if (currentStopIndex === 1) {
      setDrawingState({ flowers: solved ? ['esperanza', 'proposito', 'amor'] : [] });
    } else if (currentStopIndex === 2) {
      setDrawingState({ steps: solved ? 5 : 0, memories: solved ? ['abrazomama', 'tardesol', 'risasamigos'] : [] });
    } else if (currentStopIndex === 3) {
      setDrawingState({ lights: solved ? ['paz', 'fuerza', 'guia'] : [] });
    } else if (currentStopIndex === 4) {
      setDrawingState({ companions: solved ? (companionList || { 'brújula': 'Amigo', 'lámpara': 'Mamá', 'pluma': 'Hermana', 'pan': 'Mentor', 'flor': 'Pastor' }) : {} });
    } else if (currentStopIndex === 5) {
      setDrawingState({ pulseCount: solved ? 5 : 0 });
    } else if (currentStopIndex === 6) {
      setDrawingState({ leaves: solved ? ['sonrisa', 'amistad', 'oracion', 'milagro', 'reconciliacion'] : [] });
    } else if (currentStopIndex === 7) {
      setDrawingState({ regions: solved ? ['meadow', 'bridge', 'forest', 'tree'] : [] });
    }
  }, [currentStopIndex, screen]);

  const handleStart = () => {
    // Unmute and play success chords
    playSynthesizedSound('success');
    setScreen('journey');
    setProgress({
      currentStopIndex: 1,
      completedStops: [],
      activitiesSolved: {}
    });
  };

  const handleSolved = (feedback: string, finalState: any) => {
    setFeedbackText(feedback);
    setProgress(prev => {
      const isAlreadyCompleted = prev.completedStops.includes(currentStopIndex);
      const nextCompleted = isAlreadyCompleted 
        ? prev.completedStops 
        : [...prev.completedStops, currentStopIndex];
        
      return {
        ...prev,
        completedStops: nextCompleted,
        activitiesSolved: {
          ...prev.activitiesSolved,
          [currentStopIndex]: true
        }
      };
    });
    playSynthesizedSound('success');
  };

  const handleNext = () => {
    playSynthesizedSound('tap');
    if (currentStopIndex < stops.length) {
      setProgress(prev => ({
        ...prev,
        currentStopIndex: prev.currentStopIndex + 1
      }));
    } else {
      setScreen('final');
    }
  };

  const handleJumpToStop = (index: number) => {
    playSynthesizedSound('tap');
    setProgress(prev => ({
      ...prev,
      currentStopIndex: index
    }));
  };

  const handleReplay = () => {
    playSynthesizedSound('success');
    setScreen('intro');
    setCompanionList({});
    setProgress({
      currentStopIndex: 1,
      completedStops: [],
      activitiesSolved: {}
    });
  };

  const isCurrentSolved = progress.activitiesSolved[currentStopIndex] || false;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-amber-50 selection:bg-[#C9A24B] selection:text-[#0B1B20]">
      {/* Dynamic atmospheric ambient background driven by stops or screens */}
      <div 
        className="fixed inset-0 transition-all duration-[1200ms] ease-out-sine pointer-events-none z-0 bg-[#0A0D14]"
        style={{
          background: screen === 'journey' && currentStop
            ? `radial-gradient(ellipse at 50% 20%, ${currentStop.grad.split(' ').map((p, idx) => idx === 1 ? p.replace('via-', '') : p.replace('from-', '').replace('to-', '')).join(', ')})`
            : screen === 'final'
            ? 'radial-gradient(ellipse at 50% 20%, #201308 0%, #060301 80%)'
            : 'radial-gradient(ellipse at 50% 20%, #111827 0%, #030712 80%)'
        }}
      />

      {/* Elegant Music Control in the Floating Header */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            playSynthesizedSound('tap');
            setIsAmbientActive(prev => !prev);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md transition-all shadow-lg cursor-pointer ${
            isAmbientActive
              ? 'bg-amber-500/15 border-amber-400/40 text-amber-300'
              : 'bg-white/5 border-white/10 text-stone-400'
          }`}
          title="Sonido de ambiente"
        >
          {isAmbientActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isAmbientActive ? 'MÚSICA: ACTIVA' : 'MÚSICA: APAGADA'}</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="relative flex-grow flex flex-col items-center justify-center p-4 md:p-6 z-10 w-full max-w-5xl mx-auto my-auto">
        <AnimatePresence mode="wait">
          {/* --- INTRO SCREEN (CINEMATIC THEATER) --- */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full max-w-lg bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-white/5 shadow-2xl text-center flex flex-col items-center relative overflow-hidden"
            >
              {/* Star twinkling canvas */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-100 rounded-full"
                    style={{
                      top: `${(i * 19) % 90 + 5}%`,
                      left: `${(i * 13) % 95 + 2}%`,
                    }}
                    animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.2, 0.9, 0.2] }}
                    transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>

              {/* Rhythmic beating halo */}
              <motion.div
                className="w-14 h-14 rounded-full bg-amber-500/5 border border-amber-500/25 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.15, 1, 1.18, 1] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Compass className="w-6 h-6 text-amber-400" />
              </motion.div>

              <div className="font-mono text-[9px] tracking-[0.25em] text-[#E4C87A] uppercase mb-1">
                La fidelidad de Dios contempla tu historia
              </div>
              <h1 className="font-serif italic font-extrabold text-3xl text-white tracking-wide leading-tight mb-6">
                El Viaje de una Vida
              </h1>

              {/* Polaroid Frame of Lupita in pure Anime portrait */}
              <motion.div
                className="relative bg-white p-2.5 pb-6 rounded-lg shadow-2xl border border-stone-200 rotate-[-2deg] hover:rotate-[0deg] transition-all duration-300 w-44 mb-8"
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/40 backdrop-blur-[1px] border-x border-dashed border-amber-900/10 rotate-[2deg] shadow-xs z-20" />
                <div className="relative overflow-hidden rounded bg-stone-100">
                  <img 
                    src={lupitaCover} 
                    alt="Lupita" 
                    className="w-full h-36 object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
                </div>
                <div className="mt-2 text-center font-serif text-stone-700 italic text-[10px] font-bold tracking-wide">
                  Nuestra Viajera ✨
                </div>
              </motion.div>

              {/* Narrator Typographical Passages */}
              <div className="flex flex-col gap-3 text-center mb-8 max-w-[340px]">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-stone-300 text-xs italic font-serif leading-relaxed"
                >
                  "Antes de que nacieras... Dios ya había escrito tu nombre."
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-stone-300 text-xs italic font-serif leading-relaxed"
                >
                  "Antes de tu primer latido... Él ya conocía cada capítulo de tu historia."
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="text-stone-300 text-xs italic font-serif leading-relaxed"
                >
                  "Hoy recorrerás ese viaje."
                </motion.p>
              </div>

              {/* Jeremías 29:11 Verse card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="bg-white/5 border border-white/5 p-4 rounded-xl mb-8 max-w-[340px]"
              >
                <p className="font-serif text-[11.5px] leading-relaxed text-[#FAF2E3]/90 italic text-justify">
                  “Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.”
                </p>
                <span className="block font-mono text-[8px] text-amber-400 mt-2 text-right uppercase tracking-widest">— Jeremías 29:11</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, type: 'spring' }}
                onClick={handleStart}
                className="w-full max-w-[240px] py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-serif font-bold text-xs tracking-widest uppercase shadow-lg border-b-2 border-amber-600 transition-all cursor-pointer flex items-center justify-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span>✨ Comenzar el viaje</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* --- JOURNEY SCREEN (SCRAPBOOK ADVENTURE) --- */}
          {screen === 'journey' && currentStop && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg relative"
            >
              {/* Binder Rings visual effect (Notebook aesthetic) */}
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 flex flex-col gap-8 z-40 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-7 h-5 rounded-r-full bg-gradient-to-r from-zinc-400 to-zinc-600 border border-zinc-700 shadow-md transform rotate-[-5deg] flex items-center justify-start pl-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  </div>
                ))}
              </div>

              {/* Scrapbook Journal Page Card */}
              <div className="w-full bg-[#FAF5EA] text-[#2A2118] p-6 md:p-8 rounded-[24px] shadow-2xl relative border border-[#D5C2A5]/50 overflow-hidden">
                {/* Vintage stamp grid background watermark */}
                <div className="absolute inset-0 bg-[radial-gradient(#D5C2A5_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                <div className="absolute inset-6 border border-[#2A2118]/10 rounded-[18px] pointer-events-none" />

                {/* Passport Stamp collection at the top */}
                <PassportHeader
                  currentStopIndex={currentStopIndex}
                  completedStops={progress.completedStops}
                  totalStops={stops.length}
                  onJumpToStop={handleJumpToStop}
                />

                {/* Destination Header */}
                <div className="flex items-center justify-between mb-2 z-20 relative">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#2A2118] text-[#FAF2E3] w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold">
                      {currentStopIndex}
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.18em] text-[#5B4F3F] uppercase font-bold">
                      {currentStop.place}
                    </div>
                  </div>
                </div>

                <h2 className="font-serif italic font-bold text-2xl text-[#2A2118] leading-tight mb-2">
                  {currentStop.title}
                </h2>

                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/35 px-3 py-1 rounded-full text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-4 font-mono">
                  <Award className="w-3.5 h-3.5" />
                  Virtud: {currentStop.virtue}
                </div>

                {/* Narrative Passage */}
                <p className="text-[13px] leading-[1.75] text-[#2A2118] text-justify mb-5 font-serif font-medium tracking-wide">
                  {currentStop.text}
                </p>

                {/* --- INTERACTIVE SVG GAME DRAWING AREA --- */}
                <div className="mb-5 z-20 relative">
                  {currentStopIndex === 1 && (
                    <MeadowDrawing
                      collectedFlowers={drawingState.flowers || []}
                      onCollect={(flower) => {
                        ambientAudio.triggerInteractiveSound(1, 'flower');
                        const nextFlowers = [...(drawingState.flowers || []), flower];
                        setDrawingState({ flowers: nextFlowers });
                        if (nextFlowers.length === 3) {
                          handleSolved("¡Has recogido las flores de la Esperanza, el Propósito y el Amor! Estas hermosas promesas de Dios siempre florecen en ti.", nextFlowers);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 2 && (
                    <BridgeDrawing
                      stepCount={drawingState.steps || 0}
                      discoveredMemories={drawingState.memories || []}
                      onStep={() => {
                        ambientAudio.triggerInteractiveSound(2, 'step');
                        const nextSteps = (drawingState.steps || 0) + 1;
                        setDrawingState({ ...drawingState, steps: nextSteps });
                      }}
                      onDiscoverMemory={(memoryId) => {
                        ambientAudio.triggerInteractiveSound(2, 'flower');
                        const nextMemories = [...(drawingState.memories || []), memoryId];
                        setDrawingState({ ...drawingState, memories: nextMemories });
                        if (nextMemories.length === 3) {
                          handleSolved("¡Qué bellos recuerdos! 'La calidez de un abrazo', 'Tardes de sol', y 'Risas compartidas' brotan bajo Su tierna fidelidad.", nextMemories);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 3 && (
                    <ForestDoubtDrawing
                      unlockedLights={drawingState.lights || []}
                      onUnlockLight={(lightId) => {
                        ambientAudio.triggerInteractiveSound(3, 'light');
                        const nextLights = [...(drawingState.lights || []), lightId];
                        setDrawingState({ lights: nextLights });
                        if (nextLights.length === 3) {
                          handleSolved("¡La luz de la fe disipa toda tormenta! Has encendido la linterna de la Paz, la Fuerza y la Guía. Su presencia es tu refugio.", nextLights);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 4 && (
                    <TravelersDrawing
                      companions={drawingState.companions || {}}
                      onSaveCompanion={(itemKey, name) => {
                        ambientAudio.triggerInteractiveSound(4, 'save');
                        const nextCompanions = { ...(drawingState.companions || {}), [itemKey]: name };
                        setDrawingState({ companions: nextCompanions });
                        const savedCount = Object.keys(nextCompanions).length;
                        if (savedCount === 5) {
                          setCompanionList(nextCompanions);
                          handleSolved(`Has guardado a tus compañeros de ruta. Dios ha usado de forma preciosa a estas personas para bendecirte. ¡Dos son mejor que uno!`, nextCompanions);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 5 && (
                    <HeartbeatDrawing
                      pulseCount={drawingState.pulseCount || 0}
                      onPulse={() => {
                        ambientAudio.triggerHeartbeatDouble();
                        const nextCount = (drawingState.pulseCount || 0) + 1;
                        setDrawingState({ pulseCount: nextCount });
                        if (nextCount === 5) {
                          handleSolved("¡Latido del corazón sincronizado! Dios, que sostiene las estrellas en el cielo, es quien dicta milagrosamente cada latido de tu vida.", nextCount);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 6 && (
                    <GlowingTreeDrawing
                      harvestedLeaves={drawingState.leaves || []}
                      onHarvestLeaf={(leafId) => {
                        ambientAudio.triggerInteractiveSound(6, 'leaf');
                        const nextLeaves = [...(drawingState.leaves || []), leafId];
                        setDrawingState({ leaves: nextLeaves });
                        if (nextLeaves.length === 5) {
                          handleSolved("¡Tus canastos están llenos de gozo y gratitud! Cosechaste los frutos de la Sonrisa, Amistad, Oración, Milagro y Paz. Toda dádiva desciende del Padre.", nextLeaves);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                  {currentStopIndex === 7 && (
                    <MountainViewDrawing
                      litRegions={drawingState.regions || []}
                      onToggleRegion={(regionId) => {
                        ambientAudio.triggerInteractiveSound(7, 'region');
                        const nextRegions = [...(drawingState.regions || []), regionId];
                        setDrawingState({ regions: nextRegions });
                        if (nextRegions.length === 4) {
                          handleSolved("¡Toda tu historia resplandece! Al iluminar cada región de tu vida, contemplas Su perfecta fidelidad. El Señor completará con amor Su obra en ti.", nextRegions);
                        }
                      }}
                      isSolved={isCurrentSolved}
                    />
                  )}
                </div>

                {/* Guide Panel & Instructions */}
                <ActivityEngine
                  stopId={currentStop.id}
                  activity={currentStop.activity}
                  isSolved={isCurrentSolved}
                  onSolved={(feedback) => handleSolved(feedback, {})}
                  drawingState={drawingState}
                  setDrawingState={setDrawingState}
                />

                {/* Page Footer */}
                <div className="flex items-center justify-between border-t border-[#D5C2A5]/30 pt-4 text-[9px] font-mono uppercase text-[#5B4F3F] font-bold mt-4">
                  <div className="flex items-center gap-1 text-amber-700">
                    <span>📍</span> {currentStop.stamp}
                  </div>
                  <div>
                    PÁG. {currentStopIndex} / {stops.length}
                  </div>
                </div>

                {/* Feedback Panel */}
                <AnimatePresence>
                  {isCurrentSolved && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#1e3f20]"
                    >
                      <h4 className="font-serif italic font-bold text-[11.5px] mb-1 text-emerald-800 flex items-center gap-1.5">
                        <span>✨</span> Sello obtenido con éxito
                      </h4>
                      <p className="text-[11px] text-stone-700 leading-relaxed italic mb-4">
                        "{feedbackText}"
                      </p>

                      <motion.button
                        onClick={handleNext}
                        className="w-full bg-[#2A2118] hover:bg-[#120F0B] text-white font-mono text-[10px] tracking-widest uppercase py-3 rounded-full shadow-md font-bold cursor-pointer flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{currentStopIndex === stops.length ? 'Revelar Libreta de Recuerdos →' : 'Siguiente destino →'}</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* --- FINAL CELEBRATION CARD (VIRTUAL ALBUM) --- */}
          {screen === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              {/* Virtual Album Wrapper (Two Page Layout) */}
              <div className="bg-[#FAF5EA] text-[#2A2118] p-6 md:p-8 rounded-[28px] shadow-2xl relative border border-[#D5C2A5]/50 overflow-hidden flex flex-col md:flex-row gap-6">
                <div className="absolute inset-0 bg-[radial-gradient(#D5C2A5_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                <div className="absolute inset-6 border border-[#2A2118]/10 rounded-[22px] pointer-events-none hidden md:block" />

                {/* Left Page: Portrait & Companion Stamp List */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 relative">
                  {/* Decorative ribbon */}
                  <div className="absolute -top-2 left-6 w-14 h-5 bg-amber-500/20 rotate-[-12deg]" />

                  {/* Profile Picture Frame */}
                  <motion.div
                    className="relative w-36 h-36 rounded-full border-4 border-amber-500 shadow-xl overflow-hidden mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={lupitaCover} 
                      alt="Lupita" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  <h3 className="font-serif italic font-extrabold text-xl text-[#2A2118] tracking-wide mb-1 text-center">
                    Lupita
                  </h3>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-[#83621B] uppercase mb-4 text-center">
                    ✦ La Viajera Guardada de Dios ✦
                  </p>

                  {/* Stamp Board representing her companions written down */}
                  <div className="w-full bg-white/60 rounded-xl p-4 border border-stone-200/50">
                    <span className="block font-mono text-[8.5px] tracking-widest text-[#5B4F3F] uppercase font-bold border-b border-stone-200 pb-1.5 mb-2 text-center">
                      👥 Compañeros Sellados en la Bitácora
                    </span>
                    <div className="flex flex-col gap-1.5 text-left">
                      {Object.entries(companionList).length > 0 ? (
                        Object.entries(companionList).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center text-[11px] font-serif italic text-stone-700">
                            <span className="uppercase text-[9px] font-mono text-stone-500 not-italic font-bold">✦ {key}:</span>
                            <span className="font-bold text-[#83621B]">{val}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-[10.5px] italic text-stone-400 font-serif">
                          No se han guardado nombres en este viaje.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Page: Custom letter from Josué */}
                <div className="w-full md:w-1/2 flex flex-col p-4 justify-between border-t md:border-t-0 md:border-l border-dashed border-[#D5C2A5] pt-6 md:pt-4 md:pl-6">
                  <div>
                    <span className="block font-mono text-[9px] tracking-widest text-[#83621B] uppercase font-bold mb-1">
                      ✦ Carta del Sello Divino ✦
                    </span>
                    <h2 className="font-serif italic font-extrabold text-2xl text-stone-900 leading-tight mb-4">
                      Feliz Cumpleaños
                    </h2>

                    <div className="font-serif text-[12px] leading-relaxed text-[#2A2118] italic text-justify space-y-3 max-h-[280px] overflow-y-auto pr-2">
                      <p>
                        Lupita...
                      </p>
                      <p>
                        Hoy quiero que veas tu historia como Dios la ve. Tu lealtad sincera que sirve de refugio, tu inteligencia y manos trabajadoras que trazan rutas donde otros se pierden, ese espíritu emprendedor que no le teme a saltar, y tu interés genuino que de verdad ve el valor en cada persona.
                      </p>
                      <p>
                        Este viaje interactivo no es un mero pasaporte de fantasía; es un espejo de tu alma. Cada parada, cada objeto y cada milagro que has recorrido es un recordatorio vivo de las promesas de Dios que ya llevas selladas en tu ser.
                      </p>
                      <p>
                        Feliz cumpleaños, viajera del cielo. Que este año que comienza esté rodeado de la ternura de Dios y Su paz perpetua.
                      </p>
                      <p className="text-right font-bold mt-4 text-[#83621B]">
                        Con cariño,<br />
                        Tu amigo, Josue
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <motion.button
                      onClick={() => {
                        playSynthesizedSound('success');
                        setScreen('postcredits');
                      }}
                      className="w-full py-3 bg-[#2A2118] hover:bg-[#120F0B] text-white font-mono text-[10px] tracking-widest uppercase rounded-full shadow-md font-bold cursor-pointer flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>✦ Revelar Postcréditos ✦</span>
                    </motion.button>

                    <button
                      onClick={handleReplay}
                      className="w-full py-2 border border-[#2A2118]/10 hover:bg-stone-100 text-stone-600 font-mono text-[9px] tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Recorrer el viaje de nuevo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- POSTCRÉDITOS SCREEN (CINEMATIC ROLL) --- */}
          {screen === 'postcredits' && (
            <motion.div
              key="postcredits"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full max-w-lg bg-black/90 p-8 md:p-10 rounded-[32px] border border-white/5 shadow-2xl text-center flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden"
            >
              {/* Twinkling stars slowly rotating */}
              <motion.div 
                className="absolute inset-0 pointer-events-none opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${(i * 21) % 90 + 5}%`,
                      left: `${(i * 17) % 95 + 2}%`,
                    }}
                  />
                ))}
              </motion.div>

              <div className="z-10 relative flex flex-col items-center">
                {/* Rhythmic pulsing soft heart halo */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-rose-500/5 flex items-center justify-center mb-8"
                  animate={{ scale: [1, 1.2, 1, 1.25, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </motion.div>

                <div className="space-y-6 mb-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="font-serif italic font-extrabold text-2xl text-amber-200 tracking-wide"
                  >
                    "Mientras haya un latido…<br />Dios seguirá escribiendo tu historia."
                  </motion.h2>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="text-stone-400 font-mono text-[9.5px] uppercase tracking-[0.2em]"
                  >
                    Feliz Cumpleaños, Lupita.
                  </motion.p>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                    className="text-stone-400 font-mono text-[9px] uppercase tracking-wider"
                  >
                    Con profundo cariño, tu amigo Josué.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.8 }}
                  className="bg-white/5 border border-white/5 p-4 rounded-xl mb-10 max-w-[280px]"
                >
                  <p className="font-serif text-[11px] leading-relaxed text-amber-100/90 italic">
                    “Tomó luego Samuel una piedra y la puso entre Mizpa y Sen, y le puso por nombre Ebenezer, diciendo: Hasta aquí nos ayudó Jehová.”
                  </p>
                  <span className="block font-mono text-[7.5px] text-amber-400 mt-2 text-right uppercase tracking-widest">— 1 Samuel 7:12</span>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 6 }}
                  onClick={handleReplay}
                  className="py-2.5 px-6 rounded-full border border-amber-400/40 hover:bg-amber-400/10 active:bg-amber-400/20 text-amber-300 font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Volver a iniciar el viaje
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic Footer */}
      <footer className="relative w-full text-center py-4 z-10 select-none pointer-events-none">
        <p className="font-mono text-[8.5px] tracking-widest text-[#FAF2E3]/20 uppercase">
          Diseñado con <Heart className="inline w-2.5 h-2.5 text-rose-500 fill-rose-500 mx-0.5 animate-pulse" /> para Lupita • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
