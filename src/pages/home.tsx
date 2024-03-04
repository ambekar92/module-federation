// home.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from './navbar'

export default function Home(){
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
                <h1>HOME Protected Page</h1>
                <p>You can view this page because you are signed in as user: <b>{session?.user?.email}</b></p>
            </div>
            
        </>
    )
}