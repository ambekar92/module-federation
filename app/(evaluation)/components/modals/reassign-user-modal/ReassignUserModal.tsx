'use client'
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { useSessionUCMS } from '@/app/lib/auth';
import { assignUserToViewflow } from '@/app/services/api/evaluation-service/assignUserToViewflow';
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote';
import { useUsers } from '@/app/services/queries/user-service/useUser';
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ButtonGroup, ComboBoxOption, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds';
import { useParams } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Combobox from '../../../../shared/form-builder/form-controls/Combobox';
import RichText from '../../../../shared/form-builder/form-controls/rich-text/RichText';
import { stripHtmlTags } from '../../../../shared/utility/stripHtmlTags';
import { subjectSuffixMap, titleMap, userRolesOptionsMap } from './maps';
import { ReassignType, ReassignUserType, schema } from './types';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';

type Props = {
    modalRef: RefObject<ModalRef>,
   reassignType: ReassignType,
   applicationId: number
}

const ReassignUserModal = ({modalRef, reassignType, applicationId}: Props ) => {
  const currentUser = useSessionUCMS();
  const {trigger, isMutating} = useCreateNote(false);
  const {applicationData} = useApplicationData(ApplicationFilterType.id, applicationId);
  const {data, isLoading} = useUsers('role_slug', userRolesOptionsMap[reassignType]);
  const [userOptions, setUserOptions] = useState<ComboBoxOption[] | null>(null);

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

  function onSubmit(formData: ReassignUserType) {
    if (stripHtmlTags(formData.comments).trim().length === 0) {
      methods.setError('comments', {message: 'Please provide a reason for reassigning the user'});
      return;
    }

    reassign(formData).then(() => {
      postNote(formData).catch(() => console.error('failed to post note'));
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationId }) + '?name=reassignment-complete'
    }).catch(() => {console.error('failed to reassign')}).finally(() => {
      onClose();
    });
  }

  async function postNote(formData: ReassignUserType) {
    const firmName = applicationData?.sam_entity.legal_business_name;
    const notePayload: CreateNotePayload = {
      application_id: Number(applicationId),
      description: formData.comments,
      subject: `${firmName}${subjectSuffixMap[reassignType]}`,
      user_id: currentUser.data.user_id
    }
    trigger(notePayload)
  }

  async function reassign(formData: ReassignUserType) {
    const assignedUser = data?.find(user => user.id === formData.user);
    const assignUserToViewflowPayload: AssignUserToViewflowPayload = {
      process_id: applicationData?.process?.id || 0,
      pre_screener_id: assignedUser?.id || 0,
      analyst_id: assignedUser?.id || 0,
      supervisor_id: assignedUser?.id || 0,
      approver_id: assignedUser?.id || 0,
      mpp_screener_id: assignedUser?.id || 0,
      mpp_analyst_id: assignedUser?.id || 0
    }
    assignUserToViewflow(assignUserToViewflowPayload)
  }

  function onClose() {
    methods.reset();
    // this is a work around as uswds combobox component does not clear out the content when the form is reset
    const comboboxClearButton = document.querySelector('.usa-combo-box__clear-input') as unknown as any;
    comboboxClearButton?.click();

    modalRef.current?.toggleModal();
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
          <h1> {titleMap[reassignType]} </h1>
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
    </Modal>
  )
}

export default ReassignUserModal
