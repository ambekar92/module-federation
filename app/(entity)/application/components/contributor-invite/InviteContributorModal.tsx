'use client'

import { SEND_INVITATION_DELEGATE } from '@/app/constants/questionnaires'
import { INVITATION_ROUTE } from '@/app/constants/routes'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
import { axiosInstance } from '@/app/services/axiosInstance'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
} from '@trussworks/react-uswds'
import React from 'react'
import { applicationSteps } from '../../utils/constants'
import { Contributor } from './types'

interface InviteContributorModalProps {
  open: boolean;
	contributorId: number | undefined | null;
  handleCancel: () => void;
	contributors: Contributor[];
	entityId: number | undefined;
	applicationId: number | null;
}

const InviteContributorModal: React.FC<InviteContributorModalProps> = ({
  open,
  handleCancel,
  contributorId, contributors,
  entityId, applicationId
}) => {
  const setApplicationRole = (role: string) => {
    switch(role) {
      case 'role_other':
        return 6;
      case 'role_spouse':
        return 4;
      case 'role_owner':
        return 3;
      case 'role_owner_eligible':
        return 2;
      default:
        return 6;
    }
  }
  const sendInvitations = async () => {
    try {
      if(entityId && applicationId) {
        for(let index = 0; index < contributors.length; index++) {
          const postData = {
            application_id: applicationId,
            email: contributors[index].emailAddress,
            entity_id: entityId,
            application_role_id: setApplicationRole(contributors[index].contributorRole),
            first_name: contributors[index].firstName,
            last_name: contributors[index].lastName
          }

          const response = await axiosInstance.post(INVITATION_ROUTE, postData);
          if (response && response.data && response.data.id) {
            await axiosInstance.post(SEND_INVITATION_DELEGATE, {invitation_id: response.data.id});
          }
        }

        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.sign.link
        })
      }
    } catch(error) {
      // alert('Error sending invitations. Please try again.')
    }
  }
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
              <Button
                aria-disabled={!contributorId}
                className="float-right"
                type='button'
                onClick={sendInvitations}
              >
                Send Invite
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default InviteContributorModal
