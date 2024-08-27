import { DRAFT_RTF_ITEMS_ROUTE, RFI_DRAFT_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { REASON_CODE_ROUTE, ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import useSWR from 'swr';

export const useRtfRfiDraftData = (application_id: string, permission: string) => {
  const { data: draftData, error, mutate } = useSWR<IRTFItems[]>(`${permission === 'screener' ? DRAFT_RTF_ITEMS_ROUTE : RFI_DRAFT_ROUTE}/${application_id}`, fetcher);
  const { data: reasonCodes, error: reasonError } = useFetchOnce<ReasonCode[]>(REASON_CODE_ROUTE, fetcher);

  const isLoading = !draftData || !reasonCodes;
  const hasError = error || reasonError;

  return { isLoading, hasError, draftData, reasonCodes, mutate };
};