import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import fetcher from '@/app/services/fetcher';
import { getUserRole } from '@/app/shared/utility/getUserRole';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useCurrentApplication } from '../../firm/useApplicationData';
import { Params, QuestionnaireItem } from '../../types/types';
import { getAnalystQuestionnaires, getStaticNavItems } from './constants';

export function useLeftItems() {
  const sessionData = useSessionUCMS();
  const params = useParams<Params>();
  const userRole = useMemo(() => getUserRole(sessionData?.data?.permissions || []), [sessionData?.data?.permissions]);
  const { applicationData } = useCurrentApplication();

  const firstContributorId = useMemo(() => applicationData?.application_contributor?.[0]?.id, [applicationData]);
  const programApplications = useMemo(() => applicationData?.program_application || [], [applicationData]);

  const { data: navItems, isLoading, error } = useSWR<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null,
    fetcher
  );

  const staticNavItems = useMemo(() => {
    if (!params.application_id) {return [];}
    return getStaticNavItems(params.application_id);
  }, [params.application_id]);

  const analystQuestionnaireItems = useMemo(() => {
    if (firstContributorId && userRole === 'analyst') {
      const analystQuestions = getAnalystQuestionnaires(programApplications);
      return [{
        section: 'Analyst Review',
        child: analystQuestions.map((url, index) => ({
          id: index,
          section: 'Analyst Review',
          url: `/${params.application_id}${url}`,
          title: url.split('/').pop()
            ?.replace(/-/g, ' ')
            .replace(/(\b\w)/g, l => l.toUpperCase())
            .replace(/Analyst Questionnaire/g,'')
            .replace(/Eight A/g, '8(a)') || ''
        }))
      }];
    }
    return [];
  }, [firstContributorId, userRole, params.application_id, programApplications]);

  const applicationItem = useMemo(() => ({
    section: 'Application',
    child: navItems?.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      section: 'Application',
    })) || []
  }), [navItems]);

  const homeItem = useMemo(() => ({
    section: 'Home',
    child: [{ section: 'Home', url: applicationData?.id + '/evaluation', title: 'Home', id: 0 }]
  }), [applicationData?.id]);

  const allNavItems = useMemo(() =>
    [homeItem, applicationItem, ...analystQuestionnaireItems, ...staticNavItems],
  [homeItem, applicationItem, analystQuestionnaireItems, staticNavItems]
  );

  return {
    navItems: allNavItems,
    isLoading,
    error
  };
}
