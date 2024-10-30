'use client'
import { subjectSuffixMap } from '@/app/(evaluation)/components/modals/reassign-user-modal/maps';
import { ReassignType, ReassignUserType, schema } from '@/app/(evaluation)/components/modals/reassign-user-modal/types';
import { useApplicationData } from '@/app/(evaluation)/firm/useApplicationData';
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { assignUserToViewflow } from '@/app/services/api/evaluation-service/assignUserToViewflow';
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useUsersWithMultipleFilters } from '@/app/services/queries/user-service/useUser';
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note';
import Dropdown from '@/app/shared/form-builder/form-controls/Dropdown';
import RichText from '@/app/shared/form-builder/form-controls/rich-text/RichText';
import { stripHtmlTags } from '@/app/shared/utility/stripHtmlTags';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ButtonGroup, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds';
import axios from 'axios';
import { RefObject, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  modalRef: RefObject<ModalRef>,
  reassignType: ReassignType | null,
  applicationId: number,
  user_id: number | null,
	current_user_role: string | undefined
  handleAction?: () => void
}

const ReassignTeamModal = ({modalRef, reassignType, applicationId, handleAction, current_user_role, user_id}: Props ) => {
  const session = useSessionUCMS();
  const {trigger, isMutating} = useCreateNote(false);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, applicationId);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<ReassignUserType>({
    defaultValues: {
      user: '',
      comments: '',
    },
    resolver: zodResolver(schema),
  });

  const { data: users, isLoading: isLoadingUsers } = useUsersWithMultipleFilters({
    role_slug: current_user_role,
    is_active: true
  });

  const onSubmit = async (formData: ReassignUserType) => {
    if (stripHtmlTags(formData.comments).trim().length === 0) {
      methods.setError('comments', {message: 'Please provide a reason for reassigning the user'});
      return;
    }

    try {
      await Promise.all([
        reassign(formData),
        postNote(formData)
      ]);
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationId }) + '?name=reassignment-complete';
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Failed to reassign or post note:', error);
      }
      setError('Failed to reassign the application. Please try again.');
    } finally {
      onClose();
    }
  };

  const onClose = () => {
    methods.reset();
    modalRef.current?.toggleModal();
    handleAction?.();
  };

  const postNote = async (formData: ReassignUserType) => {
    if (!reassignType) {return;}

    const firmName = applicationData?.sam_entity.legal_business_name;
    const notePayload: CreateNotePayload = {
      application_id: Number(applicationId),
      description: formData.comments,
      subject: `${firmName}${subjectSuffixMap[reassignType]}`,
      user_id: session.data.user_id
    }
    await trigger(notePayload);
  };

  const reassign = async (formData: ReassignUserType) => {
    if(!applicationData?.process?.id) {
      throw new Error('Process ID is missing');
    }

    try {
      const response = await assignUserToViewflow({
        process_id: applicationData.process.id,
        user_id: formData.user,
        pre_screener_id: 0,
        analyst_id: 0,
        supervisor_id: 0,
        approver_id: 0,
        mpp_screener_id: 0,
        mpp_analyst_id: 0
      });

      if (response.status !== 200) {
        throw new Error(`Failed to assign user to viewflow: ${response.statusText}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to assign user to viewflow: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  };

  return (
    <Modal
      isLarge
      forceAction
      ref={modalRef}
      id="reassign-user-modal"
      aria-labelledby="reassign-user-modal"
      aria-describedby="reassign-user-modal">
      <FormProvider {...methods}>
        <form>
          <h1>Reassign Application</h1>
          <div className='margin-bottom-2'>
            <Dropdown name='user'>
              <option value="">- Select User -</option>
              {!isLoadingUsers && users && users.length > 0 ?
                users.filter(user => {
                  const currentUserId = session.data?.user_id;
                  return user.id !== currentUserId && user.id !== user_id;
                }).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))
                : null
              }
            </Dropdown>
          </div>
          <RichText<ReassignUserType>
            name='comments'
            label='Provide more information'
            required
            itemId={Math.random()}
          />
          {error && (
            <div className="usa-alert usa-alert--error" role="alert">
              <div className="usa-alert__body">
                <p className="usa-alert__text">{error}</p>
              </div>
            </div>
          )}
          <ModalFooter>
            <ButtonGroup>
              <Button
                type='submit'
                onClick={methods.handleSubmit(onSubmit)}
                disabled={isMutating}
              >
                Submit
              </Button>
              <Button
                type='button'
                unstyled
                className="padding-105 text-center"
                onClick={onClose}
              >
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
  );
};

export default ReassignTeamModal;
