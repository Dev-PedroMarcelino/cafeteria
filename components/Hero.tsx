"use client";

import { motion } from "framer-motion";
import HeroArt from "./HeroArt";
import { useIntroDone } from "./IntroProvider";

export default function Hero() {
  const introDone = useIntroDone();

  return (
    <section
      id="topo"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* Fundo: pontilhado da marca + brilhos suaves */}
      <div className="dotted-bg absolute inset-0 opacity-60" />
      <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-banana/25 blur-[110px]" />
      <div className="absolute -right-16 bottom-1/4 h-96 w-96 rounded-full bg-bubblegum/25 blur-[110px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-20 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pb-12 lg:pt-24">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.3 }}
            className="mb-5 inline-block rounded-full border border-bubblegum/40 bg-white/70 px-4 py-1.5 font-display text-sm font-medium text-bubblegum-deep backdrop-blur-sm"
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
            <span className="text-brand-gradient">Leme Inteira</span> Ama.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={introDone ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.65 }}
            className="mx-auto mt-6 max-w-xl text-lg text-cocoa/75 sm:text-xl lg:mx-0"
          >
            Café, conforto e a melhor experiência da cidade.
            <span className="font-display font-semibold text-bubblegum-deep"> Sinta a vibe.</span>
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
              className="w-full rounded-full bg-cocoa px-8 py-4 text-center font-display text-lg font-semibold text-banana shadow-card sm:w-auto"
            >
              Ver Cardápio 🍰
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full border-2 border-cocoa/15 bg-white/80 px-8 py-4 text-center font-display text-lg font-semibold text-cocoa backdrop-blur-sm sm:w-auto"
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

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-cocoa/25 p-1.5"
        >
          <div className="h-2.5 w-1.5 rounded-full bg-bubblegum" />
        </motion.div>
      </motion.div>
    </section>
  );
}
