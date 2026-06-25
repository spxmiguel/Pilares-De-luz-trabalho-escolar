import React from "react";
import { motion } from "motion/react";
import { Zap, Waves, Palette, Minimize2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function PhysicsConcepts() {
  return (
    <section id="fisica" className="py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-16"
      >
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
          A Física por Trás
        </h2>
        <p className="text-xs font-mono text-white/35 mt-3 sm:mt-0 uppercase tracking-widest">Fenômenos Ópticos</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        {/* REFLEXÃO — destaque, col-span-4 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-ice-blue/30 transition-colors">
                <Zap size={22} className="text-ice-blue" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-ice-blue/60 transition-colors">01</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-ice-blue transition-colors mb-4">
              Reflexão
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Mecanismo principal dos pilares de luz. Os cristais de gelo hexagonais suspensos no ar atuam como <strong>espelhos planos microscópicos</strong>. Cada cristal reflete a luz da fonte em direção ao observador, criando a ilusão de uma coluna vertical contínua e brilhante.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>MECANISMO PRINCIPAL</span>
            <span className="text-ice-blue/60">REFLEXÃO ESPECULAR</span>
          </div>
        </motion.div>

        {/* REFRAÇÃO — col-span-2 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-cold-violet/30 transition-colors">
                <Waves size={22} className="text-cold-violet" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-cold-violet/60 transition-colors">02</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-cold-violet transition-colors mb-4">
              Refração
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Ocorre quando a luz muda de meio e desvia sua trajetória — é o que forma o arco-íris. Nos pilares, os cristais <strong>refletem</strong>, não refratam.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>NÃO É O CAUSADOR</span>
          </div>
        </motion.div>

        {/* DISPERSÃO — col-span-3 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-solar-amber/30 transition-colors">
                <Palette size={22} className="text-solar-amber" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold group-hover:text-solar-amber/60 transition-colors">03</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-solar-amber transition-colors mb-4">
              Dispersão
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              A dispersão separa a luz em suas cores componentes, como num prisma. Nos pilares isso <strong>não acontece</strong>: uma luz laranja gera um pilar laranja. A ausência de dispersão confirma que o fenômeno é reflexão especular.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>AUSENTE</span>
            <span>PROVA DA REFLEXÃO</span>
          </div>
        </motion.div>

        {/* ABSORÇÃO — col-span-3 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 glass-panel glass-panel-hover rounded-lg p-6 sm:p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded border border-white/10 group-hover:border-white/20 transition-colors">
                <Minimize2 size={22} className="text-white/50" />
              </div>
              <span className="text-xs font-mono text-white/30 font-bold">04</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-4">
              Absorção
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed">
              Os cristais absorvem uma fração da energia luminosa ao longo do percurso. Por isso o pilar é sempre <strong>menos brilhante</strong> que a fonte original — quanto mais cristais, maior a absorção e mais difuso o pilar aparece.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>EFEITO SECUNDÁRIO</span>
            <span>ATENUAÇÃO</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
