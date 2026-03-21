export function FogIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Three horizontal fog lines — pulsing opacity */}
      <g
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="motion-safe:animate-pulse"
        style={{ animationDuration: '3s' }}
      >
        <line x1="10" y1="22" x2="54" y2="22" />
        <line x1="14" y1="34" x2="50" y2="34" />
        <line x1="10" y1="46" x2="54" y2="46" />
      </g>
    </svg>
  )
}
