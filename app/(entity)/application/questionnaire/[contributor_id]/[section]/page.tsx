'use client';
import { QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { ButtonGroup, ModalRef } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Provider } from 'react-redux';
import ApplicationLayout from '../../../components/ApplicationLayout';
import HubMock from '../../../components/questionnaire/HubMock';
import { QuestionnaireListType } from '../../../components/questionnaire/utils/types';
import Questions from '../../../qa-helpers/Questions';
import applicationStore from '../../../redux/applicationStore';
import HubzoneResults from '../../../sections/HubzoneResults';
import useSWR from 'swr';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams()
  const section = params.section.toString();
  const contributorId = parseInt(params.contributor_id as string, 10);
  const closeApplicationRef = useRef<ModalRef>(null);
  const [canNavigate, setCanNavigate] = useState(true);

  const { data: questionnairesData, error, mutate } = useSWR<QuestionnaireListType>(
    params.contributor_id ? `${QUESTIONNAIRE_LIST_ROUTE}/${params.contributor_id}` : null,
    fetcher
  );

  const refetchQuestionnaires = () => {
    mutate();
  };

  const allSections = useMemo(() => {
    if (!questionnairesData) {return [];}

    const baseSections = questionnairesData.map((item) => item.url);
    const hasHubzoneCalculator = baseSections.some(url => url.includes('hubzone-calculator'));

    if (hasHubzoneCalculator) {
      return [
        ...baseSections,
        `${contributorId}/individual-contributor-hubzone-business-relationships`,
        `${contributorId}/hubzone-calculator-supplemental`
      ];
    }

    return baseSections;
  }, [questionnairesData, contributorId]);

  useEffect(() => {
    if (allSections.length > 0) {
      const index = allSections.findIndex((item) => item.includes(section));
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [allSections, section]);

  if (!questionnairesData) {
    return <h3>Loading...</h3>;
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  const sectionTitle = section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/Hubzone/i, 'HUBZone').replace(/Wosb/i, 'WOSB').replace(/Edwosb/i, 'EDWOSB');;

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!canNavigate) {
      e.preventDefault();
      closeApplicationRef.current?.toggleModal();
    }
  };

  if(section === 'hubzone-results') {
    return (
      <Provider store={applicationStore}>
        <ApplicationLayout>
          <QAWrapper
            fill
            mainContent={
              <HubzoneResults contributorId={contributorId} />
            }
          />
        </ApplicationLayout>
      </Provider>
    )
  }
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
                contributorId={contributorId}
                onRefetchQuestionnaires={refetchQuestionnaires}
                setCanNavigate={setCanNavigate}
              />
            }
          />
        )}
        <ButtonGroup className="display-flex flex-justify border-top padding-y-2 margin-right-2px">
          {currentIndex === 0 ? (
            <Link
              className="usa-button usa-button--outline"
              href={`/application/questionnaire/${params.contributor_id}`}
              onClick={(e) => handleNavigation(e, `/application/questionnaire/${params.contributor_id}`)}
            >
      				Previous
            </Link>
          ) : (
            <Link
              className="usa-button usa-button--outline"
              href={`/application/questionnaire/${allSections[currentIndex - 1]}`}
              onClick={(e) => handleNavigation(e, `/application/questionnaire/${allSections[currentIndex - 1]}`)}
            >
      				Previous
            </Link>
          )}
          {currentIndex === allSections.length - 1 || section === 'hubzone-calculator-supplemental' ? (
            <Link
              className="usa-button"
              href={`/application/${params.contributor_id}/document-upload`}
              onClick={(e) => handleNavigation(e, `/application/${params.contributor_id}/document-upload`)}
            >
      				Next
            </Link>
          ) : (
            <Link
              className="usa-button"
              href={`/application/questionnaire/${allSections[currentIndex + 1]}`}
              onClick={(e) => handleNavigation(e, `/application/questionnaire/${allSections[currentIndex + 1]}`)}
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
