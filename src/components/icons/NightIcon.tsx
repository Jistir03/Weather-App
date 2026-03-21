import { useId } from 'react'

export function NightIcon({ size }: { size: number }) {
  const id = useId()
  const maskId = `night-mask-${id}`

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <circle cx="30" cy="32" r="18" fill="white" />
          <circle cx="40" cy="24" r="14" fill="black" />
        </mask>
      </defs>
      {/* Full moon crescent */}
      <circle
        cx="30"
        cy="32"
        r="18"
        fill="currentColor"
        mask={`url(#${maskId})`}
        className="motion-safe:animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      {/* Stars */}
      <circle cx="52" cy="14" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="46" cy="46" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="58" cy="36" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="54" cy="24" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
