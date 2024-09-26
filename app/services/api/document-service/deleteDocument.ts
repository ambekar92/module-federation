import axios from 'axios';

export type DeleteDocumentPayload = {
  document_id: number;
}

export async function deleteDocument(url: string, { arg }: { arg: DeleteDocumentPayload }) {
  await axios.delete(url, { data: arg });
}
