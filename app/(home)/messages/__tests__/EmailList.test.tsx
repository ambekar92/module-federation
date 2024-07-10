import { render, screen, fireEvent } from '@testing-library/react'
import EmailList from '../components/email-folders/InboxEmailList'

jest.mock('swr', () => () => ({
  data: {
    results: [
      {
        id: 1,
        sender: { display_name: 'John Doe' },
        subject: 'Test Email',
        sent_at: '2024-06-15T12:00:00Z',
      },
      {
        id: 2,
        sender: { display_name: 'Jane Smith' },
        subject: 'Another Email',
        sent_at: '2024-06-14T09:30:00Z',
      },
    ],
  },
  error: null,
}))

describe('EmailList', () => {
  it('renders email items correctly', () => {
    const mockSetFocusedEmailId = jest.fn()
    render(
      <EmailList
        focusedEmailId={null}
        setFocusedEmailId={mockSetFocusedEmailId}
      />,
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Another Email')).toBeInTheDocument()
  })

  it('verify dot is visible', () => {
    const mockSetFocusedEmailId = jest.fn()
    render(
      <EmailList
        focusedEmailId={null}
        setFocusedEmailId={mockSetFocusedEmailId}
      />,
    )

    const unreadDot = screen.getAllByAltText('read_mail')
    expect(unreadDot.length).toBeGreaterThan(0)
  })
})
