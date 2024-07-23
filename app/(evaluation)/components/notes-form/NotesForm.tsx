'use client'
import { NOTES_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/fetcher'
import Input from '@/app/shared/form-builder/form-controls/Input'
import TextArea from '@/app/shared/form-builder/form-controls/TextArea'
import { Button, ButtonGroup, ModalRef } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import { RefObject, useState } from 'react'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { KeyedMutator } from 'swr'
import { Note, Params } from '../../types/types'
import { NoteType } from './schema'

const NotesForm = ({ modalRef, mutate, createText='Create', showCancelBtn=true }: 
    {modalRef?: RefObject<ModalRef>, mutate: KeyedMutator<Note[]>, createText?: string, showCancelBtn?: boolean}) => {
    const { handleSubmit, reset, clearErrors } = useFormContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams<Params>();
    const session = useSessionUCMS();

    function onNoteSave(note: NoteType) {
        setIsLoading(true);
        try {
            axiosInstance.post(NOTES_ROUTE, { ...note, application_id: params.application_id, user_id: session.data.user_id }).then(res => {
                reset();
                if (modalRef) {
                    modalRef.current?.toggleModal();
                }
                mutate()
            })

        } catch (e) {
            console.error('failed to save note')
        } finally {
            setIsLoading(false);
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
            <TextArea<NoteType> name='description' label='Description' />
            <ButtonGroup style={{ display: 'flex', gap: '3rem' }}>
                <Button type='submit'
                    disabled={isLoading}
                    onClick={handleSubmit(onNoteSave as SubmitHandler<FieldValues>)} >
                    {createText}
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