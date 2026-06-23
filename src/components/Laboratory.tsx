import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Eye, EyeOff, Thermometer, Wind, Lightbulb, Sliders, Info } from "lucide-react";
import { SimulationSettings } from "../types";

export default function Laboratory() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [settings, setSettings] = useState<SimulationSettings>({
    temperature: -18,
    windSpeed: 1.2,
    lightColor: "#a8d4f5", // Ice Blue
    crystalDensity: 80,
    crystalType: "hexagonal",
    sourceIntensity: 80,
    showRays: true,
    timeOfDay: "night",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Auto-start when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Crystal particles state inside useRef to prevent constant re-renders
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    wobble: number;
    wobbleSpeed: number;
    fallSpeed: number;
    tilt: number; // current angle relative to horizontal plane
  }>>([]);

  const colorPresets = [
    { name: "Branco LED", value: "#e2e8f0" },
    { name: "Ouro Solar", value: "#f5a855" },
    { name: "Sódio Urbano", value: "#f5c842" },
    { name: "Neon Aurora", value: "#42f59b" },
  ];

  // Initialize particles
  const initParticles = (density: number, width: number, height: number) => {
    const list = [];
    for (let i = 0; i < density; i++) {
      list.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: Math.random() * 8 + 6,
        h: Math.random() * 2 + 1.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        fallSpeed: Math.random() * 0.4 + 0.2,
        tilt: (Math.random() - 0.5) * 0.1, // starts near horizontal
      });
    }
    particlesRef.current = list;
  };

  // Resize handler using ResizeObserver
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = Math.max(height, 380); // Ensure a comfortable height
        initParticles(settings.crystalDensity, canvas.width, canvas.height);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [settings.crystalDensity]);

  // Handle setting updates
  const updateSetting = (key: keyof SimulationSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // 1. Clear background (Deep dark blue space)
      ctx.fillStyle = "#06081a";
      ctx.fillRect(0, 0, w, h);

      // Draw faint stars in background
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      for (let i = 0; i < 20; i++) {
        const starX = (Math.sin(i * 452) * 0.5 + 0.5) * w;
        const starY = (Math.cos(i * 853) * 0.5 + 0.5) * (h - 60);
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      const sourceX = w / 2;
      const sourceY = h - 35;

      // 2. Compute physics parameters based on user settings
      // Lower temperature (-30 to 0) decreases crystal tilting/wobble and increases density efficiency
      const tempFactor = Math.max(0, (settings.temperature + 30) / 30); // 0 at -30C, 1 at 0C
      // Wind speed (0 to 10) increases wobble amplitude and frequency
      const windWobbleAmp = (settings.windSpeed / 10) * 0.6 + (tempFactor * 0.15); // max tilting in radians
      const windSpeedFactor = 1 + (settings.windSpeed / 2);

      // Draw active ground source lamp stand
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(sourceX, h - 10);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.ellipse(sourceX, h - 10, 15, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw light beam glow under coordinates
      // We use additive synthesis to accumulate reflections
      ctx.globalCompositeOperation = "screen";

      // Draw ambient source light bulb glow
      const sourceGlow = ctx.createRadialGradient(sourceX, sourceY, 2, sourceX, sourceY, 35);
      sourceGlow.addColorStop(0, "#ffffff");
      sourceGlow.addColorStop(0.2, settings.lightColor);
      sourceGlow.addColorStop(1, "transparent");
      ctx.fillStyle = sourceGlow;
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw floating particles
      particlesRef.current.forEach((p, idx) => {
        if (isPlaying) {
          // Fall down slowly
          p.y += p.fallSpeed;
          // Loop around if falls off screen
          if (p.y > h - 35) {
            p.y = 0;
            p.x = Math.random() * w;
          }

          // Oscillate tilt angle based on wind speed
          p.wobble += p.wobbleSpeed * windSpeedFactor;
          p.tilt = Math.sin(p.wobble) * windWobbleAmp;

          // Subtle horizontal drift due to wind
          p.x += Math.sin(p.wobble * 0.3) * (settings.windSpeed * 0.1);
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
        }

        // 4. Calculate lighting reflection
        // A crystal reflects light to the observer if it's directly above the light source
        // and its tilt is very close to horizontal (0 degrees).
        const dx = p.x - sourceX;
        const distFromAxis = Math.abs(dx);
        const tiltIntensity = Math.max(0, 1 - Math.abs(p.tilt) * 6); // highly sensitive to tilt!
        const axialProximity = Math.max(0, 1 - distFromAxis / 50); // within 50px of center axis

        // Reflection brightness
        const intensityFactor = settings.sourceIntensity / 100;
        const reflectionGlow = tiltIntensity * axialProximity * intensityFactor;

        // Draw particle representation
        ctx.fillStyle = `rgba(168, 212, 245, ${0.15 + reflectionGlow * 0.7})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 + reflectionGlow * 0.55})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        // Render flat elliptical/hexagonal crystal plate
        ctx.ellipse(p.x, p.y, p.w, p.h, p.tilt, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw reflection rays (Neon tracing lines)
        if (settings.showRays && reflectionGlow > 0.08 && idx % 3 === 0) {
          ctx.beginPath();
          // Ray from source to crystal
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(p.x, p.y);
          // Ray from crystal to observer viewpoint (placed arbitrarily on left eye level)
          ctx.lineTo(35, h * 0.65);

          ctx.strokeStyle = `${settings.lightColor}${Math.floor(reflectionGlow * 180).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.8 + reflectionGlow * 1.2;
          ctx.stroke();

          // Highlight intersection node
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Draw the collective vertical Light Pillar column glow
      // This is a cumulative optical result of all particles
      // The cleaner/colder the conditions, the sharper and brighter it is!
      const stabilityFactor = Math.max(0.1, 1 - (settings.windSpeed / 10)); // 0.1 (turbulent) to 1.0 (perfectly calm)
      const efficiencyFactor = Math.max(0.15, 1 - tempFactor); // higher efficiency at colder temp

      const pillarWidth = 14 + (settings.windSpeed * 4); // wind scatters it, making it wider and dimmer
      const pillarAlpha = 0.35 * (settings.sourceIntensity / 100) * stabilityFactor * efficiencyFactor;

      if (pillarAlpha > 0.01) {
        const pillarGrad = ctx.createLinearGradient(sourceX - pillarWidth, 0, sourceX + pillarWidth, 0);
        pillarGrad.addColorStop(0, "transparent");
        pillarGrad.addColorStop(0.5, `${settings.lightColor}${Math.floor(pillarAlpha * 255).toString(16).padStart(2, '0')}`);
        pillarGrad.addColorStop(1, "transparent");

        ctx.fillStyle = pillarGrad;
        // The pillar rises tall through the air
        ctx.fillRect(sourceX - pillarWidth, 15, pillarWidth * 2, sourceY - 15);
      }

      // Re-render observer eye visual marker on left
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.arc(35, h * 0.65, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#a8d4f5";
      ctx.font = "8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("OBSERVADOR", 35, h * 0.65 + 24);

      // Return composite operation to normal
      ctx.globalCompositeOperation = "source-over";

      // Draw bottom status overlay
      ctx.fillStyle = "rgba(6, 8, 26, 0.9)";
      ctx.fillRect(0, h - 30, w, 30);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.beginPath();
      ctx.moveTo(0, h - 30);
      ctx.lineTo(w, h - 30);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Partículas Ativas: ${particlesRef.current.length} | Alinhamento: ${Math.round(stabilityFactor * 100)}%`, 12, h - 10);

      // Pulse indicator for simulation activity
      if (isPlaying) {
        ctx.fillStyle = "#a8d4f5";
        ctx.beginPath();
        ctx.arc(w - 18, h - 14, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isPlaying) {
        requestRef.current = requestAnimationFrame(draw);
      }
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(draw);
    } else {
      draw(); // Single draw for pause state
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, settings]);

  const toggleSimulation = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setSettings({
      temperature: -18,
      windSpeed: 1.2,
      lightColor: "#a8d4f5",
      crystalDensity: 80,
      crystalType: "hexagonal",
      sourceIntensity: 80,
      showRays: true,
      timeOfDay: "night",
    });
    const canvas = canvasRef.current;
    if (canvas) {
      initParticles(80, canvas.width, canvas.height);
    }
  };

  return (
    <section id="laboratorio" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#06081a]">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Laboratório de Óptica Virtual
        </h2>
        <p className="mt-4 text-white/60 max-w-2xl text-sm sm:text-base font-sans">
          Experimente as condições ideais para a aparição dos pilares de luz. Modifique a temperatura para moldar os cristais, acione o vento para desalinhá-los e observe o reflexo coletivo instantaneamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Canvas Render Area (col-span-8) */}
        <div className="lg:col-span-8 flex flex-col justify-between glass-panel rounded-lg overflow-hidden relative min-h-[420px] bg-slate-950/20" ref={containerRef}>
          <canvas ref={canvasRef} className="w-full flex-grow block" />

          {/* PLAY OVERLAY (Mimics the video play card placeholder on the screenshot but activates simulation!) */}
          {!isPlaying && particlesRef.current.length === 0 && (
            <div className="absolute inset-0 bg-[#06081a]/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 z-30 transition-all duration-300">
              <div className="p-5 sm:p-6 rounded-full bg-ice-blue/10 border border-ice-blue/30 text-ice-blue mb-4 animate-pulse">
                <Play size={44} className="fill-ice-blue translate-x-0.5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Veja em Ação</h3>
              <p className="text-sm text-white/50 text-center max-w-md mb-6 leading-relaxed">
                Inicie o simulador de física de partículas para ver as reflexões dos cristais em tempo real criando um pilar luminoso virtual.
              </p>
              <button
                onClick={toggleSimulation}
                className="px-6 py-3 rounded-sm bg-ice-blue text-primary-space hover:shadow-[0_0_20px_rgba(168,212,245,0.5)] font-grotesk font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                Ativar Simulador Físico
              </button>
            </div>
          )}

          {/* Play/Pause state controls overlay on bottom left */}
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button
              onClick={toggleSimulation}
              className="p-2 rounded bg-[#06081a]/85 border border-white/10 hover:border-white/30 text-white transition-all cursor-pointer"
              title={isPlaying ? "Pausar" : "Iniciar"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded bg-[#06081a]/85 border border-white/10 hover:border-white/30 text-white transition-all cursor-pointer"
              title="Resetar Configurações"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Control Panel Area (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between glass-panel rounded-lg p-6 sm:p-8 bg-white/[0.01]">
          <div>
            <div className="flex items-center space-x-2 text-ice-blue mb-6">
              <Sliders size={18} />
              <h3 className="font-grotesk text-lg font-bold text-white uppercase tracking-wider">Ajustes Atmosféricos</h3>
            </div>

            {/* Parameter 1: Temperature */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-white/60 flex items-center space-x-1">
                  <Thermometer size={14} className="text-blue-400" />
                  <span>Temperatura do Ar:</span>
                </label>
                <span className={`text-xs font-mono font-bold ${settings.temperature < -15 ? "text-blue-400" : "text-white/80"}`}>
                  {settings.temperature}°C
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="0"
                value={settings.temperature}
                onChange={(e) => updateSetting("temperature", parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
              <div className="flex justify-between text-[9px] text-white/30 mt-1">
                <span>-30°C (Ideia)</span>
                <span>0°C (Água)</span>
              </div>
            </div>

            {/* Parameter 2: Wind Speed */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-white/60 flex items-center space-x-1">
                  <Wind size={14} className="text-teal-400" />
                  <span>Velocidade do Vento:</span>
                </label>
                <span className={`text-xs font-mono font-bold ${settings.windSpeed < 2 ? "text-teal-400" : "text-amber-400"}`}>
                  {settings.windSpeed} m/s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={settings.windSpeed}
                onChange={(e) => updateSetting("windSpeed", parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[9px] text-white/30 mt-1">
                <span>0 m/s (Calmaria total)</span>
                <span>10 m/s (Turbulência)</span>
              </div>
            </div>

            {/* Parameter 3: Light source color selection */}
            <div className="mb-6">
              <label className="text-xs font-mono text-white/60 block mb-2 flex items-center space-x-1">
                <Lightbulb size={14} className="text-solar-amber" />
                <span>Cor da Fonte de Luz:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => updateSetting("lightColor", preset.value)}
                    className={`px-2 py-1.5 rounded-sm border text-[10px] font-grotesk transition-all flex items-center space-x-2 cursor-pointer ${
                      settings.lightColor === preset.value
                        ? "bg-white/10 text-white border-white/45"
                        : "bg-white/[0.01] text-white/40 border-white/5 hover:text-white/70"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: preset.value }} />
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 4: Crystal Density */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-white/60">Densidade de Cristais:</label>
                <span className="text-xs font-mono font-bold text-ice-blue">{settings.crystalDensity}</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                value={settings.crystalDensity}
                onChange={(e) => updateSetting("crystalDensity", parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ice-blue"
              />
            </div>

            {/* Parameter 5: Show Rays toggle */}
            <div className="mb-6 flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-white/80">Ray-Tracing Óptico:</span>
                <span className="text-[9px] text-white/40 font-sans">Desenha vetores incidentes/refletidos</span>
              </div>
              <button
                onClick={() => updateSetting("showRays", !settings.showRays)}
                className={`p-1.5 rounded cursor-pointer transition-all ${
                  settings.showRays ? "bg-ice-blue/20 text-ice-blue" : "text-white/30 hover:text-white/60"
                }`}
                title="Alternar traçado de raios"
              >
                {settings.showRays ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {/* Physical outcome explanation warning */}
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-start space-x-2 p-2.5 rounded bg-[#f5c842]/5 border border-[#f5c842]/10 text-[#f5c842] text-[11px] leading-relaxed">
              <Info size={14} className="shrink-0 mt-0.5" />
              <div>
                <strong>Resultado Físico:</strong> {
                  settings.windSpeed > 3.5 
                    ? "O vento forte agita e inclina os cristais de gelo, dispersando a luz. O pilar desaparece devido à dispersão angular." 
                    : settings.temperature > -10 
                    ? "A alta temperatura impede a cristalização ideal em placas hexagonais planas; a formação é ineficiente."
                    : "Condições perfeitas! O ar gélido e calmo alinha os espelhos de gelo perfeitamente, criando um pilar vertical brilhante."
                }
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
