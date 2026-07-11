"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { formatPrice, menu } from "@/lib/menu";
import Reveal from "./ui/Reveal";
import { useCart } from "./cart/CartProvider";

/* ────────────────────────────────────────────────────────────
   Carro-Chefe — vitrine cinematográfica do Misto de Costela
   com o vídeo real correndo de fundo, marquees de destaque e
   CTA direto para o pedido.
   ──────────────────────────────────────────────────────────── */

const item = menu.find((i) => i.id === "misto-costela")!;

const MARQUEE_TEXT = ["O CARRO-CHEFE DA CASA", "MISTO DE COSTELA", "FEITO NA CHAPA", "★"];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const reduceMotion = useReducedMotion();

  const strip = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).flatMap((_, r) =>
        MARQUEE_TEXT.map((text, i) => (
          <span
            key={`${r}-${i}`}
            className="pr-10 font-display text-sm font-bold tracking-[0.2em] text-cocoa"
          >
            {text}
          </span>
        )),
      )}
    </div>
  );

  return (
    <div
      className={`relative z-10 overflow-hidden bg-banana py-3 ${
        reverse ? "-mt-2 rotate-[1.5deg] scale-x-105" : "-mb-2 -rotate-[1.5deg] scale-x-105"
      }`}
      aria-hidden
    >
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {strip}
        {strip}
      </motion.div>
    </div>
  );
}

export default function Flagship() {
  const reduceMotion = useReducedMotion();
  const { openModal } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toca só quando a seção está na tela (poupa bateria e dados)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Zoom-out sutil do vídeo + deslize do conteúdo conforme o scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.9], [48, -48]);

  return (
    <section id="carro-chefe" ref={sectionRef} className="relative overflow-hidden">
      <Marquee />

      <div className="relative flex min-h-[88svh] items-center overflow-hidden bg-cocoa-dark">
        {/* Vídeo de fundo (poster estático se reduced-motion) */}
        {reduceMotion ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover"
          />
        ) : (
          <motion.video
            ref={videoRef}
            style={{ scale: videoScale }}
            className="absolute inset-0 h-full w-full object-cover"
            src="/midia/video-carro-chefe.mp4"
            poster={item.image}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            disablePictureInPicture
          />
        )}

        {/* Véus para legibilidade */}
        <div className="absolute inset-0 bg-cocoa-dark/45 sm:bg-cocoa-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-dark/90 via-cocoa-dark/45 to-cocoa-dark/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cocoa-dark/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cocoa-dark/60 to-transparent" />

        {/* Conteúdo */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-8"
        >
          <div className="max-w-xl text-center sm:text-left">
            <Reveal variant="pop">
              <span className="inline-flex items-center gap-2 rounded-full bg-banana px-4 py-1.5 font-display text-sm font-bold text-cocoa shadow-lg">
                <motion.span
                  className="inline-block"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.span>
                O Carro-Chefe da Casa
              </span>
            </Reveal>

            <Reveal variant="gum" delay={0.08}>
              <h2 className="mt-5 font-display text-5xl font-bold leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
                Misto de <span className="text-brand-gradient">Costela</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-lg leading-relaxed text-cream/85 sm:text-xl">
                Costela desfiada no capricho, queijo derretendo e pão prensado na
                chapa até ficar crocante. É ele que você está vendo aí atrás —
                sem filtro, direto da nossa cozinha. 🤤
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                <span className="relative rounded-full border border-cream/25 bg-white/10 px-6 py-3 font-display text-xl font-bold text-banana backdrop-blur-sm">
                  {/* Vaporzinho: saiu da chapa agora */}
                  {!reduceMotion && (
                    <span className="pointer-events-none absolute -top-1 left-1/2" aria-hidden>
                      {[0, 1].map((i) => (
                        <motion.span
                          key={i}
                          className="absolute h-3 w-3 rounded-full bg-bubblegum/80 blur-[3px]"
                          style={{ left: i === 0 ? -12 : 2 }}
                          animate={{ y: [0, -24], opacity: [0, 0.9, 0], scale: [0.6, 1.4] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay: i * 1.1,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </span>
                  )}
                  {formatPrice(item.price)}
                </span>
                <motion.button
                  type="button"
                  onClick={() => openModal(item)}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="shine w-full rounded-full bg-gradient-to-r from-banana to-bubblegum px-8 py-4 text-center font-display text-lg font-semibold text-cocoa shadow-[0_16px_40px_-10px_rgb(255_145_164/0.6)] sm:w-auto"
                >
                  Pedir o Carro-Chefe
                </motion.button>
                <motion.a
                  href="#cardapio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-display font-semibold text-cream/80 underline decoration-bubblegum decoration-2 underline-offset-8 transition-colors hover:text-cream"
                >
                  Ver cardápio completo
                </motion.a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>

      <Marquee reverse />
    </section>
  );
}
