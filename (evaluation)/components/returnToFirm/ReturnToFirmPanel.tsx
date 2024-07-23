'use client'
import React from 'react'
import ReturnToFirmDataTable from './ReturnToFirmDataTable'
import { useSession } from 'next-auth/react'

function ReturnToFirmPanel() {
  const sessionData = useSession()

  return (
    <div className="grid-container">
      <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
        <div className="usa-card__container">
          <div className="usa-card__header">
            <h3 className="usa-card__heading">
              {sessionData?.data?.permissions[0]?.slug === 'reviewer' ||
              sessionData?.data?.permissions[0]?.slug === 'analyst'
                ? 'Request for Information'
                : sessionData?.data?.permissions[0]?.slug === 'screener'
                  ? 'Return to Firm'
                  : 'Return to Firm'}
            </h3>
          </div>
          <div>
            <div className="usa-card__body">
              <ReturnToFirmDataTable />
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}

export default ReturnToFirmPanel
