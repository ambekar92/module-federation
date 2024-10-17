import axios from 'axios';

export async function updateSubsidiary(url: string, payload:any) {
  await axios.put(url, payload);
}
