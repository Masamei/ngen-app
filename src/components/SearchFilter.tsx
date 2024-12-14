export default function SearchFilter({ 
  categories, 
  selectedCategory,
  onSelectCategory,
  searchValue,
  setSearchValue 
}: {
  categories: string[], 
  selectedCategory: string,
  onSelectCategory: (category: string) => void,
  searchValue: string,
  setSearchValue: (event: string) => void
}) 
{

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onSelectCategory(value)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  };

  return (
  <div className='flex items-center border border-gray-300 rounded overflow-hidden'>
      <input
        type='text'
        value={searchValue}
        onChange={handleSearchChange}
        placeholder='Search'
        className='flex-grow p-2 text-sm outline-none'
      />
      <select
        value={selectedCategory}      
        onChange={handleSelectChange}
        className='p-2 bg-white text-xs border-l border-gray-300 outline-none'
      >
        {categories.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
