import React, { useState } from "react";
import { Info, Sparkles, BookOpen } from "lucide-react";

interface Hotspot {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
}

export default function GeometryOfCold() {
  const [activeHotspot, setActiveHotspot] = useState<string>("cristais");

  const hotspots: Hotspot[] = [
    {
      id: "cristais",
      title: "Cristais de Gelo Horizontais",
      description: "São micro-placas hexagonais de gelo que caem lentamente na atmosfera fria. Devido à resistência do ar, elas tendem a se alinhar horizontalmente, como folhas caindo em câmera lenta.",
      x: 180,
      y: 65,
    },
    {
      id: "reflexao",
      title: "Ângulo de Reflexão",
      description: "A luz de baixo atinge a face inferior horizontal do cristal de gelo e é direcionada de volta para baixo. Se o ângulo for correto, ela atinge exatamente os olhos do observador.",
      x: 230,
      y: 110,
    },
    {
      id: "observador",
      title: "Posição do Observador",
      description: "O observador percebe o pilar de luz sempre em sua própria linha de visão vertical direcionada à fonte de luz. É uma ilusão de óptica puramente dependente da sua perspectiva física.",
      x: 80,
      y: 165,
    },
    {
      id: "fonte",
      title: "Fonte de Luz no Solo",
      description: "Luz artificial (poste, holofote, faróis) ou natural (Sol ou Lua logo abaixo do horizonte) emitindo raios de luz omnidirecionais para o céu frio.",
      x: 320,
      y: 175,
    },
    {
      id: "pilar",
      title: "Pilar Vertical Virtual",
      description: "Múltiplos cristais em diferentes altitudes refletem feixes para o observador. O alinhamento dessas milhões de reflexões individuais cria a ilusão contínua de uma coluna de luz brilhante.",
      x: 270,
      y: 40,
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: SVG Interactive Physics Diagram */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-xl glass-panel rounded-lg p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest bg-white/[0.03] px-2.5 py-1 rounded border border-white/5">
                Diagrama Físico Interativo
              </span>
            </div>

            {/* SVG Diagram Canvas */}
            <svg viewBox="0 0 400 220" className="w-full h-auto select-none">
              {/* Ground level */}
              <line x1="10" y1="190" x2="390" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="350" y="202" fill="rgba(255,255,255,0.3)" className="text-[7px] font-mono uppercase">Solo</text>

              {/* Light post / source on the ground */}
              <g transform="translate(320, 160)">
                {/* Post */}
                <line x1="0" y1="0" x2="0" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                {/* Glow radius */}
                <circle cx="0" cy="0" r="14" fill="rgba(245, 200, 66, 0.15)" className="animate-pulse" />
                <circle cx="0" cy="0" r="4" fill="#f5c842" />
                <text x="0" y="-8" textAnchor="middle" fill="#f5c842" className="text-[7px] font-mono">Fonte</text>
              </g>

              {/* Observer on the left */}
              <g transform="translate(80, 160)">
                {/* Person simplified representation */}
                <circle cx="0" cy="5" r="4" fill="rgba(255,255,255,0.7)" />
                <line x1="0" y1="9" x2="0" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <line x1="-5" y1="12" x2="5" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="-3" y1="30" x2="0" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
                <line x1="3" y1="30" x2="0" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
                <text x="0" y="-4" textAnchor="middle" fill="rgba(255,255,255,0.5)" className="text-[7px] font-mono">Observador</text>
              </g>

              {/* Hexagonal Flat Crystal Plates suspended in sky */}
              {[
                { x: 160, y: 50, scale: 0.8 },
                { x: 190, y: 75, scale: 1.1 },
                { x: 210, y: 40, scale: 0.9 },
                { x: 240, y: 90, scale: 1.0 },
                { x: 260, y: 60, scale: 1.2 },
                { x: 290, y: 110, scale: 0.75 },
              ].map((c, i) => (
                <g key={i} transform={`translate(${c.x}, ${c.y}) scale(${c.scale})`}>
                  {/* Plate projection */}
                  <ellipse cx="0" cy="0" rx="14" ry="3.5" fill="rgba(168, 212, 245, 0.25)" stroke="rgba(168, 212, 245, 0.6)" strokeWidth="1" />
                  {/* Side light rays reflecting off the crystal */}
                  <path d="M-10,-5 L0,-1 L10,-5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                </g>
              ))}

              {/* Light rays from Source to Crystals, then to Observer */}
              {/* Ray 1: Source (320,160) -> Crystal at (260,60) -> Observer (80, 165 - eye level is about 162) */}
              <path
                d="M 320 160 L 260 60 L 80 162"
                fill="none"
                stroke="rgba(168, 212, 245, 0.45)"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <circle cx="260" cy="60" r="3" fill="#a8d4f5" />

              {/* Ray 2: Source (320,160) -> Crystal at (190,75) -> Observer (80, 162) */}
              <path
                d="M 320 160 L 190 75 L 80 162"
                fill="none"
                stroke="rgba(168, 212, 245, 0.35)"
                strokeWidth="1"
              />
              <circle cx="190" cy="75" r="3" fill="#a8d4f5" />

              {/* Ray 3: Source (320,160) -> Crystal at (240,90) -> Observer (80, 162) */}
              <path
                d="M 320 160 L 240 90 L 80 162"
                fill="none"
                stroke="rgba(168, 212, 245, 0.3)"
                strokeWidth="1"
              />
              <circle cx="240" cy="90" r="3" fill="#a8d4f5" />

              {/* Virtual vertical light pillar column */}
              <rect x="250" y="25" width="20" height="135" fill="url(#pillarGrad)" opacity="0.35" pointerEvents="none" />
              <line x1="260" y1="20" x2="260" y2="160" stroke="#a8d4f5" strokeWidth="1.5" opacity="0.45" strokeDasharray="3 3" />

              {/* Hotspot buttons on the SVG */}
              {hotspots.map((hs) => {
                const isActive = activeHotspot === hs.id;
                return (
                  <g
                    key={hs.id}
                    transform={`translate(${hs.x}, ${hs.y})`}
                    className="cursor-pointer group"
                    onClick={() => setActiveHotspot(hs.id)}
                  >
                    <circle
                      r={isActive ? "9" : "7"}
                      fill={isActive ? "#a8d4f5" : "rgba(6, 8, 26, 0.85)"}
                      stroke={isActive ? "#ffffff" : "#a8d4f5"}
                      strokeWidth="1.5"
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <text
                      dy="2.5"
                      textAnchor="middle"
                      fill={isActive ? "#06081a" : "#a8d4f5"}
                      className="text-[6px] font-mono font-bold"
                    >
                      i
                    </text>
                  </g>
                );
              })}

              {/* SVG Gradients */}
              <defs>
                <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a8d4f5" stopOpacity="0" />
                  <stop offset="35%" stopColor="#a8d4f5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f5c842" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-[10px] font-mono text-white/40 mt-3 flex items-center space-x-1">
            <Info size={11} />
            <span>Clique nos botões de informação <strong>( i )</strong> acima para explorar a física do diagrama.</span>
          </p>
        </div>

        {/* Right column: Hotspot description block */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-xs font-mono text-ice-blue uppercase tracking-wider mb-2">ANÁLISE ÓPTICA</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
            A Geometria do Frio
          </h2>

          <div className="min-h-[160px] glass-panel rounded-lg p-6 border-l-4 border-l-ice-blue bg-white/[0.01] transition-all duration-300">
            <h4 className="text-lg font-grotesk font-bold text-white flex items-center space-x-2">
              <BookOpen size={16} className="text-ice-blue" />
              <span>{currentHotspot.title}</span>
            </h4>
            <p className="mt-4 font-sans text-sm sm:text-base text-white/70 leading-relaxed">
              {currentHotspot.description}
            </p>
          </div>

          {/* Quick selection chips for the hotspot controls */}
          <div className="mt-6 flex flex-wrap gap-2">
            {hotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs.id)}
                className={`px-3 py-1.5 rounded-sm font-grotesk text-xs transition-all cursor-pointer ${
                  activeHotspot === hs.id
                    ? "bg-ice-blue/15 text-white border border-ice-blue/50"
                    : "bg-white/[0.02] text-white/50 border border-white/5 hover:text-white/85"
                }`}
              >
                {hs.title}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
