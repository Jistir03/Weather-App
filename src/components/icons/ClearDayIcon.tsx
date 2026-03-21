export function ClearDayIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Slowly spinning rays */}
      <g
        className="motion-safe:animate-spin"
        style={{ animationDuration: '8s', transformBox: 'fill-box', transformOrigin: 'center' }}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <line x1="32" y1="4" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="60" />
        <line x1="4" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="60" y2="32" />
        <line x1="11.5" y1="11.5" x2="18.6" y2="18.6" />
        <line x1="45.4" y1="45.4" x2="52.5" y2="52.5" />
        <line x1="11.5" y1="52.5" x2="18.6" y2="45.4" />
        <line x1="45.4" y1="18.6" x2="52.5" y2="11.5" />
      </g>
      {/* Sun disk — not part of spinning group */}
      <circle cx="32" cy="32" r="12" fill="currentColor" />
    </svg>
  )
}
