import ClientFirmUserDashboard from '@/app/(user)/dashboard/components/ClientFirmUserDashboard'
import React from 'react'

const page = () => {
  return (
    <div>
        <ClientFirmUserDashboard internalUser={true} />
    </div>
  )
}

export default page