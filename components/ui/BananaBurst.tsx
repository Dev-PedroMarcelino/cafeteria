"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   Explosão one-shot de grãos de café e faíscas douradas — cada mudança de
   `trigger` dispara `count` elementos voando em leque a
   partir do centro do wrapper.
   ──────────────────────────────────────────────────────────── */

function CoffeeBeanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="6.5" transform="rotate(-30 12 12)" fill="#8b5a2b" stroke="#5c3818" strokeWidth="1.5" />
      <path d="M7 15 Q12 11 17 9" stroke="#d4a044" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarSparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#c9a84c" aria-hidden>
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6Z" />
    </svg>
  );
}

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
      isBean: i % 2 === 0,
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
          className="absolute -left-2.5 -top-2.5 w-5 h-5 flex items-center justify-center drop-shadow-sm"
          initial={{ x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 1 }}
          animate={{
            x: piece.x,
            y: piece.y,
            scale: 1.1,
            rotate: piece.rotate,
            opacity: 0,
          }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          {piece.isBean ? (
            <CoffeeBeanIcon className="w-full h-full" />
          ) : (
            <StarSparkleIcon className="w-4 h-4" />
          )}
        </motion.span>
      ))}
    </div>
  );
}
