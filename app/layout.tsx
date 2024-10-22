'use client'
import React, { useState } from 'react'
//import { NavbarHome2 } from './shared/components/layout-temp/NavbarHome2'
import Footer from './layout/Footer'
import Navbar from './layout/Navbar'
//import Footer from './shared/layout/Footer'
import { useTheme } from '@mui/material/styles'
import { Alert, GovBanner } from '@trussworks/react-uswds'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { CREATE_NEW_ACCOUNT_URL, EIGHT_A_URL, HUBZONE_URL, VET_CERT_URL, WOSB_AND_EDWOSB_URL } from './constants/link'
import './globals.scss'
import SWRProvider from './services/SWRProvider'
import UserSessionModal from './shared/components/user-session-management-modal/UserSessionModal'

type RootLayoutProps = {
  children: React.ReactNode
  session?: Session
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  const [showAlert, setShowAlert] = useState<boolean>(true)
  const theme = useTheme()
  const pathname = usePathname()

  const isApplicationPage = pathname?.includes('/firm/application/');
  const isResourcePage = pathname === '/resources';
  const isHomePage = pathname === '/'

  const handleAlertClose = () => {
    setShowAlert(false)
  }
  return (
    <html lang="en">
      <head>
        <title>MySBA Certifications</title>
        {pathname?.includes('/aeroad') || pathname?.includes('/aethos') &&
          <meta name="robots" content="noindex, nofollow" />
        }
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {
          (process.env.NODE_ENV !== 'production') &&
          <p className='margin-0 envBanner'>
            You are in the {process.env.NODE_ENV} environment. Git Commit: {process.env.GIT_COMMIT}
          </p>
        }
        <GoogleAnalytics strategy="lazyOnload" trackPageViews />
        <GovBanner />
        <SessionProvider session={session}>
          <SWRProvider>
            <div className={`${theme.palette.mode} layout`}>
              {/* {isHomePage && <Alert type="info" heading="We are currently performing system maintenance. MySBA Certifications will be back up soon." headingLevel="h5" />} */}
              {isHomePage && showAlert && (
                <Alert type="info" heading="Now Open for Applications." headingLevel="h5">
                  <span className='display-block margin-top-05'>We are now accepting applications for VetCert, HUBZone, Women-Owned and Economically-Disadvantaged Women-Owned, and 8(a) small business certifications.</span>
                  <span className='display-block margin-top-05'>
										If you have an account in the MySBA loan portal or <a className="usa-link" href={VET_CERT_URL} target="_blank" rel="noopener noreferrer">VetCert</a>,
										you can log in with that account email and password. If you have an existing account for HUBZone, WOSB or EDWOSB, or the 8(a) program, you must
                    {' '}<a className="usa-link" href={CREATE_NEW_ACCOUNT_URL} target="_blank" rel="noopener noreferrer">create a new account</a>{''} to apply.
                  </span>
                  <span className='display-block margin-top-05'>
										To report a change to your business for a current certification, use the <a className="usa-link" href={VET_CERT_URL} target="_blank" rel="noopener noreferrer">VetCert</a>, <a className="usa-link" href={HUBZONE_URL} target="_blank" rel="noopener noreferrer">HUBZone</a>, <a className="usa-link" href={WOSB_AND_EDWOSB_URL} target="_blank" rel="noopener noreferrer">WOSB or EDWOSB</a>, or <a className="usa-link" href={EIGHT_A_URL} target="_blank" rel="noopener noreferrer">8(a) program</a> websites.
                  </span>
                  <span className='display-block margin-top-05'>Entity-owned firms cannot apply for certification yet, but that application will be coming soon.</span>
                  <button
                    type="button"
                    className="usa-button usa-modal__close"
                    aria-label="Close this window"
                    data-close-modal
                    onClick={handleAlertClose}
                  >
										x
                  </button>
                </Alert>
              )}
              <Navbar />
              <UserSessionModal />
              <div className={`start grid-container-widescreen display-flex ${isHomePage && 'padding-x-0'} ${(isApplicationPage || isResourcePage) ? 'padding-x-0 bg-gray-5' : ''}`}>
                <main className="flex-fill display-flex flex-column">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
