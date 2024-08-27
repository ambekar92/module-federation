'use client'

import { USER_ROUTE } from '@/app/constants/routes'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import fetcher from '@/app/services/fetcher'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { Application } from '@/app/services/types/application-service/Application'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  ModalRef,
  Radio,
  Textarea,
} from '@trussworks/react-uswds'
import React, { ChangeEvent, RefObject, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

interface EscalateReviewProps {
  modalRef: RefObject<ModalRef>
	handleAction: () => void
	applicationData: Application | null
}

interface Role {
  id: number;
  slug: string;
  name: string;
  description: string;
  parameters: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  prbac_role: Role[];
}

const EscalateReviewModal: React.FC<EscalateReviewProps> = ({
  modalRef, handleAction, applicationData
}) => {
  const [selectedOffice, setSelectedOffice] = useState<string>()
  const [selectedContributor, setSelectedContributor] = useState('')
  const [notes, setNotes] = useState('')
  const { data: userData, error } = useSWR<User[]>(selectedOffice ? `${USER_ROUTE}?role_slug=${selectedOffice}`: null, fetcher)
  const { trigger, isMutating } = useCompleteEvalTask();
  const { trigger: triggerNote, isMutating: isMutatingNote } = useCreateNote();
  const sessionData = useSessionUCMS()

  const filteredUsers = useMemo(() => {
    if (!userData) {return [];}
    return userData.filter(user => {
      if (!user.prbac_role || user.prbac_role.length === 0) {return false;}
      return user.prbac_role.some(role =>
        role.slug === 'ogc' ||
				role.slug === 'oss'
      );
    });
  }, [userData]);

  useEffect(() => {
    setSelectedContributor('');
  }, [filteredUsers]);

  const handleCancel = () => {
    modalRef.current?.toggleModal();
    handleAction();
  }

  const onSubmit = async () => {
    if(applicationData && selectedContributor && selectedOffice) {
      const selectedUser = filteredUsers.find(user => parseInt(user.id) === parseInt(selectedContributor));
      if (!selectedUser) {
        console.error('Selected contributor not found in filtered users');
        return;
      }

      const isOgcExpert = selectedUser.prbac_role.some(role => role.slug === 'ogc');
      const isOssExpert = selectedUser.prbac_role.some(role => role.slug === 'oss');

      const payload = {
        process_id: applicationData.process?.id,
        data: {
          request_ogc_expert: isOgcExpert,
          request_oss_expert: isOssExpert,
          approved: true,
          tier: applicationData.application_tier
        }
      };

      const notePayload =  {
        application_id: applicationData.id,
        subject: 'Request for Expert',
        description: notes,
        user_id: sessionData.data.user_id || 0
      }

      try {
        await trigger(payload);
        await triggerNote(notePayload);
        console.log('Task completed successfully');
        // Todo - need to validate the response to display error message or redirect on success
        window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationData.id }) + '?name=escalate-review'
        handleCancel();
      } catch (error) {
        console.error('Failed to complete task', error);
      }
    }
  }

  return (
    <Modal
      id="request-expert-modal"
      isLarge={true}
      forceAction={true}
      ref={modalRef}
      aria-labelledby="request-expert-modal"
      aria-describedby="request-expert-modal"
    >
      {
        error
          ? <p>Error loading data. Please try again later.</p>
          :(
            <>
              <ModalHeading>Escalate Review</ModalHeading>

              <Label htmlFor="expert-input-radio" className="text-bold padding-bottom-2">
							Choose SBA Office
              </Label>
              <div className="display-flex flex-fill padding-bottom-3">
                <Radio
                  className="padding-right-3"
                  id="expert-input-radio-general-counsel"
                  name="expert-input-radio"
                  label="Office of General Counsel"
                  onChange={() => setSelectedOffice('ogc')}
                />
                <Radio
                  className="padding-left-3"
                  id="expert-input-radio-size-standards"
                  name="expert-input-radio"
                  label="Office of Size Standards"
                  onChange={() => setSelectedOffice('oss')}
                />
              </div>

              <Label htmlFor="user-select" className="text-light" requiredMarker>
								Select Contributor
              </Label>
              <select
                className="usa-select maxw-full width-full"
                name="user-select"
                id="user-select"
                value={selectedContributor}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedContributor(e.target.value)}
              >
                <option value="">--</option>
                {filteredUsers.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {`${user.last_name}, ${user.first_name}`}
                  </option>
                ))}
              </select>

              <Label htmlFor="request-expert-textarea" requiredMarker className="text-light">
							Reason for Request
              </Label>
              <Textarea
                className="display-flex flex-col maxw-full width-full"
                id="request-expert-textarea"
                name="request-expert-textarea"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
              />
            </>
          )
      }
      <ModalFooter>
        <ButtonGroup>
          <Button type="button" onClick={onSubmit} disabled={!selectedContributor || isMutating || isMutatingNote}>
            {isMutating ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="button" outline onClick={handleCancel} unstyled className="padding-left-3">
							Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
      <button
        type="button"
        className="usa-button usa-modal__close"
        aria-label="Close this window"
        data-close-modal
        onClick={handleCancel}
      >
				x
      </button>
    </Modal>
  )
}

export default EscalateReviewModal
