'use client'

import AnswerValue from '@/app/(evaluation)/firm/application/[application_id]/[section_questions]/AnswerValue';
import { GET_APPLICATIONS_ROUTE } from '@/app/constants/local-routes';
import { buildRoute, DASHBOARD } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList';
import { useGetQuestionnaire } from '@/app/services/queries/application-service/useGetQuestionResponses';
import { Application } from '@/app/services/types/application-service/Application';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const Responses = () => {
  const [currentSection, setCurrentSection] = useState('');
  const search = useSearchParams();
  const sectionUrl = search.get('sectionUrl');
  const contributorId = sectionUrl?.split('/')[0];
  const { data: session } = useSessionUCMS();
  const { data: applicationData } = useSWR<Application[]>(
    session.user_id ? `${GET_APPLICATIONS_ROUTE}?${ApplicationFilterType.user_id}=${session.user_id}` : null
  );
  const { data: responses, isLoading: isLoadingResponses } = useGetQuestionnaire(sectionUrl as string);
  const { data: sections } = useGetQuestionnaireList(Number(contributorId));

  useEffect(() => {
    if (applicationData && applicationData.length > 0 && contributorId) {
      const isValidContributor = applicationData[0].application_contributor.some(
        contributor =>
          contributor.id.toString() === contributorId ||
          contributor.user_id === session.user_id
      );

      if (!isValidContributor) {
        window.location.href = buildRoute(DASHBOARD, {});
      }
    }
  }, [contributorId, applicationData, session]);

  useEffect(() => {
    if (!sectionUrl) {return;}

    if (sectionUrl.includes('owner-and-management')) {
      setCurrentSection('Owner and Management');
    } else if (sectionUrl.includes('control-and-operation')) {
      setCurrentSection('Control and Operation');
    } else if (sections && sections.length > 0) {
      const matchedSection = sections.find(section => section.url === sectionUrl);
      if (matchedSection) {
        setCurrentSection(matchedSection.title);
      } else {
        setCurrentSection('Unknown Section');
      }
    }
  }, [sectionUrl, sections]);

  if (isLoadingResponses) {return <div>Loading...</div>;}

  return (
    <>
      <h2>{currentSection}</h2>
      <div className='max-width-full' style={{ display: 'flex', flexDirection: 'column' }}>
        {responses && responses.length > 0 && responses.map((response: Question) => (
          <div key={response.id}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnswerValue question={response} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Responses;
