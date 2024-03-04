// profile.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from './navbar'

export default function Profile(){
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  return (
    <>
      <Navbar />
      <div className='main'>
        <h1>Profile Protected Page</h1>
        <p>User: <b>{session?.user?.name}</b></p>
      </div>
    </>
  )
}