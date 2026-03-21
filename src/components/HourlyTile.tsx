import { formatHour } from '@/lib/formatDate'
import type { HourlyItem } from '@/types/weather'

interface HourlyTileProps {
  item: HourlyItem
  isCurrentHour: boolean
}

export function HourlyTile({ item, isCurrentHour }: HourlyTileProps) {
  return (
    <div
      role="listitem"
      className={`flex flex-col items-center gap-1 min-w-14 p-2 rounded-md ${
        isCurrentHour ? 'bg-muted ring-1 ring-primary/30' : ''
      }`}
    >
      <span className="text-xs text-muted-foreground">{formatHour(item.time)}</span>
      {/* WeatherIcon sm — filled in Story 4.2 */}
      <div className="h-10 w-10 rounded-full bg-muted" aria-hidden="true" />
      <span className="text-sm font-medium">{item.temp}°C</span>
    </div>
  )
}
