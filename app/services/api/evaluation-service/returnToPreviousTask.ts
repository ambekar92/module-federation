import { axiosInstance } from '../../axiosInstance';
import { ReturnToPreviousTaskPayload } from '../../types/evaluation-service/ReturnToPreviousTask';

export async function returnToPreviousTask(url: string, {arg}: {arg: ReturnToPreviousTaskPayload}) {
  await axiosInstance.post(url, arg)
}
