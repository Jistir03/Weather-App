import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { mapConditionCode } from '@/lib/mapConditionCode'
import type { WeatherData } from '@/types/weather'
import { WeatherIcon } from '@/components/icons/WeatherIcon'

interface WeatherCardProps {
  data: WeatherData | null
  isLoading: boolean
}

export function WeatherCard({ data, isLoading }: WeatherCardProps) {
  if (isLoading && !data) {
    return (
      <Card className="p-6 space-y-4 condition-clear" aria-label="Loading weather conditions" aria-busy="true">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-48" />
        <Skeleton className="h-6 w-36" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </Card>
    )
  }

  if (!data) return null

  const condition = mapConditionCode(data.conditionCode, data.isNight)

  return (
    <Card
      className={`p-6 space-y-4 condition-${condition}`}
      aria-label="Current weather conditions"
    >
      <div className="text-2xl font-semibold">
        {data.city}, {data.country}
      </div>
      <div className="text-5xl md:text-7xl font-bold">{data.temp}°C</div>
      <WeatherIcon condition={condition} size="lg" />
      <div className="text-xl text-muted-foreground capitalize">{data.description}</div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <span>Humidity: {data.humidity}%</span>
        <span>Wind: {data.windSpeed} km/h</span>
      </div>
    </Card>
  )
}
