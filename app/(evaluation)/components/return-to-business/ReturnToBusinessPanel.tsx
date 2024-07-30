'use client'
import React from 'react'
import ReturnToBusinessDataTable from './ReturnToBusinessDataTable'
import { useSession } from 'next-auth/react'
import { getUserRole } from '@/app/shared/utility/getUserRole'

function ReturnToBusinessPanel() {
  const sessionData = useSession()
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const getHeaderText = () => {
    switch (userRole) {
      case 'reviewer':
      case 'analyst':
        return 'Request for Information';
      case 'screener':
        return 'Return to Business';
      default:
        return 'Request for Information';
    }
  }
  return (
    <div className="grid-container">
      <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
        <div className="usa-card__container">
          <div className="usa-card__header">
            <h3 className="usa-card__heading">
              {getHeaderText()}
            </h3>
          </div>
          <div>
            <div className="usa-card__body">
              <ReturnToBusinessDataTable />
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}

export default ReturnToBusinessPanel
