import { axiosInstance } from '../../axiosInstance';

export const closeApplicationTask = async (url: string, { arg }: { arg: any }) => {
  const response = await axiosInstance.post(url, arg);
  return response.data;
};
