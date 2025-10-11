import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '~/components/atoms/input'

const BlogSearchBar: React.FC<{
  onSearch: (term: string) => void
  initialValue?: string
}> = ({ onSearch, initialValue }) => {
  const [value, setValue] = useState(initialValue || '')

  useEffect(() => {
    setValue(initialValue || '')
  }, [initialValue])

  const handleChange = (term: string) => {
    setValue(term)
    onSearch(term)
  }

  return (
    <div className='relative max-w-lg w-full'>
      <Input
        type='text'
        placeholder='Cari artikel...'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className='pr-10 bg-orange-50/80 backdrop-blur-lg border-0 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] focus:ring-2 focus:ring-orange-500/50'
      />
      <Search className='absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}

export default BlogSearchBar
