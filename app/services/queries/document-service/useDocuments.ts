import useSWR from 'swr';
import { DocumentUpload } from '../../types/document-service/DocumentUpload';
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';

export enum DocumentParams {
  user_id = 'user_id',
  application_id = 'application_id',
  application_section_id = 'application_section_id',
  sort_by = 'sort_by',
  sort_order = 'sort_order',
  application_contributor_id = 'application_contributor_id',
}

export function useDocuments(params?: Partial<Record<DocumentParams, string | number | null>>) {
  const filteredParams = params
    ? Object.fromEntries(
      Object.entries(params)
        .filter(([key, value]) => value !== null && value !== undefined)
    )
    : {};
  const queryString = Object.keys(filteredParams).length > 0
    ? '?' + new URLSearchParams(filteredParams as Record<string, string>).toString()
    : '';

  const shouldFetch = params?.application_contributor_id !== null;

  return useSWR<DocumentUpload[]>(
    shouldFetch ? `${APPLICATION_DOCUMENTS_ROUTE}${queryString}` : null
  );
}
