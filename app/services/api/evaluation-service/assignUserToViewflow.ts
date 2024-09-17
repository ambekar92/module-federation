import { ASSIGN_USER_VIEWFLOW_ROUTE } from '@/app/constants/local-routes';
import axios from 'axios';

export async function assignUserToViewflow(payload: AssignUserToViewflowPayload) {
  await axios.put(ASSIGN_USER_VIEWFLOW_ROUTE, payload)
}
