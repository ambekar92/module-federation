'use client'
import { Button } from '@trussworks/react-uswds'
import Link from 'next/link'
import { Grid } from '@trussworks/react-uswds'
import React, { useState } from 'react'
import ParticipationAgreementModal from '../components/participation-agreement-modal/ParticipationAgreementModal'
import UserSessionModal from '@/app/shared/components/user-session-management-modal/UserSessionModal'

const modalBody = (
  <ul className="participation-modal-body">
    <li>
      To complete your <span>Participation Agreement</span>, carefully read
      through each section and check the box at the bottom of the section
      indicating your understanding and agreement to the terms.{' '}
    </li>
    <li>
      A signed copy of your <span>Participation Agreement</span> will be made
      available under the ‘Documents’ section of your dashboard.
    </li>
  </ul>
)

const HomePage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const UserSessionModalDemo = () => {
    // eslint-disable-next-line no-console
    console.log('clicked!')
    setOpen(!open)
  }

  return (
    <Grid row>
      <div className="tablet:grid-col-4 margin-top-4 tablet:margin-bottom-0">
        <nav aria-label="Side navigation,">
          <ul className="usa-sidenav">
            <li className="usa-sidenav__item">
              <Link href="/notifications">Notifications</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/user/dashboard">Supervisor and Analysis Dashboard</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/admin/document-types">Document Types</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/ownership">Ownership and Control</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/user/list">User Management</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/user/1">User</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/claim-your-business">Claim Your Business</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/should-i-apply">Should I Apply</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/documents">Documents</Link>
            </li>
            <li className="usa-sidenav__item">
              <ParticipationAgreementModal
                modalTitle={
                  'U.S. Small Business Administration 8(a) Business Development Program'
                }
                subModalTitle={'Participation Agreement'}
                modalBody={modalBody}
              />
            </li>
            <li className="usa-sidenav__item">
              <Button type="button" onClick={UserSessionModalDemo}>
                Display User Session Modal
              </Button>
              {open && <UserSessionModal openDemo={open} />}
            </li>
          </ul>
        </nav>
      </div>
    </Grid>
  )
}

export default HomePage
