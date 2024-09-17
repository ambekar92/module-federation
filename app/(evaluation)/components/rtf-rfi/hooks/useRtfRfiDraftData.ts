import { DRAFT_RFI_ROUTE, DRAFT_RTF_ROUTE, REASON_CODES_ROUTE } from '@/app/constants/local-routes';
import { ReasonCode } from '@/app/services/types/evaluation-service/ReasonCodes';
import { IRTFItems } from '@/app/services/types/evaluation-service/RTFItems';
import useSWR from 'swr';

export const useRtfRfiDraftData = (application_id: string, permission: string) => {
  const { data: draftData, error, mutate } = useSWR<IRTFItems[]>(`${permission === 'screener' ? DRAFT_RTF_ROUTE : DRAFT_RFI_ROUTE}/${application_id}`);
  const { data: reasonCodes, error: reasonError } = useSWR<ReasonCode[]>(REASON_CODES_ROUTE);

  const isLoading = !draftData || !reasonCodes;
  const hasError = error || reasonError;

  return { isLoading, hasError, draftData, reasonCodes, mutate };
};
