"use client";

import { motion, useReducedMotion } from "framer-motion";
import BananaSvg from "../art/BananaSvg";

/* ────────────────────────────────────────────────────────────
   Explosão one-shot de mini-bananas — cada mudança de
   `trigger` dispara `count` bananinhas voando em leque a
   partir do centro do wrapper (posicione com className).
   Se autodestrói ao fim (opacity 0) e não renderiza nada
   com prefers-reduced-motion.
   ──────────────────────────────────────────────────────────── */

export default function BananaBurst({
  trigger,
  count = 6,
  distance = 72,
  className,
}: {
  /** Contador: incremente para disparar um novo burst. */
  trigger: number;
  count?: number;
  distance?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || trigger === 0) return null;

  const pieces = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + trigger * 0.7;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * 0.85 - 14,
      rotate: (i % 2 === 0 ? 1 : -1) * (160 + i * 40),
    };
  });

  return (
    <div
      key={trigger}
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-0 w-0 ${className ?? ""}`}
      aria-hidden
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          className="absolute -left-2 -top-2 w-4"
          initial={{ x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 1 }}
          animate={{
            x: piece.x,
            y: piece.y,
            scale: 1,
            rotate: piece.rotate,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <BananaSvg className="w-full" />
        </motion.span>
      ))}
    </div>
  );
}
