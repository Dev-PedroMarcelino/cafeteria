"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";

/* ────────────────────────────────────────────────────────────
   Carrinho flutuante — aparece assim que o primeiro item
   entra no pedido. Badge rosa com a contagem dá um "pop" a
   cada item novo. Abre o drawer de checkout.
   ──────────────────────────────────────────────────────────── */

export default function FloatingCart() {
  const { count, openDrawer } = useCart();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          type="button"
          onClick={openDrawer}
          aria-label={`Abrir carrinho com ${count} ${count === 1 ? "item" : "itens"}`}
          initial={{ scale: 0, rotate: 30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: -20 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cocoa text-banana shadow-[0_12px_32px_-8px_rgb(74_44_23/0.65)] ring-4 ring-banana md:bottom-8 md:right-[calc(min(5vw,6rem)+1rem)]"
        >
          {/* Sacolinha */}
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
            <path
              d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"
              fill="currentColor"
            />
            <path
              d="M9 10V6a3 3 0 0 1 6 0v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-banana-deep"
            />
          </svg>

          {/* Contagem — repop a cada mudança */}
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-bubblegum px-1.5 font-display text-xs font-bold text-white ring-2 ring-cream"
          >
            {count}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
