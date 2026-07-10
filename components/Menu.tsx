"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, menu, type Category } from "@/lib/menu";
import ProductCard from "./ProductCard";
import Reveal from "./ui/Reveal";
import ScallopDivider from "./ui/ScallopDivider";

type Filter = Category | "todos";

export default function Menu() {
  const [filter, setFilter] = useState<Filter>("todos");

  const items = filter === "todos" ? menu : menu.filter((i) => i.category === filter);

  return (
    <section id="cardapio" className="relative">
      {/* Toldo de cafeteria abrindo a seção */}
      <ScallopDivider />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal variant="gum" className="text-center">
        <h2 className="font-display text-4xl font-bold sm:text-6xl">
          Nosso <span className="text-brand-gradient">Cardápio</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="text-center">
        <p className="mx-auto mt-4 max-w-md text-cocoa/70">
          Tudo feito na casa, todo dia. Escolha, peça e receba com carinho.
        </p>
      </Reveal>

      {/* Filtros — pill deslizante com layoutId */}
      <Reveal delay={0.15}>
        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center"
          role="tablist"
          aria-label="Categorias do cardápio"
        >
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <motion.button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat.id)}
                whileTap={{ scale: 0.92 }}
                className={`relative shrink-0 snap-start rounded-full px-5 py-3 font-display text-sm font-semibold transition-colors duration-300 ${
                  active ? "text-cocoa" : "text-cocoa/55 hover:text-cocoa"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-banana to-bubblegum shadow-[0_8px_24px_-8px_rgb(255_107_133/0.6)]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {/* Emoji dá um salto quando a categoria é escolhida */}
                  <motion.span
                    animate={active ? { y: [0, -8, 0], rotate: [0, -14, 0] } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {cat.emoji}
                  </motion.span>
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      {/* Grid com reorganização fluida */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
      </div>
    </section>
  );
}
