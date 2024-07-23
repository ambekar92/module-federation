import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QAFormExample from './sandbox/QAFormExample'
import HomePage from './(home)/home/HomePage'

export default function Home() {
  return (
    <>
      <HomePage />
      <ToastContainer />
    </>
  )
}
