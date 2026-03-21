export function SnowIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Cloud */}
      <path
        d="M46 36H18a11 11 0 010-22h1.4A13 13 0 0146 10a13 13 0 010 26z"
        fill="currentColor"
      />
      {/* Snowflake dots — staggered bounce */}
      <g fill="currentColor" className="motion-safe:animate-bounce" style={{ animationDuration: '1.5s' }}>
        <circle cx="22" cy="48" r="3" />
        <circle cx="32" cy="52" r="3" />
        <circle cx="42" cy="48" r="3" />
      </g>
    </svg>
  )
}
