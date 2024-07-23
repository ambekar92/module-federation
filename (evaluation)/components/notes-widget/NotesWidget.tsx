'use client'
import { NOTES_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Note, Params } from '../../types/types'
import NotesForm from '../notes-form/NotesForm'
import { NoteType, schema } from '../notes-form/schema'

function NotesWidget() {
  const params = useParams<Params>();
  const methods = useForm<NoteType>({
    resolver: zodResolver(schema),
    defaultValues: {description: '', subject: ''},
    shouldUnregister: true
});
  const { mutate } = useSWR<Note[]>(`${NOTES_ROUTE}?application_id=${params.application_id}`, fetcherGET);

  return (
    <FormProvider {...methods}>
      <NotesForm mutate={mutate} showCancelBtn={false} createText='Add Note' />
    </FormProvider>
  )
}

export default NotesWidget
