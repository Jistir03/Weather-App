import { Badge } from '@/components/ui/badge'
import { formatDay } from '@/lib/formatDate'
import type { ForecastDay } from '@/types/weather'
import { WeatherIcon } from '@/components/icons/WeatherIcon'

interface ForecastRowProps {
  day: ForecastDay
  isToday: boolean
}

export function ForecastRow({ day, isToday }: ForecastRowProps) {
  return (
    <div role="listitem" className="grid grid-cols-4 items-center gap-2 py-1">
      <span className={`text-sm ${isToday ? 'font-bold' : 'text-muted-foreground'}`}>
        {isToday ? 'Today' : formatDay(day.date)}
      </span>
      <WeatherIcon condition={day.condition} size="sm" />
      <span className="text-sm">
        <span className="font-medium">{day.tempHigh}°</span>
        <span className="text-muted-foreground"> / {day.tempLow}°</span>
      </span>
      <Badge variant="outline" className="justify-self-end text-xs">
        {day.precipProbability}%
      </Badge>
    </div>
  )
}
