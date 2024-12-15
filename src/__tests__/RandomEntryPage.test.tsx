import { render, screen, waitFor, act } from '@testing-library/react'
import RandomEntryPage from '../pages/RandomEntryPage'

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      entries: [
        {
          API: 'The Muse',
          Description: 'Job board and company profiles',
          Auth: 'apiKey',
          HTTPS: true,
          Cors: 'unknown',
          Link: 'https://www.themuse.com/developers/api/v2',
          Category: 'Jobs',
        },
      ],
    }),
  })
)

global.fetch = mockFetch as jest.Mock

describe('RandomEntryPage Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  test('fetches and displays a random entry', async () => {
    await act(async () => {
      render(<RandomEntryPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('The Muse')).toBeInTheDocument()
      expect(screen.getByText('Job board and company profiles')).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  test.skip('displays error message on fetch failure', async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject('API is down'))

    await act(async () => {
      render(<RandomEntryPage />)
    })

    await waitFor(() => {
      expect(screen.getByText('API is down')).toBeInTheDocument()
    })
  })

  test('matches snapshot', async () => {
    const { asFragment } = render(<RandomEntryPage />)

    await waitFor(() => {
      expect(screen.getByText('The Muse')).toBeInTheDocument()
    });

    expect(asFragment()).toMatchSnapshot()
  })
})