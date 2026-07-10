"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { whatsappOrderUrl } from "@/lib/site";

/* ────────────────────────────────────────────────────────────
   Botão flutuante de pedido — aparece depois do hero com um
   "pop de figurinha", chama o olho com um balancinho a cada
   7s e um balãozinho de fala (1x por sessão). Verde WhatsApp
   para reconhecimento imediato, anel banana para ser da casa.
   ──────────────────────────────────────────────────────────── */

export default function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.75);
  });

  // Balãozinho: uma vez por sessão, 1.2s depois do botão aparecer
  useEffect(() => {
    if (!visible || reduceMotion) return;
    if (sessionStorage.getItem("cb-bubble-shown")) return;
    sessionStorage.setItem("cb-bubble-shown", "1");
    const showTimer = setTimeout(() => setBubble(true), 1200);
    const hideTimer = setTimeout(() => setBubble(false), 6200);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [visible, reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="fixed bottom-5 right-4 z-50 flex items-center gap-3 md:bottom-8 md:right-[calc(min(5vw,6rem)+1rem)]"
        >
          {/* Balãozinho de fala */}
          <AnimatePresence>
            {bubble && (
              <motion.button
                type="button"
                onClick={() => setBubble(false)}
                initial={{ opacity: 0, x: 16, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative rounded-2xl rounded-br-sm bg-white px-4 py-2.5 font-display text-sm font-semibold text-cocoa shadow-card ring-1 ring-cocoa/10"
              >
                Bateu a fome? Peça aqui! 🍌
                <span className="absolute -right-1.5 bottom-2 h-3 w-3 rotate-45 bg-white ring-1 ring-cocoa/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.a
            href={whatsappOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir pelo WhatsApp"
            onClick={() => setBubble(false)}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.9 }}
            animate={reduceMotion ? undefined : { rotate: [0, 0, -12, 10, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.9, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }
            }
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgb(255_107_133/0.7)] ring-4 ring-banana"
          >
            {/* Ping de chegada (2 ciclos, some sozinho) */}
            {!reduceMotion && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#25D366]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.2, repeat: 1, delay: 0.4, ease: "easeOut" }}
              />
            )}
            <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden>
              <path d="M12.04 2a9.9 9.9 0 0 0-8.53 14.9L2 22l5.25-1.47A9.9 9.9 0 1 0 12.04 2Zm5.8 14.05c-.24.68-1.4 1.3-1.95 1.35-.5.05-1.13.24-3.8-.8-3.2-1.26-5.24-4.53-5.4-4.74-.16-.21-1.3-1.73-1.3-3.3 0-1.57.83-2.34 1.12-2.66.3-.32.64-.4.85-.4l.61.01c.2.01.46-.07.72.55.27.64.9 2.2.98 2.36.08.16.13.35.03.56-.1.21-.16.34-.31.53-.16.18-.33.41-.47.55-.16.15-.32.32-.14.63.18.32.8 1.32 1.73 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.16.5.13.68-.08.18-.2.78-.9.98-1.22.2-.31.41-.26.69-.15.28.1 1.77.83 2.07.98.3.16.5.24.58.37.07.13.07.76-.16 1.44Z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
