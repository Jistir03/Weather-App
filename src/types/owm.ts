export interface OWMCoord {
  lon: number
  lat: number
}

export interface OWMWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface OWMMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface OWMWind {
  speed: number
  deg: number
  gust?: number
}

export interface OWMSys {
  country: string
  sunrise: number
  sunset: number
}

export interface OWMCurrentResponse {
  coord: OWMCoord
  weather: OWMWeather[]
  main: OWMMain
  wind: OWMWind
  sys: OWMSys
  name: string
  dt: number
  timezone: number
  id: number
  cod: number | string  // OWM returns "200" (string) on success, number on error
}

export interface OWMForecastItem {
  dt: number
  main: OWMMain
  weather: OWMWeather[]
  wind: OWMWind
  pop: number
  dt_txt: string
  sys?: { pod: 'd' | 'n' }
}

export interface OWMForecastResponse {
  list: OWMForecastItem[]
  city: {
    name: string
    country: string
    timezone: number
  }
}

export interface OWMGeoResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}
