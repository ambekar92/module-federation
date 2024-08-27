'use client'
import { API_ROUTE, FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { axiosInstance } from '@/app/services/axiosInstance'
import fetcher from '@/app/services/fetcher'
import { ApplicationEligibilityType } from '@/app/services/types/application-service/Application'
import useFetchOnce from '@/app/shared/hooks/useFetchOnce'
import { ApplicationsType } from '@/app/shared/types/responses'
import { Button, Grid } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ProgramOption,
  sbaProgramOptions,
} from '../../../../constants/sba-programs'
import ProgramCard from '../../../../shared/components/ownership/ProgramCard'
import { ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url'
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip'
import Spinner from '@/app/shared/components/spinner/Spinner'

const APPLICATION_ELIGIBILITY_ROUTE = `${API_ROUTE}/application-eligibility`;

function Programs() {
  const params = useParams();
  const { data: session, status } = useSessionUCMS();
  const entityId = params.entity_id;

  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([])
  const [userId, setUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: applicationData } = useFetchOnce<ApplicationsType>(`${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}&application_type_id=1`, fetcher);
  const { data: eligibilityData, isLoading } = useFetchOnce<ApplicationEligibilityType[] | []>(
    applicationData && applicationData.length > 0 ?`${APPLICATION_ELIGIBILITY_ROUTE}?application_id=${applicationData[applicationData.length - 1].id}` : null,
    fetcher
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
    } else {
      setSelectedPrograms([]);
    }
  }, [eligibilityData]);

  const handlePostRequest = async () => {
    setIsSubmitting(true);
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

        const response = await axiosInstance.post(`${FIRM_APPLICATIONS_ROUTE}`, postData);
        window.location.href = buildRoute(ASSIGN_DELEGATE_PAGE, {applicationId: response.data.id})
      }
    } catch (error) {
      // Error handled lol -KJ
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = async (program: ProgramOption) => {
    setSelectedPrograms((prev) => {
      let newSelection = [...prev];
      const isAlreadySelected = newSelection.find((p) => p.id === program.id);

      if (isAlreadySelected) {
        newSelection = newSelection.filter((p) => p.id !== program.id);
      } else {
        newSelection.push(program);

        // Handle mutually exclusive selections
        if (program.id === 6) { // EDWOSB
          newSelection = newSelection.filter((p) => p.id !== 3); // Removes WOSB if EDWOSB is selected
        } else if (program.id === 3) { // WOSB
          newSelection = newSelection.filter((p) => p.id !== 6); // Removes EDWOSB if WOSB is selected
        } else if (program.id === 5) { // SDVOSB
          newSelection = newSelection.filter((p) => p.id !== 4); // Removes VOSB if SDVOSB is selected
        } else if (program.id === 4) { // VOSB
          newSelection = newSelection.filter((p) => p.id !== 5); // Removes SDVOSB if VOSB is selected
        }
      }

      return newSelection;
    });
  };

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program)
  }

  if(isLoading) {
    return <Spinner center />
  }

  return (
    <>
      <h1>Select Intended Program(s) for Application<TooltipIcon text='Select the Radio Button for each certification you wish to apply for. When you select the “visit here” link, a new window opens with detailed information about the selected program. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.'/></h1>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        )}
      </div>
    </>
  )
}
export default Programs
