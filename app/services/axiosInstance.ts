import axios from 'axios'
import { API_ROUTE } from '../constants/routes'
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'
import { decrypt } from '@/app/shared/utility/encryption';

const isServer = typeof window === 'undefined'

const cookiesInterceptor = async (req: any) => {
  if (isServer) {
    const { cookies } = (await import('next/headers'))
    const access_token = cookies().get('accesstoken')
    const token = access_token ? decrypt(access_token.value) : undefined
    req.headers['Authorization'] = `Bearer ${token}`
  } else {
    const cookies = (await import('js-cookie'))
    const access_token = cookies.default.get('accesstoken')
    const token = access_token ? decrypt(access_token) : undefined
    req.headers['Authorization'] = `Bearer ${token}`
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

axiosInstance.interceptors.response.use(
  async (response) => {
    await cookiesInterceptor(response.config)
    return response
  },
  async (error) => {
    if (error.config) {
      await cookiesInterceptor(error.config)
    }
    return Promise.reject(error)
  }
)
