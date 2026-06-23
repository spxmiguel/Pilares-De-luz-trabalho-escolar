import React from "react";
import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#06081a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono tracking-widest text-cold-violet uppercase">Módulo 02</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 flex items-center gap-3">
            Assista e Entenda
            <PlayCircle className="text-ice-blue opacity-70" size={36} />
          </h2>
        </div>
        <p className="text-xs font-mono text-white/40 mt-2 sm:mt-0">ÓPTICA ATMOSFÉRICA</p>
      </div>

      {/* Player */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#0a0d1f",
            boxShadow: "0 0 0 1px rgba(126,200,255,0.08), 0 24px 60px rgba(0,0,0,0.6)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/WTos8Sn4Rn0"
            title="Prof. Leandro Ribeiro — Pilares de Luz"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Caption */}
        <p className="mt-4 text-sm text-white/45 font-mono text-center">
          Prof. Leandro Ribeiro explica a física por trás dos Pilares de Luz —
          dos cristais de gelo às colunas visíveis no céu.
        </p>
      </motion.div>
    </section>
  );
}
