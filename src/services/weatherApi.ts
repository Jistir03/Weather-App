import type { OWMCurrentResponse } from '@/types/owm'
import type { WeatherData } from '@/types/weather'

export const BASE_URL = 'https://api.openweathermap.org'

export function getApiKey(): string {
  const key = import.meta.env['VITE_OWM_API_KEY']?.trim()
  if (!key) throw new Error('VITE_OWM_API_KEY is not set')
  return key
}

// TODO: implement in Story 2.3
export function mapCurrentWeather(_raw: OWMCurrentResponse): WeatherData {
  throw new Error('Not implemented')
}
