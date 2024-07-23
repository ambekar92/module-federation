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
  Textarea
} from '@trussworks/react-uswds'
import styles from '../ReturnToFirm.module.scss'
import { useSession } from 'next-auth/react'

interface EditFormModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleSend: (description: any) => void
  handleCancel: () => void
  selectedData: any
}

const EditFormModal: React.FC<EditFormModalProps> = ({
  open,
  handleSend,
  handleCancel,
  selectedData
}) => {
  const sessionData = useSession()
  const [description, setDescription] = useState('');
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
              <h3>Edit This
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
              What&aposs your reason? *
            </Label>
            <Select id="input-select" name="input-select" className={styles['select-width']}>
              <option>{selectedData[0].reason}</option>
            </Select>

            <Label htmlFor="session-modal">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles['textarea']}
            />
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left usa-button"
                onClick={handleSave}
              >
                Save
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
