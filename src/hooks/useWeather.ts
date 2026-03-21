import { useState, useEffect, useRef, useMemo } from 'react'
import type { WeatherData, HourlyItem, ForecastDay, WeatherError } from '@/types/weather'
import { fetchCurrentWeather, fetchForecast, fetchGeocode } from '@/services/weatherApi'

export type LocationInput = { lat: number; lon: number } | { city: string }

export interface WeatherHookResult {
  data: WeatherData | null
  forecast: { hourly: HourlyItem[]; daily: ForecastDay[] } | null
  error: WeatherError | null
  lastUpdated: Date | null
  isLoading: boolean
}

const TEN_MINUTES_MS = 600_000

export function useWeather(location: LocationInput | null): WeatherHookResult {
  // Stabilize location so object literals from callers don't thrash the effect
  const stableLocation = useMemo(() => location, [
    location === null ? null : 'lat' in location ? `${location.lat},${location.lon}` : location.city
  ])

  const [data, setData] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<{ hourly: HourlyItem[]; daily: ForecastDay[] } | null>(null)
  const [error, setError] = useState<WeatherError | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const inFlightRef = useRef(false)
  const lastUpdatedRef = useRef<Date | null>(null)

  useEffect(() => {
    if (!stableLocation) return

    // Local flag per effect invocation — safe against stale async callbacks
    let cancelled = false

    const fetchData = async (isBackground: boolean) => {
      if (inFlightRef.current) return
      inFlightRef.current = true

      if (!isBackground) setIsLoading(true)

      try {
        const coords =
          'lat' in stableLocation
            ? { lat: stableLocation.lat, lon: stableLocation.lon }
            : await fetchGeocode(stableLocation.city)

        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeather(coords.lat, coords.lon),
          fetchForecast(coords.lat, coords.lon),
        ])

        if (!cancelled) {
          const now = new Date()
          setData(weatherData)
          setForecast(forecastData)
          setLastUpdated(now)
          setError(null)
          setIsLoading(false)
          lastUpdatedRef.current = now
        }
      } catch (err: unknown) {
        if (!cancelled) {
          if (!isBackground) {
            // Initial load or user-initiated search failed — surface the error
            setError(
              typeof err === 'object' && err !== null && 'type' in err
                ? (err as WeatherError)
                : ({ type: 'api-error' } satisfies WeatherError),
            )
            setIsLoading(false)
          }
          // Background refresh failed — silently discard; existing data remains visible (NFR6)
        }
      } finally {
        inFlightRef.current = false
      }
    }

    const isStale = () => {
      const lu = lastUpdatedRef.current
      return lu !== null && Date.now() - lu.getTime() > TEN_MINUTES_MS
    }

    const handleVisibilityChange = () => {
      // Re-fetch if stale OR if lastUpdated is null (initial load failed — always retry on focus)
      if (document.visibilityState === 'visible' && (!lastUpdatedRef.current || isStale())) {
        void fetchData(true)
      }
    }

    // document-level event — addEventListener is correct here, no React alternative
    document.addEventListener('visibilitychange', handleVisibilityChange)
    const intervalId = setInterval(() => void fetchData(true), TEN_MINUTES_MS)

    void fetchData(false)

    return () => {
      cancelled = true
      inFlightRef.current = false
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [stableLocation])

  return { data, forecast, error, lastUpdated, isLoading }
}