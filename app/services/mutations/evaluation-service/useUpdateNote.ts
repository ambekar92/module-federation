import useSWRMutation from 'swr/mutation';
import { useNotes } from '../../queries/evaluation-service/useNotes';
import { updateNote } from '../../api/evaluation-service/updateNote';
import { NOTES_ROUTE } from '@/app/constants/local-routes';

export function useUpdateNote() {
  const {mutate} = useNotes();

  return useSWRMutation(NOTES_ROUTE, updateNote, {
    onSuccess: () => {
      mutate()
    },
    onError: (error) => {
      console.error('failed to save note', error)
    }
  })
}
