import { API_ROUTE, ENTITIES_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { sbaProgramOptions } from '@/app/constants/sba-programs'
import { ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url'
import { axiosInstance } from '@/app/services/axiosInstance'
import { Application, ApplicationEligibilityType } from '@/app/services/types/application-service/Application'
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip'
import { EntitiesType } from '@/app/shared/types/responses'
import { decrypt, encrypt } from '@/app/shared/utility/encryption'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import ClientSidePrograms from './ClientSidePrograms'

const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`

async function getServerSideData(entityId: string) {
  const cookieStore = cookies()
  const access_token = cookieStore.get('accesstoken')?.value

  const headers = {
    Authorization: `Bearer ${access_token ? decrypt(access_token) : undefined}`
  }

  const [entityData, applicationData] = await Promise.all([
    axiosInstance.get<EntitiesType>(`${ENTITIES_ROUTE}?id=${entityId}`, { headers }),
    axiosInstance.get<Application[]>(`${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}&application_type_id=1`, { headers })
  ])

  let eligibilityData: ApplicationEligibilityType[] | [] = []
  if (applicationData.data.length > 0) {
    const lastApplicationId = applicationData.data[applicationData.data.length - 1].id
    eligibilityData = await axiosInstance.get<ApplicationEligibilityType[]>(
      `${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${lastApplicationId}`,
      { headers }
    ).then(res => res.data)
  }

  return { entityData: entityData.data, applicationData: applicationData.data, eligibilityData }
}

export default async function Programs({ params }: { params: { entity_id: string } }) {
  const { entityData, applicationData, eligibilityData } = await getServerSideData(params.entity_id)

  if (entityData && entityData.length > 0 && applicationData && applicationData.length > 0) {
    const cookieEntityData = [{ id: parseInt(params.entity_id, 10) }]
    cookies().set('entityData', encrypt(JSON.stringify(cookieEntityData)))

    const lastApplication = applicationData[applicationData.length - 1]
    const cookieApplicationData = {
      id: lastApplication.id,
      progress: lastApplication.progress || 'Contributor Invitation',
      workflow_state: lastApplication.workflow_state || 'draft'
    }
    cookies().set('applicationData', encrypt(JSON.stringify([cookieApplicationData])))
    redirect(buildRoute(ASSIGN_DELEGATE_PAGE, { applicationId: lastApplication.id }))
  }

  const initialSelectedPrograms = sbaProgramOptions.filter(program =>
    eligibilityData.some(item =>
      item.program === program.id && item.intending_to_apply
    )
  )

  return (
    <>
      <h1>Select Intended Program(s) for Application<TooltipIcon text='Select the Radio Button for each certification you wish to apply for. When you select the "visit here" link, a new window opens with detailed information about the selected program. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.'/></h1>
      <h3>
        Please select the appropriate program(s) you wish to apply for from the
        options below.
      </h3>
      <Suspense fallback={<div>Loading programs...</div>}>
        <ClientSidePrograms
          entityId={params.entity_id}
          initialSelectedPrograms={initialSelectedPrograms}
          sbaProgramOptions={sbaProgramOptions}
        />
      </Suspense>
    </>
  )
}
