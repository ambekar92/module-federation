import { APPLICATION_CONTRIBUTORS_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { ApplicationContributorType } from '../types/responses'

const getApplicationContributorId = async(applicationId: number) => {
  const response = await fetcher<ApplicationContributorType>(`${APPLICATION_CONTRIBUTORS_ROUTE}?application_id=${applicationId}`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getApplicationContributorId
