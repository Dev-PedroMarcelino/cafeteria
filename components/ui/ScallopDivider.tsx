import { useId } from "react";

/* ────────────────────────────────────────────────────────────
   Toldo de cafeteria — fileira de meias-luas penduradas no
   topo da seção, remetendo à fachada e ao selo da marca.
   Estático de propósito: é textura de identidade, não firula.
   ──────────────────────────────────────────────────────────── */

const fills: Record<string, [string, string]> = {
  banana: ["var(--color-banana)", "var(--color-banana)"],
  bubblegum: ["var(--color-bubblegum)", "var(--color-bubblegum)"],
  stripes: ["var(--color-banana)", "var(--color-bubblegum)"],
};

export default function ScallopDivider({
  variant = "stripes",
  className,
}: {
  variant?: "banana" | "bubblegum" | "stripes";
  className?: string;
}) {
  const patternId = useId();
  const [colorA, colorB] = fills[variant];

  return (
    <svg className={`block h-5 w-full sm:h-6 ${className ?? ""}`} aria-hidden>
      <defs>
        <pattern id={patternId} width="96" height="24" patternUnits="userSpaceOnUse">
          <path d="M0,0 a24,24 0 0 0 48,0 Z" fill={colorA} />
          <path d="M48,0 a24,24 0 0 0 48,0 Z" fill={colorB} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
