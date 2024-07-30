import { axiosInstance } from '../../axiosInstance';

export const completeEvalTask = async (url: string, { arg }: { arg: any }) => { 
  const response = await axiosInstance.post(url, arg);
  return response.data;
};
