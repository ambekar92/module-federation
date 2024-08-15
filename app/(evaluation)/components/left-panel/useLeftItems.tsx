import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NavItem, Params, QuestionnaireItem } from '../../types/types';
import { getStaticNavItems, getAnalystQuestionnaires } from './constants';
import { useApplicationData } from '../../firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';
import { useSessionUCMS } from '@/app/lib/auth';
import { getUserRole } from '@/app/shared/utility/getUserRole';

export function useLeftItems() {
  const sessionData = useSessionUCMS();
  const [questionnaireItems, setQuestionnaireItems] = useState<NavItem[]>([]);
  const [analystQuestionnaireItems, setAnalystQuestionnaireItems] = useState<NavItem[]>([]);
  const [staticNavItems, setStaticNavItems] = useState<NavItem[]>([]);
  const params = useParams<Params>();
  const userRole = getUserRole(sessionData?.data?.permissions || []);
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id);
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;

  const { data: navItems, isLoading, error } = useSWR<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null,
    fetcher
  );

  useEffect(() => {
    if (!params.application_id) { return; }
    const items = getStaticNavItems(params.application_id);
    setStaticNavItems(items);
  }, [params]);

  useEffect(() => {
    if (firstContributorId && userRole === 'analyst') {
      const analystQuestions = getAnalystQuestionnaires();
      const analystItems: NavItem = {
        section: 'Analyst Questionnaires',
        child: analystQuestions.map((url, index) => ({
          id: index,
          section: 'Analyst Questionnaires',
          url: `/${params.application_id}${url}`,
          title: url.split('/').pop()?.replace(/-/g, ' ').replace(/(\b\w)/g, l => l.toUpperCase()).replace(/Analyst Questionnaire/g,'') || ''
        }))
      };
      setAnalystQuestionnaireItems([analystItems]);
    } else {
      setAnalystQuestionnaireItems([]);
    }
  }, [firstContributorId, userRole, params.application_id]);

  const applicationItem: NavItem = {
    section: 'Application',
    child: [
      ...(navItems?.map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        section: 'Application'
      })) || [])
    ]
  };

  return {
    navItems: [applicationItem, ...questionnaireItems, ...analystQuestionnaireItems, ...staticNavItems],
    isLoading,
    error
  };
}
