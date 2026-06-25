import React from "react";
import { motion } from "motion/react";
import { FlaskConical, Snowflake, GitCommit, ThermometerSnowflake, Lightbulb } from "lucide-react";
import InteractiveReflection from "./InteractiveReflection";

export default function AnalyticalExploration() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="conceitos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Exploração Analítica
          </h2>
        </div>
        <p className="text-xs font-mono text-white/40 mt-2 sm:mt-0">FÍSICA DA ATMOSFERA</p>
      </div>

      {/* Grid of Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        {/* CARD 01: O que são (col-span-3) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-ice-blue/30 transition-colors">
                <FlaskConical size={22} className="text-ice-blue" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-ice-blue/60 transition-colors">01</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-ice-blue transition-colors mb-4">
              O que são
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Fenômenos ópticos atmosféricos onde bandas verticais de luz parecem se estender acima e/ou abaixo de uma fonte luminosa. Não são feixes reais de luz físicos viajando para cima, mas sim um <strong>reflexo coletivo</strong> de milhões de cristais.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>FENÔMENO</span>
            <span>ÓPTICO COLETIVO</span>
          </div>
        </motion.div>

        {/* CARD 02: Como se formam (col-span-3) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-cold-violet/30 transition-colors">
                <Snowflake size={22} className="text-cold-violet" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-cold-violet/60 transition-colors">02</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-cold-violet transition-colors mb-4">
              Como se formam
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Ocorrem quando a luz incide em <strong>cristais de gelo hexagonais</strong> quase perfeitamente horizontais que caem lentamente através da atmosfera fria, atuando como espelhos flutuantes de alta fidelidade reflexiva.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>GEOMETRIA</span>
            <span>HEXAGONAL (D6)</span>
          </div>
        </motion.div>

        {/* CARD 03: Reflexão da Luz (col-span-6 - Wide Card with Interactive diagram inside) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-6 glass-panel rounded-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-5 flex flex-col justify-between h-full group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/[0.03] rounded border border-white/10">
                  <GitCommit size={22} className="text-solar-amber" />
                </div>
                <span className="text-xs font-mono text-white/30 font-bold">03</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-4">
                Reflexão da luz
              </h3>
              <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                A formação física de um pilar de luz segue rigorosamente as leis da óptica geométrica básica. Quando um feixe atinge as faces superiores ou inferiores planas dos cristais planos, a luz é refletida de acordo com a <strong>Lei da Reflexão</strong> clássica: o ângulo de incidência é idêntico ao ângulo de reflexão (&theta;i = &theta;r).
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 flex flex-col space-y-2 text-xs font-mono text-white/40">
              <div className="flex justify-between">
                <span>VETOR DE INCIDÊNCIA</span>
                <span className="text-solar-amber">&theta;i (Laranja)</span>
              </div>
              <div className="flex justify-between">
                <span>VETOR DE REFLEXÃO</span>
                <span className="text-ice-blue">&theta;r (Azul)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-full">
            <InteractiveReflection />
          </div>
        </motion.div>

        {/* CARD 04: Quando aparecem (col-span-3) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-ice-blue/30 transition-colors">
                <ThermometerSnowflake size={22} className="text-ice-blue" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-ice-blue/60 transition-colors">04</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-ice-blue transition-colors mb-4">
              Quando aparecem
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Requerem temperaturas atmosféricas extremamente baixas (geralmente abaixo de <strong>-10°C a -20°C</strong>) e ausência quase total de vento, para que os frágeis cristais mantenham sua preciosa orientação de alinhamento horizontal.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>CONDIÇÕES</span>
            <span>&lt; -10°C / CALMARIA</span>
          </div>
        </motion.div>

        {/* CARD 05: Curiosidade (col-span-3) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-solar-amber/30 transition-colors">
                <Lightbulb size={22} className="text-solar-amber" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-solar-amber/60 transition-colors">05</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-solar-amber transition-colors mb-4">
              Curiosidade
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Eles assumem com precisão a <strong>cor exata da fonte de luz</strong> originária. Pilares de luz solar são alaranjados/avermelhados, enquanto pilares artificiais urbanos podem ter coloração amarela brilhante (lâmpadas de sódio) ou branca fria (LEDs).
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>CROMATISMO</span>
            <span>FONTE EXATA</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
