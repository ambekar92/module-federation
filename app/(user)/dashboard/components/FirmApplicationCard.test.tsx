import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FirmApplicationCard from './FirmApplicationCard'

const defaultProps = {
  title: 'Card Title',
  id: 1,
  clickedId: 1,
  programs: ['abc', 'cde', 'efg'],
  updatedDate: '03/03/2024',
  createdDate: '01/03/2022',
  actionButton: <button>Action</button>,
  percentComplete: 34,
  status: 'In progress',
  percentage: 75,
  data: true,
  applicationDeleteOrWithdraw: jest.fn(),
}

describe('Renders FirmApplicationCard component', () => {
  it('renders the title correctly', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('shows the action button when clickedId matches id', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('shows the ellipsis icon vertical when clickedId does not match id', () => {
    render(<FirmApplicationCard {...defaultProps} clickedId={2} />)
    const ellipsisIcon = screen.getByTestId('ellipsis-icon-vertical')
    expect(ellipsisIcon).toBeInTheDocument()
  })

  it('calls applicationDeleteOrWithdraw function when ellipsis icon vertical is clicked', () => {
    render(<FirmApplicationCard {...defaultProps} clickedId={2} />)
    const ellipsisIcon = screen.getByTestId('ellipsis-icon-vertical')
    fireEvent.click(ellipsisIcon)
    expect(defaultProps.applicationDeleteOrWithdraw).toHaveBeenCalledWith(
      expect.any(Object),
      1
    )
  })

  it('displays percentage if status is "In progress"', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    expect(screen.getByText('34% Complete')).toBeInTheDocument()
  })

  it('displays tags if abc is not empty', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    const tagElements = screen.getAllByTestId('tag')
    expect(tagElements.length).toBeGreaterThan(0)
  })

  it('displays number and date correctly based on status', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    expect(screen.getByText('03/03/2024')).toBeInTheDocument()
  })

  it('shows a button with the text "Continue" when status is "In progress"', () => {
    render(<FirmApplicationCard {...defaultProps} />)
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })

  it('shows a button with the text "Start" when status is not "In progress"', () => {
    render(<FirmApplicationCard {...defaultProps} status="draft" />)
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('does not display the button if status is "Submitted"', () => {
    render(<FirmApplicationCard {...defaultProps} status="Submitted" />)
    expect(screen.queryByText('Continue')).not.toBeInTheDocument()
    expect(screen.queryByText('Start')).not.toBeInTheDocument()
  })
})
