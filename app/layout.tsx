'use client'
import React from 'react'
import Navbar from './shared/layout/Navbar'
import Footer from './shared/layout/Footer'
import BannerComponent from './shared/layout/BannerComponent'
import './globals.scss'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth';
import { useTheme } from '@mui/material/styles'
import UserSessionModal from './shared/components/user-session-management-modal/UserSessionModal'

type RootLayoutProps = {
  children: React.ReactNode;
  session?: Session;
};

export default function RootLayout({children, session}: RootLayoutProps) {
  const theme = useTheme()
  return (
    <html lang="en">
      <body>
        <BannerComponent />
        <SessionProvider session={session}>
          <div className={`${theme.palette.mode} layout`}>
            <Navbar />
            <UserSessionModal />
            <div className="grid-container-widescreen">
              <main className="margin-y-205">{children}</main>
            </div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
