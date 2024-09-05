import { RFI_REQUEST_ROUTE, RTF_REQUEST_ROUTE } from '@/app/constants/routes';
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems';
import useSWR from 'swr';

export const useRtfRequestData = (application_id: string, permission: string) => {
  const { data: requestData, error, mutate } = useSWR<IRTFRequestItem[]>(permission === 'screener' ? `${RTF_REQUEST_ROUTE}/${application_id}` : `${RFI_REQUEST_ROUTE}/${application_id}`);
  const { data: reasonCodes, error: reasonError } = useSWR<ReasonCode[]>(REASON_CODE_ROUTE);

  const isLoading = !requestData || !reasonCodes;
  const hasError = error || reasonError;

  return { isLoading, hasError, requestData, reasonCodes, mutate };
};
