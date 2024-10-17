import axios from 'axios';

export async function createSubsidiary(url: string, payload: any) {
  await axios.post(url, payload, {headers: {'Content-Type': 'multipart/form-data'}})
}
