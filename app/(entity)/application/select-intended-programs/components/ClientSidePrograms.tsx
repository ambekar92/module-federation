'use client'

import { CREATE_APPLICATION_ROUTE } from '@/app/constants/local-routes'
import { ProgramOption } from '@/app/constants/sba-programs'
import { ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application } from '@/app/services/types/application-service/Application'
import ProgramCard from '@/app/shared/components/ownership/ProgramCard'
import { EntitiesType } from '@/app/shared/types/responses'
import { encrypt } from '@/app/shared/utility/encryption'
import { en } from '@faker-js/faker'
import { Button, Grid } from '@trussworks/react-uswds'
import axios from 'axios'
import cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface ClientSideProgramsProps {
  entityId: string
  initialSelectedPrograms: ProgramOption[]
  sbaProgramOptions: ProgramOption[]
  applicationData: Application[] | undefined,
  entityData: EntitiesType | undefined
}

export default function ClientSidePrograms({
  entityId,
  initialSelectedPrograms,
  sbaProgramOptions,
  applicationData,
  entityData
}: ClientSideProgramsProps) {
  const router = useRouter()
  const { data: session } = useSessionUCMS()
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>(initialSelectedPrograms)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isDisabled = useMemo(() => {
    if (!session || !entityData || entityData.length === 0 || !Array.isArray(entityData)) {return true;}
    const currentEntity = entityData.find(entity => entity.id === parseInt(entityId, 10));
    return session.user_id !== currentEntity?.owner_user_id;
  }, [session, entityData, entityId]);

  useEffect(() => {
    if (entityData && entityData.length > 0 && applicationData && applicationData.length > 0) {
      const cookieEntityData = [{ id: parseInt(entityId, 10) }]
      cookies.set('entityData', encrypt(JSON.stringify(cookieEntityData)))

      const lastApplication = applicationData[applicationData.length - 1]
      const cookieApplicationData = {
        id: lastApplication.id,
        progress: lastApplication.progress || 'Contributor Invitation',
        workflow_state: lastApplication.workflow_state || 'draft'
      }
      cookies.set('applicationData', encrypt(JSON.stringify([cookieApplicationData])))
      router.push(buildRoute(ASSIGN_DELEGATE_PAGE, { applicationId: lastApplication.id }))
    }
  }, [entityData, applicationData, entityId, router])

  const handleCheckboxChange = (program: ProgramOption) => {
    if (isDisabled) {return;}
    setSelectedPrograms((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === program.id)
      return isAlreadySelected
        ? prev.filter((p) => p.id !== program.id)
        : [...prev, program]
    })
  }

  const handleCardClick = (program: ProgramOption) => {
    if (isDisabled) {return;}
    handleCheckboxChange(program)
  }

  const handlePostRequest = async () => {
    if (!session || isDisabled) {return;}
    setIsSubmitting(true)
    try {
      const postData = {
        entity_id: entityId,
        application_type_id: 1,
        programs: selectedPrograms.map(program => program.id),
        workflow_state: 'draft',
        application_role_id: 1,
        user_id: session.user_id
      }

      const response = await axios.post(CREATE_APPLICATION_ROUTE, postData);
      router.push(buildRoute(ASSIGN_DELEGATE_PAGE, {applicationId: response.data.id}))
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Error creating application:', error);
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if(!entityData || entityData.length === 0 || !Array.isArray(entityData)) {
    return <p>No entity data</p>
  }

  return (
    <>
      <Grid row gap>
        {sbaProgramOptions.map((program, index) => (
          <Grid
            key={index}
            className="margin-bottom-2"
            desktop={{ col: 6 }}
            tablet={{ col: 12 }}
            mobile={{ col: 12 }}
          >
            <ProgramCard
              className={`height-full ${selectedPrograms.find((p) => p.name === program.name) ? 'blue-bg' : ''}`}
              program={program.name}
              description={program.description}
              details={program.details}
              input={
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  disabled={isDisabled}
                  checked={selectedPrograms.some((p) => p.name === program.name)}
                  onChange={(e) => {
                    e.stopPropagation()
                    handleCheckboxChange(program)
                  }}
                />
              }
              onClick={() => handleCardClick(program)}
            />
          </Grid>
        ))}
      </Grid>
      <div className="display-flex flex-justify margin-bottom-4">
        <Link
          href="/claim-your-business"
          className="usa-button usa-button--outline"
        >
          Back
        </Link>
        <Button
          type='button'
          className="usa-button"
          onClick={handlePostRequest}
          disabled={isSubmitting || isDisabled || selectedPrograms.length === 0}
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </Button>
      </div>
    </>
  )
}
