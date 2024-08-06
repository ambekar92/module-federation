import React from 'react'
//import './globals.scss'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useTheme } from '@mui/material/styles'
import { NavbarHome2 } from './components/NavbarHome2'
import { GovBanner } from '@trussworks/react-uswds'
import Footer from './components/Footer2'

type RootLayoutProps = {
  children: React.ReactNode
  session?: Session
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  const theme = useTheme()

  return (
    <html lang="en">
      <body>
        <GovBanner />
        <NavbarHome2 />
        <SessionProvider session={session}>
          <div
            className="grid-container-widescreen display-flex width-full maxw-full"
            style={{ paddingLeft: '0px', paddingRight: '0px' }}
          >
            <main className="flex-fill display-flex flex-column">
              {children}
              <Footer />
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
