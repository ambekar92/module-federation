import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'

const fetcher = <T,>(url: string) =>
  axiosInstance.get<T>(url)
    .then(res => res.data)
    .catch(async error => {
      if (error.response && error.response.status === 401) {
        const okta_oauth2_issuer = process.env.NEXT_PUBLIC_LOGOUT_URL;
        const idToken = Cookies.get('idtoken');
        const post_logout_redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_POST_REDIRECT_URI || '');

        const cookiesToRemove = [
          'email_password_auth_token',
          'accesstoken',
          'idtoken',
          'next-auth.csrf-token',
          'next-auth.callback-url',
          'maxgov_auth_token'
        ];

        cookiesToRemove.forEach(cookieName => {
          Cookies.remove(cookieName, { path: '/' });
        });

        localStorage.clear();
        await signOut({ redirect: false });

        if (idToken) {
          const logout_url = `${okta_oauth2_issuer}/oauth2/default/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
          window.location.href = logout_url;
        } else {
          window.location.href = '/';
        }

        return new Promise(() => {});
      }
      throw error;
    });

export default fetcher;
