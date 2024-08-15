'use client'

import { SamEntity } from '@/app/services/types/application-service/Application';
import { useApplicationData } from '../firm/useApplicationData';
import { useParams } from 'next/navigation';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import humanizeString from 'humanize-string';

function HeaderPanel() {
  const params = useParams<{application_id: string}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const samEntity = applicationData?.sam_entity ?? null;
  const stateOrder = ['submitted', 'under_review', 'review', 'final_review'];

  function getStepIndicatorClass(currentState: string | null, stepState: string): string {
    if (currentState === null && stepState === 'submitted') {
      return 'usa-step-indicator__segment--current';
    }

    if (currentState === null) {
      return '';
    }

    const currentIndex = stateOrder.indexOf(currentState);
    const stepIndex = stateOrder.indexOf(stepState);

    if (currentState === stepState) {
      return 'usa-step-indicator__segment--current';
    } else if (stepIndex < currentIndex) {
      return 'usa-step-indicator__segment--complete';
    }
    return '';
  }

  return (
    <>
      <div className="grid-container margin-top-2">
        <h1 className="margin-top-0">{samEntity?.legal_business_name ?? 'N/A'}</h1>

        <div className="grid-row margin-bottom-4">
          <div className="grid-col-3 margin-right-3">
            <p className="margin-0 text-bold">Address</p>
            <div className="margin-top-1">
              <span>
                {getAddress(samEntity)}
              </span>
            </div>
          </div>
          <div className="grid-col-2 margin-right-3">
            <p className="margin-0 text-bold">Business type</p>
            <div className="margin-top-1">
              <span>{applicationData && applicationData?.entity?.structure}</span>
            </div>
          </div>
          <div className="grid-col-2 margin-right-3">
            <p className="margin-0 text-bold">Status</p>
            <div className="margin-top-1" style={{textTransform: 'capitalize'}}>
              <span>{applicationData && humanizeString(applicationData?.workflow_state)}</span>
            </div>
          </div>
          <div className="grid-col-3 margin-right-3">
            <p className="margin-0 text-bold">Assigned To</p>
            <div className="margin-top-1">
              <span>{applicationData?.assigned_to ?? 'N/A'}</span>
            </div>
          </div>
        </div>
        {applicationData && (
          <div
            className="usa-step-indicator usa-step-indicator--counters-sm bg-gray-5"
            aria-label="progress"
          >
            <ol className="usa-step-indicator__segments">
              {stateOrder.map((step) => (
                <li key={step} className={`usa-step-indicator__segment ${getStepIndicatorClass(applicationData?.progress, step)}`}>
                  <span className="usa-step-indicator__segment-label font-ui-2xs">
                    {step === 'submitted' ? 'Screening' :  step === 'under_review' ? 'Analysis' : humanizeString(step)}
                    <span className="usa-sr-only">
                      {getStepIndicatorClass(applicationData?.progress, step).includes('current')
                        ? 'current step'
                        : getStepIndicatorClass(applicationData?.progress, step).includes('complete')
                          ? 'complete'
                          : 'not completed'}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  )
}

export default HeaderPanel;

function getAddress(samEntity: SamEntity | null) {
  if (!samEntity) {return 'N/A'}
  return `${samEntity.physical_addr_1} ${samEntity.physical_addr_2} ${samEntity.physical_city} ${ samEntity.physical_state_or_province} ${samEntity.physical_zip_code_5}`
}
