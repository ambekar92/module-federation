import { COMPLETE_EVALUATION_TASK } from '@/app/constants/routes';
import useSWRMutation from 'swr/mutation';
import { completeEvalTask } from '../api/evaluation-service/completeEvalTask';

export function useCompleteEvalTask() {
  return useSWRMutation(COMPLETE_EVALUATION_TASK, completeEvalTask, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data);
    },
    onError: (error) => {
      console.error('Failed to POST data:', error);
    }
  });
}
