'use client';
import { CREATING_APPLICATION_ROUTE, ELIGIBLE_APPLY_PROGRAMS_ROUTE } from '@/app/constants/routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { fetcherPOST, fetcherPUT } from '@/app/services/fetcher-legacy';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps, calculateEligiblePrograms, qaAppLinkPrefix } from '../utils/constants';
import { QuestionnaireProps } from '../utils/types';

function EligiblePrograms({contributorId}: QuestionnaireProps) {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const { applicationId } = useApplicationId();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useUpdateApplicationProgress('Eligible Programs');

  const dispatch = useApplicationDispatch();

  const handlePostRequest = async (): Promise<void> => {
    try {
      const postData = {
        application_id: applicationId,
        programs: selectedPrograms.map(program => program.id)
      };

      await fetcherPUT(`${ELIGIBLE_APPLY_PROGRAMS_ROUTE}`, postData);
      await fetcherPOST(`${CREATING_APPLICATION_ROUTE}`, postData);
    } catch (error: any) {
      console.log('PUT request error:', error);
      throw error;
    }
  }

  const handleNextClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await handlePostRequest();
      window.location.href = `${qaAppLinkPrefix}/questionnaire/${contributorId}`
    } catch (error: unknown) {
      console.log('Error submitting data:', error);
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
          ...owner,
          isVeteran: owner.veteranStatus.toLowerCase(),
        }));
        const programs = calculateEligiblePrograms(mappedOwners);
        setEligiblePrograms(programs);
      } else {
        console.error('Invalid owner application info structure');
        setEligiblePrograms([]);
      }
    } else {
      console.log('No owner application info found');
      setEligiblePrograms([]);
    }
  }, [dispatch]);

  const handleCheckboxChange = (program: ProgramOption) => {
    setSelectedPrograms(prev => {
      const isAlreadySelected = prev.find(p => p.name === program.name);
      if (isAlreadySelected) {
        return prev.filter(p => p.name !== program.name);
      } else {
        return [...prev, program];
      }
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
        }
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
        <Link aria-disabled={!contributorId} href={`${qaAppLinkPrefix}${contributorId}${applicationSteps.controlAndOwnership.link}`} className='usa-button usa-button--outline'>
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
