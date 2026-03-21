import { formatHour } from '@/lib/formatDate'
import type { HourlyItem } from '@/types/weather'
import { WeatherIcon } from '@/components/icons/WeatherIcon'

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
      <WeatherIcon condition={item.condition} size="sm" />
      <span className="text-sm font-medium">{item.temp}°C</span>
    </div>
  )
}
