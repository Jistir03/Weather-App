import { useMemo, useState } from 'react'
import AppLayout from './components/AppLayout'
import { WeatherCard } from './components/WeatherCard'
import { HourlyForecast } from './components/HourlyForecast'
import { FiveDayForecast } from './components/FiveDayForecast'
import { LastUpdated } from './components/LastUpdated'
import { SearchBar } from './components/SearchBar'
import { ThemeToggle } from './components/ThemeToggle'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'

function App() {
  const [isSearching, setIsSearching] = useState(false)
  const geo = useGeolocation()
  const location = useMemo(
    () => (geo.status === 'success' ? { lat: geo.lat, lon: geo.lon } : null),
    [geo],
  )
  const weather = useWeather(location)

  const handleSearch = (_city: string) => {
    setIsSearching(false) // Story 3.2: setIsSearching(true) → fetch → setIsSearching(false)
  }

  const handleLocationRequest = () => {
    // Re-trigger geolocation — Story 3.2
  }

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-2">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            isSearching={isSearching}
          />
          <ThemeToggle />
        </div>
      }
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
