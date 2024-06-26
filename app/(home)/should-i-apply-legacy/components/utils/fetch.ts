import { axiosInstance } from '@/app/services/fetcher';
import { NaicsCodeType } from './types';

export const naicsFetcherGET = async (url: string): Promise<NaicsCodeType[]> => {
  const response = await axiosInstance.get<NaicsCodeType[]>(url);

  if (response.status >= 200 && response.status < 300) {
    return response.data; // Successfully returning data
  } else {
    throw new Error('API call unsuccessful');
  }
}
