import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useCurrentApplication } from '../../firm/useApplicationData';
import { Params, QuestionnaireItem, NavItem } from '../../types/types';
import { controlAndOperationQuestionnaire, getAnalystQuestionnaires, getStaticNavItems, ownershipQuestionnaire } from './constants';
import { useQuestionnaireState } from './useQuestionnaireState';
import { getUserRole } from '@/app/shared/utility/getUserRole'
import { useSessionUCMS } from '@/app/lib/auth'

export function useLeftItems() {
  const params = useParams<Params>();
  const { applicationData } = useCurrentApplication();
  const contributors = useMemo(() => {
    const allContributors = applicationData?.application_contributor || [];
    const isValidContributor = (contributor: any) =>
      contributor?.id &&
      contributor?.application_role?.name !== 'screener' &&
      contributor?.application_role?.name !== 'reviewer' &&
      contributor?.application_role?.name !== 'admin' &&
			contributor?.application_role?.name !== 'supervisor' &&
      contributor?.application_role?.name !== 'analyst';

    return [
      isValidContributor(allContributors[0]) ? allContributors[0] : null,
      isValidContributor(allContributors[1]) && allContributors[1]?.id !== allContributors[0]?.id ? allContributors[1] : null,
      isValidContributor(allContributors[2]) && allContributors[2]?.id !== allContributors[0]?.id && allContributors[2]?.id !== allContributors[1]?.id ? allContributors[2] : null,
      isValidContributor(allContributors[3]) && allContributors[3]?.id !== allContributors[0]?.id && allContributors[3]?.id !== allContributors[1]?.id && allContributors[3]?.id !== allContributors[2]?.id ? allContributors[3] : null,
      isValidContributor(allContributors[4]) && allContributors[4]?.id !== allContributors[0]?.id && allContributors[4]?.id !== allContributors[1]?.id && allContributors[4]?.id !== allContributors[2]?.id && allContributors[4]?.id !== allContributors[3]?.id ? allContributors[4] : null,
    ].filter(Boolean);
  }, [applicationData]);

  const { data: navItems1, isLoading, error } = useSWR<QuestionnaireItem[]>(
    contributors[0]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[0].id}` : null
  );
  const { data: navItems2 } = useSWR<QuestionnaireItem[]>(
    contributors[1]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[1].id}` : null
  );
  const { data: navItems3 } = useSWR<QuestionnaireItem[]>(
    contributors[2]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[2].id}` : null
  );
  const { data: navItems4 } = useSWR<QuestionnaireItem[]>(
    contributors[3]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[3].id}` : null
  );
  const { data: navItems5 } = useSWR<QuestionnaireItem[]>(
    contributors[4]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[4].id}` : null
  );

  const staticNavItems = useMemo(() => getStaticNavItems(params.application_id), [params.application_id]);
  const programApplications = useMemo(() => applicationData?.program_application || [], [applicationData]);
  const analystQuestionnaires = useMemo(() => getAnalystQuestionnaires(programApplications), [programApplications]);
  const { completedQuestionnaires } = useQuestionnaireState(applicationData, analystQuestionnaires);
  const sessionData = useSessionUCMS();
  const userRole = getUserRole(sessionData?.data?.permissions || []);

  const analystQuestionnaireItems = useMemo(() => {
    if (contributors[0]?.id && userRole !== 'screener') {
      return {
        section: 'Analyst Review',
        child: analystQuestionnaires.map((url, index) => ({
          id: index,
          section: 'Analyst Review',
          url: `/${params.application_id}${url}`,
          title: url.split('/').pop()?.replace(/-/g, ' ').replace(/(\b\w)/g, l => l.toUpperCase()).replace(/Analyst Questionnaire/g, '').replace(/Eight A/g, '8(a)') || '',
          isCompleted: completedQuestionnaires[url.split('-').pop() || ''] || false
        }))
      };
    }
    return null;
  }, [contributors, params.application_id, analystQuestionnaires, completedQuestionnaires, userRole]);

  const mapItems = (items: QuestionnaireItem[] | undefined, contributorId: string | undefined, sectionTitle: string): NavItem => ({
    section: sectionTitle,
    child: [
      ...(sectionTitle === 'Application' ? [{
        id: (items?.length || 0) + 1,
        title: 'Owner and Management',
        url: `/${params.application_id}${ownershipQuestionnaire}${contributorId ? `?contributor_id=${contributorId}` : ''}`,
        section: sectionTitle,
      }] : []),
      ...(sectionTitle === 'Application' ? [{
        id: (items?.length || 0) + 2,
        title: 'Control and Operation',
        url: `/${params.application_id}${controlAndOperationQuestionnaire}${contributorId ? `?contributor_id=${contributorId}` : ''}`,
        section: sectionTitle,
      }] : []),
      ...(items?.map(item => ({
        id: item.id,
        title: item.title,
        url: `${item.url}${contributorId ? `?contributor_id=${contributorId}` : ''}`,
        section: sectionTitle,
      })) || [])
    ]
  });

  const applicationItem = useMemo(() => {
    const mainApplication = mapItems(navItems1, undefined, 'Application');
    const contributorItems = [
      navItems2 && mapItems(navItems2, contributors[1]?.id?.toString(), `${contributors[1]?.user.first_name} ${contributors[1]?.user.last_name}`),
      navItems3 && mapItems(navItems3, contributors[2]?.id?.toString(), `${contributors[2]?.user.first_name} ${contributors[2]?.user.last_name}`),
      navItems4 && mapItems(navItems4, contributors[3]?.id?.toString(), `${contributors[3]?.user.first_name} ${contributors[3]?.user.last_name}`),
      navItems5 && mapItems(navItems5, contributors[4]?.id?.toString(), `${contributors[4]?.user.first_name} ${contributors[4]?.user.last_name}`),
    ].filter(Boolean);

    return {
      ...mainApplication,
      child: [
        ...mainApplication.child,
        ...contributorItems
      ]
    };
  }, [navItems1, navItems2, navItems3, navItems4, navItems5, contributors, params.application_id]);

  const homeItem = useMemo(() => ({
    section: 'Home',
    child: [{ section: 'Home', url: `${applicationData?.id}/evaluation`, title: 'Home', id: 0 }]
  }), [applicationData?.id]);

  const allNavItems = useMemo(() => [
    homeItem,
    applicationItem,
    ...(analystQuestionnaireItems ? [analystQuestionnaireItems] : []),
    ...staticNavItems
  ], [homeItem, applicationItem, analystQuestionnaireItems, staticNavItems]);

  return {
    navItems: allNavItems,
    isLoading,
    error,
    applicationData
  };
}
