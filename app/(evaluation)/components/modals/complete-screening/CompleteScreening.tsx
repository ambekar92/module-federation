'use client'

import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import React from 'react'

interface CompleteScreeningProps {
  open: boolean
  title: string
  handleAction: () => void
  handleCancel: () => void
}

const CompleteScreening: React.FC<CompleteScreeningProps> = ({
  open,
  title,
  handleAction,
  handleCancel,
}) => {

  const handleActionSubmit = async () => {
    handleAction()
  }

  return (
    <>
      {open === true && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isLarge
          isInitiallyOpen
          renderToPortal={false}
          id="action-modal"
        >
          <ModalHeading id="action-modal-heading">
            <Label htmlFor="action-modal">
              <h2 className="text-bold">{title}</h2>
            </Label>
          </ModalHeading>

          <div className='margin-top-4'>
          By clicking "Confirm", you are attesting that this application contains all the necessary information and documents to send it forward for further analysis. You can click "Cancel" if you'd like to continue screening this application.
          </div>

          <ModalFooter>
            <ButtonGroup className="float-left">
              <Button
                type="button"
                className="float-left"
                onClick={handleActionSubmit}
              >
                Confirm
              </Button>
              <Button
                type="button"
                className="float-left"
                onClick={handleCancel}
                outline
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default CompleteScreening
