'use client'
import React from 'react'
import Navbar from './shared/layout/Navbar'
import Footer from './shared/layout/Footer'
import './globals.scss'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useTheme } from '@mui/material/styles'
import UserSessionModal from './shared/components/user-session-management-modal/UserSessionModal'
import { GovBanner } from '@trussworks/react-uswds'
import SWRProvider from './services/SWRProvider'
import { usePathname } from 'next/navigation'

type RootLayoutProps = {
  children: React.ReactNode
  session?: Session
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  const theme = useTheme()
  const pathname = usePathname()

  const isApplicationPage = pathname?.includes('/firm/application/')

  return (
    <html lang="en">
      <body>
        <GovBanner />
        <SessionProvider session={session}>
          <SWRProvider>
            <div className={`${theme.palette.mode} layout`}>
              <Navbar />
              <UserSessionModal />
              <div className={`grid-container-widescreen display-flex ${isApplicationPage ? 'bg-gray-5' : ''}`}>
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
