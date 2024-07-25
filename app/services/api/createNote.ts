import { axiosInstance } from "../fetcher";
import { NoteBase } from "../types/notes";

export async function createNote(url: string, {arg}: {arg: NoteBase}) {
    await axiosInstance.post(url, arg)
}