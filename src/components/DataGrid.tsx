import { useEffect, useState } from 'react'
import { Entry } from '../interfaces'
import EntryCard from './EntryCard'
import SearchFilter from './SearchFilter'
import Pagination from './Pagination'

export default function DataGrid ({entries, categories}: 
    {entries: Entry[], categories: string[]}) 
{

  const entriesPerPage = 40
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([])
  const [filteredEntriesPerPage, setFilteredEntriesPerPage] = useState<Entry[]>([])
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(entries.length / entriesPerPage))
  const [currentPage, setCurrentPage] = useState<number>(1)


  function filterEntries(allEntries: Entry[], searchValue: string, selectedCategory: string): Entry[] {
    let filtered = allEntries
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(entry => entry.Category === selectedCategory)
    }

    if (searchValue) {
      filtered = filtered.filter(entry =>
        entry.API.toLowerCase().includes(searchValue.toLowerCase()) ||
        entry.Description.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    return filtered
  }
  
  useEffect(() => {
    var filtered = filterEntries(entries, searchValue, selectedCategory)

    setFilteredEntries(filtered)

    setTotalPages(Math.ceil(filtered.length / entriesPerPage))
  }, [entries, searchValue, selectedCategory])

  useEffect(() => {
    const startIndex = (currentPage - 1) * entriesPerPage
    const endIndex = startIndex + entriesPerPage
    setFilteredEntriesPerPage(filteredEntries.slice(startIndex, endIndex))

  }, [currentPage, filteredEntries])

  const handlePrevious = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
  }
  
  return (
    <div>
      <div className='flex justify-between ml-2 mb-4'>
        <SearchFilter 
          categories={['All', ...categories]} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory} 
          />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {filteredEntriesPerPage.map(entry => (
          <EntryCard key={`${entry.API}-${entry.Link}`} entry={entry} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePrevious={handlePrevious} handleNext={handleNext} />
    </div>
  )
}

