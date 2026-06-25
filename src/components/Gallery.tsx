import React from "react";
import { Compass, Camera, MapPin, Eye } from "lucide-react";
import lightPillarsImage from "../assets/images/light_pillars_phenomenon_1782235843019.jpg";

export default function Gallery() {
  return (
    <section id="galeria" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Editorial scientific description */}
        <div className="lg:col-span-5">
          <span className="text-xs font-mono text-cold-violet uppercase tracking-wider mb-2 flex items-center space-x-1">
            <Compass size={12} />
            <span>Observação e Registro</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Onde a Física Encontra a Arte
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed mb-6">
            Fotografias reais deste fenômeno revelam quão perfeitamente paralelos e verticais os feixes de luz aparecem para o olho destreinado. Embora pareçam focos de busca militares disparados ao espaço, eles são <strong>estruturas virtuais puras</strong> geradas no plano de foco ocular.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded text-ice-blue shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-sm font-grotesk font-bold text-white">Regiões Polares e Subpolares</h4>
                <p className="text-xs text-white/50 leading-relaxed mt-1">
                  Mais frequentes em áreas de latitude norte como o Alasca, Canadá, norte da Europa e Rússia rústica durante noites gélidas de inverno estelar.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded text-solar-amber shrink-0">
                <Eye size={16} />
              </div>
              <div>
                <h4 className="text-sm font-grotesk font-bold text-white font-medium">Pilares de Luz em Outros Planetas</h4>
                <p className="text-xs text-white/50 leading-relaxed mt-1">
                  Sondas espaciais em Marte já registraram pilares de luz solar gerados por cristais de gelo de dióxido de carbono (gelo seco) em sua atmosfera tênue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful Photographic Display Frame */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full glass-panel rounded-lg p-2 bg-white/[0.01] relative group overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,212,245,0.15)]">
            {/* Direct image link in HTML */}
            <img
              src={lightPillarsImage}
              alt="Pilares de luz atmosféricos fotografados em uma noite fria e estrelada"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-md filter brightness-95 group-hover:brightness-105 transition-all duration-700 select-none pointer-events-none"
            />
            
            {/* Visual HUD metadata overlaid */}
            <div className="absolute top-6 left-6 z-10 flex items-center space-x-2 bg-[#06081a]/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
              <Camera size={12} className="text-ice-blue animate-pulse" />
              <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest font-semibold">Registro Real</span>
            </div>

            <div className="p-4 sm:p-5 flex justify-between items-center text-xs text-white/50 font-mono">
              <span className="flex items-center space-x-1">
                <span>Latitude:</span>
                <strong className="text-white">64.1265° N (Islândia)</strong>
              </span>
              <span>Temp: -22°C</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
