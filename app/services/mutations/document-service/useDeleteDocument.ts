import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';
import useSWRMutation from 'swr/mutation';
import { deleteDocument } from '../../api/document-service/deleteDocument';

export function useDeleteDocument() {
  return useSWRMutation(`${APPLICATION_DOCUMENTS_ROUTE}`, deleteDocument, {
    onError: (error) => {
      console.error('failed to save document', error)
    }
  })
}
