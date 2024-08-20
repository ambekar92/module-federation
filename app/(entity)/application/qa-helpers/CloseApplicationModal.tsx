'use client'
import { Button, ButtonGroup, Label, Modal, ModalFooter, ModalHeading, ModalRef } from '@trussworks/react-uswds'
import { RefObject, useState } from 'react'

export interface ModalWithRefProps {
  modalRef: RefObject<ModalRef>
  handleAction: () => void
}

function CloseApplicationModal({
  modalRef,
  handleAction,
}: ModalWithRefProps) {
  const [requiredFields, setRequiredFields] = useState(true)

  const handleActionSubmit = async () => {
    handleAction()
    onClose()
  }

  const onClose = () => {
    setRequiredFields(true)
    modalRef.current?.toggleModal()
  }

  return (
    <Modal
      forceAction
      ref={modalRef}
      aria-labelledby="modal-heading"
      aria-describedby="modal-description"
      isLarge
      id="close-application-modal"
    >
      <ModalHeading id="close-application-modal-heading">
        <Label htmlFor="close-application-modal">
          <h2 className="text-bold">Warning</h2>
        </Label>
      </ModalHeading>

      <div>
        <p>Based on your selected responses you are not eligible to continue. Click &quot;cancel&quot; to review your responses.</p>
      </div>

      <ModalFooter>
        <ButtonGroup className="float-left">
          <Button
            type="button"
            className="float-left"
            onClick={handleActionSubmit}
            disabled={requiredFields}
          >
						Continue
          </Button>
          <Button
            type="button"
            className="float-left usa-button--unstyled"
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
  )
}
export default CloseApplicationModal
