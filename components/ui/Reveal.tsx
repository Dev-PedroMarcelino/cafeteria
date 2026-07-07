"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Wrapper de revelação no scroll. Nada "simplesmente aparece":
 *  - "up":  sobe com mola suave (conteúdo em geral)
 *  - "gum": estica como chiclete — mola bem elástica (títulos)
 *  - "pop": nasce pequeno e estoura no lugar (cards, badges)
 */
type RevealVariant = "up" | "gum" | "pop";

const variantsMap: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 56 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 16 },
    },
  },
  gum: {
    hidden: { opacity: 0, scaleY: 0.4, scaleX: 1.15, y: 40 },
    show: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 13, mass: 0.9 },
    },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.7, y: 24 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 18 },
    },
  },
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const variants = variantsMap[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      style={{ transformOrigin: "bottom center" }}
    >
      {children}
    </motion.div>
  );
}
