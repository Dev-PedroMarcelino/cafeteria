"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import Reveal from "./ui/Reveal";

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-24 sm:py-32">
      {/* Faixa diagonal de cor ao fundo */}
      <div className="absolute inset-0 -skew-y-3 scale-110 bg-gradient-to-br from-banana/15 via-cream to-bubblegum/15" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Colagem assimétrica de fotos */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <Reveal variant="pop">
            <div className="gradient-frame blob-mask relative aspect-[4/3] w-[85%]">
              <div className="blob-mask relative h-full w-full">
                <Image
                  src="/midia/fachada.jpg"
                  alt="Fachada do Café Banana em Leme - SP"
                  fill
                  sizes="(max-width: 1024px) 85vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="pop" delay={0.15} className="absolute -bottom-10 right-0 w-[48%]">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="gradient-frame relative aspect-square rounded-full"
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/midia/mesa-completa.jpg"
                  alt="Mesa completa de café da manhã no Café Banana"
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </Reveal>

          {/* Selo girando */}
          <Reveal variant="pop" delay={0.25} className="absolute -top-6 right-[8%]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-banana font-display text-xs font-bold text-cocoa shadow-card"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full p-2">
                <defs>
                  <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text className="fill-cocoa font-display text-[11.5px] font-bold uppercase tracking-[0.18em]">
                  <textPath href="#circlePath">• Café Banana • Leme SP • Desde sempre </textPath>
                </text>
                <text x="50" y="58" textAnchor="middle" className="text-[26px]">
                  🍌
                </text>
              </svg>
            </motion.div>
          </Reveal>
        </div>

        {/* História */}
        <div className="mt-8 lg:mt-0">
          <Reveal variant="gum">
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Um cantinho <span className="text-brand-gradient">amarelo e rosa</span> no coração
              de Leme
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-cocoa/75">
              O Café Banana nasceu de uma ideia simples: juntar o café passado na hora, o cheiro
              de bolo saindo do forno e aquele acolhimento de interior que só {site.city} tem.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 text-lg leading-relaxed text-cocoa/75">
              Do bolinho de chuva ao capuccino cremoso, tudo é feito na casa, todos os dias. Vem
              tomar um café com a gente — de xícara na mão ou pelo delivery.
            </p>
          </Reveal>

          <Reveal variant="pop" delay={0.26}>
            <motion.a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96, y: 1 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-banana via-banana to-bubblegum px-8 py-4 font-display text-lg font-semibold text-cocoa shadow-[0_10px_0_0_var(--color-banana-deep),0_24px_48px_-12px_rgb(255_107_133/0.5)] transition-shadow hover:shadow-[0_6px_0_0_var(--color-banana-deep),0_28px_56px_-12px_rgb(255_107_133/0.65)]"
            >
              <span className="text-2xl">📍</span>
              Como chegar — {site.address}
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
