import { useState, useEffect, useRef } from 'react'
import AppLayout from './components/AppLayout'
import { WeatherCard } from './components/WeatherCard'
import { HourlyForecast } from './components/HourlyForecast'
import { FiveDayForecast } from './components/FiveDayForecast'
import { LastUpdated } from './components/LastUpdated'
import { SearchBar } from './components/SearchBar'
import { ErrorState } from './components/ErrorState'
import { ThemeToggle } from './components/ThemeToggle'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'
import type { LocationInput } from './hooks/useWeather'

function App() {
  const geo = useGeolocation()
  const [location, setLocation] = useState<LocationInput | null>(null)
  const [isGeoLoading, setIsGeoLoading] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Sync initial geolocation result into location state — functional update guards against
  // overwriting a city search if geo resolves after the user has already submitted one
  useEffect(() => {
    if (geo.status === 'success') {
      setLocation(prev => prev === null ? { lat: geo.lat, lon: geo.lon } : prev)
    }
  }, [geo])

  // Auto-focus search input when geolocation is denied (UX-DR16)
  useEffect(() => {
    if (geo.status === 'denied') {
      const id = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
      return () => clearTimeout(id)
    }
  }, [geo.status])

  const weather = useWeather(location)

  // True only during a city-name search, not during the initial geo-based fetch
  const isSearching = weather.isLoading && location !== null && 'city' in location

  const handleSearch = (city: string) => {
    setLocation({ city })
  }

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setIsGeoLoading(false)
      return
    }
    setIsGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setIsGeoLoading(false)
      },
      (err) => {
        setIsGeoLoading(false)
        // Focus search input only on permission denial, not on timeout/unavailable errors
        if (err.code === err.PERMISSION_DENIED) {
          setTimeout(() => searchInputRef.current?.focus(), 100)
        }
      },
      { timeout: 8000 },
    )
  }

  const { data, forecast, error, lastUpdated, isLoading } = weather

  return (
    <AppLayout
      header={
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <SearchBar
              ref={searchInputRef}
              onSearch={handleSearch}
              onLocationRequest={handleLocationRequest}
              isSearching={isSearching}
              isLocationLoading={isGeoLoading}
            />
            <ThemeToggle />
          </div>
          {error?.type === 'city-not-found' && <ErrorState error={error} />}
        </div>
      }
      left={
        error && error.type !== 'city-not-found' ? (
          <ErrorState error={error} />
        ) : (
          <div className="space-y-2">
            <WeatherCard data={data} isLoading={isLoading} />
            <LastUpdated lastUpdated={lastUpdated} />
          </div>
        )
      }
      right={
        <div className="space-y-4">
          <HourlyForecast
            items={forecast?.hourly ?? []}
            isLoading={isLoading}
          />
          <FiveDayForecast
            days={forecast?.daily ?? []}
            isLoading={isLoading}
          />
        </div>
      }
    />
  )
}

export default App
