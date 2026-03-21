import { useMemo } from 'react'
import AppLayout from './components/AppLayout'
import { WeatherCard } from './components/WeatherCard'
import { HourlyForecast } from './components/HourlyForecast'
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
      left={<WeatherCard data={weather.data} isLoading={weather.isLoading} />}
      right={
        <HourlyForecast
          items={weather.forecast?.hourly ?? []}
          isLoading={weather.isLoading}
        />
      }
    />
  )
}

export default App
