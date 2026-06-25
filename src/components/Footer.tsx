import React from "react";
import { Snowflake, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#02030a] overflow-hidden">
      {/* Decorative dot matrix mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 flex flex-col items-center text-center">
        {/* Subtle geometric dot accent */}
        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-full text-ice-blue mb-8 animate-pulse">
          <Snowflake size={24} />
        </div>

        {/* Closing Grand Quote from the screenshot */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl italic font-light text-white/95 max-w-4xl leading-tight mb-8">
          "A física não apenas explica o mundo, ela revela a arte oculta nos mecanismos do universo."
        </h2>

        {/* Small descriptive paragraph at the bottom */}
        <p className="font-sans text-sm sm:text-base text-white/50 max-w-2xl leading-relaxed mb-12">
          Os pilares de luz são um lembrete visual impressionante de como condições atmosféricas específicas e as leis fundamentais da óptica podem colaborar para criar espetáculos naturais de tirar o fôlego.
        </p>

        {/* Authors */}
        <div className="flex space-x-1 mb-10 select-none">
          {["DAVI", "MIGUEL", "ARTHUR"].map((name, i) => (
            <span key={name} className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white/25">
              {name}{i < 2 && <span className="text-ice-blue/40 mx-1">·</span>}
            </span>
          ))}
        </div>

        {/* Cache clear */}
        <button
          onClick={() => { sessionStorage.removeItem("pilares_v"); window.location.reload(); }}
          className="mb-10 text-[10px] font-mono text-white/15 hover:text-white/40 transition-colors duration-300 cursor-pointer"
        >
          ver introdução novamente
        </button>

        {/* Footer legalities and design details */}
        <div className="w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/30 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span>&copy; {currentYear} Pilares de Luz.</span>
            <span className="hidden sm:inline">|</span>
            <span>Trabalho de Física — 9º Ano</span>
          </div>

          <div className="flex space-x-4">
            <a href="#inicio"     className="hover:text-ice-blue transition-colors">Início</a>
            <a href="#conceitos"  className="hover:text-ice-blue transition-colors">Conceitos</a>
            <a href="#laboratorio" className="hover:text-ice-blue transition-colors">Laboratório</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
