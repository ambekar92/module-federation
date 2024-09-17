import axios from 'axios';
import { ConfirmVeteranStatusPayload } from '../../types/evaluation-service/ConfirmVAStatus';

export async function confirmVAStatus(url: string, {arg}: {arg: ConfirmVeteranStatusPayload}) {
  await axios.put(url, arg)
}
