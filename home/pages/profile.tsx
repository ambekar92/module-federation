import React from 'react'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import Login from './login'

export default function Profile() {
   const { isAuthenticated, session } = useAuth()

   if (!isAuthenticated) return <Login redirect="/profile" />
   return (
      <>
         <Navbar />
         <div className="main">
            <h1>Profile Protected Page</h1>
            <p>
               User: <b>{session?.user?.name}</b>
            </p>
         </div>
      </>
   )
}
