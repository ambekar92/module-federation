import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

import NotificationHeader from '../NotificationHeader'
describe('NotificationList', () => {
  it('renders the "the number of count in Notification Header" heading', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('When Filter Icon is clicked, there will be a list of options of read and read will be selected', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('FilterListIcon'))
    const draft = screen.getByTestId('DraftsIcon')
    expect(draft).toBeVisible()
    const Read = fireEvent.click(screen.getByText('Read'))
    expect(Read).toBeTruthy()
  })

  it('When Filter Icon is clicked, there will be a list of options of read and unread will be selected', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('FilterListIcon'))
    const draft = screen.getByTestId('DraftsIcon')
    expect(draft).toBeVisible()
    const Read = fireEvent.click(screen.getByText('Unread'))
    expect(Read).toBeTruthy()
  })

  it('When Filter Icon is clicked, there will be a list of options of unread and read will be selected', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )
    fireEvent.click(screen.getByTestId('FilterListIcon'))
    const email = screen.getByTestId('EmailIcon')
    expect(email).toBeVisible()
    const read = fireEvent.click(screen.getByText('Read'))
    expect(read).toBeTruthy()
  })
  it('When Filter Icon is clicked, there will be a list of options of unread and unread will be selected', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )
    fireEvent.click(screen.getByTestId('FilterListIcon'))
    const email = screen.getByTestId('EmailIcon')
    expect(email).toBeVisible()
    const UnRead = fireEvent.click(screen.getByText('Unread'))
    expect(UnRead).toBeTruthy()
  })
  it('After More Vertical Icon is clicked, there will be a list of options of read (DraftsIcon) and mark as read is clicked', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('MoreVertIcon'))
    const draft = screen.getByTestId('DraftsIcon')
    expect(draft).toBeVisible()
    const MarkedRead = fireEvent.click(screen.getByText('Mark All As Read'))
    expect(MarkedRead).toBeTruthy()
  })
  it('After More Vertical Icon is clicked, there will be a list of options of read (DraftsIcon) and unread and mark as unread is clicked', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('MoreVertIcon'))
    const drafts = screen.getByTestId('DraftsIcon')
    expect(drafts).toBeVisible()
    const MarkedUnRead = fireEvent.click(screen.getByText('Mark All As Unread'))
    expect(MarkedUnRead).toBeTruthy()
  })
  it('After More Vertical Icon is clicked, there will be a list of options of unread (EmailIcon) and mark as read is clicked', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('MoreVertIcon'))
    const draft = screen.getByTestId('DraftsIcon')
    expect(draft).toBeVisible()
    const MarkedRead = fireEvent.click(screen.getByText('Mark All As Read'))
    expect(MarkedRead).toBeTruthy()
  })
  it('After More Vertical Icon is clicked, there will be a list of options of unread (EmailIcon) and mark as unread is clicked', () => {
    render(
      <NotificationHeader
        cnt={5}
        selectMarkAsAllRead={() => {}}
        selectMarkAsAllUnRead={() => {}}
      />
    )

    fireEvent.click(screen.getByTestId('MoreVertIcon'))
    const email = screen.getByTestId('EmailIcon')
    expect(email).toBeVisible()
    const MarkedUnRead = fireEvent.click(screen.getByText('Mark All As Unread'))
    expect(MarkedUnRead).toBeTruthy()
  })
})
