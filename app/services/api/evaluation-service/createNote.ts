import { axiosInstance } from "../../fetcher";
import { NoteBase } from "../../types/evaluation-service/Note";

export async function createNote(url: string, {arg}: {arg: NoteBase}) {
    await axiosInstance.post(url, arg)
}