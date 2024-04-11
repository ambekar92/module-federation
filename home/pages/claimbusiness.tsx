// claimbusiness.tsx

import React from 'react'
import { useAuth } from '../context/AuthContext'
import Login from './login'
import Navbar from '../components/layout/Navbar'
import ClaimBusinessForm from '../components/Forms/ClaimBusinessForm'

export default function ClaimBusiness(): JSX.Element {
   const { isAuthenticated, session } = useAuth()

   if (!isAuthenticated) return <Login redirect="/claimbusiness" />

   return (
      <>
         <Navbar />
         <h1>Claim Your Business</h1>
         <ClaimBusinessForm />
      </>
   )
}
