'use client'
import ActionMenuModal from '@/app/shared/components/modals/ActionMenuModal'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { ActionMenuIDs, actionMenuData } from '../utils/actionMenuData'
import { useSessionUCMS } from '@/app/lib/auth'
import { Role } from '@/app/shared/types/role'
import RequestExpertModal from '../modals/RequestExpertModal'
import CloseApplication from '@/app/shared/components/modals/CloseApplication'

import { useCloseApplicationTask } from '@/app/services/mutations/useCloseApplicationTask'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { useParams } from 'next/navigation'
import { ModalRef } from '@trussworks/react-uswds'
import ReassignUserModal from '../modals/reassign-user-modal/ReassignUserModal'
import { ReassignType } from '../modals/reassign-user-modal/types'
import CompleteReviewModal from '../modals/complete-review-modal/CompleteReviewModal'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import MakeApproval from '../modals/make-approval-dialog/MakeApproval'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import ConfirmVeteranStatusModal from '../modals/confirm-veteran-status-modal/ConfirmVeteranStatusModal'
import ReturnToPreviousTaskModal from '../modals/return-to-previous-task-modal/ReturnToPreviousTaskModal'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import ChangeTierModal from '@/app/shared/components/modals/ChangeTierModal'
import MakeRecommendationModal from '@/app/shared/components/modals/MakeRecommendationModal'

