import React from "react";
import { motion } from "motion/react";
import { PlayCircle } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white flex items-center gap-4">
          Assista e Entenda
          <PlayCircle className="text-ice-blue opacity-60" size={32} />
        </h2>
        <p className="text-xs font-mono text-white/35 mt-3 sm:mt-0 uppercase tracking-widest">Óptica Atmosférica</p>
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
