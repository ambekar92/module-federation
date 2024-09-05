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
    const token = access_token ? decrypt(access_token) : undefined
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
    if (error.response && error.response.status !== 404) {
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.log('API Error: Log user out due to API return error')
        console.log('API Error status', error.response.status)
      }
      const okta_oauth2_issuer = process.env.NEXT_PUBLIC_LOGOUT_URL;
      const encpytedIdToken = Cookies.get('idtoken');
      const idToken = encpytedIdToken ? decrypt(encpytedIdToken) : undefined;
      const post_logout_redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_POST_REDIRECT_URL || '');

      const cookiesToRemove = [
        'email_password_auth_token',
        'accesstoken',
        'idtoken',
        'next-auth.csrf-token',
        'next-auth.callback-url',
        'maxgov_auth_token',
        'firstPermission',
        'lastPermission',
      ];

      cookiesToRemove.forEach(cookieName => {
        Cookies.remove(cookieName, { path: '/' });
      });

      localStorage.clear();

      await signOut({ redirect: false });

      // Log out of Okta Session
      if (idToken) {
        const logout_url = `${okta_oauth2_issuer}/oauth2/default/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
        window.location.href = logout_url;
      } else {
        window.location.href = '/';
      }

      return new Promise(() => {});
    }

    if (error.config) {
      await cookiesInterceptor(error.config)
    }
    return Promise.reject(error)
  }
)
