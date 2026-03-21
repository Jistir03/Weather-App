import type { OWMCurrentResponse, OWMForecastResponse, OWMGeoResult } from '@/types/owm'
import type { WeatherData, HourlyItem, ForecastDay, WeatherError } from '@/types/weather'
import { mapConditionCode } from '@/lib/mapConditionCode'
import { formatDay } from '@/lib/formatDate'

export const BASE_URL = 'https://api.openweathermap.org'

export function getApiKey(): string {
  const key = import.meta.env['VITE_OWM_API_KEY']?.trim()
  if (!key) throw new Error('VITE_OWM_API_KEY is not set')
  return key
}

async function fetchWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!response.ok) {
      throw { type: 'api-error', status: response.status } satisfies WeatherError
    }
    return response.json() as Promise<T>
  } catch (err) {
    clearTimeout(timeoutId)
    if (
      (err instanceof DOMException || err instanceof Error) &&
      err.name === 'AbortError'
    ) {
      throw { type: 'no-network' } satisfies WeatherError
    }
    // Pass through typed WeatherError objects (e.g. thrown by !response.ok)
    if (typeof err === 'object' && err !== null && 'type' in err) {
      throw err
    }
    // SyntaxError from json(), NetworkError, or other unexpected failures
    throw { type: 'api-error' } satisfies WeatherError
  }
}

export function mapCurrentWeather(raw: OWMCurrentResponse): WeatherData {
  const weather = raw.weather[0]
  if (!weather) {
    throw { type: 'api-error' } satisfies WeatherError
  }
  const now = Date.now() / 1000
  const isNight = now < raw.sys.sunrise || now > raw.sys.sunset
  return {
    city: raw.name,
    country: raw.sys.country,
    temp: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    description: weather.description,
    humidity: raw.main.humidity,
    windSpeed: Math.round(raw.wind.speed * 3.6),
    condition: mapConditionCode(weather.id, isNight),
    conditionCode: weather.id,
    isNight,
    sunrise: raw.sys.sunrise,
    sunset: raw.sys.sunset,
  }
}

export function mapForecastResponse(raw: OWMForecastResponse): {
  hourly: HourlyItem[]
  daily: ForecastDay[]
} {
  const hourly: HourlyItem[] = raw.list.slice(0, 12).map((item) => {
    const weather = item.weather[0]
    return {
      time: new Date(item.dt * 1000),
      temp: Math.round(item.main.temp),
      condition: mapConditionCode(weather?.id ?? 800),
      conditionCode: weather?.id ?? 800,
      precipProbability: Math.round(item.pop * 100),
    }
  })

  // Group forecast items by calendar day
  const dayMap = new Map<string, OWMForecastResponse['list']>()
  for (const item of raw.list) {
    const date = new Date(item.dt * 1000)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const existing = dayMap.get(key) ?? []
    existing.push(item)
    dayMap.set(key, existing)
  }

  const daily: ForecastDay[] = []
  for (const items of dayMap.values()) {
    if (daily.length >= 5) break
    const firstItem = items[0]
    if (!firstItem) continue

    // Pick item closest to noon as the representative condition
    const noonItem = items.reduce((best, item) => {
      const hour = new Date(item.dt * 1000).getHours()
      const bestHour = new Date(best.dt * 1000).getHours()
      return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? item : best
    })

    const noonWeather = noonItem.weather[0]
    const date = new Date(firstItem.dt * 1000)
    const temps = items.map((i) => i.main.temp)
    const pops = items.map((i) => i.pop)

    daily.push({
      date,
      day: formatDay(date),
      tempHigh: Math.round(Math.max(...temps)),
      tempLow: Math.round(Math.min(...temps)),
      condition: mapConditionCode(noonWeather?.id ?? 800),
      conditionCode: noonWeather?.id ?? 800,
      precipProbability: Math.round(Math.max(...pops) * 100),
    })
  }

  return { hourly, daily }
}

export async function fetchCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  const key = getApiKey()
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  const raw = await fetchWithTimeout<OWMCurrentResponse>(url)
  return mapCurrentWeather(raw)
}

export async function fetchForecast(
  lat: number,
  lon: number,
): Promise<{ hourly: HourlyItem[]; daily: ForecastDay[] }> {
  const key = getApiKey()
  const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  const raw = await fetchWithTimeout<OWMForecastResponse>(url)
  return mapForecastResponse(raw)
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const key = getApiKey()
  const geoUrl = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
  const results = await fetchWithTimeout<OWMGeoResult[]>(geoUrl)
  const first = results[0]
  if (!first) {
    throw { type: 'city-not-found' } satisfies WeatherError
  }
  return fetchCurrentWeather(first.lat, first.lon)
}
