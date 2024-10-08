import axios from 'axios';
import { ReturnToPreviousTaskPayload } from '../../types/evaluation-service/ReturnToPreviousTask';

export async function returnToPreviousTask(url: string, {arg}: {arg: ReturnToPreviousTaskPayload}) {
  await axios.post(url, arg)
}
