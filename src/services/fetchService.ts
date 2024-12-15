import { FetchResult } from '../interfaces'

export default async function fetchData<T>(url: string, maxRetries: number = 0): Promise<FetchResult<T>> {
  let fetchedData: T | null = null
  let error: string | null = null   
  let numberOfCalls: number = 0
  
  while (numberOfCalls < maxRetries + 1) {
    try {
      const response = await fetch(url,{ 
        method: 'GET',  
        mode: 'no-cors'})
        
      const data = await response.json()
      
      if (response.status === 200) {  
        
        fetchedData = data
        error =  null
      }
      
    } catch (err: any) {
      error = err.message
    } finally {
      numberOfCalls += 1
    }
  }

  return { response: fetchedData, error }
}
