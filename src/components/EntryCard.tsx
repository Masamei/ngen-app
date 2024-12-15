import { Entry } from '../interfaces'

export default function EntryCard({ entry }: { entry: Entry }) 
{
  function handleClick() {
    window.open(entry.Link, '_blank', 'noopener noreferrer')
  } 

  return (
    <div className='flex flex-wrap justify-evenly'>
      <div onClick={handleClick} 
          className='cursor-pointer text-silver bg-customBackground hover:bg-silver hover:text-green 
          rounded-lg p-4 m-2 min-w-52 max-w-52 w-52 transition duration-300 ease-in-out'>
        <h2 className='text-lg font-bold mt-2 elipsis-pretty'>{entry.API}</h2>
        <p className='text-gray-400 mb-2 text-[8px]'>Category: {entry.Category}</p>
        <p className='text-gray-400 pb-4 text-xs'>{entry.Description}</p>

        <span className='grid grid-cols-5 gap-1'>
          <p className={`text-gray-400 pb-4 text-[8px] ${entry.HTTPS ? 'text-green' : 'text-red line-through'}`}>HTTPS</p>
          <p className={`text-gray-400 pb-4 text-[8px] col-span-2`}>Cors: {entry.Cors}</p>
          {entry.Auth && <p className={`text-gray-400 pb-4 text-[8px] col-span-2`}>AUTH: {entry.Auth}</p>}
        </span>
      </div>
    </div>
  )
}
