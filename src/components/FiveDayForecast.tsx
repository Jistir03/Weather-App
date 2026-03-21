import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ForecastRow } from './ForecastRow'
import type { ForecastDay } from '@/types/weather'

interface FiveDayForecastProps {
  days: ForecastDay[]
  isLoading: boolean
}

export function FiveDayForecast({ days, isLoading }: FiveDayForecastProps) {
  if (isLoading && days.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center py-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (days.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div role="list" aria-label="5-day forecast" className="space-y-2">
          {days.slice(0, 5).map((day, i) => (
            <ForecastRow key={day.date.toDateString()} day={day} isToday={i === 0} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
