'use client'

import { CREATE_APPLICATION_ROUTE } from '@/app/constants/local-routes'
import { ProgramOption } from '@/app/constants/sba-programs'
import { ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application } from '@/app/services/types/application-service/Application'
import ProgramCard from '@/app/shared/components/ownership/ProgramCard'
import { EntitiesType } from '@/app/shared/types/responses'
import { encrypt } from '@/app/shared/utility/encryption'
import { Button, Grid } from '@trussworks/react-uswds'
import axios from 'axios'
import cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  }, [])
  const handleCheckboxChange = (program: ProgramOption) => {
    setSelectedPrograms((prev) => {
      let newSelection = [...prev]
      const isAlreadySelected = newSelection.find((p) => p.id === program.id)

      if (isAlreadySelected) {
        newSelection = newSelection.filter((p) => p.id !== program.id)
      } else {
        newSelection.push(program)

        // Handle mutually exclusive selections
        // if (program.id === 6) { // EDWOSB
        //   newSelection = newSelection.filter((p) => p.id !== 3) // Removes WOSB if EDWOSB is selected
        // } else if (program.id === 3) { // WOSB
        //   newSelection = newSelection.filter((p) => p.id !== 6) // Removes EDWOSB if WOSB is selected
        // } else if (program.id === 5) { // SDVOSB
        //   newSelection = newSelection.filter((p) => p.id !== 4) // Removes VOSB if SDVOSB is selected
        // } else if (program.id === 4) { // VOSB
        //   newSelection = newSelection.filter((p) => p.id !== 5) // Removes SDVOSB if VOSB is selected
        // }
      }

      return newSelection
    })
  }

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program)
  }

  const handlePostRequest = async () => {
    if(!session) {return}
    setIsSubmitting(true)
    try {
      const postData = {
        entity_id: entityId,
        application_type_id: 1,
        programs: selectedPrograms.map(program => program.id),
        workflow_state: 'draft',
        application_role_id: 1,
        user_id: session?.user_id
      }

      const response = await axios.post(CREATE_APPLICATION_ROUTE, postData);
      router.push(buildRoute(ASSIGN_DELEGATE_PAGE, {applicationId: response.data.id}))
    } catch (error) {
      // Error handled lol -KJ
    } finally {
      setIsSubmitting(false)
    }
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
                  checked={selectedPrograms.some(
                    (p) => p.name === program.name,
                  )}
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
        {selectedPrograms.length === 0 ? (
          <Button disabled type="button">
            Next
          </Button>
        ) : (
          <Button
            type='button'
            className="usa-button"
            onClick={handlePostRequest}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        )}
      </div>
    </>
  )
}
