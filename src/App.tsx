import AllEntriesPage from './pages/AllEntriesPage'
import RandomEntryPage from './pages/RandomEntryPage'
import './output.css'
import { useState } from 'react'

export default function App() 
{
  const [pageName, setPageName] = useState<string>('all')

  return (
    <div className='h-screen'>
      <div className='bg-customBackground  w-full flex p-4 justify-evenly'>
        <div onClick={() => setPageName('all')} 
          className={`cursor-pointer text-md font-bold ${pageName==='all' ? 'text-green' : 'text-white'}`}>
          All Entries
        </div>
        <div onClick={() => setPageName('random')} 
          className={`cursor-pointer text-md font-bold ${pageName==='random' ? 'text-green' : 'text-white'}`}>
          Random Entry
        </div>
      </div>
      {pageName === 'random' && <RandomEntryPage />}
      {pageName === 'all' && <AllEntriesPage />}
    </div>
  )
}
