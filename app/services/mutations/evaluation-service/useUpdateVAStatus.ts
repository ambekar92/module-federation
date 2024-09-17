import useSWRMutation from 'swr/mutation';
import { confirmVAStatus } from '../../api/evaluation-service/confirmVAStatus';
import { HANDLE_VBA_STATUS } from '@/app/constants/local-routes';

export function useUpdateVAStatus() {
  return useSWRMutation(HANDLE_VBA_STATUS, confirmVAStatus, {
    onSuccess: () => {

    },
    onError: (error) => {

    }
  })
}
