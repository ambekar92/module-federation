'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherPOST } from '@/app/services/fetcher'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import { Button, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useState } from 'react'
import {
  ProgramOption,
  sbaProgramOptions,
} from '../../../constants/sba-programs'
import ProgramCard from '../../../shared/components/ownership/ProgramCard'

function Programs() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([])
  const { userId, entityId } = useApplicationId();

  const handlePostRequest = async () => {
    try {
      if(userId) {
        const postData = {
          entity_id: entityId,
          application_type_id: 1,
          programs: selectedPrograms.map(program => program.id),
          workflow_state: 'draft',
          application_role_id: 1,
          user_id: userId
        };

        await fetcherPOST(`${FIRM_APPLICATIONS_ROUTE}`, postData);

        // Uncomment below to see response
        // console.log(postData)
        // const response = await fetcherPOST(`${FIRM_APPLICATIONS_ROUTE}`, postData);
        // console.log('POST Response:', response);

        window.location.href = '/assign-a-delegate';
      }
    } catch (error) {
      console.log('Error in POST request:', error);
      alert(error);
    }
  };

  const handleCheckboxChange = (program: ProgramOption) => {
    setSelectedPrograms((prev) => {
      const isAlreadySelected = prev.find((p) => p.name === program.name)
      if (isAlreadySelected) {
        return prev.filter((p) => p.name !== program.name)
      } else {
        return [...prev, program]
      }
    })
  }

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program)
  }

  return (
    <>
      <h1>Select Intended Program(s) for Application</h1>
      <h3>
        Please select the appropriate program(s) you wish to apply for from the
        options below.
      </h3>
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
      <div className="display-flex flex-justify">
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
          >
            Next
          </Button>
        )}
      </div>
    </>
  )
}
export default Programs
