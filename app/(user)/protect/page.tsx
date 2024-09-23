'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { CLAIM_YOUR_BUSINESS } from '@/app/constants/url'
import { Role } from '@/app/shared/types/role'
import { postLoginRedirectUrl } from '@/app/shared/utility/postLoginRedirectUrl'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useSessionUCMS } from '@/app/lib/auth'
import { signIn, getSession } from 'next-auth/react'
import { Alert } from '@trussworks/react-uswds'

const ProtectedPage = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const session = useSessionUCMS();
  const router = useRouter();
  const [showLoginError, setShowLoginError] = useState(false);

  useEffect(() => {
    const states = searchParams.get('states');
    if (states) {
      const uuid = Cookies.get('uuid')
      const email = Cookies.get('email')
      if (uuid === states) {
        Cookies.remove('uuid');
        Cookies.remove('email');
        const login = async () => {
          const result = await signIn('max', {
            redirect: false,
            email: email
          });
        }
        login();
      }
    }
  }, [searchParams, session]);

  useEffect(() => {
    let attempts = 0; // Initialize attempt counter
    const maxAttempts = 10; // Maximum number of retries

    const checkSession = async () => {
      const session = await getSession(); // Check for session
      if (session) {
        let redirectUrl = CLAIM_YOUR_BUSINESS;
        const firstPermission = session.permissions[0].slug ? session.permissions[0].slug : Cookies.get('firstPermission');
        const firstPermissionSlug = firstPermission ? firstPermission as Role : undefined;
        const lastPermission = session.permissions[session.permissions.length - 1].slug ? session.permissions[session.permissions.length - 1].slug : Cookies.get('lastPermission');
        const lastPermissionSlug = lastPermission ? lastPermission as Role : undefined;
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
      } else if (attempts < maxAttempts) {
        // If session doesn't exist and max attempts haven't been reached, retry
        attempts++;
        setTimeout(checkSession, 500); // Retry after 500ms
      }
    };

    checkSession();

    return () => {
      attempts = maxAttempts; // Prevent further retries on unmount
    };
  }, [router]);

  if (loading) {
    return <div style={{ marginLeft: '-2rem', marginRight: '-2rem' }}>
      {/* <Alert type="info" heading="" headingLevel="h4">
        {'We are currently performing system maintenance. MySBA Certifications will be back up soon.'}
      </Alert> */}
    </div>;
  }

  return (
    <div>
    </div>
  );
};

export default ProtectedPage;
