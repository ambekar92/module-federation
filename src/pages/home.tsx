// home.tsx
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Navbar from './navbar'
import { toast } from 'react-toastify'

export default function Home(): JSX.Element {
   const { data: session, status } = useSession()
   const router = useRouter()

   useEffect(() => {
      if (status !== 'authenticated') {
         void router.push('/login')
      }
   }, [session, status, router])

   useEffect(() => {
      if (session?.user?.email != null) {
         toast.success(`Welcome ${session?.user?.email}`, {
            theme: 'colored'
         })
      }
   }, [])


   return (
      <>
         <Navbar />
         <div className="main">
            <h1>HOME Protected Page</h1>
            <p>
               You can view this page because you are signed in as user: <b>{session?.user?.email}</b>
            </p>
         </div>
      </>
   )
}
