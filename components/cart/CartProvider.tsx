"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MenuItem } from "@/lib/menu";
import { cartSubtotal, type CartAddon, type CartLine } from "@/lib/cart";

/* ────────────────────────────────────────────────────────────
   Estado global do módulo de pedidos: linhas do carrinho
   (persistidas em localStorage), o item aberto no modal de
   adicionais e o estado do drawer de checkout.
   ──────────────────────────────────────────────────────────── */

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  modalItem: MenuItem | null;
  drawerOpen: boolean;
  openModal: (item: MenuItem) => void;
  closeModal: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addLine: (item: MenuItem, qty: number, addons: CartAddon[], note: string) => void;
  /** qty 0 remove a linha. */
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}

const STORAGE_KEY = "cb-cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hydrated = useRef(false);
  const keyCounter = useRef(0);

  // Recupera o carrinho de visitas anteriores
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as CartLine[];
        if (Array.isArray(saved)) setLines(saved);
      }
    } catch {
      /* storage indisponível — segue sem persistência */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* idem */
    }
  }, [lines]);

  const addLine = useCallback(
    (item: MenuItem, qty: number, addons: CartAddon[], note: string) => {
      setLines((prev) => {
        // Mesmo item + mesmos adicionais + mesma observação → só soma
        const addonIds = addons.map((a) => a.id).sort().join(",");
        const existing = prev.find(
          (l) =>
            l.itemId === item.id &&
            l.note === note &&
            l.addons.map((a) => a.id).sort().join(",") === addonIds,
        );
        if (existing) {
          return prev.map((l) =>
            l.key === existing.key ? { ...l, qty: l.qty + qty } : l,
          );
        }
        keyCounter.current += 1;
        return [
          ...prev,
          {
            key: `${item.id}-${keyCounter.current}-${Date.now()}`,
            itemId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty,
            addons,
            note,
          },
        ];
      });
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openModal = useCallback((item: MenuItem) => setModalItem(item), []);
  const closeModal = useCallback(() => setModalItem(null), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: cartSubtotal(lines),
      modalItem,
      drawerOpen,
      openModal,
      closeModal,
      openDrawer,
      closeDrawer,
      addLine,
      setQty,
      clear,
    }),
    [lines, modalItem, drawerOpen, openModal, closeModal, openDrawer, closeDrawer, addLine, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
