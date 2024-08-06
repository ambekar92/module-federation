import React from 'react'
import './globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QAFormExample from './sandbox/QAFormExample'
//import HomePage from './(home)/home/HomePage'
import LandingPage from './(home)/home-2/components/LandingPage'

export default function Home() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  )
}
