import { DOCUMENT_ROUTE } from '@/app/constants/routes';
import useSWRMutation from 'swr/mutation';
import { deleteDocument } from '../../api/document-service/deleteDocument';

export function useDeleteDocument() {
  return useSWRMutation(`${DOCUMENT_ROUTE}`, deleteDocument, {
    onError: (error) => {
      console.error('failed to save document', error)
    }
  })
}
