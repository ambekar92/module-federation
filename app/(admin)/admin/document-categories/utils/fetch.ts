import { axiosInstance } from '@/app/services/axiosInstance'

export const documentCategoriesFetcherGET = async (
  url: string,
): Promise<[]> => {
  const response = await axiosInstance.get<[]>(url)

  if (response.status >= 200 && response.status < 300) {
    return response.data // Successfully returning data
  } else {
    throw new Error('API call unsuccessful')
  }
}
