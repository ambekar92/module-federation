'use client'
import { ELIGIBLE_PROGRAMS_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { APPLICATION_STEP_ROUTE, ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QaQuestionsType } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import axios from 'axios';
import humanizeString from 'humanize-string';
import { startCase } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { calculateEligibleSbaPrograms, OwnerType } from '../../../hooks/useOwnershipApplicationInfo';
import { useWorkflowRedirect } from '../../../hooks/useWorkflowRedirect';
import { GridRow, OwnershipQaGrid } from '../../../qa-helpers/OwnershipQaGrid';
import { selectApplication, setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import { createOwnerObject } from '../../../utils/createOwnershipObject';

function OwnershipQuestions() {
  // Redux
  const dispatch = useApplicationDispatch();
  const { owners } = useApplicationSelector(selectApplication);
  useUpdateApplicationProgress('Ownership');
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext();
  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : null;

  const { data: ownersData, isLoading: isLoadingOwnership, error, mutate: mutateOwners } = useSWR<QaQuestionsType>(url);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalOwnershipPercentage, setTotalOwnershipPercentage] = useState(0);
  const [isPrimaryQualifyingOwner, setIsPrimaryQualifyingOwner] = useState(true);

  const { data: session } = useSessionUCMS();
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));
  const applicationRole = applicationData?.application_contributor.filter(contributor => contributor.id === contributorId)
  const entity_structure = applicationData?.entity.structure && humanizeString(applicationData?.entity.structure)
  // Redirects user based on application state and permissions
  useWorkflowRedirect({ applicationData, applicationId, hasDelegateRole });

  useEffect(() => {
    dispatch(setStep(applicationSteps.ownership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  }, [dispatch]);

  useEffect(() => {
    if (ownersData && ownersData.length > 0 && !isLoadingOwnership) {
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
  }, [ownersData, isLoadingOwnership, applicationData]);

  useEffect(() => {
    if (applicationRole && applicationRole.length > 0 && applicationRole[0].application_role.name !== 'primary-qualifying-owner') {
      setIsPrimaryQualifyingOwner(false);
    }
  },[applicationRole]);

  useEffect(() => {
    const total = owners.reduce((sum, owner) => {
      return sum + parseFloat(owner.ownershipPercent || '0');
    }, 0);
    setTotalOwnershipPercentage(total);
  }, [owners]);

  const handleSubmit = async () => {
    if (totalOwnershipPercentage >= 99 && totalOwnershipPercentage <= 100) {
      setIsSubmitting(true);
      try {
        const postData = {
          application_id: userId,
          programs: eligiblePrograms.map(program => program.id)
        };

        await axios.put(`${ELIGIBLE_PROGRAMS_ROUTE}`, postData);
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.controlAndOwnership.link
        });
      } catch (error) {
        if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.log('Error submitting data:', error);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert(`Total ownership must be 100%. Current total: ${totalOwnershipPercentage.toFixed(2)}%`);
    }
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!ownersData || isLoadingOwnership) {return <Spinner center />;};

  if (isPrimaryQualifyingOwner) {
    return (
      <>
        <QAWrapper
          fill
          mainContent={
            <>
              <div>
                <h1>Ownership</h1>
                <h3 className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
                  We will now collect information for the owners of the business. We use this information to determine eligibility for our various programs, so please be as complete as possible.
                </h3>
              </div>
              <div>
                <h2>Business Structure</h2>
                <p>Based on the information provided by SAM, {applicationData?.sam_entity.legal_business_name} is designated as a {entity_structure?.toLocaleLowerCase() === 'llc' ? 'LLC' : startCase(entity_structure)}.</p>
                <p>If this designation is incorrect, please discontinue this application and update your information on <a href="http://sam.gov/">SAM.gov</a></p>
              </div>

              <hr className="margin-y-3 width-full" />

              <Grid row>
                <Grid col={12}>
                  { contributorId && (
                    <OwnershipQaGrid
                      questions={ownersData}
                      userId={userId}
                      contributorId={contributorId}
                      setTotalOwnershipPercentage={setTotalOwnershipPercentage}
                      entityStructure={startCase(entity_structure)}
                      mutateOwners={mutateOwners}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          }
        />

        <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
          {applicationId
            ? (
              <Link
                href={buildRoute(ASSIGN_DELEGATE_PAGE, {applicationId: applicationId})}
                className="usa-button usa-button--outline"
              >
                Previous
              </Link>
            ): (
              <Button
                type="button"
                className="usa-button"
                disabled
              >
                Previous
              </Button>
            )}
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        </ButtonGroup>
      </>
    );
  } else {
    return (
      <div>
        <h1>Ownership</h1>
        <h3 className='light' style={{fontSize: '22px', fontWeight: 'lighter', lineHeight: '1.5'}}>
          You do not have permission to access this page.
        </h3>
      </div>
    )
  }
}
export default OwnershipQuestions
