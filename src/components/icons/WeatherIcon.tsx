import type { WeatherCondition } from '@/types/weather'
import { ClearDayIcon } from './ClearDayIcon'
import { PartlyCloudyIcon } from './PartlyCloudyIcon'
import { CloudyIcon } from './CloudyIcon'
import { RainIcon } from './RainIcon'
import { SnowIcon } from './SnowIcon'
import { StormIcon } from './StormIcon'
import { FogIcon } from './FogIcon'
import { NightIcon } from './NightIcon'

type IconSize = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<IconSize, number> = {
  sm: 32,
  md: 48,
  lg: 96,
}

const CONDITION_LABEL: Record<WeatherCondition, string> = {
  clear: 'Clear skies',
  'partly-cloudy': 'Partly cloudy',
  cloudy: 'Cloudy',
  rain: 'Rain',
  snow: 'Snow',
  storm: 'Thunderstorm',
  fog: 'Foggy',
  night: 'Clear night',
}

interface WeatherIconProps {
  condition: WeatherCondition
  size?: IconSize
  className?: string
}

function renderIcon(condition: WeatherCondition, px: number) {
  switch (condition) {
    case 'clear':
      return <ClearDayIcon size={px} />
    case 'night':
      return <NightIcon size={px} />
    case 'partly-cloudy':
      return <PartlyCloudyIcon size={px} />
    case 'cloudy':
      return <CloudyIcon size={px} />
    case 'rain':
      return <RainIcon size={px} />
    case 'snow':
      return <SnowIcon size={px} />
    case 'storm':
      return <StormIcon size={px} />
    case 'fog':
      return <FogIcon size={px} />
    default: {
      const _never: never = condition
      void _never
      return <CloudyIcon size={px} />
    }
  }
}

export function WeatherIcon({ condition, size = 'md', className }: WeatherIconProps) {
  const px = SIZE_MAP[size] ?? SIZE_MAP['md']

  return (
    <div role="img" aria-label={CONDITION_LABEL[condition] ?? 'Weather condition'} className={className}>
      {renderIcon(condition, px)}
    </div>
  )
}
