'use client'

import React from 'react'
import {
  ButtonGroup,
  Modal,
  ModalHeading,
  ModalFooter,
  Button,
  Label,
} from '@trussworks/react-uswds'
import styles from '../ReturnToFirm.module.scss'

interface ConfirmationModalProps {
  open: boolean
  handleSend: (data: any) => void
  handleCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleSend,
  handleCancel,
}) => {
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
              <h3>Are you sure you want to delete this RTF?</h3>
            </Label>
          </ModalHeading>

          <div className={styles['modalBodaySpace']}>
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left usa-button"
                onClick={() => handleSend("yes")}
              >
                Yes, Delete
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

export default ConfirmationModal
