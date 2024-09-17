'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import CloseApplication from '@/app/shared/components/modals/CloseApplication'
import { Role } from '@/app/shared/types/role'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import EscalateReviewModal from '../modals/escalate-review/EscalateReviewModal'
import { actionMenuData, ActionMenuIDs } from '../utils/actionMenuData'

import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useCloseApplicationTask } from '@/app/services/mutations/useCloseApplicationTask'
import ChangeTierModal from '@/app/shared/components/modals/ChangeTierModal'
import { ModalRef } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { useCurrentApplication } from '../../firm/useApplicationData'
import CompleteReviewModal from '../modals/complete-review-modal/CompleteReviewModal'
import CompleteScreening from '../modals/complete-screening/CompleteScreening'
import ConfirmVeteranStatusModal from '../modals/confirm-veteran-status-modal/ConfirmVeteranStatusModal'
import MakeApprovalModal from '../modals/make-approval-modal/MakeApprovalModal'
import MakeRecommendationModal from '../modals/make-recommendation/MakeRecommendationModal'
import ProvideOpinionModal from '../modals/provide-opinion/ProvideOpinionModal'
import ReassignUserModal from '../modals/reassign-user-modal/ReassignUserModal'
import { ReassignType } from '../modals/reassign-user-modal/types'
import ReturnToPreviousTaskModal from '../modals/return-to-previous-task-modal/ReturnToPreviousTaskModal'
import { getAnalystQuestionnaires } from './constants'
import { useQuestionnaireState } from './useQuestionnaireState'

