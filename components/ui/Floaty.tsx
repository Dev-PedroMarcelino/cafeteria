"use client";

import { motion } from "framer-motion";

/** Item flutuante com bobbing próprio (gravidade zero). */
export default function Floaty({
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
