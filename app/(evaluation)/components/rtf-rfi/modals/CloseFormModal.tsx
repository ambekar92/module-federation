'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import { getUserRole } from '@/app/shared/utility/getUserRole'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Textarea
} from '@trussworks/react-uswds'
import React, { RefObject, useEffect, useState } from 'react'
import styles from '../RtfRfi.module.scss'

interface CloseFormModalProps {
  open: boolean;
  handleSend: (description: any) => void;
  selectedData: any;
	modalRef: RefObject<ModalRef>;
}

const CloseFormModal: React.FC<CloseFormModalProps> = ({
  open,
  selectedData,
  modalRef
}) => {
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const [description, setDescription] = useState('');
  const handleSave = () => {
    // TODO: Pending delete api
  }

  function onClose() {
    modalRef.current?.toggleModal();
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
          ref={modalRef}
          id="invite-modal"
        >
          <ModalHeading id="invite-modal-heading">
            <Label htmlFor="session-modal" className="text-bold">
              <h3>
              Are you sure You want to close this
                {userRole === 'screener' ? ' Return to Business': ' Request for Information'}?
              </h3>
            </Label>
          </ModalHeading>

          <div className={styles['modalBody']}>
            <p>
              {
                userRole === 'screener'
                  ? ''
                  : 'Closing an RFI means either the Business has been unresponsive, or that you no longer need the information requested.'
              }
            </p>
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
                {userRole === 'screener' ? ' RTB': ' RFI'}
              </Button>
              <span
                className={`${styles['actionButton']}`}
                onClick={onClose}
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

export default CloseFormModal
