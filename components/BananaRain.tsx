"use client";

import { motion, useReducedMotion } from "framer-motion";
import BananaSvg from "./art/BananaSvg";

/* ────────────────────────────────────────────────────────────
   Chuva de Bananas 2D — trilhos laterais (≤5vw cada) com
   bananas SVG caindo em loop, cada uma com tamanho, ritmo,
   balanço e giro próprios. Puro CSS transform via Framer
   Motion: leve, sem WebGL, desligada no mobile e com
   prefers-reduced-motion.
   ──────────────────────────────────────────────────────────── */

/** PRNG semeado — mesma sequência no servidor e no cliente (SSR-safe). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Drop = {
  left: number; // % dentro do trilho
  size: number; // px
  duration: number; // s da queda completa
  offset: number; // s de defasagem (começa no meio do caminho)
  sway: number; // px de balanço lateral
  spin: number; // graus por ciclo
  opacity: number;
};

function makeDrops(seed: number, count: number): Drop[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const depth = rand(); // 0 = longe (pequena, lenta, translúcida)
    return {
      left: 8 + rand() * 64,
      size: 16 + depth * 22,
      duration: 13 - depth * 5 + rand() * 2,
      offset: rand() * 14,
      sway: 4 + rand() * 9,
      spin: (rand() > 0.5 ? 1 : -1) * (140 + rand() * 320),
      opacity: 0.45 + depth * 0.55,
    };
  });
}

const LEFT_DROPS = makeDrops(20260706, 14);
const RIGHT_DROPS = makeDrops(31415926, 14);

function Rail({ side, drops }: { side: "left" | "right"; drops: Drop[] }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-y-0 z-40 hidden w-[5vw] max-w-24 overflow-hidden md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      {drops.map((drop, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: `${drop.left}%`, width: drop.size, opacity: drop.opacity }}
          initial={{ y: "-18vh", rotate: 0 }}
          animate={{ y: "112vh", rotate: drop.spin, x: [0, drop.sway, -drop.sway, 0] }}
          transition={{
            y: {
              duration: drop.duration,
              repeat: Infinity,
              ease: "linear",
              delay: -drop.offset,
            },
            rotate: {
              duration: drop.duration,
              repeat: Infinity,
              ease: "linear",
              delay: -drop.offset,
            },
            x: {
              duration: drop.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <BananaSvg className="h-auto w-full drop-shadow-sm" />
        </motion.div>
      ))}
    </div>
  );
}

export default function BananaRain() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <>
      <Rail side="left" drops={LEFT_DROPS} />
      <Rail side="right" drops={RIGHT_DROPS} />
    </>
  );
}
