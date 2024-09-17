import axios from 'axios';

export async function updateMakeRecommendation(url: string, {arg}: {arg: any}) {
  await axios.put(url, arg)
}

export async function uploadMakeRecommendationFile(url: string, {arg}: {arg: any}) {
  await axios.post(url, arg)
}
