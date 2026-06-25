import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, HelpCircle, Sun, MapPin, Lightbulb } from "lucide-react";

interface Props {
  introComplete?: boolean;
  onThemeChange?: (accent: string, secondary: string) => void;
}

export default function Hero({ introComplete = true, onThemeChange }: Props) {
  const [beamColor, setBeamColor] = useState<string>("#f5a855");
  const [beamIntensity, setBeamIntensity] = useState<number>(0.8);
  const [sourceType, setSourceType] = useState<"natural" | "led" | "sodio">("natural");

  const sources = [
    { id: "natural", label: "Sol/Crepúsculo", color: "#f5a855", intensity: 0.95, accent: "#C8922A", secondary: "#E8C068" },
    { id: "led",     label: "LED Urbano",      color: "#dde8f0", intensity: 0.75, accent: "#7ab4d8", secondary: "#a4cce4" },
    { id: "sodio",   label: "Lâmpada de Sódio", color: "#f5c842", intensity: 0.85, accent: "#c9a800", secondary: "#e8c830" },
  ];

  const handleSourceChange = (src: typeof sources[0]) => {
    setSourceType(src.id as any);
    setBeamColor(src.color);
    setBeamIntensity(src.intensity);
    document.documentElement.style.setProperty("--color-ice-blue", src.accent);
    document.documentElement.style.setProperty("--color-cold-violet", src.secondary);
    onThemeChange?.(src.accent, src.secondary);
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-24 sm:pt-32 pb-16 flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Soft ambient light leaks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ice-blue/5 filter blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cold-violet/5 filter blur-[100px]" />
      </div>

      {/* Hero Header Context */}
      <div className="w-full max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Hook question */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-5 text-xs sm:text-sm font-mono tracking-widest text-ice-blue/70 uppercase"
        >
          Você já viu um pilar de luz?
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white select-none relative"
        >
          PILARES DE LUZ
          <span
            className="absolute inset-0 filter blur-[12px] opacity-25 select-none pointer-events-none"
            style={{ color: beamColor }}
          >
            PILARES DE LUZ
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6 text-sm sm:text-base md:text-lg max-w-2xl text-white/60 font-sans leading-relaxed px-4"
        >
          Fenômeno óptico atmosférico causado pela reflexão da luz em cristais de gelo em suspensão.
        </motion.p>
      </div>

      {/* INTERACTIVE COLUMN OF LIGHT (The Core Phenomenon Visualizer) */}
      <div className="relative w-full max-w-lg h-80 sm:h-96 flex flex-col items-center justify-end z-20 my-8">
        {/* The interactive control switches for the Pillar Light Source */}
        <div className="absolute top-0 flex space-x-2 p-1.5 rounded-full border border-white/5 bg-[#06081a]/80 backdrop-blur-md z-30">
          {sources.map((src) => (
            <button
              key={src.id}
              onClick={() => handleSourceChange(src)}
              className={`px-3 py-1 rounded-full font-grotesk text-[10px] sm:text-xs transition-all cursor-pointer ${
                sourceType === src.id
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>

        {/* The Pillar Beam */}
        <motion.div
          animate={{
            height: ["65%", "85%", "65%"],
            opacity: [beamIntensity * 0.75, beamIntensity * 0.95, beamIntensity * 0.75],
            boxShadow: [
              `0 0 15px ${beamColor}40`,
              `0 0 35px ${beamColor}60`,
              `0 0 15px ${beamColor}40`
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-12 w-[3px] rounded-full"
          style={{
            background: `linear-gradient(to top, ${beamColor} 0%, ${beamColor}60 50%, transparent 100%)`,
          }}
        />

        {/* Outer Halo Beam effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            width: ["25px", "35px", "25px"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-12 rounded-full"
          style={{
            height: "70%",
            background: `linear-gradient(to top, ${beamColor}20 0%, ${beamColor}05 60%, transparent 100%)`,
            filter: "blur(6px)"
          }}
        />

        {/* Floating ice crystals inside the beam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute w-1.5 h-0.5 bg-white/60 border border-white/20 rounded-sm"
              initial={{
                x: Math.random() * 120 - 60 + (window.innerWidth / 2 > 300 ? 0 : 0),
                y: Math.random() * 200 + 50,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [280, 50],
                x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
                rotate: [0, 360],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: "linear"
              }}
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: `0 0 4px ${beamColor}`
              }}
            />
          ))}
        </div>

        {/* Glowing Source Node at bottom */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              `0 0 20px ${beamColor}`,
              `0 0 40px ${beamColor}`,
              `0 0 20px ${beamColor}`
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity
          }}
          className="absolute bottom-11 w-4 h-4 rounded-full bg-white z-20"
        />

        {/* Ground light source stand base visual */}
        <div className="absolute bottom-4 w-12 h-8 flex flex-col items-center">
          <div className="w-1.5 h-6 bg-white/20" />
          <div className="w-8 h-1.5 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Quote & Description side-by-side block */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-white/10 pt-10 sm:pt-12 z-20 items-start"
      >
        {/* Left column: Grand Quote */}
        <div className="md:col-span-5">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl italic font-semibold text-white/90 leading-tight">
            "Uma coluna de luz que não existe, mas você pode ver."
          </h2>
        </div>

        {/* Right column: Description paragraph */}
        <div className="md:col-span-7">
          <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
            Os pilares de luz são uma <strong>ilusão de óptica</strong> de rara beleza, um feixe vertical de luz que parece irradiar diretamente de uma fonte luminosa. Na verdade, eles não existem como colunas físicas. São o resultado de milhões de minúsculos <strong>cristais de gelo</strong> planos suspensos no ar frio, que agem como espelhos microscópicos flutuantes, desviando a luz em direção aos nossos olhos.
          </p>
          <div className="mt-4 flex items-center space-x-2 text-xs font-mono text-ice-blue bg-ice-blue/[0.04] px-3 py-1.5 rounded-sm border border-ice-blue/10 w-fit">
            <Sparkles size={12} className="animate-pulse" />
            <span>Dica: Altere a fonte de luz acima para ver como a cor do pilar muda.</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
