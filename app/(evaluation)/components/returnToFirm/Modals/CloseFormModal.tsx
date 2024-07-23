'use client'

import React, { useState, useEffect } from 'react'
import {
  ButtonGroup,
  Modal,
  ModalHeading,
  ModalFooter,
  Button,
  Label,
  Select,
  Textarea,
} from '@trussworks/react-uswds'
import styles from '../ReturnToFirm.module.scss'
import { useSession } from 'next-auth/react'

interface CloseFormModalProps {
  open: boolean
  handleSend: (description: any) => void
  handleCancel: () => void
  selectedData: any
}

const EditFormModal: React.FC<CloseFormModalProps> = ({
  open,
  handleSend,
  handleCancel,
  selectedData,
}) => {
  const sessionData = useSession()
  const [description, setDescription] = useState('')
  const handleSave = () => {
    handleSend(description)
  }

  useEffect(() => {
    setDescription(selectedData[0]?.description || '')
  }, [selectedData])

  return (
    <>
      {open === true && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="invite-modal"
        >
          <ModalHeading id="invite-modal-heading">
            <Label htmlFor="session-modal" className="text-bold">
              <h3>
              Are you sure You want to close this
                {sessionData?.data?.permissions[0]?.slug === 'reviewer' ||
                sessionData?.data?.permissions[0]?.slug === 'analyst'
                  ? ' RFI?'
                  : sessionData?.data?.permissions[0]?.slug === 'screener'
                    ? ' RTF?'
                    : ' RTF?'}
              </h3>
            </Label>
          </ModalHeading>

          <div className={styles['modalBody']}>
            <Label htmlFor="session-modal">
              Provide a Reason for Close *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left usa-button"
                onClick={handleSave}
              >
                Close
                {sessionData?.data?.permissions[0]?.slug === 'reviewer' ||
                sessionData?.data?.permissions[0]?.slug === 'analyst'
                  ? ' RFI'
                  : sessionData?.data?.permissions[0]?.slug === 'screener'
                    ? ' RTF'
                    : ' RTF'}
              </Button>
              <span
                className={`${styles['actionButton']}`}
                onClick={handleCancel}
              >
                Cancel
              </span>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default EditFormModal
