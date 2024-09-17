import axios from 'axios';

export const closeApplicationTask = async (url: string, { arg }: { arg: any }) => {
  const response = await axios.post(url, arg);
  return response.data;
};
