'use client'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CardGroup, Card, CardHeader, ButtonGroup, Button } from '@trussworks/react-uswds';
import Link from 'next/link';
import useSWR from 'swr';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useApplicationDispatch } from '../../redux/hooks';
import { setStep } from '../../redux/applicationSlice';
import ApplicationLayout from '../../components/ApplicationLayout';
import applicationStore from '../../redux/applicationStore';
import { QuestionnaireListType } from '../../components/questionnaire/utils/types';
import { applicationSteps, extractLastPart } from '../../utils/constants';
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_PAGE } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import TooltipIcon from '@/app/shared/components/tooltip/Tooltip';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { useSessionUCMS } from '@/app/lib/auth';

const QuestionnaireListPage: React.FC = () => {
  const { contributorId, applicationId } = useApplicationContext();
  const session = useSessionUCMS();
  const dispatch = useApplicationDispatch();
  useUpdateApplicationProgress('Questionnaires');

  const isPrimaryUser = session?.data.permissions?.some(permission => permission.slug.includes('primary_qualifying_owner'));
  const { data: questionnairesData, error } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcher
  );

  // useEffect(() => {
  //   if (applicationData && applicationData.workflow_state !== 'draft' && applicationData.workflow_state !== 'returned_for_firm') {
  //     window.location.href = `/application/view/${applicationId}`;
  //   }
  // }, [applicationData, applicationId]);

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  }, [dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questionnairesData) {
    return <Spinner center />
  }

  return (
    <ApplicationLayout>
      <h3>
				Please answer the questions about your business or firm in each section below. When all sections are complete, review and sign the application.
        <TooltipIcon text='Applicant must complete each questionnaire associated with the selected certification requests. If you decide you do not want to apply to one or more certifications, please navigate back to the certification selection page and unselect the certifications.' />
      </h3>
      <CardGroup>
        {questionnairesData.map((questionnaire, questionIndex) => (
          <Card key={questionIndex} className='tablet:grid-col-4'>
            <CardHeader>
              <div className="usa-card__body">
                <h3 key={questionIndex}>
                  <Link
                    className='text-primary hover:text-primary-dark'
                    href={buildRoute(QUESTIONNAIRE_PAGE, {
                      applicationId: applicationId,
                      section: extractLastPart(questionnaire.url)
                    })}
                  >
                    {questionnaire.title}
                  </Link>
                </h3>
                <p><b>Status:</b> {questionnaire.status}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </CardGroup>
      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-right-2px'>
        {isPrimaryUser
          ? (
            <Link className='usa-button usa-button--outline' href={
              buildRoute(APPLICATION_STEP_ROUTE, {
                applicationId: applicationId,
                stepLink: applicationSteps.eligiblePrograms.link
              })
            }>
          		Previous
            </Link>
          ): (
            <Button type='button' disabled>
							Previous
            </Button>
          )
        }
        <Link className='usa-button' href={
          buildRoute(QUESTIONNAIRE_PAGE, {
            applicationId: applicationId,
            section: extractLastPart(questionnairesData[0].url)
          })
        }>
          Next
        </Link>
      </ButtonGroup>
    </ApplicationLayout>
  );
};

const QuestionnaireListPageContainer: React.FC = () => (
  <Provider store={applicationStore}>
    <QuestionnaireListPage />
  </Provider>
);

export default QuestionnaireListPageContainer;
