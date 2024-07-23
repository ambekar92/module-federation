'use client'
import { NOTES_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Accordion, Modal, ModalRef, ModalToggleButton, Table } from '@trussworks/react-uswds'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Note, Params } from '../../types/types'
import NotesForm from '../notes-form/NotesForm'
import { NoteType, schema } from '../notes-form/schema'

function Notes() {
    const params = useParams<Params>();
    const { data, error, isLoading, mutate } = useSWR<Note[]>(`${NOTES_ROUTE}?application_id=${params.application_id}`, fetcherGET);
    const modalRef = useRef<ModalRef>(null)
    const methods = useForm<NoteType>({
        resolver: zodResolver(schema),
        defaultValues: { description: '', subject: '' },
        shouldUnregister: true
    });

    return (
        <>
            <h1>Notes</h1>
            <p>Maiores autem cumque quos nam similique  Sit at ipsam porro, ad aliquid adipisci exercitationem architecto.</p>
            <ModalToggleButton modalRef={modalRef} opener={true} style={{ float: 'right', marginBottom: '2rem' }} disabled={isLoading}>
                Create Note
            </ModalToggleButton>


            {isLoading && <div>Loading...</div>}
            {!isLoading && <Table bordered fullWidth={true}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Application Phase</th>
                        <th>Date</th>
                        <th>Created by</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 && data.map(note => (<React.Fragment key={note.id}>
                        <tr>
                            <td>{note.subject}</td>
                            <td>{note.id}</td>
                            <td>{moment(note.created_at).format('MM/DD/yyyy')}</td>
                            <td>{note.user_id.first_name} {note.user_id.last_name}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: 0 }} colSpan={4}>
                                <Accordion
                                    items={[{
                                        title: <span style={{ fontSize: '.8rem' }}>View Note</span>,
                                        content: note.description,
                                        expanded: false,
                                        id: note.id.toString(),
                                        headingLevel: 'h1'
                                    }]} />
                            </td>
                        </tr>
                    </React.Fragment>))}
                    {(!data || data.length === 0) && <tr>
                        <td colSpan={4}>No notes found.</td>
                    </tr>}
                </tbody>
            </Table>}

            <Modal id='notes-modal'
                aria-describedby='notes-modal'
                aria-labelledby='notes-modal'
                ref={modalRef}
                forceAction={true}
                style={{ padding: 0 }} isLarge={true}>
                <h1 id="modal-1-heading">
                    New Note
                </h1>
                <FormProvider {...methods}>
                    <NotesForm modalRef={modalRef} mutate={mutate} />
                </FormProvider>
            </Modal>
        </>
    )
}

export default Notes
