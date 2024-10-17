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

interface DistrictOfficeAssignmentModalProps {
  modalRef: RefObject<ModalRef>
  data: {
    title:string
    description:string
    buttonText:string
  }
  handleAction: (selectedId:any) => void
}

const DistrictOfficeAssignmentModal: React.FC<DistrictOfficeAssignmentModalProps> = ({
  modalRef,
  data,
  handleAction,
}) => {

  const handleActionSubmit = () => {
    handleAction(data?.selectedId)
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
            <h2 className="text-bold">{data?.title}</h2>
          </Label>
        </ModalHeading>

        <div>
           Do you wish to {data?.description}?
        </div>

        <ModalFooter>
          <ButtonGroup className="float-left">
            <Button
              type="button"
              className="float-left"
              onClick={handleActionSubmit}
            >
              {data?.buttonText}
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

export default DistrictOfficeAssignmentModal
