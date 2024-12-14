export interface Entry {
  API: string
  Description: string
  Auth: string
  HTTPS: boolean
  Cors: string
  Link: string
  Category: string
}

export interface ChartsProps {
  categories: string[]
  entries: Entry[]
}

export interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export interface FetchResult<T> {
  response: T | null
  error: string | null
}