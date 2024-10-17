import { ENTITY_INVITATION_ROUTE, PARENT_ENTITY_ROUTE } from '@/app/constants/local-routes';
import useSWRMutation from 'swr/mutation';
import { createControllingEntity, createControllingEntityUserInfo } from '../../api/entity-owned-service/createControllingEntity';

export function useCreateControllingEntity() {
  return useSWRMutation(PARENT_ENTITY_ROUTE, createControllingEntity);
}

export function useCreateControllingEntityUserInfo() {
  return useSWRMutation(ENTITY_INVITATION_ROUTE, createControllingEntityUserInfo);
}
