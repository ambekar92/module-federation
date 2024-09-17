import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'

const fetcher = <T,>(url: string) =>
  axiosInstance.get<T>(url)
    .then(res => res.data)
    .catch(error => {
      throw new Error(error);
    })

export default fetcher;
