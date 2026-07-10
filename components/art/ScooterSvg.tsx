/**
 * Motinha de delivery 2D no estilo flat da logo — rosa
 * bubblegum com baú amarelo de banana na garupa.
 */
export default function ScooterSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 64" className={className} aria-hidden>
      {/* Linhas de velocidade */}
      <path d="M2 34 h10 M0 42 h8" stroke="#ffc2cd" strokeWidth="3" strokeLinecap="round" />

      {/* Baú de entrega com banana */}
      <rect x="10" y="16" width="22" height="19" rx="4" fill="#ffe135" stroke="#dfae00" strokeWidth="2" />
      <path
        d="M15 22 Q14 30 25 29 Q19 26 15 22 Z"
        fill="#fffbf0"
        stroke="#dfae00"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Chassi */}
      <path
        d="M20 40 Q22 46 30 47 L52 47 Q60 46 63 38 L70 27"
        fill="none"
        stroke="#e84a68"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Carenagem */}
      <path d="M30 36 Q30 28 40 28 L48 28 Q56 28 58 38 L59 44 L32 44 Z" fill="#ff91a4" stroke="#e84a68" strokeWidth="2" strokeLinejoin="round" />
      {/* Brilho da carenagem */}
      <path d="M36 33 h10" stroke="#ffc2cd" strokeWidth="2.5" strokeLinecap="round" />

      {/* Banco */}
      <rect x="34" y="22" width="14" height="6" rx="3" fill="#4a2c17" />

      {/* Guidão + farol */}
      <path d="M70 27 L66 20 h8" fill="none" stroke="#4a2c17" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="72" cy="31" r="3.4" fill="#ffe135" stroke="#dfae00" strokeWidth="1.5" />

      {/* Rodas */}
      <circle cx="26" cy="50" r="9" fill="#4a2c17" />
      <circle cx="26" cy="50" r="3.6" fill="#fffbf0" />
      <circle cx="68" cy="50" r="9" fill="#4a2c17" />
      <circle cx="68" cy="50" r="3.6" fill="#fffbf0" />
    </svg>
  );
}
