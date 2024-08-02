'use client'
import React from 'react'
import ReturnToBusinessDataTable from './ReturnToBusinessDataTable'
import { useSession } from 'next-auth/react'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { useReturnToBusinessData } from './useReturnToBusinessData'
import { useParams } from 'next/navigation'

function ReturnToBusinessPanel() {
  const sessionData = useSession()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const params = useParams<{application_id: string}>()
  const { draftData, reasonCodes, isLoading, hasError } = useReturnToBusinessData(params.application_id);

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
  if (isLoading || hasError || !draftData || !reasonCodes) {
    return null;
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
              <ReturnToBusinessDataTable
                draftData={draftData}
                reasonCodes={reasonCodes}
              />
            </div>
          </div>
        </div>
      </li>
    </div>
  )
}

export default ReturnToBusinessPanel
