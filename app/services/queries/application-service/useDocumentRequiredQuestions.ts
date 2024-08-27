import { DOCUMENT_REQUIRED_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import fetcher from '../../fetcher';
import { DocumentRequiredQuestions } from '../../types/application-service/DocumentRequiredQuestions';

export function useDocumentRequiredQuestions(applicationContributorId: number | undefined | null) {
  return useSWR<DocumentRequiredQuestions[]>( applicationContributorId ? `${DOCUMENT_REQUIRED_ROUTE}/${applicationContributorId}` : null, fetcher)
}
