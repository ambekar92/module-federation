import { axiosInstance } from './axiosInstance';

const fetcher = <T,>(url: string) => axiosInstance.get<T>(url).then(res => res.data);

export default fetcher;
