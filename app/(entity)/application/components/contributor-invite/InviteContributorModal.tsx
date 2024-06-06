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
import { applicationSteps } from '../../utils/constants'

interface InviteContributorModalProps {
  open: boolean
  handleSend: () => void
  handleCancel: () => void
}

const InviteContributorModal: React.FC<InviteContributorModalProps> = ({
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
              <h3>Invite Contributor(s)</h3>
            </Label>
          </ModalHeading>

          <div className="usa-prose">
            By Clicking &quot;Send Invite&quot;, the contributor(s) will receive an invitation email at the provided e-mail addresses.
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
                href={applicationSteps.sign.link}
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

export default InviteContributorModal
