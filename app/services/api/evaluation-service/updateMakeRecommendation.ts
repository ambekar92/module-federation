import { axiosInstance } from "../../axiosInstance";

export async function updateMakeRecommendation(url: string, {arg}: {arg: any}) {
    await axiosInstance.put(url, arg)
}

export async function uploadMakeRecommendationFile(url: string, {arg}: {arg: any}) {
    await axiosInstance.post(url, arg)
}