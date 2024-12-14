import { render, screen, waitFor } from '@testing-library/react'
import RandomEntryPage from '../pages/RandomEntryPage'

// Mock fetch function
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

  test('renders loading state initially', () => {
    render(<RandomEntryPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('fetches and displays a random entry', async () => {
    render(<RandomEntryPage />)

    await waitFor(() => {
      expect(screen.getByText('The Muse')).toBeInTheDocument()
      expect(screen.getByText('Job board and company profiles')).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  test('displays error message on fetch failure', async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject('API is down'))

    render(<RandomEntryPage />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch entry')).toBeInTheDocument()
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