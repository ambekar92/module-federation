import { axiosInstance } from "../../axiosInstance";
import { UpdateNotePayload } from "../../types/evaluation-service/Note";

export async function updateNote(url: string, {arg}: {arg: UpdateNotePayload}) {
    await axiosInstance.put(url, arg)
}