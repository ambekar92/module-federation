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
  const userRole = session.data?.permissions?.[session.data.permissions.length - 1]?.slug;
  const { data: applications, isLoading: isLoadingApplications } = useApplication(ApplicationFilterType.id, params.id?.[0]);

  const contributorParam = queryParam.get('contributor');
  let applicationContributorId: number | undefined = undefined;

  if (applications && applications[0]) {
    if (contributorParam) {
      const parsedContributorId = parseInt(contributorParam);
      const matchingContributor = applications[0].application_contributor.find(ac => ac.id === parsedContributorId);
      if (matchingContributor) {
        applicationContributorId = parsedContributorId;
      }
    } else {
      applicationContributorId = applications[0].application_contributor.find(ac => ac.user_id === session?.data?.user_id)?.id;
    }

    if (applicationContributorId === undefined && userRole === 'delegate') {
      applicationContributorId = applications[0].application_contributor.find(ac => ac.application_role_id === 1)?.id;
    }
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
  }, [data, userRole]);

  useEffect(() => {
    if (!allQuestionnaires.length) {return;}
    const firstQuestionnaireUrl = allQuestionnaires[0].url;
    const redirectUrl = `?${contributorParam ? `contributor=${contributorParam}&` : ''}sectionUrl=${firstQuestionnaireUrl}`;
    route.push(redirectUrl);
  }, [allQuestionnaires, route, contributorParam, applicationContributorId]);

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
                className={queryParam.get('sectionUrl') === `${q.url}` ? 'usa-current' : ''}
                href={`?${contributorParam ? `contributor=${contributorParam}&` : ''}sectionUrl=${q.url}`}
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
