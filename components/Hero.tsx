"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import HeroArt from "./HeroArt";
import CoffeeCupSvg from "./art/CoffeeCupSvg";
import { useIntroDone } from "./IntroProvider";

export default function Hero() {
  const introDone = useIntroDone();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolledPast, setScrolledPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolledPast(y > 80));

  return (
    <section
      id="topo"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* Fundo: pontilhado da marca + brilhos suaves quentes */}
      <div className="dotted-bg absolute inset-0 opacity-40" />
      <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-banana/20 blur-[120px]" />
      <div className="absolute -right-16 bottom-1/4 h-96 w-96 rounded-full bg-terracotta/15 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[160px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-20 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pb-12 lg:pt-24">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.3 }}
            className="mb-5 inline-block rounded-full border border-banana/40 bg-cream/80 px-4 py-1.5 font-display text-sm font-medium text-banana-deep backdrop-blur-sm"
          >
            ☕ Cafeteria &amp; Delivery em Leme - SP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 48, scale: 0.95 }}
            animate={introDone ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.45 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
          >
            O Sabor que{" "}
            <span className="relative inline-block">
              <span className="text-brand-gradient">Leme Inteira</span>
              {/* Rabisco desenhado à mão sob o destaque */}
              <svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full overflow-visible"
                aria-hidden
              >
                <motion.path
                  d="M3,8 Q28,2 52,8 T101,8 T150,8 T197,7"
                  fill="none"
                  stroke="var(--color-terracotta)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: reduceMotion ? 1 : 0 }}
                  animate={introDone ? { pathLength: 1 } : undefined}
                  transition={{ duration: 0.7, delay: 1.05, ease: "easeInOut" }}
                />
              </svg>
            </span>{" "}
            Ama.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.65 }}
            className="mx-auto mt-6 max-w-xl text-lg text-cocoa/70 sm:text-xl lg:mx-0"
          >
            Café, conforto e a melhor experiência da cidade.
            <span className="font-display font-semibold text-banana-deep"> Sabor & Aconchego.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.85 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.a
              href="#cardapio"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full bg-cocoa px-8 py-4 text-center font-display text-lg font-semibold text-cream shadow-card sm:w-auto"
            >
              Ver Cardápio 🍰
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full border-2 border-cocoa/15 bg-cream/80 px-8 py-4 text-center font-display text-lg font-semibold text-cocoa backdrop-blur-sm sm:w-auto"
            >
              Conheça o Café
            </motion.a>
          </motion.div>
        </div>

        {/* Arte 2D animada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={introDone ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.55 }}
        >
          <HeroArt />
        </motion.div>
      </div>

      {/* Indicador de scroll — xícara quicando, some ao rolar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone && !scrolledPast ? 1 : 0 }}
        transition={{ delay: introDone && !scrolledPast ? 1.6 : 0 }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl"
        >
          ☕
        </motion.div>
        <span className="font-display text-xs font-medium text-cocoa/50">desliza 👇</span>
      </motion.div>
    </section>
  );
}
