import { NOTES_ROUTE } from '@/app/constants/routes';
import useSWRMutation from 'swr/mutation';
import { useNotes } from '../../queries/evaluation-service/useNotes';
import { createNote } from '../../api/evaluation-service/createNote';

export function useCreateNote(shouldMutate = true) {
  const {mutate} = useNotes();
  return useSWRMutation(NOTES_ROUTE, createNote, {
    onSuccess: () => {
      if (shouldMutate) {
        mutate();
      }
    },
    onError: (error) => {
      console.error('failed to save note', error);
    }
  });
}
