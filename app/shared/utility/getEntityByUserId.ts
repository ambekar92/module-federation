import { GET_ENTITIES_ROUTE } from '@/app/constants/local-routes'
import { superFetcher } from '@/app/services/superFetcher'
import { EntitiesType } from '../types/responses'

const getEntityByUserId = async(userId: number) => {
  const response = await superFetcher(`${GET_ENTITIES_ROUTE}?owner_user_id=${userId}`)

  // For testing purposes
  // const response = await fetcherGET<EntitiesType>(`${ENTITIES_ROUTE}?owner_user_id=14`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getEntityByUserId

export const getEntityByDelegateId = async (userId: number): Promise<EntitiesType> => {
  const response = await superFetcher(`${GET_ENTITIES_ROUTE}?delegate_user_id=${userId}`);
  if (response && Array.isArray(response)) {
    return response;
  } else {
    return [];
  }
}
