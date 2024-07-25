'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { useCreateNote } from '@/app/services/mutations/useCreateNote'
import { Note } from '@/app/services/types/notes'
import Input from '@/app/shared/form-builder/form-controls/Input'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import { Button, ButtonGroup, ModalRef } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { RefObject } from 'react'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { KeyedMutator } from 'swr'
import { Params } from '../../types/types'
import { NoteType } from './schema'

const NotesForm = ({ modalRef, createText='Create', showCancelBtn=true }: 
    {modalRef?: RefObject<ModalRef>, mutate: KeyedMutator<Note[]>, createText?: string, showCancelBtn?: boolean}) => {
    const { handleSubmit, reset, clearErrors } = useFormContext();
    const params = useParams<Params>();
    const session = useSessionUCMS();
    const {trigger, isMutating} = useCreateNote();

    function onNoteSave(note: NoteType) {
        trigger({...note, application_id: Number(params.application_id), user_id: session.data.user_id})
        reset();
        if (modalRef){
            modalRef.current?.toggleModal();
        }        
    }

    function onCancel() {
        clearErrors(); 
        reset()
        if (modalRef){
            modalRef.current?.toggleModal();
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onNoteSave as SubmitHandler<FieldValues>)}>
            <Input<NoteType> name="subject" label="Subject" hint='Note subject' required={true} />
            <TextArea<NoteType> name='description' label='Description' required={true} />
            <ButtonGroup style={{ display: 'flex', gap: '3rem' }}>
                <Button type='submit'
                    disabled={isMutating}
                    onClick={handleSubmit(onNoteSave as SubmitHandler<FieldValues>)} >
                    {isMutating ? 'Saving...' : createText}
                </Button>
                {showCancelBtn && <Button unstyled type='button'
                    onClick={onCancel}>
                    Cancel
                </Button>}
            </ButtonGroup>
        </form>
    )
}

export default NotesForm