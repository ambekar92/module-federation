import { axiosInstance } from '../../axiosInstance';

export type DeleteDocumentPayload = {
    document_id: number | string;
}

export async function deleteDocument(url: string, {arg}: {arg: DeleteDocumentPayload}) {

  await axiosInstance.delete(url, {data: arg});
}
