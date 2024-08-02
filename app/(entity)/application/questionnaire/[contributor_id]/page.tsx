'use client';
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import fetcher from '@/app/services/fetcher';
import useFetchOnce from '@/app/shared/hooks/useFetchOnce';
import { ButtonGroup, Card, CardGroup, CardHeader } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ApplicationLayout from '../../components/ApplicationLayout';
import { QuestionnaireListType } from '../../components/questionnaire/utils/types';
import { setStep } from '../../redux/applicationSlice';
import applicationStore from '../../redux/applicationStore';
import { useApplicationDispatch } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';

interface QuestionnaireListPageProps {
  params: {
    contributor_id: string;
  };
}

const QuestionnaireListPage: React.FC<QuestionnaireListPageProps> = ({ params: { contributor_id } }) => {
  const params = useParams();
  const dispatch = useApplicationDispatch();
  const { data: questionnairesData, error } = useFetchOnce<QuestionnaireListType>(
    params.contributor_id ? `${QUESTIONNAIRE_LIST_ROUTE}/${params.contributor_id}` : null,
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
                    href={`/application/questionnaire/${questionnaire.url}`}
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
        <Link className='usa-button usa-button--outline' href={`/application/${contributor_id}/eligible-programs`}>
          Previous
        </Link>
        <Link className='usa-button' href={`/application/questionnaire/${questionnairesData[0].url}`}>
          Next
        </Link>
      </ButtonGroup>
    </ApplicationLayout>
  );
};

const QuestionnaireListPageContainer: React.FC<QuestionnaireListPageProps> = (props) => (
  <Provider store={applicationStore}>
    <QuestionnaireListPage {...props} />
  </Provider>
);

export default QuestionnaireListPageContainer;
