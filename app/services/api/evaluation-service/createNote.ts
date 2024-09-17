import axios from 'axios';
import { CreateNotePayload } from '../../types/evaluation-service/Note';

export async function createNote(url: string, {arg}: {arg: CreateNotePayload}) {
  await axios.post(url, arg)
}
