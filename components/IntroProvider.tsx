"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BananaSvg from "./art/BananaSvg";

/* ────────────────────────────────────────────────────────────
   Intro de abertura — cortina de marca que cobre o primeiro
   paint: a logo estoura no centro, o nome entra em springs e
   a cortina sobe com borda curva revelando o hero. O Header e
   o Hero esperam o sinal `useIntroDone()` para coreografar a
   entrada junto com a subida da cortina.
   ──────────────────────────────────────────────────────────── */

const INTRO_HOLD_MS = 1700;

const IntroContext = createContext(true);

/** `true` quando a cortina começou a subir — hora de animar a entrada. */
export function useIntroDone() {
  return useContext(IntroContext);
}

function SplashOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
      exit={{ y: "-112%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      {/* Textura e brilhos da marca */}
      <div className="dotted-bg absolute inset-0 opacity-50" />
      <div className="absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-banana/35 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 rounded-full bg-bubblegum/35 blur-[100px]" />

      {/* Borda curva que "escorre" quando a cortina sobe */}
      <svg
        className="absolute left-0 top-full h-20 w-full text-cream"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,0 C480,80 960,80 1440,0 L1440,0 L0,0 Z" />
      </svg>

      <div className="relative flex flex-col items-center">
        {/* Bananas escoltando a logo */}
        <motion.div
          className="absolute -left-20 top-2 w-12 sm:-left-28 sm:w-16"
          initial={{ opacity: 0, x: 24, rotate: -30 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          <BananaSvg className="w-full" />
        </motion.div>
        <motion.div
          className="absolute -right-20 top-2 w-12 sm:-right-28 sm:w-16"
          initial={{ opacity: 0, x: -24, rotate: 30 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.58 }}
        >
          <BananaSvg className="w-full -scale-x-100" />
        </motion.div>

        {/* Logo estourando */}
        <motion.div
          initial={{ scale: 0, rotate: -24 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.1 }}
          className="relative h-28 w-28 overflow-hidden rounded-full shadow-card ring-4 ring-banana sm:h-36 sm:w-36"
        >
          <Image
            src="/midia/logo.png"
            alt=""
            fill
            sizes="144px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Nome da marca */}
        <div className="mt-6 flex gap-3 font-display text-4xl font-bold sm:text-5xl">
          <motion.span
            className="text-bubblegum-deep"
            initial={{ opacity: 0, y: 26, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.42 }}
          >
            Café
          </motion.span>
          <motion.span
            className="text-banana-deep"
            initial={{ opacity: 0, y: 26, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.54 }}
          >
            Banana
          </motion.span>
        </div>

        {/* Pontinhos quicando (o "coando" do café) */}
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-bubblegum"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -8, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: 0.7 + i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function IntroProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => setDone(true), INTRO_HOLD_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence>{!done && <SplashOverlay />}</AnimatePresence>
    </IntroContext.Provider>
  );
}
