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
import Link from 'next/link'

interface InviteModalProps {
  open: boolean
  handleSend: () => void
  handleCancel: () => void
}

const InviteModal: React.FC<InviteModalProps> = ({
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
              <h3>Invite Delegate</h3>
            </Label>
          </ModalHeading>

          <div className="usa-prose">
            By clicking &quot;Send Invite&quot;, the delegate will receive an invitation email at the provided e-mail address.
          </div>
          <ModalFooter>
            <ButtonGroup className="float-right">
              <Button
                type="button"
                className="float-right"
                onClick={handleCancel}
                outline
              >
                Cancel
              </Button>
              <Link
                href={'/application/ownership'}
                className="float-right usa-button"
                onClick={handleSend}
              >
                Send Invite
              </Link>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default InviteModal
