import React from "react";
import { Sparkles, Compass, Lightbulb, Beaker, Library } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const navItems = [
    { id: "inicio", label: "Início", icon: Compass },
    { id: "conceitos", label: "Conceitos", icon: Lightbulb },
    { id: "laboratorio", label: "Laboratório", icon: Beaker },
    { id: "galeria", label: "Galeria", icon: Library },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#06081a]/65 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("inicio")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <span className="font-display text-lg sm:text-2xl font-bold tracking-wider text-white group-hover:text-ice-blue transition-colors">
              Pilares de Luz
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ice-blue animate-pulse group-hover:scale-125 transition-transform" />
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-md font-grotesk text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-ice-blue bg-white/[0.04]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-ice-blue" : "text-white/40"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action button */}
          <div>
            <button
              onClick={() => handleNavClick("laboratorio")}
              className="flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm bg-ice-blue/90 hover:bg-ice-blue text-primary-space hover:shadow-[0_0_15px_rgba(168,212,245,0.4)] text-xs sm:text-sm font-grotesk font-semibold tracking-wide transition-all duration-300 group cursor-pointer"
            >
              <span>Explorar Lab</span>
              <Sparkles size={14} className="text-primary-space group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
