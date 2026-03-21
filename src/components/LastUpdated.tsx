import { useState, useEffect } from 'react'

interface LastUpdatedProps {
  lastUpdated: Date | null
}

function getLabel(lastUpdated: Date): { text: string; isStale: boolean } {
  const diffMs = Math.max(0, Date.now() - lastUpdated.getTime())

  if (diffMs < 60_000) {
    return { text: 'Last updated just now', isStale: false }
  }

  const diffMin = Math.floor(diffMs / 60_000)

  if (diffMs < 600_000) {
    return { text: `Last updated ${diffMin} min ago`, isStale: false }
  }

  return { text: `Last updated ${diffMin} min ago — data may be stale`, isStale: true }
}

export function LastUpdated({ lastUpdated }: LastUpdatedProps) {
  const [label, setLabel] = useState<string>(() =>
    lastUpdated ? getLabel(lastUpdated).text : '',
  )
  const [isStale, setIsStale] = useState<boolean>(() =>
    lastUpdated ? getLabel(lastUpdated).isStale : false,
  )

  useEffect(() => {
    if (!lastUpdated) {
      setLabel('')
      setIsStale(false)
      return
    }

    const update = () => {
      const result = getLabel(lastUpdated)
      setLabel(result.text)
      setIsStale(result.isStale)
    }

    update()
    const intervalId = setInterval(update, 30_000)
    return () => clearInterval(intervalId)
  }, [lastUpdated])

  if (!lastUpdated) return null

  return (
    <p
      className={`text-xs ${
        isStale ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'
      }`}
    >
      {label}
    </p>
  )
}
