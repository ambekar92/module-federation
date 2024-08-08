import { RFI_REQUEST_ROUTE, RTF_REQUEST_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';
import { IRTFRequestItem } from '@/app/services/types/evaluation-service/RTFItems';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';

export const useRtfRequestData = (application_id: string, permission: string) => {
  const { data: requestData, error, mutate } = useFetchOnce<IRTFRequestItem[]>(permission === 'screener' ? `${RTF_REQUEST_ROUTE}/${application_id}` : `${RFI_REQUEST_ROUTE}/${application_id}`, fetcher);
  const { data: reasonCodes, error: reasonError } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher);

  const isLoading = !requestData || !reasonCodes;
  const hasError = error || reasonError;

  return { isLoading, hasError, requestData, reasonCodes, mutate };
};
