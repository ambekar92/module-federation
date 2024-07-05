import { render, screen } from '@testing-library/react'
import Delegates from '../Delegates'

describe('Delegates', () => {
  it('renders', () => {
    render(<Delegates />)
  })

  it('displays a table', () => {
    render(<Delegates />);
    const tableElement = screen.getByTestId('table');
    expect(tableElement).toBeInTheDocument();
  })

  it('displays correct columns', () => {
    render(<Delegates />)
    const firstNameCol = screen.getByTestId('first-name');
    const lastNameCol = screen.getByTestId('last-name');
    const emailCol = screen.getByTestId('email');
    const statusCol = screen.getByTestId('status');
    expect(firstNameCol).toBeInTheDocument();
    expect(lastNameCol).toBeInTheDocument();
    expect(emailCol).toBeInTheDocument();
    expect(statusCol).toBeInTheDocument();
  })

})
