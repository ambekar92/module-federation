'use client'

import React, { useState, ChangeEvent, useEffect, useMemo } from 'react'
import {
  Button,
  ButtonGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeading,
  Radio,
  Textarea,
} from '@trussworks/react-uswds'
import useSWR from 'swr'
import fetcher from '@/app/services/fetcher'
import { USER_ROUTE } from '@/app/constants/routes'
import { useCompleteEvalTask } from '@/app/services/mutations/useCompleteEvalTask'
import { useApplicationData } from '../../firm/useApplicationData'
import { useParams } from 'next/navigation'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

interface RequestExpertModalProps {
  open: boolean
  handleCancel: () => void
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

const RequestExpertModal: React.FC<RequestExpertModalProps> = ({
  open,
  handleCancel,
}) => {
  const [selectedOffice, setSelectedOffice] = useState('')
  const [selectedContributor, setSelectedContributor] = useState('')
  const [notes, setNotes] = useState('')
  const { data: userData, error } = useSWR<User[]>(`${USER_ROUTE}`, fetcher)
  const { trigger, isMutating } = useCompleteEvalTask();
  const params = useParams<{application_id: string}>();
  const {applicationData} = useApplicationData(ApplicationFilterType.id, params.application_id)

  const filteredUsers = useMemo(() => {
    if (!userData) {return [];}
    return userData.filter(user => {
      if (!user.prbac_role || user.prbac_role.length === 0) {return false;}
      return user.prbac_role.some(role =>
        role.slug === 'analyst_contributor_ogc' ||
				role.slug === 'analyst_contributor_oss'
      );
    });
  }, [userData]);

  useEffect(() => {
    setSelectedContributor('');
  }, [filteredUsers]);

  const onSubmit = async () => {
    if(applicationData && selectedContributor && selectedOffice) {
      const selectedUser = filteredUsers.find(user => parseInt(user.id) === parseInt(selectedContributor));
      if (!selectedUser) {
        console.error('Selected contributor not found in filtered users');
        return;
      }

      const isOgcExpert = selectedUser.prbac_role.some(role => role.slug === 'analyst_contributor_ogc');
      const isOssExpert = selectedUser.prbac_role.some(role => role.slug === 'analyst_contributor_oss');

      const payload = {
        process_id: 1,
        data: {
          approved: true,
          tier: applicationData.application_tier,
          request_ogc_expert: isOgcExpert,
          request_oss_expert: isOssExpert,
          notes: notes,
          selected_office: selectedOffice,
          selected_contributor: selectedContributor
        }
      };

      try {
        await trigger(payload);
        console.log('Task completed successfully');
        handleCancel();
      } catch (error) {
        console.error('Failed to complete task', error);
      }
    }
  }

  if(!open) {
    return null
  }
  if (!userData && !error) {
    return (
      <Modal
        id="request-expert-modal"
        forceAction
        aria-labelledby="request-expert-modal"
        aria-describedby="request-expert-modal"
        isLarge
        isInitiallyOpen
        renderToPortal={false}
      >
        <ModalHeading>Request Expert</ModalHeading>
        <div className="padding-4 text-center">Loading...</div>
      </Modal>
    )
  }

  if (error) {
    return (
      <Modal
        id="request-expert-modal"
        forceAction
        aria-labelledby="request-expert-modal"
        aria-describedby="request-expert-modal"
        isLarge
        isInitiallyOpen
        renderToPortal={false}
      >
        <ModalHeading>Request Expert</ModalHeading>
        <div className="padding-4 text-center">Error loading data. Please try again later.</div>
      </Modal>
    )
  }

  return (
    <Modal
      id="request-expert-modal"
      forceAction
      aria-labelledby="request-expert-modal"
      aria-describedby="request-expert-modal"
      isLarge
      isInitiallyOpen
      renderToPortal={false}
    >
      <ModalHeading>Request Expert</ModalHeading>

      <Label htmlFor="expert-input-radio" className="text-bold padding-bottom-2">
        Choose SBA Office
      </Label>
      <div className="display-flex flex-fill padding-bottom-3">
        <Radio
          className="padding-right-3"
          id="expert-input-radio-general-counsel"
          name="expert-input-radio"
          label="Office of General Counsel"
          onChange={() => setSelectedOffice('general-counsel')}
        />
        <Radio
          className="padding-left-3"
          id="expert-input-radio-size-standards"
          name="expert-input-radio"
          label="Office of Size Standards"
          onChange={() => setSelectedOffice('size-standards')}
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

      <Label htmlFor="request-expert-textarea" className="text-light">
        Notes
      </Label>
      <Textarea
        className="display-flex flex-col maxw-full width-full"
        id="request-expert-textarea"
        name="request-expert-textarea"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
      />

      <ModalFooter>
        <ButtonGroup>
          <Button type="button" onClick={onSubmit} disabled={!selectedContributor || isMutating}>
            {isMutating ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="button" outline onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>
  )
}

export default RequestExpertModal
