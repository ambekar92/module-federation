import { FIRM_APPLICATION_DONE_PAGE, buildRoute } from '@/app/constants/url'
import { useUpdateVAStatus } from '@/app/services/mutations/evaluation-service/useUpdateVAStatus'
import { ConfirmVeteranStatusPayload } from '@/app/services/types/evaluation-service/ConfirmVAStatus'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import RichText from '@/app/shared/form-builder/form-controls/rich-text/RichText'
import { stripHtmlTags } from '@/app/shared/utility/stripHtmlTags'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, ButtonGroup, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { RefObject } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ConfirmVA, ConfirmVeteranStatusType, schema } from './schema'

const ConfirmVeteranStatusModal = ({ modalRef, applicationId, handleAction }: { modalRef: RefObject<ModalRef>, applicationId: number | undefined, handleAction: () => void }) => {
  const {trigger, isMutating} = useUpdateVAStatus();

  const methods = useForm<ConfirmVeteranStatusType>({
    resolver: zodResolver(schema),
    defaultValues: {
      vba_feedback: ''
    }
  })

  async function onSubmit(formData: ConfirmVeteranStatusType) {
    if (stripHtmlTags(formData.vba_feedback).trim().length === 0) {
      methods.setError('vba_feedback', {message: 'Please provide more information'});
      return;
    }
    if (!applicationId) {
      modalRef.current?.toggleModal();
      methods.reset();
      throw new Error('Application process id not found');
    };

    const payload: ConfirmVeteranStatusPayload = {
      application_id: applicationId,
      veteran_status: formData.veteran_status!,
      vba_feedback: formData.vba_feedback
    }

    try {
      await trigger(payload);
      // Todo - need to validate the response to display error message or redirect on success
      window.location.href = buildRoute(FIRM_APPLICATION_DONE_PAGE, { application_id: applicationId }) + '?name=confirmed-veteran-status';
    } catch (error) {
      console.error('Failed to update VA status:', error);
    } finally {
      methods.reset();
      modalRef.current?.toggleModal();
    }
  }

  function onClose() {
    methods.reset();
    modalRef.current?.toggleModal();
    handleAction()
  }

  return (

    <Modal isLarge={true}
      forceAction={true}
      ref={modalRef}
      id="reassign-user-modal"
      aria-labelledby="reassign-user-modal"
      aria-describedby="reassign-user-modal">
      <FormProvider {...methods}>
        <form>
          <h1>Confirm Veteran Status</h1>

          <h3>After VA review, what is the Final Veteran Status?</h3>

          <ToggleButtonGroup<ConfirmVeteranStatusType, ConfirmVA>
            style={{ display: 'flex', gap: '2rem' }}
            required={true}
            name='veteran_status' label='After VA review, what is the Final Veteran Status?'
            options={[{ label: 'Confirm Veteran Status', value: ConfirmVA.confirmed },
              { label: 'Confirm Not Veteran', value: ConfirmVA.notConfirmed }]} />

          <RichText<ConfirmVeteranStatusType> name='vba_feedback'
            itemId={Math.random()}
            required={true}
            label='Provide more information (including any details provided from the VA)' />
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

export default ConfirmVeteranStatusModal
