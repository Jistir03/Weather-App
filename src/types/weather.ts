import type { WeatherCondition } from '@/lib/mapConditionCode'

export type { WeatherCondition }

export interface WeatherData {
  city: string
  country: string
  temp: number
  feelsLike: number
  description: string
  humidity: number
  windSpeed: number
  condition: WeatherCondition
  conditionCode: number
  isNight: boolean
  sunrise: number
  sunset: number
}

export interface HourlyItem {
  time: Date
  temp: number
  condition: WeatherCondition
  conditionCode: number
  precipProbability: number
}

export interface ForecastDay {
  date: Date
  day: string
  tempHigh: number
  tempLow: number
  condition: WeatherCondition
  conditionCode: number
  precipProbability: number
}

export type WeatherError =
  | { type: 'city-not-found' }
  | { type: 'api-error'; status?: number; message?: string }
  | { type: 'geolocation-denied' }
  | { type: 'no-network' }

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; error: WeatherError }
