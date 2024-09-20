'use client'

import AnswerValue from '@/app/(evaluation)/firm/application/[application_id]/[section_questions]/AnswerValue';
import { buildRoute, DASHBOARD } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { Role } from '@/app/shared/types/role';
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList';
import { useGetQuestionnaire } from '@/app/services/queries/application-service/useGetQuestionResponses';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Responses = () => {
  const [currentSection, setCurrentSection] = useState('');
  const search = useSearchParams();
  const sectionUrl = search.get('sectionUrl');
  const contributorId = sectionUrl?.split('/')[0];
  const { data: session } = useSessionUCMS();
  const { data: responses, isLoading: isLoadingResponses } = useGetQuestionnaire(sectionUrl as string);
  const { data: sections } = useGetQuestionnaireList(Number(contributorId));

  useEffect(() => {
    if(session.permissions.some(permission => permission.slug.includes(Role.PRIMARY_QUALIFYING_OWNER) || permission.slug.includes('primary-qualifying-owner'))) {
      return
    } else {
      window.location.href = buildRoute(DASHBOARD, {});
    }
  }, [session]);

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
    <div>
      <h2>{currentSection}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {responses && responses.length > 0 && responses.map((response: Question) => (
          <div key={response.id}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '0' }}>{response.title}</h3>
              {response.title.toLowerCase() !== response.description?.toLowerCase() && (
                <span>{response.description}</span>
              )}
              <br />
              <AnswerValue question={response} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;