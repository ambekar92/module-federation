'use client'

import Navbar from './shared/layout/Navbar'
import Footer from './shared/layout/Footer'
import './globals.scss'
import { useTheme } from '@mui/material/styles'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = useTheme()
  return (
    <html lang="en">
      <body>
        <div className={`${theme.palette.mode} layout`}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
