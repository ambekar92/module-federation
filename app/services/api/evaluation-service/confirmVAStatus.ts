import { axiosInstance } from '../../axiosInstance';
import { ConfirmVeteranStatusPayload } from '../../types/evaluation-service/ConfirmVAStatus';

export async function confirmVAStatus(url: string, {arg}: {arg: ConfirmVeteranStatusPayload}) {
  await axiosInstance.put(url, arg)
}
