'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { useApplication } from '@/app/services/queries/application-service/useApplication'
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList'
import { Alert, SideNav } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo } from 'react'

const listItemClasses = 'bg-white radius-sm width-card-lg margin-bottom-1 line-height';

const QuestionsNav = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const session = useSessionUCMS();
  const queryParam = useSearchParams();
  const route = useRouter();
  const { data: applications, isLoading: isLoadingApplications } = useApplication(ApplicationFilterType.id, params.id[0]);
  const applicationContributorId = applications?.[0]?.application_contributor.find(ac => ac.user_id === session?.data?.user_id)?.id;
  const { data, isLoading } = useGetQuestionnaireList(applicationContributorId);

  const allQuestionnaires = useMemo(() => {
    if (!data) {return [];}

    const additionalQuestionnaires = [
      { title: 'Owner and Management', url: `${applicationContributorId}/owner-and-management` },
      { title: 'Control and Operation', url: `${applicationContributorId}/control-and-operation` }
    ];

    return [...additionalQuestionnaires, ...data];
  }, [data, applicationContributorId]);

  useEffect(() => {
    if (!allQuestionnaires.length) {return;}
    route.push(`?sectionUrl=${allQuestionnaires[0].url}`);
  }, [allQuestionnaires, route]);

  if (!isLoading && !isLoadingApplications && (!applications || !applicationContributorId)) {
    return <Alert type="info" headingLevel={'h1'}>No application found</Alert>;
  }

  if (isLoading || isLoadingApplications) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display:'flex', gap: '1rem'}}>
      {allQuestionnaires.length > 0 &&
        <div className='bg-base-lighter padding-2'>
          <SideNav items={allQuestionnaires.map(q => (
            <div key={q.url} className={listItemClasses}>
              <Link
                className={queryParam.get('sectionUrl') === q.url ? 'usa-current' : ''}
                href={`?sectionUrl=${q.url}`}
              >
                {q.title}
              </Link>
            </div>
          ))} />
        </div>
      }
      {children}
    </div>
  )
}

export default QuestionsNav
