import { render } from '@testing-library/react'
import EntryCard from '../components/EntryCard'

const mockEntry = {
  API: 'The Muse',
  Description: 'Job board and company profiles',
  Auth: 'apiKey',
  HTTPS: true,
  Cors: 'unknown',
  Link: 'https://www.themuse.com/developers/api/v2',
  Category: 'Jobs',
};

describe('EntryCard Component', () => {
  test('renders EntryCard with correct data', () => {
    const { getByText, getByRole } = render(<EntryCard entry={mockEntry} />)
    
    expect(getByText(/The Muse/i)).toBeInTheDocument()
    expect(getByText(/Job board and company profiles/i)).toBeInTheDocument()
    expect(getByRole('link', { name: 'Visit API' })).toHaveAttribute('href', mockEntry.Link)
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<EntryCard entry={mockEntry} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
