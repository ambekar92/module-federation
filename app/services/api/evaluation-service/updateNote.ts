import axios from 'axios';
import { UpdateNotePayload } from '../../types/evaluation-service/Note';

export async function updateNote(url: string, {arg}: {arg: UpdateNotePayload}) {
  await axios.put(url, arg)
}
