'use client'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CardGroup, Card, CardHeader, ButtonGroup } from '@trussworks/react-uswds';
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

const QuestionnaireListPage: React.FC = () => {
  const { contributorId, applicationId } = useApplicationContext();
  const dispatch = useApplicationDispatch();

  const { data: questionnairesData, error } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcher
  );

  useEffect(() => {
    dispatch(setStep(applicationSteps.questionnaire.stepIndex));
  }, [dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questionnairesData) {
    return <h1>Loading...</h1>;
  }

  return (
    <ApplicationLayout>
      <h3>Please answer the questions about your business or firm in each section below. When all sections are complete, review and sign the application.</h3>
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
        <Link className='usa-button usa-button--outline' href={
          buildRoute(APPLICATION_STEP_ROUTE, {
            applicationId: applicationId,
            stepLink: applicationSteps.eligiblePrograms.link
          })
        }>
          Previous
        </Link>
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
