'use client';
import { QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { ButtonGroup } from '@trussworks/react-uswds';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { QuestionnaireListType } from '@/app/(entity)/application/components/questionnaire/utils/types';
import HubzoneResults from '@/app/(entity)/application/sections/HubzoneResults';
import HubMock from '@/app/(entity)/application/components/questionnaire/HubMock';
import Questions from '@/app/(entity)/application/qa-helpers/Questions';
import Spinner from '@/app/shared/components/spinner/Spinner';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams()
  const section = params.section.toString();
  const contributorId = parseInt(params.contributor_id as string, 10);
  const { data: questionnairesData, error } = useSWR(
    params.contributor_id ? `${QUESTIONNAIRE_LIST_ROUTE}/${params.contributor_id}` : null,
    fetcher<QuestionnaireListType>
  );

  useEffect(() => {
    if (questionnairesData) {
      const additionalSections = [
        'individual-contributor-hubzone-business-relationships',
        'hubzone-calculator-supplemental',
      ];
      const allSections = [...questionnairesData.map((item) => item.url), ...additionalSections];
      let index;
      if (section === 'hubzone-calculator') {
        index = allSections.findIndex(item => item === 'hubzone-calculator');
      } else {
        index = allSections.findIndex((item) => item.includes(section));
      }
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [questionnairesData, section]);

  if (!questionnairesData) {
    return <Spinner center />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sectionTitle = section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/Hubzone/i, 'HUBZone').replace(/Wosb/i, 'WOSB').replace(/Edwosb/i, 'EDWOSB');
  const allSections = [...questionnairesData.map((item) => item.url), `${contributorId}/individual-contributor-hubzone-business-relationships`, `${contributorId}/hubzone-calculator-supplemental`];

  if (section === 'hubzone-results') {
    return (
      <QAWrapper
        fill
        mainContent={
          <HubzoneResults />
        }
      />
    )
  }
  return (
    <>
      {section === 'hubzone-calculator' ? (
        <QAWrapper
          fill
          mainContent={
            <HubMock />
          }
        />
      ) : (
        <QAWrapper
          fill
          mainContent={
            <Questions
              url={`${QUESTIONNAIRE_ROUTE}/${params.contributor_id}/${section}`}
              title={sectionTitle}
              contributorId={contributorId}
              onRefetchQuestionnaires={()=>{}}
              setCanNavigate={()=>{}}
            />
          }
        />
      )}
      <ButtonGroup className="display-flex flex-justify border-top padding-y-2 margin-right-2px">
        {currentIndex === 0 ? (
          <Link
            className="usa-button usa-button--outline"
            href={`/firm/business-plan/questionnaire/${params.contributor_id}`}
          >
            Previous
          </Link>
        ) : (
          <Link
            className="usa-button usa-button--outline"
            href={`/firm/business-plan/questionnaire/${allSections[currentIndex - 1]}`}
          >
            Previous
          </Link>
        )}
        {currentIndex === allSections.length - 1 || section === 'hubzone-calculator-supplemental' ? (
          <Link
            className="usa-button"
            href={`/firm/business-plan/${params.contributor_id}/document-upload`}
          >
            Next
          </Link>
        ) : (
          <Link
            className="usa-button"
            href={`/firm/business-plan/questionnaire/${allSections[currentIndex + 1]}`}
          >
            Next
          </Link>
        )}
      </ButtonGroup>
    </>
  );
};

export default QuestionnairePage;
