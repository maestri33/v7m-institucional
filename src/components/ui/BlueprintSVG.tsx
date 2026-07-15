/**
 * Blueprint animado da Engenharia Civil & Elétrica.
 * Paths drawn em sequência com @keyframes drawPath (definido em src/index.css).
 * prefers-reduced-motion desativa via atributo [style*="drawPath"] em index.css.
 */
export function BlueprintSVG({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 500"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M60 440 L540 440"
        stroke="rgba(205,157,88,0.5)"
        strokeWidth="1.5"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.4s ease-out 0.2s both' }}
      />
      <path
        d="M120 440 L120 180 L300 80 L480 180 L480 440"
        stroke="rgba(205,157,88,0.65)"
        strokeWidth="1.5"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.6s ease-out 0.45s both' }}
      />
      <path
        d="M180 440 L180 240 M240 440 L240 240 M300 440 L300 240 M360 440 L360 240 M420 440 L420 240"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.8s ease-out 0.7s both' }}
      />
      <path
        d="M120 240 L480 240 M150 210 L450 210"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="900"
        style={{ animation: 'drawPath 1.6s ease-out 0.9s both' }}
      />
      <circle
        cx="300"
        cy="80"
        r="8"
        stroke="rgba(238,221,161,0.8)"
        strokeWidth="1.5"
        strokeDasharray="60"
        style={{ animation: 'drawPath 1s ease-out 1.2s both' }}
      />
      <path
        d="M100 460 L100 420 M500 460 L500 420"
        stroke="rgba(205,157,88,0.5)"
        strokeWidth="1"
        strokeDasharray="80"
        style={{ animation: 'drawPath 0.8s ease-out 1s both' }}
      />
      <path
        d="M60 120 L60 90 L110 90"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
        strokeDasharray="120"
        style={{ animation: 'drawPath 0.9s ease-out 1.3s both' }}
      />
    </svg>
  )
}
