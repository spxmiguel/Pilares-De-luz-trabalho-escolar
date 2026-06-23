import React from "react";
import { motion } from "motion/react";
import { Zap, Waves, Palette, Minimize2 } from "lucide-react";

const concepts = [
  {
    id: "reflexao",
    label: "Reflexão",
    icon: Zap,
    color: "#a8d4f5",
    role: "Mecanismo principal",
    description:
      "Os cristais de gelo hexagonais suspensos no ar atuam como espelhos planos microscópicos. Cada cristal reflete a luz da fonte em direção ao observador, criando a ilusão de uma coluna vertical contínua e brilhante.",
    principal: true,
  },
  {
    id: "refracao",
    label: "Refração",
    icon: Waves,
    color: "#c4b5fd",
    role: "Não é o causador",
    description:
      "A refração ocorre quando a luz muda de meio e desvia sua trajetória — é o que forma o arco-íris. Nos pilares, os cristais refletem a luz, não a refratam. Por isso o pilar permanece vertical e mantém a cor da fonte.",
    principal: false,
  },
  {
    id: "dispersao",
    label: "Dispersão",
    icon: Palette,
    color: "#f9a8d4",
    role: "Ausente — prova da reflexão",
    description:
      "A dispersão separa a luz em cores (como num prisma). Nos pilares isso não acontece: uma luz laranja gera um pilar laranja. A ausência de dispersão confirma que o fenômeno é reflexão especular, não refração.",
    principal: false,
  },
  {
    id: "absorcao",
    label: "Absorção",
    icon: Minimize2,
    color: "#6ee7b7",
    role: "Efeito secundário",
    description:
      "Os cristais absorvem uma fração da energia luminosa ao longo do percurso. Por isso o pilar é sempre menos brilhante que a fonte original — quanto mais cristais, maior a absorção e mais difuso o pilar aparece.",
    principal: false,
  },
];

export default function PhysicsConcepts() {
  return (
    <section id="fisica" className="py-20 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
            A Física por Trás
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed">
            Quatro fenômenos ópticos — e como cada um se relaciona (ou não) com a formação dos pilares de luz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {concepts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl border p-6 flex flex-col gap-3 ${
                  c.principal
                    ? "border-ice-blue/30 bg-ice-blue/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {c.principal && (
                  <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-ice-blue bg-ice-blue/10 border border-ice-blue/20 px-2 py-0.5 rounded-full uppercase">
                    Principal
                  </span>
                )}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}
                >
                  <Icon size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{c.label}</h3>
                  <p className="font-mono text-[10px] tracking-wider uppercase mt-0.5" style={{ color: c.color }}>
                    {c.role}
                  </p>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{c.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
