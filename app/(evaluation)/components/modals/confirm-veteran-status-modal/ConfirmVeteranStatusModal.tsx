import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import RichText from '@/app/shared/form-builder/form-controls/rich-text/RichText'
import { Button, ButtonGroup, Modal, ModalFooter, ModalRef } from '@trussworks/react-uswds'
import { RefObject } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ConfirmVeteranStatusType, schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { stripHtmlTags } from '@/app/shared/utility/stripHtmlTags'

const ConfirmVeteranStatusModal = ({ modalRef }: { modalRef: RefObject<ModalRef> }) => {
    const methods = useForm<ConfirmVeteranStatusType>({
        resolver: zodResolver(schema),
        defaultValues: {
            isVeteran: null,
            comments: ''
        }
    })

    function onSubmit(formData: ConfirmVeteranStatusType) {
        if (stripHtmlTags(formData.comments).trim().length === 0) {
            methods.setError('comments', {message: 'Please provide more information'});
            return;
          }
    }

    function onClose() {
        methods.reset();
        modalRef.current?.toggleModal();
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
                    <h1>Cofirm Veteran Status</h1>

                    <h3>After VA review, what is the Final Veteran Status?</h3>

                    <ToggleButtonGroup<ConfirmVeteranStatusType, string>
                        style={{ display: 'flex', gap: '2rem' }}
                        required={true}
                        name='isVeteran' label='After VA review, what is the Final Veteran Status?'
                        options={[{ label: 'Confirm Veteran Status', value: 'true' },
                        { label: 'Confirm Not Veteran', value: 'false' }]} />

                    <RichText<ConfirmVeteranStatusType> name='comments' 
                    itemId={Math.random()}
                    required={true}
                    label='Provide more information (including any details provided from the VA)' />
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

export default ConfirmVeteranStatusModal

