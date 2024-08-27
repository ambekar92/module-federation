'use client'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Productivity from './Productivity'

const ProductivityProvider = () => {
  const sessionData = getSession() // expect to get a role from this
  const [isSupervisor, setIsSupervisor] = useState<boolean> (false);

  useEffect(() => {
    setIsSupervisor(true)
  }, [])

  return (
    <Productivity />
  )
}

export default ProductivityProvider
