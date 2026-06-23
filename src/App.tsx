/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnalyticalExploration from "./components/AnalyticalExploration";
import GeometryOfCold from "./components/GeometryOfCold";
import Laboratory from "./components/Laboratory";
import Gallery from "./components/Gallery";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";

// Stable star positions generated once
const STARS = Array.from({ length: 80 }, (_, i) => ({
  top:      ((i * 37 + 11) % 100),
  left:     ((i * 61 + 7)  % 100),
  size:     ((i * 13) % 3) + 1,
  duration: ((i * 7)  % 4) + 2,
  opacity:  (((i * 17) % 7) + 2) / 10,
}));

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update progress bar
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      // Update active nav section
      const sections = ["inicio", "conceitos", "laboratorio", "galeria"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#06081a] min-h-screen text-white font-sans selection:bg-ice-blue/35 selection:text-white relative">

      {/* Global star field — fixed, behind everything */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              "--duration": `${s.duration}s`,
            } as React.CSSProperties}
          />
        ))}
        {/* Subtle ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ice-blue/4 filter blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cold-violet/4 filter blur-[120px]" />
      </div>

      {/* Scroll progress beam */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-ice-blue to-cold-violet z-[100] transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Global Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Content flow */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <Hero />

        {/* ANALYTICAL CARDS SECTION */}
        <AnalyticalExploration />

        {/* VIDEO SECTION */}
        <VideoSection />

        {/* GEOMETRY OF COLD SECTION */}
        <GeometryOfCold />

        {/* LABORATORY CANVASES SECTION */}
        <Laboratory />

        {/* GALLERY COMPONENT WITH GENERATED IMAGE */}
        <Gallery />

      </main>

      {/* FOOTER AND CLOSING QUOTE */}
      <Footer />

    </div>
  );
}
