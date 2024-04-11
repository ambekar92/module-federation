/* Load REACT-USWDS CSS */
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import '../../styles/global.scss'
import { ThemeProvider } from '../context/ThemeContext' // Removed to silence warning
import { AuthProvider } from '../context/AuthContext'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

export default function App({
   Component,
   pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>): JSX.Element {
   return (
      <SessionProvider session={session}>
         <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
         </AuthProvider>
      </SessionProvider>
   )
}
