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
    const { getByText } = render(<EntryCard entry={mockEntry} />)
    
    expect(getByText('The Muse')).toBeInTheDocument()
    expect(getByText('Job board and company profiles')).toBeInTheDocument()
    expect(getByText('Cors: unknown')).toBeInTheDocument()
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<EntryCard entry={mockEntry} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
