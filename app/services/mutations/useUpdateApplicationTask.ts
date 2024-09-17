import { APPLICATION_ROUTES } from '@/app/constants/local-routes';
import useSWRMutation from 'swr/mutation';
import { updateApplicationTask } from '../api/evaluation-service/updateApplicationTask';
import { useNotes } from '../queries/useNotes';

export function useUpdateApplicationTask() {
  const {mutate} = useNotes();

  return useSWRMutation(APPLICATION_ROUTES, updateApplicationTask, {
    onSuccess: (data, key, config) => {
      mutate()
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}
