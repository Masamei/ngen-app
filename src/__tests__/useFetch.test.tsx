import useFetch from '../services/fetchService'
import { renderHook, waitFor } from '@testing-library/react'

const assetsFetchMock = () => Promise.resolve({
  ok: true,
  status: 200,
  json: async () => {}
  } as Response);

describe('UseFetch', () => {
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ) as jest.Mock;

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('call fetch once', async () => {
    const result = renderHook(() => useFetch('randomurl', true, 3))

    await waitFor(() => expect(result.result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('retry fetch once', async() => {
    global.fetch=jest.fn()
      .mockRejectedValueOnce(new Error('API is down'))
      .mockImplementation(assetsFetchMock)

    const result = renderHook(() => useFetch('randomurl', true, 3))

    await waitFor(() => expect(result.result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(2)
  })

  test('stop retrying after 3 times', async() => {
    global.fetch=jest.fn()
      .mockRejectedValue(new Error('API is down'))

    const result = renderHook(() => useFetch('randomurl', true, 3))

    await waitFor(() => expect(result.result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(4)
  })

  test('do not retry', async() => {
    global.fetch=jest.fn()
      .mockRejectedValue(new Error('API is down'))

    const result = renderHook(() => useFetch('randomurl', false))

    for (let i = 0; i < 2; i++) {
      await waitFor(() => expect(result.result.current.loading).toBe(false))
    }

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})