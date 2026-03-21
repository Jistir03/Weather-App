export function formatHour(date: Date): string {
  if (isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(date)
}

export function formatDay(date: Date): string {
  if (isNaN(date.getTime())) return '—'
  const today = new Date()
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  if (isToday) return 'Today'

  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
}

export function formatLastUpdated(date: Date): string {
  if (isNaN(date.getTime())) return '—'
  const diffMs = Date.now() - date.getTime()
  if (diffMs < 0) return 'just now'
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} min ago`
  return `${diffHr} hr ago`
}
