import axios from 'axios';

export async function updateApplicationTask(url: string, {arg}: {arg: any}) {
  await axios.put(url, arg)
}
