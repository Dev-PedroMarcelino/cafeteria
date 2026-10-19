"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useIntroDone } from "./IntroProvider";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#carro-chefe", label: "Carro-Chefe" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

/* Linhas do hambúrguer que se dobram num X */
const lineTransition = { type: "spring", stiffness: 300, damping: 20 } as const;
const topLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 7 },
};
const midLine = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0.4 },
};
const bottomLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -7 },
};

export default function Header() {
  const introDone = useIntroDone();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-cream/80 shadow-[0_8px_32px_-12px_rgb(58_37_24/0.18)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo animada */}
          <motion.a
            href="#topo"
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.span
              className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-banana shadow-lg sm:h-12 sm:w-12"
              whileHover={{ rotate: 12 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/midia/logo.png"
                alt="Logo Café da Praça"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </motion.span>
            <span className="font-display text-lg font-semibold leading-none sm:text-xl">
              <span className="text-cocoa">Café</span>{" "}
              <span className="text-brand-gradient">da Praça</span>
            </span>
          </motion.a>

          {/* Navegação (desktop) */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm font-medium text-cocoa/70 transition-colors hover:text-banana-deep"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA pulsante */}
            <motion.a
              href="#cardapio"
              onClick={() => setMenuOpen(false)}
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-banana to-terracotta px-3.5 py-2.5 font-display text-sm font-semibold text-cream sm:px-6 sm:py-3"
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 4px 20px -4px rgb(200 149 108 / 0.4)",
                  "0 8px 32px -4px rgb(196 115 92 / 0.6)",
                  "0 4px 20px -4px rgb(200 149 108 / 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="sm:hidden">Pedir ☕</span>
              <span className="hidden sm:inline">Fazer Pedido ☕</span>
            </motion.a>

            {/* Hambúrguer (mobile) */}
            <motion.button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              whileTap={{ scale: 0.88 }}
              animate={menuOpen ? "open" : "closed"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-cream/80 ring-1 ring-cocoa/10 md:hidden"
            >
              <motion.span
                variants={topLine}
                transition={lineTransition}
                className="h-0.5 w-5 rounded-full bg-cocoa"
              />
              <motion.span
                variants={midLine}
                transition={lineTransition}
                className="h-0.5 w-5 rounded-full bg-cocoa"
              />
              <motion.span
                variants={bottomLine}
                transition={lineTransition}
                className="h-0.5 w-5 rounded-full bg-cocoa"
              />
            </motion.button>
          </div>
        </div>

        {/* Barra de progresso da página */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-banana via-terracotta to-banana-deep"
          style={{ scaleX: scrollYProgress, opacity: scrolled && !menuOpen ? 1 : 0 }}
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
