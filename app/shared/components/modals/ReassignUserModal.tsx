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
import { z } from 'zod';
import Combobox from '../../form-builder/form-controls/Combobox';
import RichText from '../../form-builder/form-controls/rich-text/RichText';
import { Role } from '../../types/role';
import { stripHtmlTags } from '../../utility/stripHtmlTags';

const schema = z.object({
    user: z.any().refine(val => !!val, 'Please select a user'),
    comments: z.string().min(1, 'Please provide a reason for reassigning the user'),
})

export type ReassignUserType = z.infer<typeof schema>;

type Props = {
    modalRef: RefObject<ModalRef>
}

const ReassignUser = ({modalRef}: Props ) => {
  const currentUser = useSessionUCMS();
  const params = useParams<{application_id: string}>();
  const {trigger, isMutating} = useCreateNote();
  const {applicationData} = useApplicationData()
  const isSupervisorHighCriteria = currentUser.data.permissions.some(p => p.slug === 'supervisor_high_criteria');
  const {data, isLoading} = useUsers('role_slug', isSupervisorHighCriteria ? Role.REVIEWER_HIGH_TIER : Role.REVIEWER_LOW_TIER);
  const [userOptions, setUserOptions] = useState<ComboBoxOption[] | null>(null);
  
  const methods = useForm<ReassignUserType>({
    defaultValues: {
        user: '',
        comments: '',
    },
    resolver: zodResolver(schema),
  });


  const comments = methods.watch('comments');

  useEffect(() => {
    if (isLoading || !data) return;
      const opts= data.map(user => ({value: user.id, label: `${user.first_name} ${user.last_name}`})) as unknown as ComboBoxOption[];
      setUserOptions(opts);
  }, [data]);

  function onSubmit(formData: ReassignUserType) {
    if (stripHtmlTags(comments).trim().length === 0) {
      methods.setError('comments', {message: 'Please provide a reason for reassigning the user'});
      return;
    }
    const firmName = applicationData?.sam_entity.legal_business_name;
    const notePayload: CreateNotePayload = {
      application_id: Number(params.application_id),
      description: formData.comments,
      subject: `${firmName}_Reviewer_reassignment`,
      user_id: currentUser.data.user_id
    }
    trigger(notePayload);

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
    assignUserToViewflow(assignUserToViewflowPayload);
  }

  function onClose() {
    // this is a work around as uswds combobox component does not clear out the content when the form is reset
    const comboboxClearButton = document.querySelector('.usa-combo-box__clear-input') as unknown as any;
    comboboxClearButton?.click();

    // TODO - find a better way to clear the tiptap editor:
    const editor = document.querySelector('.ProseMirror') as unknown as any;
    editor.innerHTML = '';

    methods.resetField('comments', {keepDirty: false, keepTouched: false})
    
    methods.reset();
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
          <form style={{marginLeft: '9rem'}}>
            <h1> Reassign User </h1>
           {userOptions && <Combobox<ReassignUserType> name='user' required={true} label='Select User' options={userOptions}/>}
            <RichText<ReassignUserType> name='comments' label='Provide more information' required={true} />
            <ModalFooter>
              <ButtonGroup>
                <Button type='submit' onClick={methods.handleSubmit(onSubmit)}>
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

export default ReassignUser