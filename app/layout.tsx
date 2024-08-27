'use client'
import React from 'react'
//import { NavbarHome2 } from './shared/components/layout-temp/NavbarHome2'
import Footer from './layout/Footer'
import Navbar from './layout/Navbar'
//import Footer from './shared/layout/Footer'
import { useTheme } from '@mui/material/styles'
import { GovBanner } from '@trussworks/react-uswds'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import './globals.scss'
import SWRProvider from './services/SWRProvider'
import UserSessionModal from './shared/components/user-session-management-modal/UserSessionModal'

type RootLayoutProps = {
  children: React.ReactNode
  session?: Session
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  const theme = useTheme()
  const pathname = usePathname()

  const isApplicationPage = pathname?.includes('/firm/application/');
  const isHomePage = pathname === '/'

  return (
    <html lang="en">
      <body>
        <GovBanner />
        <SessionProvider session={session}>
          <SWRProvider>
            <div className={`${theme.palette.mode} layout`}>
              <Navbar />
              <UserSessionModal />
              <div className={`start grid-container-widescreen display-flex ${isHomePage && 'padding-x-0'} ${isApplicationPage ? 'padding-x-0 bg-gray-5' : ''}`}>
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