const ActionsDropdown = () => {
  const sessionData = useSessionUCMS()
  const params = useParams<{ application_id: string }>()
  const { applicationData } = useApplicationData(
    ApplicationFilterType.id,
    params.application_id,
  )
  const selectRef = useRef<HTMLSelectElement>(null)
  const { application_id } = useParams<{ application_id: string }>()
  const [userId, setUserId] = useState<number | null>(null)
  const [reassignType, setReassignType] = useState<ReassignType>(
    ReassignType.REASSIGN_SCREENER,
  )
  const { trigger: triggerClose } = useCloseApplicationTask()
  const { trigger: triggerReview } = useCompleteEvalTask()
  const reassignScreenerRef = useRef<ModalRef>(null)
  const veteranStatusRef = useRef<ModalRef>(null)
  const closeApplicationRef = useRef<ModalRef>(null)
  const completeReviewRef = useRef<ModalRef>(null)
  const makeApprovalRef = useRef<ModalRef>(null)
  const changeTierRef = useRef<ModalRef>(null)
  const makeRecommendationRef = useRef<ModalRef>(null)
  const retrnToPreviousTaskRef = useRef<ModalRef>(null);
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, sessionData.status])

  const [showModal, setShowModal] = useState(false)
  const [actionModalProps, setActionModalProps] = useState({
    title: '',
    actionLabel: '',
    userIdType: '',
    modalType: 'default',
    description: '',
    inputDescription: '',
    steps: [],
    id: 0,
    table: {
      step: -1,
      tableHeader: [],
      tableRows: [],
    },
    signature: {
      step: -1,
      description: '',
    },
    upload: false,
    uploadStep: -1,
    notes: {
      step: -1,
      rows: [],
    },
    approvalLetter: {
      step: -1,
      rows: [],
    },
  })

  const handleMakeApprovalPostRequest = async () => {
    setSelectedValue('Actions')

    try {
      const postData = {
        process_id: applicationData?.process.id || 1,
        data: {
          approved: true,
          tier: applicationData?.application_tier || 1,
        },
      }
      await triggerReview(postData)
    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      console.error('Network Error: ', error)
    }
  }

  const handleCloseAppAction = async (description: any) => {
    try {
      const postData = {
        application_id: application_id,
        explanation: description,
        user_id: userId,
      }
      const response = await triggerClose(postData)
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

  const handleAction = () => {
    setShowModal(false)
  }

  const resetModalType = () => {
    setActionModalProps((prevState) => ({
      ...prevState,
      modalType: 'default',
    }))
  }

  const handleCancel = () => {
    setShowModal(false)
    resetModalType()
    if (selectRef.current) {
      selectRef.current.selectedIndex = 0
    }
  }

  const handleActionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedValue(selectedValue)

    const selectedNumericValue = Number(selectedValue);

    if (selectedNumericValue === ActionMenuIDs.REASSIGN_SCREENER) {
      setReassignType(ReassignType.REASSIGN_SCREENER)
      reassignScreenerRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.REASSIGN_ANALYST) {
      setReassignType(ReassignType.REASSIGN_ANALYST)
      reassignScreenerRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.REASSIGN_APPROVER) {
      setReassignType(ReassignType.REASSIGN_APPROVER)
      reassignScreenerRef.current?.toggleModal()
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
      completeReviewRef.current?.toggleModal()
      return
    }
    if (selectedNumericValue === ActionMenuIDs.MAKE_APPROVAL) {
      makeApprovalRef.current?.toggleModal()
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
      retrnToPreviousTaskRef.current?.toggleModal();
      return;
    }

    const modalProp = actionMenuData.find(
      (item) => item.id === selectedNumericValue,
    ) as any;
    if (modalProp) {
      setActionModalProps({
        title: modalProp?.title || '',
        actionLabel: modalProp?.actionLabel || '',
        userIdType: modalProp?.userIdType || '',
        modalType: modalProp?.modalType || 'default',
        description: modalProp?.description || '',
        inputDescription: modalProp?.inputDescription || '',
        steps: modalProp?.steps || [],
        id: modalProp?.id,
        table: {
          step: modalProp?.table?.step,
          tableHeader: modalProp?.table?.tableHeader || [],
          tableRows: modalProp?.table?.tableRows || [],
        },
        signature: {
          step: modalProp?.signature?.step,
          description: modalProp?.signature?.description || '',
        },
        upload: modalProp?.upload,
        uploadStep: modalProp?.uploadStep,
        notes: {
          step: modalProp?.notes.step,
          rows: modalProp?.notes.rows || [],
        },
        approvalLetter: {
          step: modalProp?.approvalLetter.step,
          rows: modalProp?.approvalLetter.rows || [],
        },
      })
      setShowModal(true)
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

  const renderModal = () => {
    switch (actionModalProps.modalType) {
      case 'requestExpert':
        return (
          <RequestExpertModal handleCancel={handleCancel} open={showModal} />
        )
      case 'default':
      case 'textarea':
      case 'confirmVeteranStatus':
      case 'reassign':
        return (
          <ActionMenuModal
            open={showModal}
            title={actionModalProps.title}
            actionLabel={actionModalProps.actionLabel}
            userIdType={actionModalProps.userIdType}
            modalType={actionModalProps.modalType}
            description={actionModalProps.description}
            inputDescription={actionModalProps.inputDescription}
            steps={actionModalProps.steps}
            id={actionModalProps.id}
            table={actionModalProps.table as any}
            signature={actionModalProps.signature}
            upload={actionModalProps.upload}
            uploadStep={actionModalProps.uploadStep}
            notes={actionModalProps.notes as any}
            approvalLetter={actionModalProps.approvalLetter as any}
            handleAction={handleAction}
            handleCancel={handleCancel}
            process_id={0}
          />
        )
      default:
        return null
    }
  }

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
      {renderModal()}

      <ReassignUserModal
        applicationId={Number(application_id)}
        modalRef={reassignScreenerRef}
        reassignType={reassignType}
      />

      <CloseApplication
        modalRef={closeApplicationRef}
        title="Close This Application"
        handleAction={handleCloseAppAction}
      />

      <CompleteReviewModal  modalRef={completeReviewRef} />

      <MakeApproval
        modalRef={makeApprovalRef}
        title="Make an Approval"
        handleAction={handleMakeApprovalPostRequest}
      />

      <ReturnToPreviousTaskModal modalRef={retrnToPreviousTaskRef} processId={applicationData?.process?.id} />

      <ChangeTierModal
        modalRef={changeTierRef}
        handleAction={handleResetActionDropdownRequest}
      />
      <MakeRecommendationModal
        modalRef={makeRecommendationRef}
        handleAction={handleResetActionDropdownRequest}
      />
      <ConfirmVeteranStatusModal modalRef={veteranStatusRef} processId={applicationData?.process?.id} />
    </div>
  )
}

export default ActionsDropdown
