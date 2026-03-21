import AppLayout from './components/AppLayout'
import { useGeolocation } from './hooks/useGeolocation'

function App() {
  const geo = useGeolocation()

  return (
    <AppLayout
      header={<p className="text-muted-foreground text-sm">Weather App</p>}
      left={<p className="text-muted-foreground text-sm">Current conditions — geo: {geo.status}</p>}
      right={<p className="text-muted-foreground text-sm">Forecast</p>}
    />
  )
}

export default App
