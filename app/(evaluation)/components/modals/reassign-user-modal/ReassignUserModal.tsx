'use client'
import { useCurrentApplication } from '@/app/(evaluation)/firm/useApplicationData';
import { USER_ROUTE } from '@/app/constants/local-routes';
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { assignUserToViewflow } from '@/app/services/api/evaluation-service/assignUserToViewflow';
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote';
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note';
import { User } from '@/app/services/types/user-service/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ButtonGroup, ComboBoxOption, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds';
import { RefObject, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import Combobox from '../../../../shared/form-builder/form-controls/Combobox';
import RichText from '../../../../shared/form-builder/form-controls/rich-text/RichText';
import { stripHtmlTags } from '../../../../shared/utility/stripHtmlTags';
import { subjectSuffixMap, userRolesOptionsMap } from './maps';
import { ReassignType, ReassignUserType, schema } from './types';

type Props = {
    modalRef: RefObject<ModalRef>,
   reassignType: ReassignType | null,
   applicationId: number,
	 handleAction?: () => void
}

const ReassignUserModal = ({modalRef, reassignType, applicationId, handleAction}: Props ) => {
  const currentUser = useSessionUCMS();
  const {trigger, isMutating} = useCreateNote(false);
  const { applicationData } = useCurrentApplication();
  const [userOptions, setUserOptions] = useState<ComboBoxOption[] | null>(null);

	 const isModalOpen = () => {
    return modalRef.current?.modalIsOpen || false;
  };

  const { data, isLoading, mutate } = useSWR<User[]>(
    `${USER_ROUTE}?role_slug=${userRolesOptionsMap(reassignType, currentUser)}`,
    null,
    { revalidateOnMount: false }
  );

  useEffect(() => {
    if (isModalOpen() && reassignType) {
      mutate();
    }
  }, [isModalOpen(), reassignType]);

  const methods = useForm<ReassignUserType>({
    defaultValues: {
      user: '',
      comments: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoading || !data) {return;}
    const opts= data.map(user => ({value: user.id, label: `${user.first_name} ${user.last_name}`})) as unknown as ComboBoxOption[];
    setUserOptions(opts);
  }, [data]);

  async function onSubmit(formData: ReassignUserType) {
    if (stripHtmlTags(formData.comments).trim().length === 0) {
      methods.setError('comments', {message: 'Please provide a reason for reassigning the user'});
      return;
    }

    try {
      await reassign(formData);
      await postNote(formData);
      // Redirect after both operations are complete
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationId }) + '?name=reassignment-complete';
    } catch (error) {
      console.error('Failed to reassign or post note:', error);
    } finally {
      onClose();
    }
  }

  async function postNote(formData: ReassignUserType) {
    if (reassignType === null) {return;}
    const firmName = applicationData?.sam_entity.legal_business_name;
    const notePayload: CreateNotePayload = {
      application_id: Number(applicationId),
      description: formData.comments,
      subject: `${firmName}${subjectSuffixMap[reassignType]}`,
      user_id: currentUser.data.user_id
    }
    await trigger(notePayload);
  }

  async function reassign(formData: ReassignUserType) {
    const assignUserToViewflowPayload: AssignUserToViewflowPayload = {
      process_id: applicationData?.process?.id || 0,
      user_id: formData.user,
      pre_screener_id: 0,
      analyst_id: 0,
      supervisor_id: 0,
      approver_id:  0,
      mpp_screener_id: 0,
      mpp_analyst_id: 0
    }
    await assignUserToViewflow(assignUserToViewflowPayload);
  }

  function onClose() {
    methods.reset();
    // this is a work around as uswds combobox component does not clear out the content when the form is reset
    const comboboxClearButton = document.querySelector('.usa-combo-box__clear-input') as unknown as any;
    comboboxClearButton?.click();
    modalRef.current?.toggleModal();
    handleAction && handleAction();
  }

  return (
    <Modal
      isLarge={true}
      forceAction={true}
      ref={modalRef}
      id="reassign-user-modal"
      aria-labelledby="reassign-user-modal"
      aria-describedby="reassign-user-modal">
      <FormProvider {...methods}>
        <form>
          <h1>Reassign Application</h1>
          {userOptions && <Combobox<ReassignUserType> name='user' required={true} label='Select User' options={userOptions}/>}
          <RichText<ReassignUserType> name='comments' label='Provide more information' required={true} itemId={Math.random()} />
          <ModalFooter>
            <ButtonGroup>
              <Button type='submit' onClick={methods.handleSubmit(onSubmit)} disabled={isMutating}>
                Submit
              </Button>
              <Button type='button' unstyled className="padding-105 text-center" onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </FormProvider>
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

export default ReassignUserModal
