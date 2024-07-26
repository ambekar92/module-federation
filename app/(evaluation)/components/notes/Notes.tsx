'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { useNotes } from '@/app/services/queries/useNotes'
import { NoteListItem } from '@/app/services/types/evaluation-service/Note'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal, ModalRef, Table } from '@trussworks/react-uswds'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import NotesForm from '../notes-form/NotesForm'
import { NoteType, schema } from '../notes-form/schema'
import NoteDescription from './NoteDescription'

function Notes() {

    const { data, error, isLoading, mutate } = useNotes();
    const {data: {user_id}} = useSessionUCMS();
    const [noteViewed, setNoteViewed] = useState<number | null>(null);
    const [noteEdited, setNoteEdited] = useState<NoteListItem | null>(null);
    const modalRef = useRef<ModalRef>(null)
    const methods = useForm<NoteType>({
        resolver: zodResolver(schema),
        defaultValues: {subject: '', description: ''},
        shouldUnregister: true
    });
    
    function onEditNote(note: NoteListItem) {
        setNoteEdited(note);
        methods.reset({subject: note.subject, description: note.description});
        modalRef.current?.toggleModal();
    }

    function onCreateNote() {
        setNoteEdited(null);
        methods.reset({subject: '', description: ''});
        modalRef.current?.toggleModal();
    }

    return (
        <>
            <h1>Notes</h1>
            <p>Maiores autem cumque quos nam similique  Sit at ipsam porro, ad aliquid adipisci exercitationem architecto.</p>
            <Button type='button'
                onClick={onCreateNote}
                style={{ float: 'right', marginBottom: '2rem' }} disabled={isLoading}>
                Create Note
            </Button>
            {isLoading && <div>Loading...</div>}
            {!isLoading && <Table  bordered fullWidth={true}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Application Phase</th>
                        <th>Date</th>
                        <th>Created by</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{fontSize: '.9rem'}}>
                    {data && data.length > 0 && data.map((note, idx) => (<React.Fragment key={note.id}>
                        
                        <tr>
                            <td style={{width: '200px', textWrap: 'wrap', wordBreak: 'break-word'}}>{note.subject}</td>
                            <td>{note.id}</td>
                            <td>{moment(note.created_at).format('MM/DD/yyyy')}</td>
                            <td>{`${note.user.first_name} ${note.user.last_name}`}</td>
                            <td style={{width: '170px'}}>
                                <Button style={{fontSize: '.7rem', margin: '1rem 0', marginRight: '.5rem'}} type='button' outline onClick={() => setNoteViewed(noteViewed === idx ? null : idx)}>
                                    {noteViewed === idx ? 'Hide' : 'View'}
                                </Button>
                                {note?.user?.id === user_id && <Button 
                                onClick={() => onEditNote(note)}
                                style={{fontSize: '.7rem', margin: '1rem 0'}} type='button' outline
                                 disabled={isLoading}>
                                    Edit
                                </Button>}
                            </td>
                        </tr>
                        <tr>
                            <td color='white' colSpan={5} style={{ padding: '1rem', display: noteViewed === idx ? '' : 'none' }}>
                                <NoteDescription content={note.description} />
                            </td>
                        </tr>
                    </React.Fragment>))}
                    {(!data || data.length === 0) && <tr>
                        <td colSpan={5}>No notes found.</td>
                    </tr>}
                </tbody>
            </Table>}

            <Modal id='notes-modal'
                aria-describedby='notes-modal'
                aria-labelledby='notes-modal'
                ref={modalRef}
                forceAction={true}
                style={{ padding: 0, width: '600px' }} isLarge={true}>
                <h1 id="modal-1-heading">
                   {noteEdited ? 'Edit Note' : 'New Note'}
                </h1>
                <FormProvider {...methods}>
                    <NotesForm createText={noteEdited ? 'Update' : 'Create'}
                    modalRef={modalRef} mutate={mutate} noteEdited={noteEdited} />
                </FormProvider>
            </Modal>
        </>
    )
}

export default Notes
