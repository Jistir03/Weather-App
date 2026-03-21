import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2 } from 'lucide-react'
import { LocationButton } from './LocationButton'

interface SearchBarProps {
  onSearch: (city: string) => void
  onLocationRequest: () => void
  isSearching: boolean
  isLocationLoading: boolean
}

export function SearchBar({ onSearch, onLocationRequest, isSearching, isLocationLoading }: SearchBarProps) {
  const [value, setValue] = useState('')
  const trimmed = value.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trimmed) {
      onSearch(trimmed)
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1">
      <label htmlFor="city-search" className="sr-only">
        City search
      </label>
      <Input
        id="city-search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search city…"
        className="flex-1"
        autoComplete="off"
      />
      <Button
        type="submit"
        disabled={isSearching || !trimmed}
        className="min-h-11"
        aria-label="Search"
      >
        {isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
      <LocationButton onClick={onLocationRequest} isLoading={isLocationLoading} />
    </form>
  )
}
