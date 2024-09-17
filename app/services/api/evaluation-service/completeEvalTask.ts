import axios from 'axios';

export const completeEvalTask = async (url: string, { arg }: { arg: any }) => {
  const response = await axios.post(url, arg);
  return response.data;
};
