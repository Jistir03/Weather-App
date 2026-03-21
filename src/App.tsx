import AppLayout from './components/AppLayout'

function App() {
  return (
    <AppLayout
      header={<p className="text-muted-foreground text-sm">Weather App</p>}
      left={<p className="text-muted-foreground text-sm">Current conditions</p>}
      right={<p className="text-muted-foreground text-sm">Forecast</p>}
    />
  )
}

export default App
