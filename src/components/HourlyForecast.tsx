import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HourlyTile } from './HourlyTile'
import type { HourlyItem } from '@/types/weather'

interface HourlyForecastProps {
  items: HourlyItem[]
  isLoading: boolean
}

export function HourlyForecast({ items, isLoading }: HourlyForecastProps) {
  const now = new Date()

  if (isLoading && items.length === 0) {
    return (
      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle className="text-sm">Hourly Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-14">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) return null

  return (
    <Card className="overflow-visible">
      <CardHeader>
        <CardTitle className="text-sm">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          role="list"
          aria-label="Hourly forecast"
          className="flex gap-3 overflow-x-auto pb-2"
        >
          {items.slice(0, 12).map((item) => (
            <HourlyTile
              key={item.time.getTime()}
              item={item}
              isCurrentHour={
                item.time.getHours() === now.getHours() &&
                item.time.toDateString() === now.toDateString()
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
