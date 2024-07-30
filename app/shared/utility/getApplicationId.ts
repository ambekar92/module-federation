import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { ApplicationsType } from '../types/responses'

const getApplicationId = async(entityId: number) => {
  const response = await fetcher<ApplicationsType>(`${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}&application_type_id=1`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getApplicationId
