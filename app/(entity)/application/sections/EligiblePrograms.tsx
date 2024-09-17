import {  CREATE_PROGRAM_APPLICATION_ROUTE, ELIGIBLE_PROGRAMS_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_LIST_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import ProgramCard from '@/app/shared/components/ownership/ProgramCard';
import Spinner from '@/app/shared/components/spinner/Spinner';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QaQuestionsType } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { calculateEligibleSbaPrograms, OwnerType } from '../hooks/useOwnershipApplicationInfo';
import { useWorkflowRedirect } from '../hooks/useWorkflowRedirect';
import { GridRow } from '../qa-helpers/OwnershipQaGrid';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';

function EligiblePrograms() {
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramOption[]>([]);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { applicationId, contributorId, applicationData } = useApplicationContext();

  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : '';
  const { data: ownersData, error, isLoading: isLoadingOwnership } = useSWR<QaQuestionsType>(url);
  useUpdateApplicationProgress('Eligible Programs');

  const { data: session } = useSessionUCMS();
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));

  // Redirects user based on application state and permissions
  useWorkflowRedirect({ applicationData, applicationId, hasDelegateRole });

  const dispatch = useApplicationDispatch();

  const handlePostRequest = async (): Promise<void> => {
    try {
      const postData = {
        application_id: applicationId,
        programs: selectedPrograms.map(program => program.id)
      };

      await axios.put(`${ELIGIBLE_PROGRAMS_ROUTE}`, postData);
      await axios.post(`${CREATE_PROGRAM_APPLICATION_ROUTE}`, postData);
    } catch (error: any) {
      // Error handled
    }
  }

  const handleNextClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await handlePostRequest();
      window.location.href = buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId })
    } catch (error: unknown) {
      // Handled error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setStep(applicationSteps.eligiblePrograms.stepIndex));
    dispatch(setDisplayStepNavigation(false));
  }, [dispatch]);

  const getFieldValue = (row: GridRow, fieldName: string): string | string[] => {
    const fullFieldName = Object.keys(row).find(key => key.includes(fieldName));
    return fullFieldName ? row[fullFieldName] : '';
  };

  useEffect(() => {
    if (ownersData && !isLoadingOwnership) {
      const processAnswers = (answer: unknown): GridRow[] => {
        if (Array.isArray(answer)) {
          return answer;
        } else if (typeof answer === 'object' && answer !== null) {
          return [answer as GridRow];
        }
        return [];
      };

      const individualAnswers = processAnswers(ownersData.find(q => q.name.includes('personal_information_owner_and_management'))?.answer?.value?.answer);
      const organizationAnswers = processAnswers(ownersData.find(q => q.name.includes('organization_information_owner_and_management'))?.answer?.value?.answer);

      const answers = [...individualAnswers, ...organizationAnswers];

      const newOwners = answers
        .map(createOwnerObject)
        .filter((owner): owner is OwnerType => owner !== null);

      const programs = calculateEligibleSbaPrograms(newOwners);
      setEligiblePrograms(programs);
    }
  }, [ownersData, isLoadingOwnership]);

  const createOwnerObject = (row: GridRow): OwnerType | null => {
    if (row.owner_type === 'Individual') {
      return {
        ownerType: 'Individual',
        firstName: String(getFieldValue(row, 'first_name')),
        lastName: String(getFieldValue(row, 'last_name')),
        ownershipPercent: String(getFieldValue(row, 'ownership_percentage')),
        emailAddress: String(getFieldValue(row, 'email')),
        socialDisadvantages: Array.isArray(getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage'))
          ? getFieldValue(row, 'individual_contributor_eight_a_social_disadvantage') as string[]
          : [],
        citizenship: String(getFieldValue(row, 'citizenship')),
        gender: String(getFieldValue(row, 'gender')),
        veteranStatus: String(getFieldValue(row, 'veteran_status')),
      };
    } else if (row.owner_type === 'Organization') {
      return {
        ownerType: 'Organization',
        organizationName: String(getFieldValue(row, 'organization_name')),
        ownershipPercent: String(getFieldValue(row, 'organization_ownership_percentage')),
        emailAddress: String(getFieldValue(row, 'organization_email')),
      };
    }
    return null;
  };

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

  if (isLoadingOwnership || !ownersData) {
    return <Spinner center />
  }

  if (error) {
    return <div>Error loading owner data</div>;
  }

  return (
    <>
      <h1>
        {eligiblePrograms.length === 0
          ? 'Your business does not qualify for any programs'
          : 'To which programs would you like to apply today?'
        }<TooltipIcon text='Select the Radio Button for each certification you wish to apply for. When you select the "visit here" link, a new window opens with detailed information about the selected program. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.'/>
      </h1>
      {eligiblePrograms.length > 0 ? <h3>Based on your responses, you appear to be eligible for the following programs. Select programs to which you would like to apply.</h3> : null}
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
