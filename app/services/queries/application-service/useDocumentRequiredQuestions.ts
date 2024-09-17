
import useSWR from 'swr';
import { DocumentRequiredQuestions } from '../../types/application-service/DocumentRequiredQuestions';
import { REQUIRED_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';

export function useDocumentRequiredQuestions(contributorId: number | undefined | null) {
  return useSWR<DocumentRequiredQuestions[]>( contributorId ? `${REQUIRED_DOCUMENTS_ROUTE}/${contributorId}` : null)
}
