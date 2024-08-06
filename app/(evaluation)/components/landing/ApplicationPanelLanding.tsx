'use client'
import React, { useState } from 'react'
import { Button } from '@trussworks/react-uswds'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { useSessionUCMS } from '@/app/lib/auth'
import CompleteScreening from '../modals/complete-screening/CompleteScreening'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { useParams } from 'next/navigation';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';

const ApplicationPanelLanding = () => {
  const params = useParams<{application_id: string}>();
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id)
  const sessionData = useSessionUCMS()
  const { trigger } = useCompleteEvalTask()

  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const [showModal, setShowModal] = useState(false)
  // const [modalProps, setModalProps] = useState({
  //   title: 'Complete Task',
  // })
  const modalProps = {title: 'Complete Task'}

  const handleCompleteTask = async () => {
    setShowModal(true)
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  const handlePostRequest = async () => {
    setShowModal(false)
    try {
      const postData = {
        process_id: applicationData?.process.id || 1,
        data: {
          approved: true,
          create_return_to_firm_note: false,
          tier: applicationData?.application_tier || 1,
        },
      }
      const response = await trigger(postData)
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData?.id }) + '?name=completed-screening'
    } catch (error: any) {
      // console.error('Network Error: ', error)
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
        return 'To begin this application review, please click “Start Review” below. Once you begin, the task timer will start tracking the amount of time you spend on this application. Return to this landing page to view any created and/or sent “Request for Information” items.'
      case 'screener':
        return 'Your application review has not been submitted. Use the options in the left-navigation to continue your review. Any created “Return to Business” and their status can be found on this page. '
      case 'default':
        return 'Your application review has not been submitted. Use the options in the left-navigation to continue your review. Any created “Return to Business” and their status can be found on this page.'
    }
  }

  const getButtonText = () => {
    switch (userRole) {
      case 'reviewer':
      case 'analyst':
        return 'Complete Review';
      case 'screener':
        return 'Start Screening';
      default:
        return 'Start Review';
    }
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
            <div className="margin-top-7">
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
          </div>
        </li>
      </div>
      <CompleteScreening
        userRole={userRole}
        open={showModal}
        title={modalProps.title}
        handleAction={handlePostRequest}
        handleCancel={handleModalCancel}
      />
    </>
  )
}

export default ApplicationPanelLanding
