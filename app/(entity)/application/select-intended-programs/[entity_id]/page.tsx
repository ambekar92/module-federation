'use client'
import { APPLICATION_ELIGIBILITY_ROUTE, GET_APPLICATIONS_ROUTE, GET_ENTITIES_ROUTE } from '@/app/constants/local-routes'
import { sbaProgramOptions } from '@/app/constants/sba-programs'
import { Application, ApplicationEligibilityType } from '@/app/services/types/application-service/Application'
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip'
import { EntitiesType } from '@/app/shared/types/responses'
import { Suspense } from 'react'
import useSWR from 'swr'
import ClientSidePrograms from '../components/ClientSidePrograms'
import { useParams } from 'next/navigation'

export default function SelectIntendedProgramsPage() {
  const params = useParams<{entity_id: string}>()
  const { data: entityData, error } = useSWR<EntitiesType>(params.entity_id ? `${GET_ENTITIES_ROUTE}?id=${params.entity_id}`: null)
  const { data: applicationData, error: applicationError } = useSWR<Application[]>(params.entity_id ? `${GET_APPLICATIONS_ROUTE}?entity_id=${params.entity_id}&application_type_id=1` : null)
  const { data: eligibilityData, error: eligibilityError } = useSWR<ApplicationEligibilityType[]>(applicationData && applicationData.length > 0 && `${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${applicationData?.[applicationData?.length - 1]?.id}`)
  if (error || applicationError || eligibilityError) {
    return <div>Failed to load</div>
  }
  const initialSelectedPrograms = sbaProgramOptions.filter(program =>
    eligibilityData && eligibilityData.length > 0 && eligibilityData.some(item =>
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
}
