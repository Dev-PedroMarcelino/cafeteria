/**
 * Copo de café 2D — o mesmo copo da logo: tampa marrom,
 * corpo branco e cinta "Coffee", com contorno estilo sticker.
 */
export default function CoffeeCupSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 180" className={className} aria-hidden>
      {/* Tampa */}
      <path d="M40 42 Q70 14 100 42 Z" fill="#a06a35" stroke="#6b4423" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="32" y="40" width="76" height="13" rx="6.5" fill="#8b5a2b" stroke="#6b4423" strokeWidth="2.5" />

      {/* Corpo */}
      <path
        d="M40 55 L100 55 L93 152 Q92.2 160 84 160 L56 160 Q47.8 160 47 152 Z"
        fill="#fffdf7"
        stroke="#6b4423"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Cinta */}
      <path d="M42.3 92 L97.7 92 L95.8 124 L44.2 124 Z" fill="#8b5a2b" stroke="#6b4423" strokeWidth="2" />
      <text
        x="70"
        y="113"
        textAnchor="middle"
        fill="#fffdf7"
        fontSize="17"
        fontStyle="italic"
        fontWeight="600"
        className="font-display"
      >
        Coffee
      </text>

      {/* Detalhes rosa (pontinhos da marca) */}
      <circle cx="52" cy="72" r="2.2" fill="#ff91a4" />
      <circle cx="70" cy="76" r="2.2" fill="#ff91a4" />
      <circle cx="88" cy="72" r="2.2" fill="#ff91a4" />
      <circle cx="56" cy="140" r="2.2" fill="#ff91a4" />
      <circle cx="70" cy="144" r="2.2" fill="#ff91a4" />
      <circle cx="84" cy="140" r="2.2" fill="#ff91a4" />
    </svg>
  );
}
