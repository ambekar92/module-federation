import { CHANGE_APPLICATION_TIER_ROUTE } from '@/app/constants/routes';
import useSWRMutation from 'swr/mutation';
import { updateApplicationTask } from '../api/evaluation-service/updateApplicationTask';

export function useChangeTier() {
  return useSWRMutation(CHANGE_APPLICATION_TIER_ROUTE, updateApplicationTask, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}