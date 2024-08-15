import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_PAGE } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DocumentUploads from '../components/document-uploads/DocumentUploads';
import { QuestionnaireListType } from '../components/questionnaire/utils/types';
import { setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import { applicationSteps, extractLastPart } from '../utils/constants';
import useSWR from 'swr';

function DocumentUpload() {
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Document Upload');
  const { applicationId, contributorId, applicationData } = useApplicationContext();

  const [skipHubzoneSup, setSkipHubzoneSup] = useState(false);
  const [previousLink, setPreviousLink] = useState('');

  const { data: questionnairesData } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcher
  );

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

  return (
    <>
      <DocumentUploads contributorId={contributorId} entityId={applicationData?.entity.entity_id} />
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
