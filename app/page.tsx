import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'
import LandingPage from './(home)/home-2/components/LandingPage'
import { USER_DASHBOARD_PAGE } from './constants/url';
import { getSessionServer } from './lib/auth';
import { Role } from './shared/types/role';
import { postLoginRedirectUrl } from './shared/utility/postLoginRedirectUrl';
import { redirect } from 'next/navigation';

export default async function Home({searchParams}: {searchParams: any}) {
  const session = await getSessionServer();
  if(session && searchParams?.signedIn === 'true') {
    const firstPermissionSlug = session.permissions?.at(0)?.slug as unknown as Role;
    const lastPermissionSlug = session.permissions?.at(-1)?.slug as unknown as Role;
    if (firstPermissionSlug && lastPermissionSlug) {
        const redirectUrl = postLoginRedirectUrl(firstPermissionSlug, lastPermissionSlug);
        redirect(redirectUrl);
    } else {
      redirect(USER_DASHBOARD_PAGE);
    }
  }
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  )
}
