import useSWRMutation from 'swr/mutation';
import { createDocument } from '../../api/document-service/createDocument';
import { useDocuments } from '../../queries/document-service/useDocuments';
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes';

export function useCreateDocument(contributorId: number | null | undefined, entityId: number, userId: number, questionId: string) {
  const {mutate} = useDocuments({user_id: userId});

  return useSWRMutation(`${APPLICATION_DOCUMENTS_ROUTE}?application_contributor_id=${contributorId}&entity_id=${entityId}&upload_user_id=${userId}&question_id=${questionId}`, createDocument, {
    onSuccess: () => {
      mutate();
    },
    onError: (error) => {
      console.error('failed to save document', error)
    }
  })
}
