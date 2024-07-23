'use client';
import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/questionnaires';
import { fetcherGET } from '@/app/services/fetcher';
import { ButtonGroup, Card, CardGroup, CardHeader } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { Provider } from 'react-redux';
import useSWR from 'swr';
import ApplicationLayout from '../../components/ApplicationLayout';
import { QuestionnaireListType } from '../../components/questionnaire/utils/types';
import applicationStore from '../../redux/applicationStore';

interface QuestionnaireListPageProps {
  params: {
    contributor_id: string;
  };
}

const QuestionnaireListPage: React.FC<QuestionnaireListPageProps> = ({ params: { contributor_id } }) => {
  const params = useParams()
  const { data: questionnairesData, error } = useSWR(
    params.contributor_id ? `${QUESTIONNAIRE_LIST_ROUTE}/${params.contributor_id}` : null,
    fetcherGET<QuestionnaireListType>
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questionnairesData) {
    return <h1>Loading...</h1>;
  }

  return (
    <Provider store={applicationStore}>
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
    </Provider>
  );
};

export default QuestionnaireListPage;
