'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { useCreateNote } from '@/app/services/mutations/evaluation-service/useCreateNote'
import { useUpdateNote } from '@/app/services/mutations/evaluation-service/useUpdateNote'
import { NoteListItem } from '@/app/services/types/evaluation-service/Note'
import Input from '@/app/shared/form-builder/form-controls/Input'
import RichText from '@/app/shared/form-builder/form-controls/rich-text/RichText'
import { stripHtmlTags } from '@/app/shared/utility/stripHtmlTags'
import { Button, ButtonGroup, ModalRef } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { RefObject } from 'react'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { KeyedMutator } from 'swr'
import { Params } from '../../types/types'
import { NoteType } from './schema'

const NotesForm = ({ modalRef, createText='Create', showCancelBtn=true, noteEdited = null, richTextEditorSize }: 
    {modalRef?: RefObject<ModalRef>, 
        mutate: KeyedMutator<NoteListItem[]>, 
        createText?: string, 
        showCancelBtn?: boolean, 
        noteEdited?: NoteListItem | null,
        richTextEditorSize?: 'sm' | 'lg'
    }) => {
    const { handleSubmit, reset, clearErrors, setError } = useFormContext();
    const params = useParams<Params>();
    const session = useSessionUCMS();
    const {trigger: triggerCreate, isMutating: isMutatingCreate} = useCreateNote();
    const {trigger: triggerUpdate, isMutating: isMutatingUpdate} = useUpdateNote();

    function onNoteSave(note: NoteType) {
        if (stripHtmlTags(note.description)?.trim()?.length === 0) {
            setError('description', {message: 'Description is required'});
            return;
        }
        if (noteEdited) {
            triggerUpdate({...note, 
                id: noteEdited.id
            })
        } else {
            triggerCreate({...note, 
                application_id: Number(params.application_id), 
                user_id: session.data.user_id,
            })
        }
        reset();
        if (modalRef){
            modalRef.current?.toggleModal();
        }        
    }

    function onCancel() {
        clearErrors(); 
        reset({subject: '', description: ''});
        if (modalRef){
            modalRef.current?.toggleModal();
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onNoteSave as SubmitHandler<FieldValues>)}>
            <Input<NoteType> name="subject" label="Subject" hint='This is a text input with a character counter.' required={true} />
            <RichText<NoteType> name='description' label='Body' required={true} itemId={Math.random()} size={richTextEditorSize} />
            <ButtonGroup style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
                <Button type='submit'
                    disabled={isMutatingCreate || isMutatingUpdate}
                    onClick={handleSubmit(onNoteSave as SubmitHandler<FieldValues>)} >
                    {(isMutatingCreate || isMutatingUpdate) ? 'Saving...' : createText}
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