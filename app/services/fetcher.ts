/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import {API_ROUTE, GET_NOTIFICATION, GET_DOCUMENTS, GET_USER_PROFILE} from '../constants/routes'

export interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // Can vary based on structure
  message?: string // Message type for message that comes from empty response
}

export const axiosInstance = axios.create({
  baseURL: API_ROUTE,
  timeout: 30 * 60_000, // 30 minutes
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// API Response Error Handling
export const handleResponseError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const responseError = error.response
    if (responseError) {
      throw new Error(`HTTP error, status = ${responseError.status}`)
    }
  }
  throw new Error(`An unexpected error occurred: ${error}`)
}

// GET METHOD
export const fetcherGET = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(url)

    if (response.status < 200 || response.status >= 300 || response.status === 500) {
      handleResponseError(response);
    }

    return response.data // Valid response data returned here
  } catch (error) {
    handleResponseError(error)
  }

  throw new Error('fetcherGET reached an unexpected location in code.')
}

// POST METHOD
export const fetcherPOST = async (
  url: string,
  param: any,
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post<ApiResponse>(url, param)

    if (response.status < 200 || response.status >= 300) {
      handleResponseError(response)
    }

    return response.data // Valid response data returned here
  } catch (error) {
    handleResponseError(error)
  }

  throw new Error('fetcherPOST reached an unexpected location in code.')
}

// API to get notifications list
async function getNotifications(
  user_id: string | number,
): Promise<ApiResponse> {
  const api_url = GET_NOTIFICATION + '?user_id=' + user_id
  return fetcherGET(api_url)
}

// API to get getDocuments list
async function getDocuments(user_id: string | number): Promise<ApiResponse> {
  const api_url = GET_DOCUMENTS + '?user_id=' + user_id
  return fetcherGET(api_url)
}

// API to get user profile details
async function getUserProfileInfo(
  user_id: string | number,
): Promise<ApiResponse> {
  const api_url = GET_USER_PROFILE + user_id
  return fetcherGET(api_url)
}

const prototype = {
  getNotifications,
  getDocuments,
  getUserProfileInfo,
}

export default prototype
