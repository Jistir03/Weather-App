import { useMemo } from 'react'
import AppLayout from './components/AppLayout'
import { WeatherCard } from './components/WeatherCard'
import { HourlyForecast } from './components/HourlyForecast'
import { FiveDayForecast } from './components/FiveDayForecast'
import { LastUpdated } from './components/LastUpdated'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'

function App() {
  const geo = useGeolocation()
  const location = useMemo(
    () => (geo.status === 'success' ? { lat: geo.lat, lon: geo.lon } : null),
    [geo],
  )
  const weather = useWeather(location)

  return (
    <AppLayout
      header={<p className="text-muted-foreground text-sm">Weather App</p>}
      left={
        <div className="space-y-2">
          <WeatherCard data={weather.data} isLoading={weather.isLoading} />
          <LastUpdated lastUpdated={weather.lastUpdated} />
        </div>
      }
      right={
        <div className="space-y-4">
          <HourlyForecast
            items={weather.forecast?.hourly ?? []}
            isLoading={weather.isLoading}
          />
          <FiveDayForecast
            days={weather.forecast?.daily ?? []}
            isLoading={weather.isLoading}
          />
        </div>
      }
    />
  )
}

export default App
