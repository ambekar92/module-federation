'use client';
import { QUESTIONNAIRE_LIST_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/routes';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_LIST_PAGE, QUESTIONNAIRE_PAGE } from '@/app/constants/url';
import fetcher from '@/app/services/fetcher';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { ButtonGroup, ModalRef } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import useSWR from 'swr';
import ApplicationLayout from '../../../components/ApplicationLayout';
import HubMock from '../../../components/questionnaire/HubMock';
import { QuestionnaireListType } from '../../../components/questionnaire/utils/types';
import Questions from '../../../qa-helpers/Questions';
import applicationStore from '../../../redux/applicationStore';
import HubzoneResults from '../../../sections/HubzoneResults';
import { applicationSteps, extractLastPart } from '../../../utils/constants';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams()
  const section = params.section.toString();
  const { contributorId, applicationId } = useApplicationContext();
  const closeApplicationRef = useRef<ModalRef>(null);
  const [canNavigate, setCanNavigate] = useState(true);
  const [title, setTitle] = useState<string>('');

  const { data: questionnairesData, error, mutate } = useSWR<QuestionnaireListType>(
    contributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${contributorId}` : null,
    fetcher
  );

  const refetchQuestionnaires = () => {
    mutate();
  };

  const allSections = useMemo(() => {
    if (!questionnairesData) {return [];}

    const baseSections = questionnairesData.map((item) => extractLastPart(item.url));
    const hasHubzoneCalculator = baseSections.some(url => url.includes('hubzone-calculator'));

    if (hasHubzoneCalculator) {
      return [
        ...baseSections,
        'individual-contributor-hubzone-business-relationships',
        'hubzone-calculator-supplemental'
      ];
    }

    return baseSections;
  }, [questionnairesData]);

  useEffect(() => {
    if (allSections.length > 0) {
      const index = allSections.findIndex((item) => item.includes(section));
      setCurrentIndex(index !== -1 ? index : 0);
      console.log(index)
    }
  }, [allSections, section]);

  useEffect(() => {
    if (questionnairesData && questionnairesData.length > 0) {
      const currentSection = questionnairesData.find(item => item.url.includes(section));
      if (currentSection) {
        setTitle(currentSection.title);
      } else {
        const generatedTitle = section.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
          .replace(/Hubzone/i, 'HUBZone')
          .replace(/Wosb/i, 'WOSB')
          .replace(/Edwosb/i, 'EDWOSB');
        setTitle(generatedTitle);
      }
    }
  }, [questionnairesData, section]);

  if (!questionnairesData) {
    return <h3>Loading...</h3>;
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  }

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
              <HubzoneResults />
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
                url={`${QUESTIONNAIRE_ROUTE}/${contributorId}/${section}`}
                title={title}
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
              href={buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId })}
              onClick={(e) => handleNavigation(e, buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId }))}
            >
      				Previous
            </Link>
          ) : (
            <Link
              className="usa-button usa-button--outline"
              href={
                buildRoute(QUESTIONNAIRE_PAGE, {
                  applicationId: applicationId,
                  section: allSections[currentIndex - 1]
                })
              }
              onClick={(e) => handleNavigation(e,
                buildRoute(QUESTIONNAIRE_PAGE, {
                  applicationId: applicationId,
                  section: allSections[currentIndex - 1]
                })
              )}
            >
      				Previous
            </Link>
          )}
          {currentIndex === allSections.length - 1 || section === 'hubzone-calculator-supplemental' ? (
            <Link
              className="usa-button"
              href={buildRoute(APPLICATION_STEP_ROUTE, {
                applicationId: applicationId,
                stepLink: applicationSteps.documentUpload.link
              })}
              onClick={(e) => handleNavigation(e,
                buildRoute(APPLICATION_STEP_ROUTE, {
                  applicationId: applicationId,
                  stepLink: applicationSteps.documentUpload.link
                })
              )}
            >
      				Next
            </Link>
          ) : (
            <Link
              className="usa-button"
              href={buildRoute(QUESTIONNAIRE_PAGE, {
                applicationId: applicationId,
                section: allSections[currentIndex + 1]
              })}
              onClick={(e) => handleNavigation(e,
                buildRoute(QUESTIONNAIRE_PAGE, {
                  applicationId: applicationId,
                  section: allSections[currentIndex + 1]
                })
              )}
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
