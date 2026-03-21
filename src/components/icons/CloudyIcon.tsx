export function CloudyIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Back cloud (lighter, slightly offset) */}
      <path
        d="M50 44H28a8 8 0 010-16h1a10 10 0 0121 0v1a8 8 0 010 15z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Front cloud — gentle pulse */}
      <path
        d="M46 54H18a11 11 0 010-22h1.4A13 13 0 0146 28a13 13 0 010 26z"
        fill="currentColor"
        className="motion-safe:animate-pulse"
        style={{ animationDuration: '5s' }}
      />
    </svg>
  )
}
