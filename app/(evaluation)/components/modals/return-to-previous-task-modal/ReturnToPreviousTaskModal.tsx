import { useSessionUCMS } from '@/app/lib/auth'
import { useReturnToPreviousTask } from '@/app/services/mutations/evaluation-service/useReturnToPreviousTask'
import { ReturnToPreviousTaskPayload } from '@/app/services/types/evaluation-service/ReturnToPreviousTask'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import { Role } from '@/app/shared/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { RefObject, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { schema } from './schema'
import { ReturnToFormType, ReturnToType } from './types'
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note'
import { useParams } from 'next/navigation'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url';

const ReturnToPreviousTaskModal = ({modalRef, processId, handleAction}: {modalRef: RefObject<ModalRef>, processId: number | undefined, handleAction: () => void;}) => {
  const params = useParams<{application_id: string}>()
  const {trigger: triggerReturnToPreviousTask, isMutating: returningToPrevTask} = useReturnToPreviousTask();
  const {trigger: triggerCreateNote, isMutating: creatingNote} = useCreateNote();
  const session = useSessionUCMS();
  const [returnToType, setReturnToType] = useState<ReturnToType>(ReturnToType.Screener);

  useEffect(() =>{
    const userPermissions = session?.data.permissions.map(permission => permission.slug) as unknown as Role[];
    if (userPermissions?.some(p => p === Role.APPROVER)) {
      setReturnToType(ReturnToType.Reviewer);
    } else if (userPermissions?.some(p => p === Role.REVIEWER || p === Role.REVIEWER_HIGH || p === Role.REVIEWER_LOW)) {
      setReturnToType(ReturnToType.Analyst);
    } else if (userPermissions.some(p => p === Role.ANALYST || p === Role.ANALYST_HIGH || p === Role.ANALYST_LOW || p === Role.ANALYST_CONTRIBUTOR_OGC || p === Role.ANALYST_CONTRIBUTOR_OSS)) {
      setReturnToType(ReturnToType.Screener);
    }
  } ,[session])

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    }
  })

  async function onSubmit(formData: ReturnToFormType) {
    if (processId === undefined) {
      onClose();
      throw new Error('Application process id is undefined');
    };
    const returnToPrevTaskpayload: ReturnToPreviousTaskPayload = {
      process_id: processId,
    }
    const notePayload: CreateNotePayload = {
      application_id: Number(params.application_id),
      user_id: session?.data.user_id,
      description: formData.description,
      subject: `Returned to ${returnToType}`,
    }

    try {
      await triggerReturnToPreviousTask(returnToPrevTaskpayload);
      await triggerCreateNote(notePayload);
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: params.application_id }) + '?name=reassignment-complete';
    } catch (error) {
      console.error('Failed to return to previous task or create note:', error);
    } finally {
      onClose();
    }
  }

  function onClose() {
    methods.reset()
    modalRef.current?.toggleModal();
    handleAction();
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
        <h1>Return to {returnToType}</h1>
        <TextArea<ReturnToFormType>
          required={true}
          name="description"
          label="By clicking “Return”, you are returning this application to the person it was assigned to before you."
          hint="Provide more information about why you are returning this application" />
        <ModalFooter>
          <ButtonGroup>
            <Button type='submit' onClick={methods.handleSubmit(onSubmit)} disabled={returningToPrevTask || creatingNote}>
            Return
            </Button>
            <Button type='button' unstyled className="padding-105 text-center" onClick={onClose}>
            Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
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

export default ReturnToPreviousTaskModal
