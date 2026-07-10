"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site, whatsappOrderUrl } from "@/lib/site";
import Reveal from "./ui/Reveal";
import BananaBurst from "./ui/BananaBurst";
import ScooterSvg from "./art/ScooterSvg";

const socials = [
  {
    label: "Instagram",
    href: site.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.59-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.9.07s-3.6 0-4.9-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.2 15.62 2.2 15.25 2.2 12s0-3.58.07-4.85C2.42 3.92 3.94 2.42 7.1 2.27 8.4 2.2 8.8 2.2 12 2.2Zm0 3.63a6.17 6.17 0 1 0 0 12.34 6.17 6.17 0 0 0 0-12.34ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: whatsappOrderUrl(),
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.53 14.9L2 22l5.25-1.47A9.9 9.9 0 1 0 12.04 2Zm5.8 14.05c-.24.68-1.4 1.3-1.95 1.35-.5.05-1.13.24-3.8-.8-3.2-1.26-5.24-4.53-5.4-4.74-.16-.21-1.3-1.73-1.3-3.3 0-1.57.83-2.34 1.12-2.66.3-.32.64-.4.85-.4l.61.01c.2.01.46-.07.72.55.27.64.9 2.2.98 2.36.08.16.13.35.03.56-.1.21-.16.34-.31.53-.16.18-.33.41-.47.55-.16.15-.32.32-.14.63.18.32.8 1.32 1.73 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.16.5.13.68-.08.18-.2.78-.9.98-1.22.2-.31.41-.26.69-.15.28.1 1.77.83 2.07.98.3.16.5.24.58.37.07.13.07.76-.16 1.44Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: site.facebook,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const [heartBurst, setHeartBurst] = useState(0);

  return (
    <footer id="contato" className="relative mt-12 bg-cocoa text-cream">
      {/* Onda de transição */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full text-cream sm:h-16"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,20 C1200,75 900,75 720,45 C540,15 240,15 0,60 Z"
        />
      </svg>

      {/* Motinha do delivery atravessando a onda */}
      {reduceMotion ? (
        <div className="absolute -top-8 right-6 w-16 sm:-top-10 sm:w-20" aria-hidden>
          <ScooterSvg className="w-full" />
        </div>
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-x-0 -top-8 h-10 sm:-top-10"
          initial="hidden"
          whileInView="ride"
          viewport={{ once: true, amount: 0.1 }}
          aria-hidden
        >
          <motion.div
            variants={{
              hidden: { x: "-18vw" },
              ride: {
                x: "108vw",
                transition: { duration: 3.5, ease: "easeInOut", delay: 0.2 },
              },
            }}
            className="w-16 sm:w-20"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <ScooterSvg className="w-full" />
            </motion.div>
            {/* Poeirinha rosa atrás */}
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 h-3 w-3 rounded-full bg-bubblegum/60 blur-[2px]"
                style={{ left: i === 0 ? -10 : -20 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.25 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-3">
        {/* Marca */}
        <Reveal>
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-14 w-14 overflow-hidden rounded-full ring-2 ring-banana">
                <Image
                  src="/midia/logo.png"
                  alt="Logo Café Banana"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-2xl font-semibold">
                <span className="text-bubblegum">Café</span>{" "}
                <span className="text-banana">Banana</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-cream/70">
              Cafeteria &amp; delivery em {site.city}. O sabor que a cidade inteira ama. 💛🩷
            </p>

            {/* Redes sociais com "pulinho" */}
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -8, rotate: [0, -8, 8, 0] }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-banana transition-colors hover:bg-bubblegum hover:text-cocoa"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Horários em destaque */}
        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] bg-gradient-to-br from-banana to-banana-dark p-6 text-cocoa shadow-card">
            <h3 className="font-display text-xl font-bold">⏰ Horário de Funcionamento</h3>
            <ul className="mt-4 space-y-3">
              {site.hours.map((slot) => (
                <li
                  key={slot.days}
                  className="flex items-center justify-between border-b border-cocoa/10 pb-2 last:border-0"
                >
                  <span className="font-medium">{slot.days}</span>
                  <span className="font-display font-bold">{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Contato */}
        <Reveal delay={0.2}>
          <div>
            <h3 className="font-display text-xl font-bold text-banana">Vem tomar um café ☕</h3>
            <p className="mt-4 text-cream/70">{site.address}</p>
            <motion.a
              href={whatsappOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-bubblegum px-6 py-3 font-display font-semibold text-cocoa shadow-lg"
            >
              Pedir pelo WhatsApp
            </motion.a>
            <p className="mt-8 text-sm text-cream/40">
              © {new Date().getFullYear()} Café Banana — {site.city}. Feito com{" "}
              <motion.button
                type="button"
                onClick={() => setHeartBurst((b) => b + 1)}
                whileTap={{ scale: 1.4 }}
                aria-label="Um carinho do Café Banana"
                className="relative inline-block cursor-pointer align-baseline"
              >
                💛
                <BananaBurst trigger={heartBurst} distance={48} />
              </motion.button>{" "}
              e muita cafeína.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
