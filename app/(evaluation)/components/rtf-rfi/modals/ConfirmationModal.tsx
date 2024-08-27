'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import React from 'react'
import styles from '../RtfRfi.module.scss'
import { Role } from '@/app/shared/types/role'

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
  const sessionData = useSessionUCMS()

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
              <h3>Are you sure you want to delete this
                {sessionData?.data?.permissions[0]?.slug === Role.REVIEWER ||
              	sessionData?.data?.permissions[0]?.slug === 'analyst'
                  ? ' RFI?'
                  : sessionData?.data?.permissions[0]?.slug === 'screener'
                    ? ' RTB?'
                    : ' RTB?'}
              </h3>
            </Label>
          </ModalHeading>

          <div className={styles['modalBodaySpace']}>
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left usa-button"
                onClick={() => handleSend('yes')}
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
