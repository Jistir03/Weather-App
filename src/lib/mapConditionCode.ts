export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'fog'
  | 'night'

export function mapConditionCode(code: number, isNight: boolean = false): WeatherCondition {
  if (!Number.isFinite(code)) return 'cloudy'
  if (code >= 200 && code <= 232) return 'storm'
  if (code >= 300 && code <= 321) return 'rain'
  if (code >= 500 && code <= 531) return 'rain'
  if (code >= 600 && code <= 622) return 'snow'
  if (code >= 701 && code <= 781) return 'fog'
  if (code === 800) return isNight ? 'night' : 'clear'
  if (code === 801) return 'partly-cloudy'
  if (code >= 802 && code <= 804) return 'cloudy'
  return 'cloudy'
}
