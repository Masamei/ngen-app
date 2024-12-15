import fetchData from '../services/fetchService'

const assetsFetchMock = Promise.resolve({
  ok: true,
  status: 200,
  json: async () => ({ key: 'value' })
  } as Response)

describe('fetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return data when fetch is successful', async () => {

    global.fetch=jest.fn()
      .mockResolvedValue(assetsFetchMock)

    const result = await fetchData('fake-url')

    expect(result.response).toEqual({ key: 'value' })
    expect(result.error).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should return an error when fetch fails', async () => {

    global.fetch=jest.fn()
      .mockRejectedValue(new Error('Network error'))

    const result = await fetchData('fake-url')

    expect(result.response).toBeNull()
    expect(result.error).toEqual('Network error')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should retry the specified number of times on failure', async () => {
    
    global.fetch=jest.fn()
      .mockRejectedValue(new Error('Network error'))

    const maxRetries = 2
    const result = await fetchData('fake-url', maxRetries)

    expect(result.response).toBeNull()
    expect(result.error).toEqual('Network error')
    expect(fetch).toHaveBeenCalledTimes(maxRetries + 1)
  })
})