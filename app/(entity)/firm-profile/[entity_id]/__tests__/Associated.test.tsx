import { render, screen } from '@testing-library/react'
import Associated from '../Associated'

describe('Associated', () => {
  it('renders', () => {
    render(<Associated />)
  })

  it('displays a table', () => {
    render(<Associated />);
    const tableElement = screen.getByTestId('table');
    expect(tableElement).toBeInTheDocument();
  })

  it('displays correct columns', () => {
    render(<Associated />)
    const nameCol = screen.getByTestId('business-name');
    const dbaCol = screen.getByTestId('business-name');
    const ueiCol = screen.getByTestId('business-name');
    const addressCol = screen.getByTestId('business-name');
    const satusCol = screen.getByTestId('business-name');
    expect(nameCol).toBeInTheDocument();
    expect(dbaCol).toBeInTheDocument();
    expect(ueiCol).toBeInTheDocument();
    expect(addressCol).toBeInTheDocument();
    expect(satusCol).toBeInTheDocument();
  })

})
