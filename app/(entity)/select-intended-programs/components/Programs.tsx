'use client'
import { API_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherGET, fetcherPOST, fetcherPUT } from '@/app/services/fetcher'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import { Button, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ProgramOption,
  sbaProgramOptions,
} from '../../../constants/sba-programs'
import ProgramCard from '../../../shared/components/ownership/ProgramCard'
import { addToArrayCookie, getArrayCookie } from '@/app/shared/utility/cookies'
import useSWR from 'swr'
import { ApplicationEligibilityType } from '@/app/services/types/application'

const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`;

function Programs() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([])
  const { userId, applicationId } = useApplicationId();
  const [entityIds, setEntityIds] = useState<number[]>([]);

  const { data: eligibilityData, error, isLoading } = useSWR(
    applicationId ? `${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${applicationId}` : null,
		fetcherGET<ApplicationEligibilityType[] | []>
  );

  useEffect(() => {
    const loadedEntityIds = getArrayCookie<number>('entityIds');
    setEntityIds(loadedEntityIds);
  }, []);

  useEffect(() => {
    if (eligibilityData) {
      if (eligibilityData) {
        const selectedProgramsFromData = sbaProgramOptions.filter(program =>
          eligibilityData.some(item =>
            item.program === program.id && item.intending_to_apply
          )
        );
        console.log(selectedProgramsFromData)
        setSelectedPrograms(selectedProgramsFromData);
      }
    }
  }, [eligibilityData]);

  const handlePostRequest = async () => {
    try {
      if(userId) {
        const entityId = await getEntityByUserId(userId);
        if(entityId) {
          const newEntityId = entityId[entityId.length-1].id;
          addToArrayCookie('entityIds', newEntityId);
          setEntityIds(prevIds => [...prevIds, newEntityId]);

          const postData = {
            entity_id: newEntityId,
            application_type_id: 1,
            programs: selectedPrograms.map(program => program.id),
            workflow_state: 'draft',
            application_role_id: 1,
            user_id: userId
          };

          const res = await fetcherPOST(`${FIRM_APPLICATIONS_ROUTE}`, postData);
          console.log(res)

          window.location.href = '/assign-a-delegate';
        }
      }
    } catch (error) {
      console.log('Error in POST request:', error);
    }
  };

  const handleCheckboxChange = async (program: ProgramOption) => {
    setSelectedPrograms((prev) => {
      const isAlreadySelected = prev.find((p) => p.id === program.id)
      if (isAlreadySelected) {
        return prev.filter((p) => p.id !== program.id)
      } else {
        return [...prev, program]
      }
    })
    try {
      if(applicationId) {
        const postData = {
          application_id: applicationId,
          application_type_id: 1,
          program_id: program.id
        }

        // const rs = await fetcherPOST(`${APPLICATION_ELIGIBILITY_ROUTE}/intent`, postData)
        // console.log(rs);
        // console.log(postData);
        await fetcherPOST(`${APPLICATION_ELIGIBILITY_ROUTE}/`, postData)
      }
    } catch(error) {
      console.log('PUT Error: ' + error)
    }
  }

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program)
  }

  if(error) {
    return <h1>Sorry there was an error please refresh the page to try again.</h1>
  }

  if(isLoading) {
    return <h2>Loading...</h2>
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
                isLoading
                  ?<></>
                  :(<input
                    className="custom-checkbox"
                    type="checkbox"
                    checked={selectedPrograms.some(
                      (p) => p.name === program.name,
                    )}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleCheckboxChange(program)
                    }}
                  />)
              }
              onClick={isLoading ? () => {} : () => handleCardClick(program)}
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
          >
            Next
          </Button>
        )}
      </div>
    </>
  )
}
export default Programs
