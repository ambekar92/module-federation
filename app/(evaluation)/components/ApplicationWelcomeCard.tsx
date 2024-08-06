'use client'
import React, { useState } from 'react'
import { Button } from '@trussworks/react-uswds'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { useSessionUCMS } from '@/app/lib/auth'
import CompleteScreening from './modals/complete-screening/CompleteScreening'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { useParams } from 'next/navigation';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { getUserRole } from '@/app/shared/utility/getUserRole';

const ApplicationWelcomeCard = () => {
  const params = useParams<{application_id: string}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)
  const sessionData = useSessionUCMS()
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { trigger } = useCompleteEvalTask()

  // Complete Screening
  const [showCompleteScreeningModal, setShowCompleteScreeningModal] =
    useState(false)
  const [completeScreeningModalProps, setCompleteScreeningModalProps] =
    useState({
      title: 'Complete Screening',
    })

  const handleCompleteScreening = async () => {
    setShowCompleteScreeningModal(true)
  }

  const handleCompleteScreeningCancel = () => {
    setShowCompleteScreeningModal(false)
  }

  const handlePostRequest = async () => {
    setShowCompleteScreeningModal(false)

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

    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
  }

  return (
    <>
      <div className="grid-container">
        <li className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
          <div className="usa-card__container">
            <div className="usa-card__header">
              <h3 className="usa-card__heading">
                Welcome to this Application Review
              </h3>
            </div>
            <div className="margin-top-1">
              <div className="usa-card__body">
                <p>
                 To begin this application review, please click “Start Review” below. Once you begin, the task timer will start tracking the amount of time you spend on this application. <br/> Return to this landing page to view any created and/or sent “Return to Business” items.
                </p>
              </div>
            </div>
            <div className="margin-top-7">
              <div className="usa-card__footer">
                <Button
                  type="button"
                  className="usa-button"
                  onClick={handleCompleteScreening}
                >
                  Complete Screening
                </Button>
              </div>
            </div>
          </div>
        </li>
      </div>

      <CompleteScreening
        userRole={userRole}
        open={showCompleteScreeningModal}
        title={completeScreeningModalProps.title}
        handleAction={handlePostRequest}
        handleCancel={handleCompleteScreeningCancel}
      />
    </>
  )
}

export default ApplicationWelcomeCard
