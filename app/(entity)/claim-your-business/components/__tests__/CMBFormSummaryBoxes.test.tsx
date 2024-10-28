import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CMBFormSummaryBoxes from '../layout/CMBFormSummaryBoxes'

describe('Links on CMB form', () => {
  it('This checks for link rendering of sam.gov', () => {
    render(<CMBFormSummaryBoxes />)
    const SamGovLinkElement = screen.getByTestId('my-samGovLink')
    expect(SamGovLinkElement).toBeInTheDocument()
    const mockWindowOpen = jest.fn()
    window.open = mockWindowOpen
    fireEvent.click(SamGovLinkElement)
    expect(SamGovLinkElement).toHaveAttribute('target', '_blank')
  })
  it('This checks for link rendering of https://sam.gov/content/status-tracker', () => {
    const proceedToClaimBusiness = jest.fn()
    render(<CMBFormSummaryBoxes />)
    const TrackerLinkElement = screen.getByTestId('my-samGovLinkStatusTracker')
    expect(TrackerLinkElement).toBeInTheDocument()
    fireEvent.click(TrackerLinkElement)
    const mockWindowOpen = jest.fn()
    window.open = mockWindowOpen
    fireEvent.click(TrackerLinkElement)
    expect(TrackerLinkElement).toHaveAttribute('target', '_blank')
  })
  it('This checks for link rendering of https://sam.gov/content/entity-registration', () => {
    const proceedToClaimBusiness = jest.fn()
    render(<CMBFormSummaryBoxes />)
    const RegistrationLinkElement = screen.getByTestId(
      'my-samGovLinkRegistration',
    )
    expect(RegistrationLinkElement).toBeInTheDocument()
    const mockWindowOpen = jest.fn()
    window.open = mockWindowOpen
    fireEvent.click(RegistrationLinkElement)
    expect(RegistrationLinkElement).toHaveAttribute('target', '_blank')
  })
})
