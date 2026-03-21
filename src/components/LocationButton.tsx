import { Button } from '@/components/ui/button'
import { LocateFixed, Loader2 } from 'lucide-react'

interface LocationButtonProps {
  onClick: () => void
  isLoading: boolean
}

export function LocationButton({ onClick, isLoading }: LocationButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      aria-label="Use my location"
      disabled={isLoading}
      className="min-h-11"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 motion-safe:animate-spin" />
      ) : (
        <LocateFixed className="h-4 w-4" />
      )}
    </Button>
  )
}
