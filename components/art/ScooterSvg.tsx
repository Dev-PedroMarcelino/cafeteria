/**
 * Motinha de delivery 2D no estilo flat da logo — tons de terracota,
 * caramelo e baú de café na garupa.
 */
export default function ScooterSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 64" className={className} aria-hidden>
      {/* Linhas de velocidade */}
      <path d="M2 34 h10 M0 42 h8" stroke="#d4a044" strokeWidth="3" strokeLinecap="round" />

      {/* Baú de entrega com xícara de café */}
      <rect x="10" y="16" width="22" height="19" rx="4" fill="#c8956c" stroke="#8b5e34" strokeWidth="2" />
      {/* Xícara no baú */}
      <path
        d="M16 23 h10 v6 a5 5 0 0 1 -10 0 z"
        fill="#faf6f0"
        stroke="#3a2518"
        strokeWidth="1.2"
      />
      <path d="M26 24 h2 a2 2 0 0 1 0 4 h-2" fill="none" stroke="#3a2518" strokeWidth="1.2" />

      {/* Chassi terracota */}
      <path
        d="M20 40 Q22 46 30 47 L52 47 Q60 46 63 38 L70 27"
        fill="none"
        stroke="#c4735c"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Carenagem */}
      <path d="M30 36 Q30 28 40 28 L48 28 Q56 28 58 38 L59 44 L32 44 Z" fill="#d4a044" stroke="#c4735c" strokeWidth="2" strokeLinejoin="round" />
      {/* Brilho da carenagem */}
      <path d="M36 33 h10" stroke="#faf6f0" strokeWidth="2.5" strokeLinecap="round" />

      {/* Banco */}
      <rect x="34" y="22" width="14" height="6" rx="3" fill="#3a2518" />

      {/* Guidão + farol */}
      <path d="M70 27 L66 20 h8" fill="none" stroke="#3a2518" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="72" cy="31" r="3.4" fill="#d4a044" stroke="#c8956c" strokeWidth="1.5" />

      {/* Rodas */}
      <circle cx="26" cy="50" r="9" fill="#3a2518" />
      <circle cx="26" cy="50" r="3.6" fill="#faf6f0" />
      <circle cx="68" cy="50" r="9" fill="#3a2518" />
      <circle cx="68" cy="50" r="3.6" fill="#faf6f0" />
    </svg>
  );
}
