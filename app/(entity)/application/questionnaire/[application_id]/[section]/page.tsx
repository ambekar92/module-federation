'use client';
import { APPLICATION_STEP_ROUTE, buildRoute, QUESTIONNAIRE_LIST_PAGE, QUESTIONNAIRE_PAGE } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import QAWrapper from '@/app/shared/components/forms/QAWrapper';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { useApplicationContext } from '@/app/shared/hooks/useApplicationContext';
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress';
import { Button, ButtonGroup, ModalRef } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import useSWR from 'swr';
import ApplicationLayout from '../../../[application_id]/[section]/_layout';
import HubMock from '../../../components/questionnaire/HubMock';
import { QuestionnaireListType } from '../../../components/questionnaire/utils/types';
import Questions from '../../../qa-helpers/Questions';
import applicationStore from '../../../redux/applicationStore';
import HubzoneResults from '../../../sections/HubzoneResults';
import { applicationSteps, extractLastPart } from '../../../utils/constants';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { useRedirectIfNoOwners } from '../../../hooks/useRedirectNoOwners';
import { Question } from '@/app/shared/types/questionnaireTypes';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams()
  const section = params.section.toString();
  const { contributorId, applicationId, applicationData } = useApplicationContext();
  const closeApplicationRef = useRef<ModalRef>(null);
  const [canNavigate, setCanNavigate] = useState(true);
  const [title, setTitle] = useState<string>('');
  const { data: session } = useSessionUCMS();
  const hasDelegateRole = session?.permissions?.some(permission => permission.slug.includes('delegate'));
  useUpdateApplicationProgress('Questionnaires');
  const { data: questionnairesData, error, mutate } = useSWR<QuestionnaireListType>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}` : null);
  const { data: ownerData } = useSWR<Question[]>(applicationData ? `${QUESTIONNAIRE_ROUTE}/${applicationData?.application_contributor[0].id}/owner-and-management` : null);
  const applicationRole = applicationData?.application_contributor.filter(contributor => contributor.id === contributorId)
  useRedirectIfNoOwners({ ownerData, applicationId, applicationRole });

  const refetchQuestionnaires = () => {
    mutate();
  };

  const allSections = useMemo(() => {
    if (!questionnairesData) {return [];}

    const baseSections = questionnairesData.map((item) => extractLastPart(item.url));
    const filteredSections = hasDelegateRole
      ? baseSections.filter(section => section !== 'core-program-eligibility')
      : baseSections;

    const hasHubzoneCalculator = filteredSections.some(url => url.includes('hubzone-calculator'));

    if (hasHubzoneCalculator) {
      return [
        ...filteredSections,
        'individual-contributor-hubzone-business-relationships',
        'hubzone-calculator-supplemental'
      ];
    }

    return filteredSections;
  }, [questionnairesData, hasDelegateRole]);

  useEffect(() => {
    if(hasDelegateRole && section === 'core-program-eligibility') {
      window.location.href = `/application/questionnaire/${applicationId}`;
    }
    if (
      applicationData && applicationData.workflow_state !== 'draft'
  		&& applicationData.workflow_state !== 'returned_to_firm'
    ) {
      window.location.href = `/application/view/${applicationId}`;
    }
  }, [applicationData, applicationId, session]);

  useEffect(() => {
    if (allSections.length > 0) {
      const index = allSections.findIndex((item) => item.includes(section));
      setCurrentIndex(index !== -1 ? index : 0);
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

  if (!questionnairesData || !ownerData) {
    return <Spinner center />
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canNavigate && section !== 'individual-contributor-eight-a-social-disadvantage') {
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
        <div className="display-flex flex-column border-top padding-y-2 margin-right-2px">
          {!canNavigate && section === 'individual-contributor-eight-a-social-disadvantage' && (
            <h3 className="text-right margin-bottom-2 text-red">
              <i>Describe at least two experiences which have affected your advancement in business or education or career</i>
            </h3>
          )}
          <ButtonGroup className="display-flex flex-justify">
            {currentIndex === 0 ? (
              <Link
                className="usa-button usa-button--outline"
                href={buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId })}
                onClick={() => handleNavigation(buildRoute(QUESTIONNAIRE_LIST_PAGE, { applicationId: applicationId }))}
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
                onClick={() => handleNavigation(
                  buildRoute(QUESTIONNAIRE_PAGE, {
                    applicationId: applicationId,
                    section: allSections[currentIndex - 1]
                  })
                )}
              >
                Previous
              </Link>
            )}
            {!canNavigate && section === 'individual-contributor-eight-a-social-disadvantage' ? (
              <Button type='button' disabled>Next</Button>
            ) : currentIndex === allSections.length - 1 || section === 'hubzone-calculator-supplemental' ? (
              <Link
                className="usa-button"
                href={buildRoute(APPLICATION_STEP_ROUTE, {
                  applicationId: applicationId,
                  stepLink: applicationSteps.documentUpload.link
                })}
                onClick={() => handleNavigation(
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
                onClick={() => handleNavigation(
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
        </div>
      </ApplicationLayout>
    </Provider>
  );
};

export default QuestionnairePage;
