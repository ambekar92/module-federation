import { axiosInstance } from '../../axiosInstance';

export async function createDocument(url: string, payload: any) {

  await axiosInstance.post(url, payload, {headers: {'Content-Type': 'multipart/form-data'}})
}
