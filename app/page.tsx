import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QAFormExample from './sandbox/QAFormExample'

export default function Home() {
  return (
    <>
      <h1>Welcome to the Homepage!</h1>
      <QAFormExample />
      <ToastContainer />
    </>
  )
}
