'use client'

import AnswerValue from '@/app/(evaluation)/firm/application/[application_id]/[section_questions]/AnswerValue';
import { GET_APPLICATIONS_ROUTE, QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { buildRoute, DASHBOARD } from '@/app/constants/url';
import { useSessionUCMS } from '@/app/lib/auth';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList';
import { useGetQuestionnaire } from '@/app/services/queries/application-service/useGetQuestionResponses';
import { DocumentParams, useDocuments } from '@/app/services/queries/document-service/useDocuments';
import { Application } from '@/app/services/types/application-service/Application';
import { QuestionnaireListItem } from '@/app/services/types/application-service/QuestionnaireItem';
import { Question } from '@/app/shared/types/questionnaireTypes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
  const { data: navItems } = useSWR<QuestionnaireListItem[]>(contributorId ? `${QUESTIONNAIRE_ROUTE}/${contributorId}` : null)

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

  const documentSectionId = useMemo(() => {
    if (!navItems || !sectionUrl) {return null;}
    const foundItem = navItems.find(item =>
      item.url.includes(sectionUrl)
    );
    if (foundItem) {return foundItem.id;}
    return null;
  }, [navItems, contributorId, sectionUrl]);

  const { data: documentsData, error: documentsError, isLoading: isLoadingDocuments } = useDocuments({
    [DocumentParams.user_id]: (documentSectionId && session.user_id) ? session.user_id : null,
    [DocumentParams.application_section_id]: documentSectionId ? documentSectionId : null,
  });

  if (documentsError) {
    return <p>Error loading documents</p>
  }

  if(isLoadingDocuments) {
    return <p>Loading...</p>
  }

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
        <div className='grid-row'>
          {documentsData && Array.isArray(documentsData) && documentsData.length > 0 && documentsData?.map(document => (
            <div key={document.id} className='grid-col-12 flex-align-center margin-top-2'>
              <a
                className='flex-align-center display-flex text-base-darker hover:text-primary'
                style={{ textDecoration: 'none', fontWeight: 400, fontSize: '16px' }}
                href={document.signed_url} target="_blank" rel="noreferrer"
              >
                {document.file_name.includes('.pdf') ? <PictureAsPdfIcon /> : <InsertDriveFileIcon />}
                <span className='margin-left-05'>{document.file_name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Responses;
