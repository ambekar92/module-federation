'use client'
import {
  Button,
  Modal,
  ModalFooter
} from '@trussworks/react-uswds'
import React from 'react'

interface AcknowledgementModalProps {
  modalRef: any,
  controllingEntityName: string,
  controllingEntityType: string
}

const AcknowledgementModal: React.FC<AcknowledgementModalProps> = ({
  modalRef, controllingEntityName, controllingEntityType
}) => {
  return (
    <>
      <Modal
        ref={modalRef}
        id="confirm-modal"
        aria-labelledby="confirm-modal"
        aria-describedby="confirm-modal"
      >
        <h3 id="confirm-modal">New Controlling Entity Form Submitted</h3>
        <div style={{marginBottom: '3rem'}}>
          <p>Your request to register {controllingEntityName} under  {controllingEntityType}
              has been submitted. The designated contact will receive instructions to complete the registration.
          </p>
          <p>
              You can now continue with your application while we process your request.
          </p>
          <p>
              Click &quot;Continue&quot; to proceed to the ownership section.
          </p>
        </div>
        <ModalFooter>
          <Button
            type="button"
            // once moved to appication route, will navigate to ownership
            onClick={() => modalRef.current?.toggleModal()}>
                Continue
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default AcknowledgementModal
