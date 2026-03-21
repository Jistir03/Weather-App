export function RainIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Cloud */}
      <path
        d="M46 36H18a11 11 0 010-22h1.4A13 13 0 0146 10a13 13 0 010 26z"
        fill="currentColor"
      />
      {/* Rain lines — staggered bounce animation */}
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="motion-safe:animate-bounce"
        style={{ animationDuration: '1.2s' }}
      >
        <line x1="22" y1="44" x2="20" y2="54" />
        <line x1="32" y1="44" x2="30" y2="54" />
        <line x1="42" y1="44" x2="40" y2="54" />
      </g>
    </svg>
  )
}
