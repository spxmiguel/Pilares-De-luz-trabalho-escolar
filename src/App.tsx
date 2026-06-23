/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AnalyticalExploration from "./components/AnalyticalExploration";
import GeometryOfCold from "./components/GeometryOfCold";
import Laboratory from "./components/Laboratory";
import Gallery from "./components/Gallery";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";

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
