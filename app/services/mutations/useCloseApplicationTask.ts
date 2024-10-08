import useSWRMutation from 'swr/mutation';
import { closeApplicationTask } from '../api/evaluation-service/closeApplicationTask';
import { CLOSE_APPLICATION_ROUTE } from '@/app/constants/local-routes';

export function useCloseApplicationTask() {
  return useSWRMutation(CLOSE_APPLICATION_ROUTE, closeApplicationTask, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data);
    },
    onError: (error) => {
      console.error('Failed to POST data:', error);
    }
  });
}
