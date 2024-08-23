// Todo need to find a better way not to include useApplicationData everywhere to check view permission
'use client'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { UPDATE_APPLICATION_STATE } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { axiosInstance } from '@/app/services/axiosInstance';
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { Button } from '@trussworks/react-uswds';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const ApplicationPanelLanding = () => {
  const params = useParams<{application_id: string}>();
  const { applicationData, mutate } = useApplicationData(ApplicationFilterType.id, params.application_id)
  const [showButton, setShowButton] = useState(true);
  const sessionData = useSessionUCMS()
  const { trigger } = useCompleteEvalTask()

  if(!applicationData?.process || !applicationData.process.data) {
    return
  }
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const handleCompleteTask = async () => {
    try {
      const postData = {
        process_id: applicationData?.process?.id || 1,
        data: {
          review_start: true
        },
      }
      await trigger(postData)
      const updateAppStateData = {
        application_id: applicationData?.id,
        state_action: 'under_review',
        user_id: sessionData.data.user_id,
        subject: 'Updated for evaluation review',
        description: 'Updated for evaluation review'
      }
      // TODO: Find a better solution to deal with the delay
      await axiosInstance.put(UPDATE_APPLICATION_STATE, updateAppStateData);
      await mutate();
      setShowButton(false)
    } catch (error: any) {
      // Error handled lol -KJ
      return
    }
  }

  const getHeaderText = () => {
    switch (userRole) {
      case 'reviewer':
      case 'analyst':
      case 'screener':
        return 'Welcome to this Application Review';
      default:
        return 'Application Review';
    }
  }

  const getTaskText = () => {
    switch (userRole) {
      case 'reviewer':
      case 'analyst':
        return 'Your application review has not been submitted. Use the options in the left-navigation to continue your review. Any created “Request for Information” and their status can be found on this page.'
      case 'screener':
        return 'To begin this application review, please click “Start Review below. Once you begin, the task timer will start tracking the amount of time you spend on this application. Return to this landing page to view any created and/or sent “Return to Business” items.'
      case 'default':
        return 'Your application review has not been submitted. Use the options in the left-navigation to continue your review. Any created “Return to Business” and their status can be found on this page.'
    }
  }

  const getButtonText = () => {
    switch (userRole) {
      case 'reviewer':
      case 'analyst':
        return 'Start Review';
      case 'screener':
        return 'Start Review';
      default:
        return 'Start Review';
    }
  }

  if(!applicationData || !sessionData || userRole === 'default') {
    return
  }
  return (
    <>
      <div className="grid-container">
        <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
          <div className="usa-card__container">
            <div className="usa-card__header">
              <h3 className="usa-card__heading">
                {getHeaderText()}
              </h3>
            </div>
            <div className="margin-top-1">
              <div className="usa-card__body">
                <p>
                  {getTaskText()}
                </p>
              </div>
            </div>
            {(
              (userRole === 'screener' && applicationData.workflow_state === 'submitted' && applicationData?.process.data?.review_start === false && showButton) ||
              (userRole === 'analyst' && applicationData?.process.data.step === 'analyst'  && applicationData?.process.data?.review_start === false && showButton)
            ) && (
              <div className="margin-top-2">
                <div className="usa-card__footer">
                  <Button
                    type="button"
                    className="usa-button"
                    onClick={handleCompleteTask}
                  >
                    {getButtonText()}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </li>
      </div>
    </>
  )
}

export default ApplicationPanelLanding
