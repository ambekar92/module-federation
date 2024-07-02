import { ENTITIES_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { EntitiesType } from '../types/responses'

const getEntityByUserId = async(userId: number) => {
  const response = await fetcherGET<EntitiesType>(`${ENTITIES_ROUTE}?owner_user_id=${userId}`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getEntityByUserId
