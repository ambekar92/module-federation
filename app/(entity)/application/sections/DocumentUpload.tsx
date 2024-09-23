import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_PAGE } from '@/app/constants/url';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Documents from '../components/document-uploads/Documents';
import { QuestionnaireListType } from '../components/questionnaire/utils/types';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps, extractLastPart } from '../utils/constants';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useRedirectIfNoOwners } from '../hooks/useRedirectNoOwners';
import Spinner from '@/app/shared/components/spinner/Spinner';

function DocumentUpload() {
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Document Upload');
  const { applicationId, contributorId, applicationData } = useApplicationContext();

  const [skipHubzoneSup, setSkipHubzoneSup] = useState(false);
  const [previousLink, setPreviousLink] = useState('');

  const { data: questionnairesData } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}` : null,
  );
  const { data: ownerData } = useSWR<Question[]>(applicationData ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null);
  useRedirectIfNoOwners({ ownerData, applicationId });

  useEffect(() => {
    if (applicationData && applicationData.workflow_state !== 'draft' && applicationData.workflow_state !== 'returned_for_firm') {
      window.location.href = `/application/view/${applicationId}`;
    }
  }, [applicationData, applicationId]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.documentUpload.stepIndex));
    const skipHubzoneSupValue = localStorage.getItem('skipHubzoneSup') === 'true';
    setSkipHubzoneSup(skipHubzoneSupValue);

    if (questionnairesData) {
      const hasHubzoneCalculator = questionnairesData.some(item => item.url.includes('hubzone-calculator'));

      if (hasHubzoneCalculator) {
        setPreviousLink(
          buildRoute(QUESTIONNAIRE_PAGE, {
            applicationId: applicationId,
            section: skipHubzoneSupValue ? '/individual-contributor-hubzone-business-relationships' : '/hubzone-calculator-supplemental'
          })
        );
      } else {
        // If there's no hubzone-calculator, set the previous link to the last questionnaire
        const lastQuestionnaire = questionnairesData[questionnairesData.length - 1];
        setPreviousLink(
          buildRoute(QUESTIONNAIRE_PAGE, {
            applicationId: applicationId,
            section: `/${extractLastPart(lastQuestionnaire.url)}`
          })
        );
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contributorId, questionnairesData, skipHubzoneSup]);

  if(!questionnairesData || !ownerData) {
    return <Spinner />
  }
  return (
    <>
      <Documents />
      <ButtonGroup className='display-flex flex-justify margin-top-2 margin-right-2px'>
        {questionnairesData
          ? (
            <Link
              className='usa-button usa-button--outline'
              aria-disabled={!contributorId}
              href={previousLink}
            >
          		Previous
            </Link>
          ): (
            <Button className='usa-button usa-button--outline' disabled type='button'>Previous</Button>
          )}
        <Link
          className='usa-button'
          aria-disabled={!contributorId}
          href={
            buildRoute(APPLICATION_STEP_ROUTE, {
              applicationId: applicationId,
              stepLink: applicationSteps.contributorInvitation.link
            })
          }
        >
          Next
        </Link>
      </ButtonGroup>
    </>
  )
}

export default DocumentUpload
