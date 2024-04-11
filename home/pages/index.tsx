// pages/index.js
import React from 'react'
import { useAuth } from '../context/AuthContext'
import Login from './login'

export default function Home(): JSX.Element {
   const { isAuthenticated } = useAuth()

   if (!isAuthenticated) {
      return <Login />
   }

   return <div>Welcome to the homepage</div>
}
