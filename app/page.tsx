'use client'
import { useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './(home)/home-2/components/LandingPage'
import { CLAIM_YOUR_BUSINESS } from './constants/url'
import './globals.scss'
import { Role } from './shared/types/role'
import { postLoginRedirectUrl } from './shared/utility/postLoginRedirectUrl'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { decrypt } from '@/app/shared/utility/encryption';

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get('state');
    if (state) {
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

      const checkCookieAndRedirect = () => {
        const cookie = Cookies.get('email_password_auth_token');
        if (cookie) {
          if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
            console.log('COOKIE FOUND', cookie);
            console.log('REDIRECT TO NOW', redirectUrl);
          }
          window.location.href = redirectUrl;
        } else {
          setTimeout(checkCookieAndRedirect, 500);
        }
      };

      checkCookieAndRedirect();
    } else {
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.log('NO STATE');
      }
    }
  }, [searchParams]);

  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  )
}
