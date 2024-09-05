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

interface ConfirmRemovalModalProps {
  open: boolean
  handleConfirm: () => void
  handleCancel: () => void
}

const ConfirmRemovalModal: React.FC<ConfirmRemovalModalProps> = ({
  open,
  handleConfirm,
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
          id="confirm-removal-modal"
        >
          <ModalHeading id="confirm-removal-modal-heading">
            <Label htmlFor="session-modal" className="text-bold">
              <h3>Remove Delegate</h3>
            </Label>
          </ModalHeading>
          <div className="usa-prose">
            Are you sure you want to remove the delegate?
          </div>
          <ModalFooter>
            <ButtonGroup className="float-right">
              <Button
                type="button"
                data-testid="testid-cancel-removal-button"
                className="float-right"
                onClick={handleCancel}
                outline
              >
                Cancel
              </Button>
              <Button
                type="button"
                data-testid="testid-confirm-removal-button"
                className="float-right usa-button"
                onClick={() => handleConfirm()}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default ConfirmRemovalModal
