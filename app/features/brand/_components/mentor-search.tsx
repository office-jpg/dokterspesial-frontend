import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '~/components/atoms/input'

interface MentorSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export function MentorSearch({
  value,
  onChange,
  placeholder = 'Cari mentor berdasarkan nama...',
  debounceMs = 500
}: MentorSearchProps) {
  const [localValue, setLocalValue] = useState(value)

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Debounce onChange calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [localValue, onChange, value, debounceMs])

  return (
    <div className='relative w-full max-w-lg'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Search className='size-5 text-muted-foreground' />
      </div>
      <Input
        type='text'
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className='pl-10 pr-4 py-2 w-full'
      />
    </div>
  )
}
