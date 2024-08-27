import { axiosInstance } from '../../axiosInstance';

export type UpdateDocumentPayload = {
    document_type_id: number;
}

export async function updateDocument(url: string, payload: UpdateDocumentPayload) {
  await axiosInstance.put(url, payload);
}