const ActionsDropdown = () => {
  const sessionData = useSessionUCMS()
  const { applicationData } = useCurrentApplication();
  const selectRef = useRef<HTMLSelectElement>(null)
  const { application_id } = useParams<{ application_id: string }>()
  const [userId, setUserId] = useState<number | null>(null)
  const [reassignType, setReassignType] = useState<ReassignType | null>(null)
  const { trigger: triggerClose } = useCloseApplicationTask()

  // Modal Refs
  const reassignUserRef = useRef<ModalRef>(null);
  const veteranStatusRef = useRef<ModalRef>(null);
  const closeApplicationRef = useRef<ModalRef>(null);
  const completeReviewRef = useRef<ModalRef>(null);
  const makeApprovalRef = useRef<ModalRef>(null);
  const changeTierRef = useRef<ModalRef>(null);
  const makeRecommendationRef = useRef<ModalRef>(null);
  const returnToPreviousTaskRef = useRef<ModalRef>(null);
  const completeScreeningRef = useRef<ModalRef>(null);
  const escalateReviewRef = useRef<ModalRef>(null);
  const provideOpinionRef = useRef<ModalRef>(null);

  const [selectedValue, setSelectedValue] = useState('')
  const analystQuestionnaires = useMemo(() => {
    if (!applicationData?.program_application) {return [];}
    return getAnalystQuestionnaires(applicationData.program_application);
  }, [applicationData?.program_application]);

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, sessionData.status])

  const { completedQuestionnaires } = useQuestionnaireState(applicationData, analystQuestionnaires);

  const areAllAnalystQuestionnairesCompleted = useMemo(() => {
    return Object.values(completedQuestionnaires).every(value => value === true);
  }, [completedQuestionnaires]);

  const handleCloseAppAction = async (description: any) => {
    try {
      const postData = {
        application_id: parseInt(application_id),
        explanation: description,
        user_id: userId,
      }
      await triggerClose(postData)
      setSelectedValue('Actions')
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id }) + '?name=application-closed'
    } catch (error: any) {
      console.error('Failed to close application', error)
    }
  }

  const handleResetActionDropdownRequest = async () => {
    setSelectedValue('Actions')
  }

  const handleActionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedValue(selectedValue)

    const selectedNumericValue = Number(selectedValue);

    if (selectedNumericValue === ActionMenuIDs.REASSIGN_SCREENER) {
      setReassignType(ReassignType.REASSIGN_SCREENER)
      reassignUserRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.REASSIGN_ANALYST) {
      setReassignType(ReassignType.REASSIGN_ANALYST)
      reassignUserRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.REASSIGN_APPROVER) {
      setReassignType(ReassignType.REASSIGN_APPROVER)
      reassignUserRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.REASSIGN_EXPERT) {
      setReassignType(ReassignType.REASSIGN_EXPERT)
      reassignUserRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.UPDATE_VA_STATUS) {
      veteranStatusRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.CLOSE_APPLICATION) {
      closeApplicationRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.COMPLETE_REVIEW) {
      if (areAllAnalystQuestionnairesCompleted) {
        completeReviewRef.current?.toggleModal()
      } else {
        alert('Please complete all reviewer questionnaires before completing a review.');
        setSelectedValue('Actions');
      }
      return
    }
    if (selectedNumericValue === ActionMenuIDs.MAKE_RECOMMENDATION) {
      if (areAllAnalystQuestionnairesCompleted) {
        makeRecommendationRef.current?.toggleModal()
      } else {
        alert('Please complete all analyst questionnaires before making a recommendation.');
        setSelectedValue('Actions');
      }
      return
    }
    if (selectedNumericValue === ActionMenuIDs.CHANGE_TIER) {
      changeTierRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.MAKE_RECOMMENDATION) {
      makeRecommendationRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.RETURN_TO_ANALYST || selectedNumericValue === ActionMenuIDs.RETURN_TO_REVIEWER || selectedNumericValue === ActionMenuIDs.RETURN_TO_SCREENER) {
      returnToPreviousTaskRef.current?.toggleModal();
      return;
    }
    if(selectedNumericValue === ActionMenuIDs.COMPLETE_SCREENING) {
      completeScreeningRef.current?.toggleModal();
      return;
    }
    if(selectedNumericValue === ActionMenuIDs.ESCALATE_REVIEW) {
      escalateReviewRef.current?.toggleModal();
      return;
    }
    if(selectedNumericValue === ActionMenuIDs.MAKE_APPROVAL) {
      makeApprovalRef.current?.toggleModal();
      return;
    }
    if(selectedNumericValue === ActionMenuIDs.PROVIDE_OPINION) {
      provideOpinionRef.current?.toggleModal();
      return
    }
  }

  const filteredActions = useMemo(() => {
    const userPermissions: Role[] =
      sessionData.data?.permissions?.map((p) => p.slug) || []

    return actionMenuData.filter((action) => {
      if (action.permissions.length === 0) {
        return true
      }
      return action.permissions.some((permission) =>
        userPermissions.includes(permission as Role),
      )
    })
  }, [sessionData.data?.permissions])

  return (
    <div>
      <div className="usa-combo-box margin-bottom-4">
        <select
          className="usa-select"
          name="sort"
          id="sort"
          data-placeholder="sort"
          onChange={handleActionSelect}
          ref={selectRef}
          value={selectedValue}
        >
          <option value="Actions">Actions</option>
          {filteredActions.map((item, index) => (
            <option key={`action-menu-option-${index}`} value={item.id}>
              {item.optionLabel}
            </option>
          ))}
        </select>
      </div>

      <ReassignUserModal
        applicationId={Number(application_id)}
        modalRef={reassignUserRef}
        reassignType={reassignType}
        handleAction={handleResetActionDropdownRequest}
      />

      <CloseApplication
        modalRef={closeApplicationRef}
        title="Close This Application"
        handleAction={handleCloseAppAction}
      />

      <CompleteReviewModal applicationData={applicationData} modalRef={completeReviewRef} processId={applicationData?.process?.id} />

      <MakeApprovalModal applicationData={applicationData} modalRef={makeApprovalRef} processId={applicationData?.process?.id} />

      <ReturnToPreviousTaskModal modalRef={returnToPreviousTaskRef} processId={applicationData?.process?.id} handleAction={handleResetActionDropdownRequest} />

      <ChangeTierModal
        modalRef={changeTierRef}
        handleAction={handleResetActionDropdownRequest}
      />

      <MakeRecommendationModal
        modalRef={makeRecommendationRef}
        handleAction={handleResetActionDropdownRequest}
      />

      <ConfirmVeteranStatusModal modalRef={veteranStatusRef} applicationId={applicationData?.id} handleAction={handleResetActionDropdownRequest} />

      <CompleteScreening
        modalRef={completeScreeningRef}
        processId={applicationData?.process?.id}
        applicationTier={applicationData?.application_tier}
        applicationId={applicationData?.id}
        handleAction={handleResetActionDropdownRequest}
      />

      <ProvideOpinionModal modalRef={provideOpinionRef} processId={applicationData?.process?.id} handleAction={handleResetActionDropdownRequest} />
      <EscalateReviewModal applicationData={applicationData} modalRef={escalateReviewRef} handleAction={handleResetActionDropdownRequest} />
    </div>
  )
}

export default ActionsDropdown
