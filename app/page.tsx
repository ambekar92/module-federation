'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './(home)/home-2/components/LandingPage'
import { CLAIM_YOUR_BUSINESS } from './constants/url'
import './globals.scss'
import { Role } from './shared/types/role'
import { postLoginRedirectUrl } from './shared/utility/postLoginRedirectUrl'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { decrypt } from '@/app/shared/utility/encryption';
import { useSessionUCMS } from './lib/auth'
import { Alert } from '@trussworks/react-uswds'

export default function Home() {
  const searchParams = useSearchParams();
  const session = useSessionUCMS();
  const router = useRouter();
  const [showLoginError, setShowLoginError] = useState(false);

  useEffect(() => {
    const state = searchParams.get('state');

    if (state && session) {
      if (session.status === 'authenticated') {
        let redirectUrl = CLAIM_YOUR_BUSINESS;
        const firstPermission = Cookies.get('firstPermission');
        const firstPermissionSlug = firstPermission ? decrypt(firstPermission) as Role : undefined;
        const lastPermission = Cookies.get('lastPermission');
        const lastPermissionSlug = lastPermission ? decrypt(lastPermission) as Role : undefined;

        if (firstPermissionSlug && lastPermissionSlug) {
          if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
            console.log('REDIRECT PAGE LOGIN');
            console.log('firstPermissionSlug', firstPermissionSlug);
            console.log('lastPermissionSlug', lastPermissionSlug);
          }
          redirectUrl = postLoginRedirectUrl(firstPermissionSlug, lastPermissionSlug);
          if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
            console.log('REDIRECT TO', redirectUrl);
          }
        }
        router.push(redirectUrl);
      }
      {/* todo: need to fix this issue. it keep showing up on redirect and on public page */}
      // } else if (session.status === 'unauthenticated') {
      //   setShowLoginError(true);
      // }
    } else {
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.log('NO STATE');
      }
    }
  }, [searchParams, session]);

  return (
    <>
      {showLoginError && <Alert headingLevel='h2' type={'error'}>We couldn&apos;t log you in. Please try again. If the problem persists, please contact support for further assistance.</Alert>}
      <LandingPage />
      <ToastContainer />
    </>
  )
}
