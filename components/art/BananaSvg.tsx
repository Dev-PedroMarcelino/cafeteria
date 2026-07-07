/**
 * Banana 2D no estilo flat da logo — crescente amarela com
 * pontas marrons e brilho interno.
 */
export default function BananaSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {/* Corpo */}
      <path
        d="M12 12 Q10 55 52 52 Q28 38 12 12 Z"
        fill="#ffe135"
        stroke="#dfae00"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Brilho da casca */}
      <path
        d="M15 20 Q16 44 42 49"
        fill="none"
        stroke="#fff3a6"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Pontas */}
      <circle cx="12" cy="12" r="3" fill="#7a5230" />
      <circle cx="52" cy="52" r="2.6" fill="#7a5230" />
    </svg>
  );
}
