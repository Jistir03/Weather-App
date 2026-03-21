export function StormIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Dark cloud */}
      <path
        d="M46 36H18a11 11 0 010-22h1.4A13 13 0 0146 10a13 13 0 010 26z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Lightning bolt — pulse animation */}
      <path
        d="M35 38l-8 12h6l-4 10 12-16h-7l7-6z"
        fill="currentColor"
        className="motion-safe:animate-pulse"
        style={{ animationDuration: '0.8s' }}
      />
    </svg>
  )
}
