"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice, type MenuItem } from "@/lib/menu";
import { whatsappOrderUrl } from "@/lib/site";

export default function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.82, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.82, y: -16 }}
      transition={{
        layout: { type: "spring", stiffness: 220, damping: 26 },
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: Math.min(index * 0.04, 0.3),
      }}
      className="group relative flex flex-col rounded-[1.75rem] bg-white p-3 shadow-card ring-1 ring-cocoa/5 transition-[box-shadow,ring] duration-500 hover:shadow-card-hover hover:ring-2 hover:ring-bubblegum"
    >
      {/* Foto com zoom no hover */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Véu em degradê para o botão respirar */}
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {item.flagship ? (
          <span className="absolute left-3 top-3 rounded-full bg-cocoa px-3 py-1 font-display text-xs font-semibold text-banana shadow-sm">
            ⭐ Carro-Chefe
          </span>
        ) : (
          item.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-banana px-3 py-1 font-display text-xs font-semibold text-cocoa shadow-sm">
              🍌 Especial
            </span>
          )
        )}

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-bold text-bubblegum-deep shadow-sm backdrop-blur-sm">
          {formatPrice(item.price)}
        </span>

        {/* Botão Adicionar: surge no hover (desktop) / sempre visível (touch) */}
        <motion.a
          href={whatsappOrderUrl(item.name)}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.94 }}
          className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-banana to-bubblegum py-2.5 font-display text-sm font-semibold text-cocoa opacity-100 shadow-lg transition-all duration-300 md:translate-y-[130%] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
          </svg>
          Adicionar
        </motion.a>
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-display text-lg font-semibold leading-tight">{item.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-cocoa/65">{item.description}</p>
      </div>
    </motion.article>
  );
}
