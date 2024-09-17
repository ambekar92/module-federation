import { API_ROUTE, ENTITIES_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { sbaProgramOptions } from '@/app/constants/sba-programs'
import { axiosInstance } from '@/app/services/axiosInstance'
import { Application, ApplicationEligibilityType } from '@/app/services/types/application-service/Application'
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip'
import { EntitiesType } from '@/app/shared/types/responses'
import { Suspense } from 'react'
import ClientSidePrograms from '../components/ClientSidePrograms'

const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`

async function getServerSideData(entityId: string) {
  try {
    const [entityData, applicationData] = await Promise.all([
      axiosInstance.get<EntitiesType>(`${ENTITIES_ROUTE}?id=${entityId}`),
      axiosInstance.get<Application[]>(`${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}&application_type_id=1`),
    ])

    let eligibilityData: ApplicationEligibilityType[] | [] = []
    if (applicationData.data.length > 0) {
      const lastApplicationId = applicationData.data[applicationData.data.length - 1].id
      eligibilityData = await axiosInstance.get<ApplicationEligibilityType[]>(`${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${lastApplicationId}`).then(res => res.data)
    }

    return { entityData: entityData.data, applicationData: applicationData.data, eligibilityData }
  } catch (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error in Select Intended Programs getServerSideData:', error)
    }
    throw error
  }
}

export default async function SelectIntendedProgramsPage({ params }: { params: { entity_id: string } }) {
  try {
    const { entityData, applicationData, eligibilityData } = await getServerSideData(params.entity_id)
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
            entityData={entityData}
            entityId={params.entity_id}
            initialSelectedPrograms={initialSelectedPrograms}
            sbaProgramOptions={sbaProgramOptions}
            applicationData={applicationData}
          />
        </Suspense>
      </>
    )
  } catch (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error in Select Intended Programs:', error)
    }
    return <div>An error occurred while loading the page. Please try again later.</div>
  }
}
