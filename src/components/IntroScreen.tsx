import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  visible: boolean;
  onComplete: () => void;
}

export default function IntroScreen({ visible, onComplete }: Props) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onComplete, 2600);
    return () => clearTimeout(t);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] bg-[#06081a] flex flex-col items-center justify-center select-none pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-light italic text-white tracking-tight"
          >
            Pilares de Luz.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="font-mono text-[11px] tracking-[0.3em] text-white uppercase mt-5"
          >
            Física — 9º Ano
          </motion.p>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 h-px w-24 bg-ice-blue origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
