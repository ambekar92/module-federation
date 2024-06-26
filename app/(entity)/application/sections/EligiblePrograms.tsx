'use client';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProgramOption, sbaProgramOptions } from '@/app/constants/sba-programs';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import { fetcherPOST } from '@/app/services/fetcher';
import { CREATING_APPLICATION_ROUTE } from '@/app/constants/routes';
import { useSession } from 'next-auth/react';
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId';
import getApplicationId from '@/app/shared/utility/getApplicationId';

// Filters programs based on owner data
const calculateEligiblePrograms = (owners: any[]): ProgramOption[] => {
  return sbaProgramOptions.filter(program => {
    return owners.some(owner => {
      let updatedDisadvantages = owner.socialDisadvantages.length > 0
        ? owner.socialDisadvantages
        : ['not_claiming'];

      if (updatedDisadvantages.length > 1) {
        updatedDisadvantages = updatedDisadvantages.filter((d: string) => d !== 'not_claiming');
      }

      const manageDisadvantage = (condition: boolean, disadvantage: string) => {
        if (condition && !updatedDisadvantages.includes(disadvantage)) {
          updatedDisadvantages.push(disadvantage);
        } else if (!condition) {
          updatedDisadvantages = updatedDisadvantages.filter((d: string) => d !== disadvantage);
        }
      };

      manageDisadvantage(owner.gender === 'f', 'female');
      manageDisadvantage(owner.isVeteran === 'yes' || owner.isVeteran === 'service_disabled_veteran', 'veteran');
      manageDisadvantage(owner.isVeteran === 'service_disabled_veteran', 'disabledVeteran');
      manageDisadvantage(owner.maritalStatus === 'unmarried' && owner.isVeteran === 'not_applicable', 'unmarried-not-veteran')

      return program.disadvantages.some(disadvantage => updatedDisadvantages.includes(disadvantage));
    });
  });
};

function EligiblePrograms() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
    }
  }, [session, status]);

  const dispatch = useApplicationDispatch();

  const handlePostRequest = async (): Promise<void> => {
    if (!userId) {
      alert('You must be signed in to continue.');
      return;
    }
    try {
      const entityData = await getEntityByUserId(userId);
      if (!entityData || entityData.length === 0) {
        throw new Error('Entity data not found');
      }
      const applicationData = await getApplicationId(entityData[0].id);
      if (!applicationData || applicationData.length === 0) {
        throw new Error('Application data not found');
      }

      const postData = {
        application_id: applicationData[0].id,
        programs: selectedPrograms.map(program => program.id)
        // program_id: selectedPrograms[Math.ceil(Math.random() * selectedPrograms.length)].id
      };

      await fetcherPOST(`${CREATING_APPLICATION_ROUTE}`, postData);
      // Uncomment below to see response
      // const response = await fetcherPOST(`${CREATING_APPLICATION_ROUTE}`, postData);
      // console.log('POST Response:', response);
    } catch (error: any) {
      console.error('POST request error:', error);
      throw error;
    }
  }

  const handleNextClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await handlePostRequest();
      window.location.href = applicationSteps.questionnaire.link;
    } catch (error: unknown) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setStep(applicationSteps.eligiblePrograms.stepIndex));
    dispatch(setDisplayStepNavigation(false));

    // Fetch owner data from local storage
    const userApplicationInfo = localStorage.getItem('userApplicationInfo');
    if (userApplicationInfo) {
      const { owners } = JSON.parse(userApplicationInfo);
      // Calculate eligible programs based on owner data
      const programs = calculateEligiblePrograms(owners);
      setEligiblePrograms(programs);
    } else {
      setEligiblePrograms(sbaProgramOptions);
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
      {eligiblePrograms.length > 0 ? <p>You appear to be eligible for the programs below. s for which you&apos;d like to apply.</p> : null}
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
        <Link href={applicationSteps.controlAndOwnership.link} className='usa-button usa-button--outline'>
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
