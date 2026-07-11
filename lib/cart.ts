import type { Category } from "./menu";
import { site } from "./site";

/* ────────────────────────────────────────────────────────────
   Módulo de pedidos — tipos do carrinho, adicionais por
   categoria e a montagem da mensagem de WhatsApp.

   ⚠️ IMPORTANTE: a mensagem enviada ao café NÃO leva preços
   (nem dos itens, nem dos adicionais, nem total) — os valores
   são conferidos pela casa na hora de confirmar o pedido.
   ──────────────────────────────────────────────────────────── */

export type CartAddon = {
  id: string;
  name: string;
  price: number;
};

export type CartLine = {
  /** Identificador único da linha no carrinho. */
  key: string;
  itemId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  addons: CartAddon[];
  note: string;
};

export type PaymentMethod = "Pix" | "Cartão na entrega" | "Dinheiro";

export type Customer = {
  name: string;
  address: string;
  payment: PaymentMethod;
  /** Troco para quanto (apenas quando pagamento é Dinheiro). */
  changeFor: string;
};

/**
 * Adicionais oferecidos por categoria.
 * ⚠️ Ajuste aqui: nomes e preços dos adicionais de cada categoria.
 */
export const addonsByCategory: Record<Category, CartAddon[]> = {
  cafes: [
    { id: "dose-extra", name: "Dose extra de café", price: 3.0 },
    { id: "leite-vegetal", name: "Leite vegetal", price: 3.0 },
    { id: "chantilly", name: "Chantilly", price: 3.5 },
    { id: "mel", name: "Mel", price: 2.5 },
  ],
  doces: [
    { id: "doce-de-leite", name: "Doce de leite extra", price: 3.0 },
    { id: "creme-da-casa", name: "Creme da casa", price: 3.5 },
    { id: "granulado", name: "Granulado crocante", price: 2.0 },
  ],
  salgados: [
    { id: "bacon", name: "Bacon", price: 4.5 },
    { id: "queijo-extra", name: "Queijo extra", price: 4.0 },
    { id: "catupiry", name: "Catupiry", price: 4.5 },
    { id: "molho-da-casa", name: "Molho especial da casa", price: 2.5 },
  ],
  banana: [
    { id: "banana-caramelizada", name: "Banana caramelizada extra", price: 4.0 },
    { id: "nutella", name: "Nutella", price: 5.5 },
    { id: "farofa-pacoca", name: "Farofa doce de paçoca", price: 3.0 },
  ],
};

/** Valor de uma linha (unitário + adicionais) × quantidade — usado só na TELA. */
export function lineTotal(line: CartLine) {
  const addonsTotal = line.addons.reduce((sum, addon) => sum + addon.price, 0);
  return (line.price + addonsTotal) * line.qty;
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

/** Mensagem do pedido — SEM nenhum preço, de propósito. */
export function buildOrderMessage(lines: CartLine[], customer: Customer) {
  const parts: string[] = ["🍌 *NOVO PEDIDO — Café Banana*", "", "*Itens do pedido:*"];

  for (const line of lines) {
    parts.push(`▪ ${line.qty}x ${line.name}`);
    for (const addon of line.addons) {
      parts.push(`    ➕ ${addon.name}`);
    }
    if (line.note.trim()) {
      parts.push(`    📝 ${line.note.trim()}`);
    }
  }

  parts.push("");
  parts.push(`*Nome:* ${customer.name.trim()}`);
  parts.push(`*Endereço de entrega:* ${customer.address.trim()}`);

  const payment =
    customer.payment === "Dinheiro" && customer.changeFor.trim()
      ? `Dinheiro (troco para R$ ${customer.changeFor.trim()})`
      : customer.payment;
  parts.push(`*Pagamento:* ${payment}`);

  parts.push("");
  parts.push("_Pedido enviado pelo site_ 💛");

  return parts.join("\n");
}

export function whatsappCheckoutUrl(lines: CartLine[], customer: Customer) {
  const message = buildOrderMessage(lines, customer);
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
