"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/menu";
import {
  lineTotal,
  whatsappCheckoutUrl,
  type Customer,
  type PaymentMethod,
} from "@/lib/cart";
import { useCart } from "./CartProvider";

/* ────────────────────────────────────────────────────────────
   Drawer do pedido — bottom-sheet no celular, painel lateral
   no desktop. Passo 1: revisar itens e quantidades. Passo 2:
   nome, endereço e pagamento. Envia pro WhatsApp do café SEM
   preços na mensagem (a casa confere os valores ao confirmar).
   ──────────────────────────────────────────────────────────── */

const PAYMENTS: { id: PaymentMethod; label: string; emoji: string }[] = [
  { id: "Pix", label: "Pix", emoji: "⚡" },
  { id: "Cartão na entrega", label: "Cartão", emoji: "💳" },
  { id: "Dinheiro", label: "Dinheiro", emoji: "💵" },
];

type Step = "cart" | "form" | "done";

const CUSTOMER_KEY = "cb-customer";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, setQty, clear } = useCart();
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState<Step>("cart");
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    address: "",
    payment: "Pix",
    changeFor: "",
  });

  // Lembra os dados do cliente para o próximo pedido
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOMER_KEY);
      if (raw) setCustomer((c) => ({ ...c, ...JSON.parse(raw) }));
    } catch {
      /* segue sem persistência */
    }
  }, []);

  // Sempre reabrir na revisão do pedido
  useEffect(() => {
    if (drawerOpen) setStep("cart");
  }, [drawerOpen]);

  // Trava o scroll e fecha com Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  const canSubmit =
    customer.name.trim().length >= 2 && customer.address.trim().length >= 8;

  const submit = () => {
    if (!canSubmit || lines.length === 0) return;
    try {
      localStorage.setItem(
        CUSTOMER_KEY,
        JSON.stringify({ ...customer, changeFor: "" }),
      );
    } catch {
      /* ok */
    }
    window.open(whatsappCheckoutUrl(lines, customer), "_blank", "noopener,noreferrer");
    clear();
    setStep("done");
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-stretch sm:justify-end">
          {/* Fundo escurecido */}
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cocoa-dark/55 backdrop-blur-sm"
          />

          {/* Painel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Seu pedido"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative flex h-[88dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:h-full sm:max-w-md sm:rounded-l-[2rem] sm:rounded-tr-none"
          >
            {/* Cabeçalho */}
            <div className="relative shrink-0 border-b border-cocoa/10 bg-white px-5 pb-4 pt-5">
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-cocoa/15 sm:hidden" />
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-cocoa">
                  {step === "cart" && "Seu pedido 🛵"}
                  {step === "form" && "Quase lá! 📦"}
                  {step === "done" && "Pedido enviado!"}
                </h2>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Fechar"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream font-display text-lg font-bold text-cocoa ring-1 ring-cocoa/10"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Passo 1: itens ── */}
            {step === "cart" && (
              <>
                <div className="dotted-bg flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {lines.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                      <span className="text-5xl">🍌</span>
                      <p className="font-display text-lg font-semibold text-cocoa/60">
                        Seu carrinho está vazio…
                        <br />
                        que tal um docinho?
                      </p>
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="mt-2 rounded-full bg-gradient-to-r from-banana to-bubblegum px-6 py-3 font-display font-bold text-cocoa"
                      >
                        Ver cardápio 🍰
                      </button>
                    </div>
                  ) : (
                    lines.map((line) => (
                      <motion.div
                        key={line.key}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-cocoa/5"
                      >
                        <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={line.image}
                            alt={line.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display font-bold text-cocoa">
                            {line.name}
                          </p>
                          {line.addons.length > 0 && (
                            <p className="truncate text-xs text-cocoa/60">
                              {line.addons.map((a) => `+ ${a.name}`).join(" · ")}
                            </p>
                          )}
                          {line.note && (
                            <p className="truncate text-xs italic text-cocoa/50">
                              📝 {line.note}
                            </p>
                          )}
                          <div className="mt-1.5 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-cream px-1 py-0.5 ring-1 ring-cocoa/10">
                              <button
                                type="button"
                                aria-label="Diminuir"
                                onClick={() => setQty(line.key, line.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full font-display font-bold text-cocoa"
                              >
                                {line.qty === 1 ? "🗑" : "−"}
                              </button>
                              <span className="w-5 text-center font-display text-sm font-bold">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Aumentar"
                                onClick={() => setQty(line.key, line.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-banana font-display font-bold text-cocoa"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-display text-sm font-bold text-bubblegum-deep">
                              {formatPrice(lineTotal(line))}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {lines.length > 0 && (
                  <div className="shrink-0 border-t border-cocoa/10 bg-white px-5 py-4">
                    <div className="mb-3 flex items-center justify-between font-display">
                      <span className="font-semibold text-cocoa/70">Total estimado</span>
                      <span className="text-xl font-bold text-cocoa">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setStep("form")}
                      whileTap={{ scale: 0.97 }}
                      className="w-full rounded-full bg-gradient-to-r from-banana to-bubblegum py-4 font-display text-lg font-bold text-cocoa shadow-[0_10px_28px_-8px_rgb(255_107_133/0.6)]"
                    >
                      Continuar para entrega 🛵
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {/* ── Passo 2: dados do cliente ── */}
            {step === "form" && (
              <>
                <div className="dotted-bg flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  <div>
                    <label
                      htmlFor="order-name"
                      className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60"
                    >
                      Seu nome 💛
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      autoComplete="name"
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, name: e.target.value }))
                      }
                      placeholder="Como podemos te chamar?"
                      className="mt-2 w-full rounded-2xl border-2 border-cocoa/10 bg-white px-4 py-3 text-cocoa placeholder:text-cocoa/35 focus:border-bubblegum focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="order-address"
                      className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60"
                    >
                      Endereço de entrega 📍
                    </label>
                    <textarea
                      id="order-address"
                      rows={3}
                      autoComplete="street-address"
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, address: e.target.value }))
                      }
                      placeholder="Rua, número, bairro e ponto de referência"
                      className="mt-2 w-full resize-none rounded-2xl border-2 border-cocoa/10 bg-white px-4 py-3 text-cocoa placeholder:text-cocoa/35 focus:border-bubblegum focus:outline-none"
                    />
                  </div>

                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60">
                      Forma de pagamento
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
                      {PAYMENTS.map((p) => {
                        const active = customer.payment === p.id;
                        return (
                          <motion.button
                            key={p.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() =>
                              setCustomer((c) => ({ ...c, payment: p.id }))
                            }
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-2xl border-2 bg-white px-2 py-3 text-center font-display text-sm font-bold transition-colors ${
                              active
                                ? "border-bubblegum text-cocoa shadow-[0_6px_20px_-8px_rgb(255_107_133/0.5)]"
                                : "border-cocoa/10 text-cocoa/55"
                            }`}
                          >
                            <span className="block text-xl">{p.emoji}</span>
                            {p.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {customer.payment === "Dinheiro" && (
                    <div>
                      <label
                        htmlFor="order-change"
                        className="font-display text-sm font-bold uppercase tracking-wide text-cocoa/60"
                      >
                        Troco para quanto?
                      </label>
                      <input
                        id="order-change"
                        type="text"
                        inputMode="decimal"
                        value={customer.changeFor}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, changeFor: e.target.value }))
                        }
                        placeholder="Ex.: 50,00 (deixe vazio se não precisar)"
                        className="mt-2 w-full rounded-2xl border-2 border-cocoa/10 bg-white px-4 py-3 text-cocoa placeholder:text-cocoa/35 focus:border-bubblegum focus:outline-none"
                      />
                    </div>
                  )}

                  <p className="rounded-2xl bg-banana/20 px-4 py-3 text-sm text-cocoa/70">
                    🍌 Ao enviar, seu pedido abre no WhatsApp do Café Banana — é lá
                    que a gente confirma os valores e o tempo de entrega.
                  </p>
                </div>

                <div className="shrink-0 space-y-2 border-t border-cocoa/10 bg-white px-5 py-4">
                  <motion.button
                    type="button"
                    onClick={submit}
                    disabled={!canSubmit}
                    whileTap={canSubmit ? { scale: 0.97 } : undefined}
                    className={`w-full rounded-full py-4 font-display text-lg font-bold text-white shadow-lg transition-opacity ${
                      canSubmit
                        ? "bg-[#25D366]"
                        : "cursor-not-allowed bg-[#25D366]/40"
                    }`}
                  >
                    Enviar pedido no WhatsApp
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-full py-1 text-center font-display text-sm font-semibold text-cocoa/60"
                  >
                    ← Voltar para o pedido
                  </button>
                </div>
              </>
            )}

            {/* ── Passo 3: confirmação ── */}
            {step === "done" && (
              <div className="dotted-bg flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <motion.span
                  initial={reduceMotion ? undefined : { scale: 0, rotate: -20 }}
                  animate={reduceMotion ? undefined : { scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="text-6xl"
                >
                  🎉
                </motion.span>
                <h3 className="font-display text-2xl font-bold text-cocoa">
                  Pedido a caminho do nosso WhatsApp!
                </h3>
                <p className="text-cocoa/65">
                  É só apertar <strong>enviar</strong> lá na conversa que a gente
                  confirma tudo e já coloca na chapa. 🛵💨
                </p>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="mt-2 rounded-full bg-gradient-to-r from-banana to-bubblegum px-8 py-3.5 font-display font-bold text-cocoa"
                >
                  Fechar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
