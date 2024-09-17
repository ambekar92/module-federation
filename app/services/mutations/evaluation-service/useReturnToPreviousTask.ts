
import { EVAL_RETURN_TO_PREV_TASK_ROUTE } from '@/app/constants/local-routes';
import useSWRMutation from 'swr/mutation';
import { returnToPreviousTask } from '../../api/evaluation-service/returnToPreviousTask';
import { useNotes } from '../../queries/evaluation-service/useNotes';

export function useReturnToPreviousTask(shouldMutate = true) {
  const {mutate} = useNotes();

  return useSWRMutation(EVAL_RETURN_TO_PREV_TASK_ROUTE, returnToPreviousTask, {
    onSuccess: () => {
      if (shouldMutate) {
        mutate();
      }
    },
    onError: (error) => {
      console.error('failed to save note', error)
    }
  })
}
