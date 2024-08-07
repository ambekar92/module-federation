import { ENTITIES_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { EntitiesType } from '../types/responses'

const getEntityByUserId = async(userId: number) => {
  const response = await fetcher<EntitiesType>(`${ENTITIES_ROUTE}?owner_user_id=${userId}`)

  // For testing purposes
  // const response = await fetcherGET<EntitiesType>(`${ENTITIES_ROUTE}?owner_user_id=14`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getEntityByUserId
