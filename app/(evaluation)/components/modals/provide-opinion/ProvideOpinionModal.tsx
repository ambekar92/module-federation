import { buildRoute, FIRM_APPLICATION_DONE_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { CreateNotePayload } from '@/app/services/types/evaluation-service/Note'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { RefObject } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { schema } from './schema'
import { ProvideOpinionFormType } from './types'

const ProvideOpinionModal = ({modalRef, processId, handleAction}: {modalRef: RefObject<ModalRef>, processId: number | undefined, handleAction: () => void;}) => {
  const params = useParams<{application_id: string}>()
  const {trigger: triggerCreateNote, isMutating: creatingNote} = useCreateNote();
  const session = useSessionUCMS();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    }
  })

  async function onSubmit(formData: ProvideOpinionFormType) {
    if (processId === undefined) {
      onClose();
      throw new Error('Application process id is undefined');
    };
    const notePayload: CreateNotePayload = {
      application_id: Number(params.application_id),
      user_id: session?.data.user_id,
      description: formData.description,
      subject: 'Provide Opinion',
    }

    try {
      await triggerCreateNote(notePayload);
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: params.application_id }) + '?name=provided-expert-opinion';
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
      id="provide-opinion-modal"
      aria-labelledby="provide-opinion-modal"
      aria-describedby="provide-opinion-modal">
      <FormProvider {...methods}>
        <h1>Provide Opinion</h1>
        <TextArea<ProvideOpinionFormType>
          required={true}
          name="description"
          label="Your professional opinion has been requested on this application. If you haven’t already, review the request in the Notes section of this application review."
          hint="Provide the details for your professional opinion*" />
        <ModalFooter>
          <ButtonGroup>
            <Button type='submit' onClick={methods.handleSubmit(onSubmit)} disabled={creatingNote}>
            Submit
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

export default ProvideOpinionModal
