import { APPLICATION_CONTRIBUTOR_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { ApplicationContributorType } from '../types/responses'

const getApplicationContributorId = async(applicationId: number) => {
  const response = await fetcher<ApplicationContributorType>(`${APPLICATION_CONTRIBUTOR_ROUTE}?application_role_id=1&application_id=${applicationId}`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getApplicationContributorId
