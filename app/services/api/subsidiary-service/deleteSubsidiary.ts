import { axiosInstance } from '../../axiosInstance';

export type DeleteSubsidiaryPayload = {
    document_id: number | string;
}

export async function deleteSubsidiary(url: string, {arg}: {arg: DeleteSubsidiaryPayload}) {

  await axiosInstance.delete(url, {data: arg});
}
