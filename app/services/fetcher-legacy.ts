/**
 * @file This entire file is deprecated and will be removed once we migrate the existing functions
 * to queries / mutations /api folders inside of current services folder.
 * Please use the new fetcher implementation located at fetcher file.
 */
import axios from 'axios';
import {
  GET_DOCUMENTS, GET_NOTIFICATION, USER_ROUTE, } from '../constants/routes'
import { axiosInstance as axiosWithAuth } from './axiosInstance';


interface ApiResponse<T> {
  data: T
  message?: string
}

/**
 * @deprecated use axiosInstance exported from services/fetcher.ts file.
 */
export const axiosInstance = axiosWithAuth;

/**
 * @deprecated
 */
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

/**
 * @deprecated use fetcher exported from services/fetcher.ts file.
 */
export const  fetcherGET = async <T>(url: string): Promise<T> => {
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

/**
 * @deprecated create a mutation hook inside of the mutations folder instead
 */
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
    handleResponseError(error);
    throw error;
  }
};

/**
 * @deprecated create a mutation hook inside of the mutations folder instead
 */
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

/**
 * @deprecated create a mutation hook inside of the mutations folder instead
 */
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
): Promise<{ data: any; message?: string }> {
  const api_url = GET_DOCUMENTS + '?user_id=' + user_id
  return fetcherGET(api_url)
}

// API to get user profile details
async function getUserProfileInfo(
  user_id: string | number,
): Promise<{ data: any; message?: string }> {
  const api_url = USER_ROUTE + '/' + user_id
  return fetcherGET(api_url)
}

const prototype = {
  getNotifications,
  getDocuments,
  getUserProfileInfo,
}

export default prototype
