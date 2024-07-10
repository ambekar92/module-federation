'use client';
import { QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import useSWR from 'swr';
import ApplicationLayout from '../../../components/ApplicationLayout';
import { QuestionnaireListType } from '../../../components/questionnaire/utils/types';
import Questions from '../../../qa-helpers/Questions';
import applicationStore from '../../../redux/applicationStore';
import HubMock from '../../../components/questionnaire/HubMock';
import { useParams } from 'next/navigation';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams()
  const section = params.section.toString();
  const { data: questionnairesData, error } = useSWR(
    params.contributor_id ? `${QUESTIONNAIRE_LIST_ROUTE}/${params.contributor_id}` : null,
    fetcherGET<QuestionnaireListType>
  );

  useEffect(() => {
    if (questionnairesData) {
      const additionalSections = [
        'individual-contributor-hubzone-business-relationships',
        'hubzone-calculator-supplemental',
        'hubzone-calculator',
      ];
      const allSections = [...questionnairesData.map((item) => item.url), ...additionalSections];
      const index = allSections.findIndex((item) => item.includes(section));
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [questionnairesData, section]);

  if (!questionnairesData) {
    return <h3>Loading...</h3>;
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  }
  const sectionTitle = section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <Provider store={applicationStore}>
      <ApplicationLayout>
        {section === 'hubzone-calculator' ? (
          <QAWrapper
            fill
            mainContent={
              <HubMock />
            }
          />
        ): (
          <QAWrapper
            fill
            mainContent={
              <Questions
                url={`${QUESTIONNAIRE_ROUTE}/${params.contributor_id}/${section}`}
                title={sectionTitle}
              />
            }
          />
        )}
        <ButtonGroup className="display-flex flex-justify border-top padding-y-2 margin-right-2px">
          {currentIndex === 0 ? (
            <Link
              className="usa-button usa-button--outline"
              href={`/application/questionnaire/${params.contributor_id}`}
            >
              Previous
            </Link>
          ) : (
            <Link
              className="usa-button usa-button--outline"
              href={`/application/questionnaire/${
                [...questionnairesData.map((item) => item.url), `/${params.contributor_id}/individual-contributor-hubzone-business-relationships`, `${params.contributor_id}/hubzone-calculator-supplemental`, `${params.contributor_id}/hubzone-calculator`][currentIndex - 1]
              }`}
            >
              Previous
            </Link>
          )}
          {currentIndex === [...questionnairesData.map((item) => item.url), 'individual-contributor-hubzone-business-relationships', 'hubzone-calculator-supplemental', 'hubzone-calculator'].length - 1 || section === 'hubzone-calculator' ? (
            <Link
              className="usa-button"
              href={`/application/${params.contributor_id}/document-upload`}
            >
    					Next
            </Link>
          ) : (
            <Link
              className="usa-button"
              href={`/application/questionnaire/${
                [...questionnairesData.map((item) => item.url), `/${params.contributor_id}/individual-contributor-hubzone-business-relationships`, `${params.contributor_id}/hubzone-calculator-supplemental`, `${params.contributor_id}/hubzone-calculator`][currentIndex + 1]
              }`}
            >
    					Next
            </Link>
          )}
        </ButtonGroup>
      </ApplicationLayout>
    </Provider>
  );
};

export default QuestionnairePage;
