'use client'

import { useCurrentApplication } from '@/app/(evaluation)/firm/useApplicationData'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { useChangeTier } from '@/app/services/mutations/useChangeTier'
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React, { RefObject, useEffect, useState } from 'react'
import styles from './Modals.module.scss'

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
  const { applicationData } = useCurrentApplication();

  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const { trigger: triggerCreateNote } = useCreateNote()
  const { trigger: triggerChangeTier } = useChangeTier()

  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData?.data?.user_id) {
      setUserId(sessionData.data.user_id)
    }
  }, [sessionData, sessionData.status])

  const handleChangeTierPostRequest = async () => {
    if(!params.application_id || !userId) {return}
    try {
      const putData = {
        application_id: Number(params.application_id) || null,
        application_tier: applicationData?.application_tier || '0',
      }

      const notePayload: CreateNotePayload = {
        application_id: Number(params.application_id),
        description: description,
        subject: 'Change Tier',
        user_id: userId,
      }
      handleAction()
      await triggerCreateNote(notePayload)
      await triggerChangeTier(putData)

      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData?.id }) + '?name=changed-tier'
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
        <button
          type="button"
          className="usa-button usa-modal__close"
          aria-label="Close this window"
          data-close-modal
          onClick={onClose}
        >
            x
        </button>
      </Modal>
    </>
  )
}

export default ChangeTierModal
