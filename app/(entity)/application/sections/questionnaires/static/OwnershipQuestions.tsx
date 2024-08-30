'use client'
import { ELIGIBLE_APPLY_PROGRAMS_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { ProgramOption } from '@/app/constants/sba-programs';
import { APPLICATION_STEP_ROUTE, ASSIGN_DELEGATE_PAGE, buildRoute } from '@/app/constants/url';
import { axiosInstance } from '@/app/services/axiosInstance';
import fetcher from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { QaQuestionsType } from '@/app/shared/types/questionnaireTypes';
import { Button, ButtonGroup, Grid } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { calculateEligibleSbaPrograms, useOwnerApplicationInfo } from '../../../hooks/useOwnershipApplicationInfo';
import { OwnershipQaGrid } from '../../../qa-helpers/OwnershipQaGrid';
import { selectApplication, setDisplayStepNavigation, setStep } from '../../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../../redux/hooks';
import { applicationSteps } from '../../../utils/constants';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useSessionUCMS } from '@/app/lib/auth';

function OwnershipQuestions() {
  // Redux
  const dispatch = useApplicationDispatch();
  const { ownerApplicationInfo } = useOwnerApplicationInfo();
  const { owners } = useApplicationSelector(selectApplication);
  const { applicationId, userId, contributorId, applicationData } = useApplicationContext();
  useUpdateApplicationProgress('Ownership');
  const url = contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}/owner-and-management` : '';

  const { data, error, isLoading } = useSWR<QaQuestionsType>(url, fetcher);
  const [eligiblePrograms, setEligiblePrograms] = useState<ProgramOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalOwnershipPercentage, setTotalOwnershipPercentage] = useState(0);

  const { data: session } = useSessionUCMS();
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));

  useEffect(() => {
    if (
      applicationData && applicationData.workflow_state !== 'draft'
			&& applicationData.workflow_state !== 'returned_for_firm'
			&& !hasDelegateRole
    ) {
      window.location.href = `/application/view/${applicationId}`;
    }
  }, [applicationData, applicationId, session]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.ownership.stepIndex));
    dispatch(setDisplayStepNavigation(true));
  }, [dispatch]);

  useEffect(() => {
    if (ownerApplicationInfo.owners && ownerApplicationInfo.owners.length > 0) {
      const programs = calculateEligibleSbaPrograms(ownerApplicationInfo.owners);
      setEligiblePrograms(programs);
    }
  }, [ownerApplicationInfo.owners]);

  useEffect(() => {
    const total = owners.reduce((sum, owner) => {
      return sum + parseFloat(owner.ownershipPercent || '0');
    }, 0);
    setTotalOwnershipPercentage(total);
  }, [owners]);

  const handleSubmit = async () => {
    if (Math.abs(totalOwnershipPercentage - 100) < 0.01) {
      setIsSubmitting(true);
      try {
        const postData = {
          application_id: userId,
          programs: eligiblePrograms.map(program => program.id)
        };

        await axiosInstance.put(`${ELIGIBLE_APPLY_PROGRAMS_ROUTE}`, postData);
        window.location.href = buildRoute(APPLICATION_STEP_ROUTE, {
          applicationId: applicationId,
          stepLink: applicationSteps.controlAndOwnership.link
        });
      } catch (error) {
        console.log('Error submitting data:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert(`Total ownership must be 100%. Current total: ${totalOwnershipPercentage.toFixed(2)}%`);
    }
  };

  if (error) {return <div>Error: {error.message}</div>;}
  if (!data || isLoading) {return <Spinner center />;};

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
              <p>Based on the information provided by SAM, {applicationData?.sam_entity.legal_business_name} is designated as a {applicationData?.entity.structure}.</p>
              <p>If this designation is incorrect, please discontinue this application and update your information on <a href="/application">SAM.gov</a></p>
            </div>

            <hr className="margin-y-3 width-full" />

            <Grid row>
              <Grid col={12}>
                { contributorId && <OwnershipQaGrid questions={data} userId={userId} contributorId={contributorId} setTotalOwnershipPercentage={setTotalOwnershipPercentage} />}
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
}
export default OwnershipQuestions
