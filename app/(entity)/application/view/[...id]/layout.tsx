'use client'

import { useSessionUCMS } from '@/app/lib/auth'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { useApplication } from '@/app/services/queries/application-service/useApplication'
import { useGetQuestionnaireList } from '@/app/services/queries/application-service/useGetQuestionnaireList'
import { Alert, SideNav } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo } from 'react'

const listItemClasses = 'bg-white radius-sm margin-bottom-1 line-height';

const QuestionsNav = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const session = useSessionUCMS();
  const queryParam = useSearchParams();
  const route = useRouter();
  const userRole = session.data?.permissions[session.data.permissions.length - 1].slug;
  const { data: applications, isLoading: isLoadingApplications } = useApplication(ApplicationFilterType.id, params.id[0]);
  let applicationContributorId = applications?.[0]?.application_contributor.find(ac => ac.user_id === session?.data?.user_id)?.id;
  if (applicationContributorId === undefined && userRole === 'delegate') {
    // Need application to return delegate user_id
    applicationContributorId = applications?.[0]?.application_contributor.find(ac => ac.application_role_id === 1)?.id;
  }
  const { data, isLoading } = useGetQuestionnaireList(applicationContributorId);

  const allQuestionnaires = useMemo(() => {
    if (!data) {return [];}

    let additionalQuestionnaires: { title: string; url: string }[] = [];
    if (userRole === 'primary_qualifying_owner' || userRole === 'delegate') {
      additionalQuestionnaires = [
        { title: 'Owner and Management', url: `${applicationContributorId}/owner-and-management` },
        { title: 'Control and Operation', url: `${applicationContributorId}/control-and-operation` }
      ]
    }

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
    <div className="grid-row grid-gap padding-right-5" style={{maxWidth: '100vw'}}>
      {allQuestionnaires.length > 0 &&
        <div className='bg-base-lighter grid-col-3 padding-2'>
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
      <div className='grid-col-9 max-width-full'>
        {children}
      </div>
    </div>
  )
}

export default QuestionsNav
