'use client'
import React, { RefObject, useState, ChangeEvent } from 'react'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  Table,
  ModalRef,
} from '@trussworks/react-uswds'

interface UploadCapabilityModalProps {
  modalRef: RefObject<ModalRef>
  handleAction: (e: React.MouseEvent,selectedId:any) => void
}

const UploadCapabilityModal: React.FC<UploadCapabilityModalProps> = ({
  modalRef,
  handleAction,
}) => {

  const handleActionSubmit = (e: React.MouseEvent) => {
    handleAction(e,true)
    onClose()
  }

  const onClose = () => {
    modalRef.current?.toggleModal()
  }

  return (
    <>
      <Modal
        forceAction
        ref={modalRef}
        aria-labelledby="modal-heading"
        aria-describedby="modal-description"
        id="make-approval-modal"
      >
        <ModalHeading id="make-approval-modal-heading">
          <Label htmlFor="make-approval-modal">
            <h2 className="text-bold">Replace Your Capability Statement?</h2>
          </Label>
        </ModalHeading>

        <div>
          <p>
            You are about to upload a new version of capability statement.
          </p>

          <p>
            This document will become the active version of your capability statement,
            any previously uploaded versions will remain in your document center for archival purposes.
          </p>
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left"
              onClick={handleActionSubmit}
            >
              Repalce
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

export default UploadCapabilityModal
