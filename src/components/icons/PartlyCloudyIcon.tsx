export function PartlyCloudyIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Small spinning sun behind the cloud */}
      <g
        className="motion-safe:animate-spin"
        style={{ animationDuration: '10s', transformBox: 'fill-box', transformOrigin: 'center' }}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      >
        <line x1="18" y1="6" x2="18" y2="13" />
        <line x1="18" y1="29" x2="18" y2="36" />
        <line x1="2" y1="21" x2="9" y2="21" />
        <line x1="27" y1="21" x2="34" y2="21" />
        <line x1="6.5" y1="9.5" x2="11.5" y2="14.5" />
        <line x1="24.5" y1="27.5" x2="29.5" y2="32.5" />
        <line x1="6.5" y1="32.5" x2="11.5" y2="27.5" />
        <line x1="24.5" y1="14.5" x2="29.5" y2="9.5" />
      </g>
      {/* Small sun disk */}
      <circle cx="18" cy="21" r="7" fill="currentColor" opacity="0.8" />
      {/* Cloud body in front */}
      <path
        d="M44 52H22a10 10 0 010-20h1.2A12 12 0 0144 28a12 12 0 010 24z"
        fill="currentColor"
      />
    </svg>
  )
}
