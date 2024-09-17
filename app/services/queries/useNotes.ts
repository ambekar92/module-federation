import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { NoteListItem } from '../types/evaluation-service/Note';
import { NOTES_ROUTE } from '@/app/constants/local-routes';

export function useNotes() {
  const params = useParams<{application_id: string}>();
  return useSWR<NoteListItem[]>(`${NOTES_ROUTE}?application_id=${params.application_id}`)
}
