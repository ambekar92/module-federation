'use client'
import { redirect, useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './(home)/home-2/components/LandingPage'
import { CLAIM_YOUR_BUSINESS } from './constants/url'
import './globals.scss'
import { useSessionUCMS } from './lib/auth'
import { Role } from './shared/types/role'
import { postLoginRedirectUrl } from './shared/utility/postLoginRedirectUrl'

// async function fetchData(url: string) {
//   const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

export default function Home() {
  const searchParams = useSearchParams();
  const session = useSessionUCMS();

  if(session && searchParams.get('signedIn') === 'true') {
    const firstPermissionSlug = session.data.permissions?.at(0)?.slug as unknown as Role;
    const lastPermissionSlug = session.data.permissions?.at(-1)?.slug as unknown as Role;

    if (firstPermissionSlug && lastPermissionSlug) {
      // let applicationData: Application[] | null = null;
      // let entityData: Entity[] | null = null;

      // const applicationDataPromise = fetchData(`${APPLICATION_ROUTE}?user_id=${session.data.user_id}`);
      // const entityQueryParam = lastPermissionSlug === Role.DELEGATE ? 'delegate_user_id' : 'owner_user_id';
      // const entityDataPromise = fetchData(`${ENTITIES_ROUTE}?${entityQueryParam}=${session.data.user_id}`);

      // applicationData = await applicationDataPromise;

      // Only fetch entity data if no application found
      // if (applicationData?.length === 0) {
      // entityData = await entityDataPromise;
      // }

      const redirectUrl = postLoginRedirectUrl(firstPermissionSlug, lastPermissionSlug);
      redirect(redirectUrl);
    } else {
      redirect(CLAIM_YOUR_BUSINESS);
    }
  }

  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  )
}
