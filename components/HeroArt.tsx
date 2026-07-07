"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import CoffeeCupSvg from "./art/CoffeeCupSvg";
import BananaSvg from "./art/BananaSvg";
import CakeSliceSvg from "./art/CakeSliceSvg";

/* ────────────────────────────────────────────────────────────
   Hero 2D — o copo da logo flutuando com vapor rosa, cercado
   por bananas e fatias de bolo em "gravidade zero". O mouse
   aplica parallax em três camadas de profundidade.
   ──────────────────────────────────────────────────────────── */

/** Vapor rosa: bolhas desfocadas subindo do copo em loop. */
function Steam({ animate }: { animate: boolean }) {
  const puffs = [
    { size: 44, x: -20, duration: 4.2, delay: 0 },
    { size: 62, x: 12, duration: 5.1, delay: 1.4 },
    { size: 38, x: -4, duration: 3.6, delay: 2.3 },
    { size: 54, x: 24, duration: 4.8, delay: 3.1 },
  ];

  if (!animate) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 h-0 w-0">
      {puffs.map((puff, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-bubblegum blur-xl"
          style={{
            width: puff.size,
            height: puff.size,
            left: puff.x - puff.size / 2,
            top: -puff.size / 2,
          }}
          initial={{ y: 26, opacity: 0, scale: 0.5 }}
          animate={{ y: [0, -170], opacity: [0, 0.8, 0], scale: [0.5, 1.6] }}
          transition={{
            duration: puff.duration,
            repeat: Infinity,
            delay: puff.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/** Estrelinha que pisca (detalhe da marca). */
function Sparkle({
  className,
  color = "#ffd93d",
  delay = 0,
  animate,
}: {
  className?: string;
  color?: string;
  delay?: number;
  animate: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      animate={animate ? { scale: [0.6, 1.15, 0.6], opacity: [0.35, 1, 0.35] } : undefined}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color} />
    </motion.svg>
  );
}

/** Item flutuante com bobbing próprio (gravidade zero). */
function Floaty({
  children,
  className,
  duration = 5,
  delay = 0,
  rotate = 8,
  animate,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  rotate?: number;
  animate: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${className ?? ""}`}
      animate={animate ? { y: [0, -16, 0], rotate: [-rotate, rotate, -rotate] } : undefined}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Camada com parallax de mouse (profundidade configurável). */
function ParallaxLayer({
  mx,
  my,
  depth,
  children,
  className,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const x = useSpring(useTransform(mx, [-1, 1], [-16 * depth, 16 * depth]), {
    stiffness: 55,
    damping: 18,
  });
  const y = useSpring(useTransform(my, [-1, 1], [-10 * depth, 10 * depth]), {
    stiffness: 55,
    damping: 18,
  });

  return (
    <motion.div className={`absolute inset-0 ${className ?? ""}`} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

export default function HeroArt() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduceMotion]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:max-w-lg" aria-hidden>
      {/* Glow de fundo da composição */}
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-banana/25 to-bubblegum/25 blur-3xl" />

      {/* ── Camada do fundo: itens pequenos e distantes ── */}
      <ParallaxLayer mx={mx} my={my} depth={-0.6}>
        <Floaty className="left-[16%] top-[4%] w-[10%]" duration={7} delay={1.2} rotate={18} animate={animate}>
          <BananaSvg className="w-full opacity-70" />
        </Floaty>
        <Floaty className="right-[30%] bottom-[2%] w-[9%]" duration={6} delay={0.6} rotate={14} animate={animate}>
          <BananaSvg className="w-full -scale-x-100 opacity-60" />
        </Floaty>
        <Sparkle className="absolute left-[8%] top-[38%] w-[5%]" delay={0.4} animate={animate} />
        <Sparkle className="absolute right-[10%] top-[16%] w-[4%]" color="#ff91a4" delay={1.1} animate={animate} />
        <Sparkle className="absolute left-[24%] bottom-[12%] w-[4%]" color="#ff91a4" delay={1.8} animate={animate} />
        <Sparkle className="absolute right-[6%] bottom-[30%] w-[5%]" delay={2.4} animate={animate} />
      </ParallaxLayer>

      {/* ── Camada do meio: o copo da logo com vapor ── */}
      <ParallaxLayer mx={mx} my={my} depth={0.35} className="flex items-center justify-center">
        <motion.div
          className="relative w-[46%]"
          animate={animate ? { y: [0, -16, 0] } : undefined}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Steam animate={animate} />
          <CoffeeCupSvg className="relative w-full drop-shadow-[0_24px_32px_rgb(74_44_23/0.2)]" />
          {/* Sombra no "chão" respirando junto com o copo */}
          <motion.div
            className="absolute -bottom-[14%] left-1/2 h-[7%] w-[80%] -translate-x-1/2 rounded-full bg-cocoa/15 blur-md"
            animate={animate ? { scaleX: [1, 0.8, 1], opacity: [0.6, 0.35, 0.6] } : undefined}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </ParallaxLayer>

      {/* ── Camada da frente: itens grandes e próximos ── */}
      <ParallaxLayer mx={mx} my={my} depth={1}>
        <Floaty className="left-[-2%] top-[14%] w-[26%]" duration={5.4} rotate={10} animate={animate}>
          <BananaSvg className="w-full -rotate-12 drop-shadow-lg" />
        </Floaty>
        <Floaty className="right-[0%] top-[8%] w-[17%]" duration={6.2} delay={0.8} rotate={12} animate={animate}>
          <BananaSvg className="w-full rotate-45 -scale-x-100 drop-shadow-md" />
        </Floaty>
        <Floaty className="bottom-[10%] right-[2%] w-[22%]" duration={5.8} delay={0.4} rotate={7} animate={animate}>
          <CakeSliceSvg className="w-full rotate-6 drop-shadow-lg" />
        </Floaty>
        <Floaty className="bottom-[6%] left-[6%] w-[18%]" duration={6.6} delay={1.6} rotate={9} animate={animate}>
          <CakeSliceSvg className="w-full -rotate-12 drop-shadow-md" />
        </Floaty>
      </ParallaxLayer>
    </div>
  );
}
