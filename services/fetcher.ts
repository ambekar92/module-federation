/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import {
  API_ROUTE,
  GET_NOTIFICATION,
  GET_DOCUMENTS,
  GET_USER_PROFILE,
} from '../constants/routes'
import { DocumentsType } from './types/document'

interface ApiResponse<T> {
  data: T
  message?: string
}

// Axios instance
export const axiosInstance = axios.create({
  baseURL: API_ROUTE,
  timeout: 30 * 60_000, // 30 minutes
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export const handleResponseError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseError = error.response
    if (responseError) {
      throw new Error(`HTTP error, status = ${responseError.status}`)
    }
  }
  // Handle non-Axios errors or other issues
  throw new Error(
    `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
  )
}

// GET fetcher
export const fetcherGET = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('API call unsuccessful')
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw new Error(error.response?.data.message || 'API error occurred')
      throw new Error('API error occurred')
    }
    throw error
  }
}

// POST fetcher
export const fetcherPOST = async <T>(url: string, data: any, options?: { headers?: { 'Content-Type'?: string } }): Promise<T> => {
  try {
    let headers = options?.headers || {};
    if (data instanceof FormData) {
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data',
      };
    } else if (!headers['Content-Type']) {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      };
    }
    const response = await axiosInstance.post<T>(url, data, { headers });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || `HTTP error, status = ${error.response.status}`);
    }
    handleResponseError(error);
  }
};

// PUT fetcher
export const fetcherPUT = async <T>(url: string, param: any): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(url, param)
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error, status = ${response.status}`)
    }
    return response.data
  } catch (error) {
    handleResponseError(error)
    throw error
  }
}

// DELETE fetcher
export const fetcherDELETE = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, { data });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.data.data;
  } catch (error) {
    handleResponseError(error);
    throw error;
  }
};

// API to get notifications list
async function getNotifications(
  user_id: string | number,
): Promise<{ data: any; message?: string }> {
  const api_url = GET_NOTIFICATION + '?user_id=' + user_id
  return fetcherGET(api_url)
}

// API to get getDocuments list
async function getDocuments(
  user_id: string | number,
): Promise<{ data: DocumentsType; message?: string }> {
  // const api_url = GET_DOCUMENTS + '?user_id=' + user_id
  const api_url = GET_DOCUMENTS + '?user_id=8'
  return fetcherGET(api_url)
}

// API to get user profile details
async function getUserProfileInfo(
  user_id: string | number,
): Promise<{ data: any; message?: string }> {
  const api_url = GET_USER_PROFILE + user_id
  return fetcherGET(api_url)
}

const prototype = {
  getNotifications,
  getDocuments,
  getUserProfileInfo,
}

export default prototype