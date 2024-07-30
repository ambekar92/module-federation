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
import CompleteReview from '../modals/actionDropdownModal/CompleteReview'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import MakeApproval from '../modals/actionDropdownModal/MakeApproval'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

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

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, sessionData.status])

  const [selectedValue, setSelectedValue] = useState('')

  // Make an Approval
  const [showMakeApprovalModal, setShowMakeApprovalModal] = useState(false)
  const [makeApprovalProps, setMakeApprovalProps] = useState({
    title: 'Make an Approval',
  })

  const handleMakeApprovalCancel = () => {
    setShowMakeApprovalModal(false)
  }

  const handleMakeApprovalPostRequest = async () => {
    setShowMakeApprovalModal(false)
    setSelectedValue('Actions')

    try {
      const postData = {
        process_id: applicationData?.process.id || 1,
        data: {
          approved: true,
          tier: applicationData?.tier || 1,
        },
      }
      const response = await triggerReview(postData)
    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      console.error('Network Error: ', error)
      return
    }
  }

  // Complete Review
  const [showCompleteReviewModal, setShowCompleteReviewModal] = useState(false)
  const [completeReviewlProps, setCompleteReviewlProps] = useState({
    title: 'Complete Review',
  })

  const handleCompleteReviewCancel = () => {
    setShowCompleteReviewModal(false)
  }

  const handlePostRequest = async () => {
    setShowCompleteReviewModal(false)
    setSelectedValue('Actions')

    try {
      const postData = {
        process_id: applicationData?.process.id || 1,
        data: {
          approved: true,
          tier: applicationData?.tier || 1,
        },
      }
      const response = await triggerReview(postData)
    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      console.error('Network Error: ', error)
      return
    }
  }

  // Close This Application
  const [showCloseAppModal, setShowCloseAppModal] = useState(false)
  const [closeAppModalProps, setCloseAppModalProps] = useState({
    title: 'Close This Application',
  })

  const handleCloseAppAction = async (description: any) => {
    try {
      const postData = {
        application_id: application_id,
        explanation: description,
        user_id: userId,
      }
      const response = await triggerClose(postData)
      setSelectedValue('Actions')
      alert(response?.message)
    } catch (error: any) {
      console.error('Network Error: ', error)
      return
    }
    setShowCloseAppModal(false)
  }

  const handleCloseAppCancel = () => {
    setShowCloseAppModal(false)
  }

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

  const handleActionSelect = (e: any) => {
    const selectedValue = Number(e.target.value)
    /*eslint-disable eqeqeq*/
    const modalProp = actionMenuData.find(
      (item) => item.id == Number(e.target.value),
    ) as any

    if (selectedValue === ActionMenuIDs.REASSIGN_SCREENER) {
      setReassignType(ReassignType.REASSIGN_SCREENER)
      reassignScreenerRef.current?.toggleModal()
      return
    }
    if (selectedValue === ActionMenuIDs.REASSIGN_ANALYST) {
      setReassignType(ReassignType.REASSIGN_ANALYST)
      reassignScreenerRef.current?.toggleModal()
      return
    }

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
    } else {
      if (e.target.value === 'Close Application') {
        setShowCloseAppModal(true)
        setSelectedValue(e.target.value)
      }
      if (e.target.value === 'Complete Review') {
        setShowCompleteReviewModal(true)
        setSelectedValue(e.target.value)
      }
      if (e.target.value === 'Make an Approval') {
        setShowMakeApprovalModal(true)
        setSelectedValue(e.target.value)
      }
    }
  }

  const filteredActions = useMemo(() => {
    const userPermissions: Role[] =
      sessionData.data?.permissions?.map((p) => p.slug) || []
    // const userPermissions = ['analyst_low_criteria']

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
          <option value="Close Application">Close Application</option>
          <option value="Complete Review">Complete Review</option>
          <option value="Make an Approval">Make an Approval</option>
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
        open={showCloseAppModal}
        title={closeAppModalProps.title}
        handleAction={handleCloseAppAction}
        handleCancel={handleCloseAppCancel}
        description={''}
      />
      <CompleteReview
        open={showCompleteReviewModal}
        title={completeReviewlProps.title}
        handleAction={handlePostRequest}
        handleCancel={handleCompleteReviewCancel}
      />
      <MakeApproval
        open={showMakeApprovalModal}
        title={makeApprovalProps.title}
        handleAction={handleMakeApprovalPostRequest}
        handleCancel={handleMakeApprovalCancel}
      />
    </div>
  )
}

export default ActionsDropdown
