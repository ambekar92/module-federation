import axios from 'axios';
import { NewControllingEntityPayload, NewControllingEntityUserInfoPayload } from '../../types/entity-owned-service/NewControllingEntityPayload';

export async function createControllingEntity(url: string, {arg}: {arg: NewControllingEntityPayload}) {
  const response = await axios.post(url, arg);
  return response?.data;
}
export async function createControllingEntityUserInfo(url: string, {arg}: {arg: NewControllingEntityUserInfoPayload}) {
  await axios.post(url, arg)
}
