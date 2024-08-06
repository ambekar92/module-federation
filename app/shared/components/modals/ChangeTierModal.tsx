'use client'

import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'
import styles from './Modals.module.scss'
import { useParams } from 'next/navigation'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { useUpdateApplicationTask } from '@/app/services/mutations/useUpdateApplicationTask'
import { useSessionUCMS } from '@/app/lib/auth'
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'

interface ChangeTierModalProps {
  modalRef: RefObject<ModalRef>
  handleAction: () => void
}

const ChangeTierModal: React.FC<ChangeTierModalProps> = ({
  modalRef,
  handleAction,
}) => {
  const sessionData = useSessionUCMS()
  const params = useParams<{ application_id: string }>()
  const { applicationData } = useApplicationData(
    ApplicationFilterType.id,
    params.application_id,
  )

  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const { trigger: triggerChangeTier } = useCreateNote()
  const { trigger: triggerUpdateApp } = useUpdateApplicationTask()

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, sessionData.status])

  const handleChangeTierPostRequest = async () => {
    try {
      const putData = {
        application_id: Number(params.application_id) || 0,
        signed_by_id: userId || 0,
        application_tier: applicationData?.tier || '0',
      }

      const notePayload: CreateNotePayload = {
        application_id: Number(params.application_id) || 0,
        description: description,
        subject: `Change Tier`,
        user_id: userId || 0,
      }
      handleAction()
      await triggerChangeTier(notePayload)
      await triggerUpdateApp(putData)

      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData.id }) + '?name=changed-tier'
    } catch (error: any) {
      console.error('Failed to complete evaluation task', error)
      console.error('Network Error: ', error)
      return
    }
  }

  const handleActionSubmit = async () => {
    handleChangeTierPostRequest()
    onClose()
  }

  const onClose = () => {
    modalRef.current?.toggleModal()
  }

  return (
    <>
      <Modal
        ref={modalRef}
        forceAction
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
        isLarge
        renderToPortal={false}
        id="action-modal"
      >
        <ModalHeading id="action-modal-heading">
          <Label htmlFor="action-modal">
            <h2 className="text-bold">Change Tier</h2>
          </Label>
        </ModalHeading>

        <div className="margin-top-4">
          <p className={`${styles['field-title']}`}>By clicking “Submit” below, you are changing the routing method of this application and it will get reassigned to the appropriate person.</p>
          <p className={`${styles['field-title']}`}>
            Provide more information about why you are changing the tier *
          </p>
          <textarea
            className={`${styles['textarea-field']}`}
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left"
              onClick={handleActionSubmit}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="float-left"
              onClick={onClose}
              outline
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ChangeTierModal
