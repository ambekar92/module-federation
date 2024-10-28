'use client'
import { APPLICATION_STEP_ROUTE, buildRoute } from '@/app/constants/url'
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
import { InvitationType } from '@/app/services/types/application-service/Application'
import axios from 'axios'
import { INVITATION_ROUTE, SEND_INVITATION_DELEGATE } from '@/app/constants/local-routes'
import { findExistingInvitation } from '../../utils/findExistingInvitation'

interface InviteContributorModalProps {
  open: boolean;
  contributorId: number | undefined | null;
  handleCancel: () => void;
  contributors: Contributor[];
  entityId: number | undefined;
  applicationId: number | null;
  invitationData: InvitationType[] | undefined;
}

const InviteContributorModal: React.FC<InviteContributorModalProps> = ({
  open,
  handleCancel,
  contributorId, contributors,
  entityId, applicationId, invitationData
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
      if (entityId && applicationId) {
        for (let index = 0; index < contributors.length; index++) {
          const contributor = contributors[index];
          const existingInvitation = findExistingInvitation(contributor, invitationData);

          if (!existingInvitation || existingInvitation.invitation_status === 'removed' || existingInvitation.invitation_status === 'unsent') {
            const postData = {
              application_id: applicationId,
              email: contributor.emailAddress,
              entity_id: entityId,
              application_role_id: setApplicationRole(contributor.contributorRole),
              first_name: contributor.firstName,
              last_name: contributor.lastName
            }
            const response = await axios.post(INVITATION_ROUTE, postData);
            if (response && response.data && response.data.id) {
              await axios.post(SEND_INVITATION_DELEGATE, {invitation_id: response.data.id});
            }
          }
        }
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.sign.link
        })
      }
    } catch(error) {
    // Handle error
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
