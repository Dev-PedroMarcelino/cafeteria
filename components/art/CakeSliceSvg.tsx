/**
 * Fatia de bolo 2D — camadas com recheio rosa, cobertura
 * escorrendo e cereja no topo.
 */
export default function CakeSliceSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {/* Cereja */}
      <path d="M32 10 Q34 5 38 4" fill="none" stroke="#7a5230" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="32" cy="14" r="4.5" fill="#e8455f" />
      <circle cx="30.4" cy="12.4" r="1.4" fill="#ffb3c1" />

      {/* Massa */}
      <rect x="12" y="25" width="40" height="27" rx="6" fill="#f9e2b8" stroke="#e8b77d" strokeWidth="1.5" />
      {/* Recheio */}
      <rect x="12" y="39" width="40" height="5" fill="#ff91a4" />

      {/* Cobertura com gotas */}
      <rect x="10" y="19" width="44" height="12" rx="6" fill="#ff91a4" />
      <circle cx="20" cy="32" r="3.4" fill="#ff91a4" />
      <circle cx="32" cy="33.5" r="4.2" fill="#ff91a4" />
      <circle cx="44" cy="32" r="3.4" fill="#ff91a4" />
      {/* Brilho da cobertura */}
      <path d="M15 24 h14" stroke="#ffc2cd" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
