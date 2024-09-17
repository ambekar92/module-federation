import { COMPLETE_EVAL_TASK_ROUTE } from '@/app/constants/local-routes';
import useSWRMutation from 'swr/mutation';
import { completeEvalTask } from '../api/evaluation-service/completeEvalTask';

export function useCompleteEvalTask() {
  return useSWRMutation(COMPLETE_EVAL_TASK_ROUTE, completeEvalTask, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data);
    },
    onError: (error) => {
      console.error('Failed to POST data:', error);
    }
  });
}
