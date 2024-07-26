import axios from 'axios'
import { API_ROUTE } from '../constants/routes'

const isServer = typeof window === 'undefined'

const cookiesInterceptor = async (req: any) => {
  if (isServer) {
    const { cookies } = (await import('next/headers'))
    req.headers['Authorization'] = `Bearer ${cookies().get('accesstoken')}`
  } else {
    const cookies = (await import('js-cookie'))
    req.headers['Authorization'] = `Bearer ${cookies.default.get('accesstoken')}`
  }
  return req
}

export const axiosInstance = axios.create({
  baseURL: API_ROUTE,
  timeout: 30 * 60_000, // 30 minutes
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

axiosInstance.interceptors.request.use(cookiesInterceptor)
axiosInstance.interceptors.response.use(cookiesInterceptor)
