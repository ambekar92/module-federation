import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QAFormExample from '../sandbox/QAFormExample'

export default async function Home() {
  return (
    <>
      <QAFormExample />
      <ToastContainer />
    </>
  )
}
