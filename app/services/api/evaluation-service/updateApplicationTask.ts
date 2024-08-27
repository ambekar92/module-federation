import { axiosInstance } from '../../axiosInstance';

export async function updateApplicationTask(url: string, {arg}: {arg: any}) {
  await axiosInstance.put(url, arg)
}
