'use client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './(home)/home-2/components/LandingPage'
import './globals.scss'

export default function Home() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  )
}
