/* Load REACT-USWDS CSS */
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import 'styles/global.scss'
import BootstrapScript from '../pages/components/BootstrapScript'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { type Session } from 'next-auth'

export default function App({
   Component,
   pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>): JSX.Element {
   return (
      <>
         <SessionProvider session={session}>
            <Component {...pageProps} />
            <BootstrapScript />
            <ToastContainer />
         </SessionProvider>
      </>
   )
}
