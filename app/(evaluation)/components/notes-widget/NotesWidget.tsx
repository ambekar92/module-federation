'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import NotesForm from '../notes-form/NotesForm'
import { NoteType, schema } from '../notes-form/schema'
import { useNotes } from '@/app/services/queries/useNotes'

function NotesWidget() {
  const methods = useForm<NoteType>({
    resolver: zodResolver(schema),
    defaultValues: {description: '', subject: ''},
    shouldUnregister: true
});
  const { mutate } = useNotes()

  return (
    <FormProvider {...methods}>
      <NotesForm mutate={mutate} createText='Add Note' richTextEditorSize='sm' />
    </FormProvider>
  )
}

export default NotesWidget
