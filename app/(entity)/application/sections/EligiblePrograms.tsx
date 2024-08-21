'use client';
import { CREATING_APPLICATION_ROUTE, ELIGIBLE_APPLY_PROGRAMS_ROUTE } from '@/app/constants/routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_LIST_PAGE } from '@/app/constants/url';
import { axiosInstance } from '@/app/services/axiosInstance';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import { calculateEligibleSbaPrograms } from '../hooks/useOwnershipApplicationInfo';

function EligiblePrograms() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { applicationId } = useApplicationContext();
  useUpdateApplicationProgress('Eligible Programs');

  const dispatch = useApplicationDispatch();

  const handlePostRequest = async (): Promise<void> => {
    try {
      const postData = {
        application_id: applicationId,
        programs: selectedPrograms.map(program => program.id)
      };

      await axiosInstance.put(`${ELIGIBLE_APPLY_PROGRAMS_ROUTE}`, postData);
      await axiosInstance.post(`${CREATING_APPLICATION_ROUTE}`, postData);
    } catch (error: any) {
      console.log('PUT request error:', error);
      throw error;
    }
  }

  const handleNextClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await handlePostRequest();
      window.location.href = buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId })
    } catch (error: unknown) {
      // console.log('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setStep(applicationSteps.eligiblePrograms.stepIndex));
    dispatch(setDisplayStepNavigation(false));

    const ownerApplicationInfo = localStorage.getItem('ownerApplicationInfo');
    if (ownerApplicationInfo) {
      const parsedInfo = JSON.parse(ownerApplicationInfo);
      if (parsedInfo && Array.isArray(parsedInfo.owners)) {
        const mappedOwners = parsedInfo.owners.map((owner: any) => ({
          ...owner
        }));
        const programs = calculateEligibleSbaPrograms(mappedOwners);
        setEligiblePrograms(programs);
      } else {
        // console.error('Invalid owner application info structure');
        setEligiblePrograms([]);
      }
    } else {
      // console.log('No owner application info found');
      setEligiblePrograms([]);
    }
  }, [dispatch]);

  const handleCheckboxChange = (program: ProgramOption) => {
    setSelectedPrograms(prev => {
      let newSelection = [...prev];
      const isAlreadySelected = newSelection.find(p => p.name === program.name);

      if (isAlreadySelected) {
        newSelection = newSelection.filter(p => p.name !== program.name);
      } else {
        newSelection.push(program);

        if (program.name === 'Economically-Disadvantaged Women-Owned') {
          newSelection = newSelection.filter(p => p.name !== 'Women-Owned');
        } else if (program.name === 'Women-Owned') {
          newSelection = newSelection.filter(p => p.name !== 'Economically-Disadvantaged Women-Owned');
        } else if (program.name === 'Service-Disabled Veteran-Owned') {
          newSelection = newSelection.filter(p => p.name !== 'Veteran-Owned');
        } else if (program.name === 'Veteran-Owned') {
          newSelection = newSelection.filter(p => p.name !== 'Service-Disabled Veteran-Owned');
        }
      }

      return newSelection;
    });
  };

  const handleCardClick = (program: ProgramOption) => {
    handleCheckboxChange(program);
  };

  return (
    <>
      <h1>
        {eligiblePrograms.length === 0
          ? 'Your business does not qualify for any programs'
          : 'To which programs would you like to apply today?'
        }<TooltipIcon text='Select the Radio Button for each certification you wish to apply for. When you select the “visit here” link, a new window opens with detailed information about the selected program. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.'/>
      </h1>
      {eligiblePrograms.length > 0 ? <h3>You appear to be eligible for the program(s) below select which you&apos;d like to apply to.</h3> : null}
      <Grid row gap>
        {eligiblePrograms.map((program, index) => (
          <Grid key={index} className='margin-bottom-2' desktop={{ col: 6 }} tablet={{ col: 12 }} mobile={{ col: 12 }}>
            <ProgramCard
              className={`height-full ${selectedPrograms.find(p => p.name === program.name) ? 'blue-bg' : ''}`}
              program={program.name}
              description={program.description}
              details={program.details}
              onClick={() => handleCardClick(program)}
              input={
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  checked={selectedPrograms.some(p => p.name === program.name)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(program);
                  }}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
      <div className='flex-fill'></div>
      <hr className='margin-y-3 width-full border-base-lightest'/>
      <ButtonGroup className='display-flex flex-justify'>
        <Link aria-disabled={!applicationId} href={ buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.controlAndOwnership.link
        })} className='usa-button usa-button--outline'>
    			Back
        </Link>
        {eligiblePrograms.length === 0 ? (
          <Button disabled type='button'>
      			Next
          </Button>
        ) : (
          <Button
            type='button'
            onClick={handleNextClick}
            disabled={selectedPrograms.length === 0 || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Next'}
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default EligiblePrograms;
