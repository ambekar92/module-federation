import { render, screen } from '@testing-library/react'
import Primary from '../Primary'

describe('Primary', () => {
  it('renders', () => {
    render(<Primary />)
  })

  it('displays a table', () => {
    render(<Primary />);
    const tableElement = screen.getByTestId('table');
    expect(tableElement).toBeInTheDocument();
  })

  it('displays correct columns', () => {
    render(<Primary />)
    const businessNameCol = screen.getByTestId('business-name');
    const dbaCol = screen.getByTestId('dba');
    const ueiCol = screen.getByTestId('uei');
    const addressCol = screen.getByTestId('address');
    const entityTypeCol = screen.getByTestId('entity-type');
    const entityOwnedCol = screen.getByTestId('entity-owned');
    const governmentContactCol = screen.getByTestId('government-contact');
    expect(businessNameCol).toBeInTheDocument();
    expect(dbaCol).toBeInTheDocument();
    expect(ueiCol).toBeInTheDocument();
    expect(addressCol).toBeInTheDocument();
    expect(entityTypeCol).toBeInTheDocument();
    expect(entityOwnedCol).toBeInTheDocument();
    expect(governmentContactCol).toBeInTheDocument();
  })

})
