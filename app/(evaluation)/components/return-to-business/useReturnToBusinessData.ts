import { DRAFT_RTF_ITEMS_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';

export const useReturnToBusinessData = (application_id: string) => {
  const { data: draftData, error } = useFetchOnce<IRTFItems[]>(`${DRAFT_RTF_ITEMS_ROUTE}/${application_id}`, fetcher);
  const { data: reasonCodes, error: reasonError } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher);

  const isLoading = !draftData || !reasonCodes;
  const hasError = error || reasonError;

  return { isLoading, hasError, draftData, reasonCodes };
};
