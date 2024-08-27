'use client'
import React, { RefObject, useState, ChangeEvent } from 'react'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
} from '@trussworks/react-uswds'

interface AcceptRequestModalProps {
  modalRef: RefObject<ModalRef>
  data: {
    selectedId:string
    title:string
    description:string
    buttonText:string
  }
  handleAction: (param:any, selectedId:any) => void
}

const AcceptRequestModal: React.FC<AcceptRequestModalProps> = ({
  modalRef,
  data,
  handleAction,
}) => {

  const handleActionSubmit = (param:any) => {
    handleAction(param, data?.selectedId)
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
              onClick={()=>handleActionSubmit(data?.buttonText)}
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

export default AcceptRequestModal
