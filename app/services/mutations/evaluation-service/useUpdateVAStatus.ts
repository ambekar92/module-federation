import { HANDLE_VBA_STATUS } from '@/app/constants/routes';
import useSWRMutation from 'swr/mutation';
import { confirmVAStatus } from '../../api/evaluation-service/confirmVAStatus';

export function useUpdateVAStatus() {
  return useSWRMutation(HANDLE_VBA_STATUS, confirmVAStatus, {
    onSuccess: () => {

    },
    onError: (error) => {

    }
  })
}
