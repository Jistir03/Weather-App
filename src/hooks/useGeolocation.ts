import { useState, useEffect } from 'react'

type GeolocationResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; lat: number; lon: number }
  | { status: 'denied' }

export function useGeolocation(): GeolocationResult {
  const [result, setResult] = useState<GeolocationResult>({ status: 'idle' })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setResult({ status: 'denied' })
      return
    }

    setResult({ status: 'loading' })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setResult({
          status: 'success',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      () => {
        setResult({ status: 'denied' })
      },
      { timeout: 8000, maximumAge: 0, enableHighAccuracy: false },
    )
  }, [])

  return result
}
