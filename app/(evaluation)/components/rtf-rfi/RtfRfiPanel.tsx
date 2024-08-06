'use client'
import React from 'react'
import RtfRtiDataTable from './RtfRfiDataTable'
import { useSession } from 'next-auth/react'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { useRtfRfiData } from './useRtfRfiData'
import { useParams } from 'next/navigation'

function RtfRtiPanel() {
  const sessionData = useSession()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const params = useParams<{application_id: string}>()
  const { draftData, reasonCodes, isLoading, hasError } = useRtfRfiData(params.application_id, userRole);

  const getHeaderText = () => {
    switch (userRole) {
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
              <RtfRtiDataTable
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

export default RtfRtiPanel
