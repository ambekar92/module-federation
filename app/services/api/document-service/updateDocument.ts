import axios from 'axios';

export type UpdateDocumentPayload = {
    document_type_id: number;
}

export async function updateDocument(url: string, payload: UpdateDocumentPayload) {
  await axios.put(url, payload);
}
