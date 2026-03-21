import { Card, CardContent } from '@/components/ui/card'
import { WifiOff, MapPinOff, ServerCrash } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { WeatherError } from '@/types/weather'

interface ErrorStateProps {
  error: WeatherError
}

interface ErrorEntry {
  icon: LucideIcon
  message: string
  action: string
  inline: boolean
}

const errorConfig: Record<WeatherError['type'], ErrorEntry> = {
  'city-not-found': {
    icon: MapPinOff,
    message: 'City not found. Try a different name.',
    action: 'Check spelling or search for a nearby city.',
    inline: true,
  },
  'api-error': {
    icon: ServerCrash,
    message: 'Weather service unavailable. Try again soon.',
    action: 'The service may be temporarily down.',
    inline: false,
  },
  'geolocation-denied': {
    icon: MapPinOff,
    message: 'Location access denied — search for your city below.',
    action: 'Use the search bar to find your city.',
    inline: false,
  },
  'no-network': {
    icon: WifiOff,
    message: 'No internet connection. Check your network.',
    action: 'The app will try again when you reconnect.',
    inline: false,
  },
}

export function ErrorState({ error }: ErrorStateProps) {
  const config = errorConfig[error.type]
  const Icon = config.icon

  if (config.inline) {
    return (
      <div role="status" aria-live="polite" className="flex items-center gap-1 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" aria-hidden="true" />
        <span>{config.message}</span>
      </div>
    )
  }

  return (
    <Card role="status" aria-live="polite" className="p-6">
      <CardContent className="flex flex-col items-center text-center gap-3 pt-0">
        <Icon className="h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
        <p className="text-sm font-medium text-muted-foreground">{config.message}</p>
        <p className="text-xs text-muted-foreground">{config.action}</p>
      </CardContent>
    </Card>
  )
}
