import { Search } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  // Memoize the search handler to prevent unnecessary re-renders
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      onSearch(searchQuery)
    },
    [onSearch]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(query)
    }, 300) // Optimized debounce to 300ms for better UX

    return () => clearTimeout(timeoutId)
  }, [query, debouncedSearch])

  return (
    <div className="relative max-w-xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search articles by title or content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
