"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useIntroDone } from "./IntroProvider";

const navLinks = [
  { href: "#carro-chefe", label: "Carro-Chefe" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const introDone = useIntroDone();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={introDone ? { y: 0, opacity: 1 } : undefined}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 shadow-[0_8px_32px_-12px_rgb(74_44_23/0.18)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo animada */}
        <motion.a
          href="#topo"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.span
            className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-banana"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/midia/logo.png"
              alt="Logo Café Banana"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </motion.span>
          <span className="font-display text-xl font-semibold leading-none">
            <span className="text-bubblegum-deep">Café</span>{" "}
            <span className="text-banana-deep">Banana</span>
          </span>
        </motion.a>

        {/* Navegação (desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium text-cocoa/80 transition-colors hover:text-bubblegum-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA pulsante */}
        <motion.a
          href="#cardapio"
          className="rounded-full bg-gradient-to-r from-banana to-bubblegum px-5 py-2.5 font-display text-sm font-semibold text-cocoa sm:px-6 sm:py-3"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 4px 20px -4px rgb(255 145 164 / 0.45)",
              "0 8px 32px -4px rgb(255 107 133 / 0.75)",
              "0 4px 20px -4px rgb(255 145 164 / 0.45)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
        >
          Fazer Pedido 🍌
        </motion.a>
      </div>
    </motion.header>
  );
}
