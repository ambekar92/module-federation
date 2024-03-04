// client-auth.tsx
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ClientSideAuth(){
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {    
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <>
        Loading...
      </>
    )
  }

  return (
    <>
      <div className="container">
        <div className="card">
          <h3>Hi, Welcome!</h3>
          <p>please click on SignIn to Authenticate with Okta.</p>
          <form>
            <button onClick={() => signIn()} className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    </>
  )
}