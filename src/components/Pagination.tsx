export default function Pagination ({currentPage, totalPages, handlePrevious, handleNext}: 
    {currentPage: number, totalPages: number, handlePrevious: () => void, handleNext: () => void}) 
{
    return (
        <div className='flex justify-center items-center space-x-4 mt-4'>
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50'
            >
            Previous
            </button>
            <span className='text-gray-700'>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50'
            >
                Next
            </button>
      </div>
    ) 
}