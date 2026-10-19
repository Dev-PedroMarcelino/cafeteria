import { useId } from "react";

/* ────────────────────────────────────────────────────────────
   Toldo de cafeteria — fileira de meias-luas penduradas no
   topo da seção, remetendo à fachada e ao selo da marca.
   Estático de propósito: é textura de identidade, não firula.
   ──────────────────────────────────────────────────────────── */

const fills: Record<string, [string, string]> = {
  caramel: ["var(--color-caramel)", "var(--color-caramel)"],
  terracotta: ["var(--color-terracotta)", "var(--color-terracotta)"],
  stripes: ["var(--color-caramel)", "var(--color-terracotta)"],
  banana: ["var(--color-caramel)", "var(--color-caramel)"],
  bubblegum: ["var(--color-terracotta)", "var(--color-terracotta)"],
};

export default function ScallopDivider({
  variant = "stripes",
  className,
}: {
  variant?: "caramel" | "terracotta" | "stripes" | "banana" | "bubblegum";
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
