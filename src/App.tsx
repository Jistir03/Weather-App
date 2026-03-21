import { useEffect } from 'react'
import AppLayout from './components/AppLayout'
import { useGeolocation } from './hooks/useGeolocation'
import { fetchCurrentWeather } from './services/weatherApi'

function App() {
  const geo = useGeolocation()

  // TODO: remove after Story 2.3 API connectivity verification
  useEffect(() => {
    if (geo.status === 'success') {
      fetchCurrentWeather(geo.lat, geo.lon).then(console.log).catch(console.error)
    }
  }, [geo])

  return (
    <AppLayout
      header={<p className="text-muted-foreground text-sm">Weather App</p>}
      left={<p className="text-muted-foreground text-sm">Current conditions — geo: {geo.status}</p>}
      right={<p className="text-muted-foreground text-sm">Forecast</p>}
    />
  )
}

export default App
