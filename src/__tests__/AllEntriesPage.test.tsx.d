import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AllEntriesPage from '../pages/AllEntriesPage'

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
        {
          API: 'Cat Facts',
          Description: 'Daily cat facts',
          Auth: 'none',
          HTTPS: true,
          Cors: 'unknown',
          Link: 'https://cat-fact.herokuapp.com',
          Category: 'Animals',
        },
      ],
    }),
  })
)

global.fetch = mockFetch as jest.Mock

describe('AllEntriesPage Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  test('renders loading state initially', () => {
    render(<AllEntriesPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('fetches and displays entries', async () => {
    render(<AllEntriesPage />)

    await waitFor(() => {
      expect(screen.getByText('The Muse')).toBeInTheDocument()
      expect(screen.getByText('Cat Facts')).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  test('displays error message on fetch failure', async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject('API is down'))

    render(<AllEntriesPage />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch entries')).toBeInTheDocument()
    })
  })

  test('matches snapshot', async () => {
    const { asFragment } = render(<AllEntriesPage />)

    await waitFor(() => {
      expect(screen.getByText('The Muse')).toBeInTheDocument()
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
