
import useSWR from 'swr';
import { DocumentUpload } from '../../types/document-service/DocumentUpload';
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';

export enum DocumentParams {
    user_id = 'user_id',
    application_id = 'application_id',
    application_section_id = 'application_section_id',
    sort_by = 'sort_by',
    sort_order = 'sort_order',
}

export function useDocuments(params?: {[key in DocumentParams]?: string | number}) {
  const qParams = params ? '?'+Object.entries(params).map(el => el.join('=')).join('&') : null;
  return useSWR<DocumentUpload[]>(`${APPLICATION_DOCUMENTS_ROUTE}${qParams}`);
}
