'use client'
import { API_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { fetcherGET, fetcherPOST } from '@/app/services/fetcher'
import { ApplicationEligibilityType } from '@/app/services/types/application'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import { Button, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  ProgramOption,
  sbaProgramOptions,
} from '../../../../constants/sba-programs'
import ProgramCard from '../../../../shared/components/ownership/ProgramCard'

const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`;

function Programs({applicationId}: {applicationId: number}) {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([])
  const { data: session, status } = useSessionUCMS();
  const [userId, setUserId] = useState<number | null>(null);

  const { data: eligibilityData, error, isLoading } = useSWR(
    `${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${applicationId}`,
		fetcherGET<ApplicationEligibilityType[] | []>
  );

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
    }
  }, [session, status]);

  useEffect(() => {
    if (eligibilityData) {
      if (eligibilityData) {
        const selectedProgramsFromData = sbaProgramOptions.filter(program =>
          eligibilityData.some(item =>
            item.program === program.id && item.intending_to_apply
          )
        );
        setSelectedPrograms(selectedProgramsFromData);
      }
    }
  }, [eligibilityData]);

  const handlePostRequest = async () => {
    try {
      if(userId) {
        const entityId = await getEntityByUserId(userId);
        if(entityId) {
          const postData = {
            entity_id: entityId[entityId.length - 1].id,
            application_type_id: 1,
            programs: selectedPrograms.map(program => program.id),
            workflow_state: 'draft',
            application_role_id: 1,
            user_id: userId
          };

          const res = await fetcherPOST(`${FIRM_APPLICATIONS_ROUTE}`, postData);
          console.log(res)

          window.location.href = `/application/assign-a-delegate/${applicationId}`;
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
