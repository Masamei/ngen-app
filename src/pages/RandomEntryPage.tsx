import { useEffect, useState, memo } from 'react'
import EntryCard from '../components/EntryCard'
import '../output.css'
import { Entry } from '../interfaces'
import mockData from '../assets/random.json'
import fetchData from '../services/fetchService'

function RandomEntryPage() 
{
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  async function fetchAndSetData() {
    setLoading(true)
    await fetchData<{entries: Entry[], error: string}>('https://api.publicapis.org/random')
    // const result = await fetchData<{entries: Entry[], error: string}>('https://api.publicapis.org/random')
    // setEntry(result.response?.entries[0] ?? null)
    // setError(result.error)
    setLoading(false)
  }

  useEffect(() => {
    fetchAndSetData()
    //just for testing purposes, because api is down
    setEntry(mockData.entries[0])
  }, [])

  if (loading) return <div>Loading...</div>
  
  return (
    <div className='flex flex-col items-between'>
      
      {/* {error && <div>{error}</div>} */}
      {/* {entry && !error && <EntryCard entry={entry} />} */}
      {entry && <EntryCard entry={entry} />}
      <button onClick={fetchAndSetData} className='mt-4 p-2 bg-blue-500 rounded'>Get different random entry</button>
    </div>
  )
}

export default memo(RandomEntryPage)