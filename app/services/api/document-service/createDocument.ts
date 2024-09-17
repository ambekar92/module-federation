import axios from 'axios';

export async function createDocument(url: string, payload: any) {

  await axios.post(url, payload, {headers: {'Content-Type': 'multipart/form-data'}})
}
