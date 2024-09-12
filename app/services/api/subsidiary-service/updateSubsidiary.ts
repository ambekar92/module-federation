import { axiosInstance } from '../../axiosInstance';

export type UpdateSubsidiaryPayload = {
    document_type_id: number;
}

export async function updateSubsidiary(url: string, payload: UpdateSubsidiaryPayload) {
  await axiosInstance.put(url, payload);
}
