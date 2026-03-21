import { useMemo } from 'react'
import AppLayout from './components/AppLayout'
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
        <p className="text-muted-foreground text-sm">
          {weather.isLoading ? 'Loading…' : weather.data?.city ?? 'No data'}
        </p>
      }
      right={
        <p className="text-muted-foreground text-sm">
          Forecast days: {weather.forecast?.daily.length ?? 0}
        </p>
      }
    />
  )
}

export default App
