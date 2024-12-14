import { useState, useEffect } from 'react'
import mockData from '../assets/entries.json'
import '../output.css'
import { Entry } from '../interfaces'
import Charts from '../components/Charts'
import DataGrid from '../components/DataGrid'
import useFetch from '../services/fetchService'
import fetchService from '../services/fetchService'

export default function AllEntriesPage()
{
  const [allEntries, setAllEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  async function fetchAndSetData() {
    setLoading(true)
    const result = await fetchService<{entries: Entry[], error: string}>('https://api.publicapis.org/entries')
    // setEntry(result.response?.entries[0] ?? null)
    // setError(result.error)
    setLoading(false)
  }

  useEffect(() => {
    fetchAndSetData()

    //just for testing purposes, because api is down
    setAllEntries(mockData.entries)
  }, [])
  
  const categories = Array.from(new Set(allEntries.map(entry => entry.Category)))

  if (loading) return <div>Loading...</div>

  //just for testing purposes, because api is down
  // if (error) return <div>{error}</div>

  return (
    <div className='container mx-auto p-4'>
      <Charts 
        categories={categories}
        entries={allEntries}
      />

      <DataGrid
        entries={allEntries}
        categories={categories}
      />
    </div>
  )
}