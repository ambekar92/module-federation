import { axiosInstance } from '../../axiosInstance';
import { CreateNotePayload } from '../../types/evaluation-service/Note';

export async function createNote(url: string, {arg}: {arg: CreateNotePayload}) {
  await axiosInstance.post(url, arg)
}
