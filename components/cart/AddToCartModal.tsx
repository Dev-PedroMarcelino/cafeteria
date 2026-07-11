"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/menu";
import { addonsByCategory, type CartAddon } from "@/lib/cart";
import { useCart } from "./CartProvider";

/* ────────────────────────────────────────────────────────────
   Modal "monte o seu" — abre ao tocar em Adicionar: foto do
   item, adicionais da categoria, quantidade e observação.
   Bottom-sheet no celular, cartão central no desktop, tudo
   na estética do Café Banana.
   ──────────────────────────────────────────────────────────── */

export default function AddToCartModal() {
  const { modalItem, closeModal, addLine } = useCart();
  const reduceMotion = useReducedMotion();

  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState("");

  // Zera as escolhas a cada item aberto
  useEffect(() => {
    if (modalItem) {
      setQty(1);
      setSelected([]);
      setNote("");
    }
  }, [modalItem]);

  // Trava o scroll e fecha com Escape
  useEffect(() => {
    if (!modalItem) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalItem, closeModal]);

  const addons = modalItem ? addonsByCategory[modalItem.category] : [];
  const selectedAddons: CartAddon[] = addons.filter((a) => selected.includes(a.id));
  const unitTotal = modalItem
    ? modalItem.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)
    : 0;

  const toggleAddon = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const confirm = () => {
    if (!modalItem) return;
    addLine(modalItem, qty, selectedAddons, note);
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalItem && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          {/* Fundo escurecido */}
          <motion.button
            type="button"
            aria-label="Fechar"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cocoa-dark/55 backdrop-blur-sm"
          />

          {/* Cartão */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Adicionar ${modalItem.name}`}
            initial={reduceMotion ? { opacity: 0 } : { y: "60%", opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "60%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]"
          >
            {/* Foto de capa */}
            <div className="relative h-40 shrink-0 sm:h-44">
              <Image
                src={modalItem.image}
                alt={modalItem.name}
                fill
                sizes="(max-width: 640px) 100vw, 28rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/70 via-transparent to-transparent" />
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 font-display text-lg font-bold text-cocoa shadow-sm"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display text-2xl font-bold text-cream drop-shadow">
                  {modalItem.name}
                </h3>
                <span className="mt-1 inline-block rounded-full bg-banana px-3 py-0.5 font-display text-sm font-bold text-cocoa">
                  {formatPrice(modalItem.price)}
                </span>
              </div>
            </div>

            {/* Conteúdo rolável */}
            <div className="dotted-bg flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {addons.length > 0 && (
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60">
                    Turbine o seu 🍌
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {addons.map((addon) => {
                      const active = selected.includes(addon.id);
                      return (
                        <motion.button
                          key={addon.id}
                          type="button"
                          role="checkbox"
                          aria-checked={active}
                          onClick={() => toggleAddon(addon.id)}
                          whileTap={{ scale: 0.97 }}
                          className={`flex w-full items-center justify-between rounded-2xl border-2 bg-white px-4 py-3 text-left transition-colors ${
                            active
                              ? "border-bubblegum shadow-[0_6px_20px_-8px_rgb(255_107_133/0.5)]"
                              : "border-cocoa/10"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                                active
                                  ? "border-bubblegum bg-bubblegum text-white"
                                  : "border-cocoa/25 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                            <span className="font-display font-semibold text-cocoa">
                              + {addon.name}
                            </span>
                          </span>
                          <span className="font-display text-sm font-bold text-bubblegum-deep">
                            {formatPrice(addon.price)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Observação */}
              <div>
                <label
                  htmlFor="item-note"
                  className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60"
                >
                  Alguma observação? 📝
                </label>
                <input
                  id="item-note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={120}
                  placeholder="Ex.: sem canela, bem quentinho…"
                  className="mt-2 w-full rounded-2xl border-2 border-cocoa/10 bg-white px-4 py-3 text-cocoa placeholder:text-cocoa/35 focus:border-bubblegum focus:outline-none"
                />
              </div>
            </div>

            {/* Rodapé: quantidade + confirmar */}
            <div className="flex shrink-0 items-center gap-3 border-t border-cocoa/10 bg-white px-5 py-4">
              <div className="flex items-center gap-1 rounded-full border-2 border-cocoa/10 bg-cream px-1.5 py-1">
                <motion.button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  whileTap={{ scale: 0.85 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full font-display text-lg font-bold text-cocoa"
                >
                  −
                </motion.button>
                <span className="w-6 text-center font-display text-lg font-bold text-cocoa">
                  {qty}
                </span>
                <motion.button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  whileTap={{ scale: 0.85 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-banana font-display text-lg font-bold text-cocoa"
                >
                  +
                </motion.button>
              </div>

              <motion.button
                type="button"
                onClick={confirm}
                whileTap={{ scale: 0.96 }}
                className="flex-1 rounded-full bg-gradient-to-r from-banana to-bubblegum px-4 py-3.5 font-display font-bold text-cocoa shadow-[0_10px_28px_-8px_rgb(255_107_133/0.6)]"
              >
                Adicionar • {formatPrice(unitTotal * qty)}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
