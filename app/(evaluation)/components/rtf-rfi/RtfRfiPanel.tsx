'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { useParams } from 'next/navigation'
import RtfRtiDataTable from './tables/RtfRfiDataTable'
import { useRtfRfiDraftData } from './hooks/useRtfRfiDraftData'
import { useRtfRequestData } from './hooks/useRtfRequestData'
import SentRtfTable from './tables/SentRtfTable'
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems'

function RtfRtiPanel() {
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const params = useParams<{application_id: string}>()
  const { draftData, reasonCodes, isLoading, hasError, mutate: mutateDraft } = useRtfRfiDraftData(params.application_id, userRole);
  const { requestData, hasError: hasRfiError, mutate: mutateRequest } = useRtfRequestData(params.application_id, userRole);

  const getHeaderText = () => {
    switch (userRole) {
      case 'screener':
        return 'Return to Business';
      default:
        return 'Request for Information';
    }
  }

  if (isLoading) {
    return null;
  }

  if (hasError || hasRfiError) {
    return <div>Error loading data</div>
  }

  const isRequestDataValid = Array.isArray(requestData) && requestData.length > 0;
  const isDraftDataValid = draftData && Object.keys(draftData).length > 0;

  if (!isDraftDataValid && !isRequestDataValid) {
    return null;
  }

  return (
    <div className="grid-container">
      <div className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
        <div className="usa-card__container">
          <div className="usa-card__header">
            <h3 className="usa-card__heading">
              {getHeaderText()}
            </h3>
          </div>
          <div>
            {isDraftDataValid && reasonCodes && (
              <div className="usa-card__body">
                <RtfRtiDataTable
                  draftData={draftData}
                  reasonCodes={reasonCodes}
                  mutateDraft={mutateDraft}
                  mutateRequest={mutateRequest}
                />
              </div>
            )}
            {isRequestDataValid && reasonCodes && (
              <div className="usa-card__body">
                <SentRtfTable
                  requestData={requestData as IRTFRequestItem[]}
                  reasonCodes={reasonCodes}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RtfRtiPanel
