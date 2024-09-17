import { APPLICATION_CONTRIBUTORS_ROUTE } from '@/app/constants/local-routes'
import { superFetcher } from '@/app/services/superFetcher'

const getApplicationContributorId = async(applicationId: number) => {
  const response = await superFetcher(`${APPLICATION_CONTRIBUTORS_ROUTE}?application_id=${applicationId}`)

  if(response) {
    return (response)
  } else {
    return;
  }
}
export default getApplicationContributorId
