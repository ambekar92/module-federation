import { GridContainer } from '@trussworks/react-uswds'
import Link from 'next/link'
import {
  Grid
} from '@trussworks/react-uswds'
import React from 'react'

const HomePage = () => {
  return (
    <Grid row>
      <div className="tablet:grid-col-4 margin-top-4 tablet:margin-bottom-0">
        <nav aria-label="Side navigation,">
          <ul className="usa-sidenav">
            <li className="usa-sidenav__item">
              <Link href="/user">User Management</Link>
            </li>
            <li className="usa-sidenav__item">
              <Link href="/participation-agreement">Participation Agreement</Link>
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
          </ul>
        </nav>
      </div>
    </Grid>
  )
}

export default HomePage
