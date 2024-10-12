import { UPDATE_PROFILE_ROUTE } from '@/app/constants/local-routes';
import { UpdateProfilePayloadType } from '@/app/services/types/user-service/User';
import axios from 'axios';

export async function updateUserProfile(payload: UpdateProfilePayloadType) {
  await axios.put(UPDATE_PROFILE_ROUTE, payload)
  return true
}
