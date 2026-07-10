"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { site, whatsappOrderUrl } from "@/lib/site";
import BananaSvg from "./art/BananaSvg";

/* ────────────────────────────────────────────────────────────
   Menu mobile — cortina cream que desce do topo com a mesma
   onda e ease do splash de abertura (a cortina é assinatura
   da marca). Links gigantes entram esticando como chiclete,
   um a um, e o rodapé traz o CTA de pedido.
   ──────────────────────────────────────────────────────────── */

const menuLinks = [
  { href: "#carro-chefe", label: "Carro-Chefe", emoji: "⭐" },
  { href: "#cardapio", label: "Cardápio", emoji: "🍰" },
  { href: "#sobre", label: "Sobre", emoji: "🏠" },
  { href: "#contato", label: "Contato", emoji: "📍" },
];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0.4, scaleX: 1.1, y: 32 },
  show: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 14, mass: 0.9 },
  },
};

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  // Trava o scroll da página e fecha com Escape enquanto aberto
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      id="menu-mobile"
      className="fixed inset-x-0 top-0 z-[45] flex h-dvh flex-col overscroll-contain bg-cream pt-20 md:hidden"
      initial={reduceMotion ? { opacity: 0 } : { y: "-112%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { y: "-112%" }}
      transition={
        reduceMotion ? { duration: 0.2 } : { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      }
    >
      {/* Textura e brilhos da marca (mesma linguagem do splash) */}
      <div className="dotted-bg absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute left-0 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-banana/35 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-0 h-64 w-64 translate-x-1/2 rounded-full bg-bubblegum/35 blur-3xl"
        aria-hidden
      />

      {/* Onda escorrendo na borda inferior da cortina */}
      <svg
        className="absolute left-0 top-full h-16 w-full text-cream"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,0 C480,80 960,80 1440,0 L1440,0 L0,0 Z" />
      </svg>

      {/* Bananas de escolta nos cantos */}
      <motion.div
        className="absolute right-6 top-24 w-14"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [10, 22, 10] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <BananaSvg className="w-full opacity-80" />
      </motion.div>
      <motion.div
        className="absolute bottom-36 left-5 w-11"
        animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-18, -6, -18] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        aria-hidden
      >
        <BananaSvg className="w-full -scale-x-100 opacity-70" />
      </motion.div>

      {/* Links de navegação */}
      <motion.nav
        className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-7 overflow-y-auto px-8 py-4"
        variants={listVariants}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        aria-label="Menu principal"
      >
        {menuLinks.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={onClose}
            variants={linkVariants}
            style={{ transformOrigin: "bottom center" }}
            whileTap={{ scale: 0.94 }}
            className="group flex items-baseline gap-3 font-display text-4xl font-bold text-cocoa"
          >
            <motion.span whileTap={{ y: -8, rotate: -14 }} className="text-3xl">
              {link.emoji}
            </motion.span>
            <span className="transition-colors group-hover:text-bubblegum-deep">
              {link.label}
            </span>
          </motion.a>
        ))}
      </motion.nav>

      {/* Rodapé: CTA de pedido + cidade */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 px-8 pb-12"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 120, damping: 16 }}
      >
        <motion.a
          href={whatsappOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-xs rounded-full bg-gradient-to-r from-banana to-bubblegum px-8 py-4 text-center font-display text-lg font-semibold text-cocoa shadow-[0_14px_36px_-10px_rgb(255_107_133/0.6)]"
        >
          Pedir no WhatsApp 🍌
        </motion.a>
        <p className="font-display text-sm font-medium text-cocoa/50">
          {site.name} — {site.city} 💛🩷
        </p>
      </motion.div>
    </motion.div>
  );
}
