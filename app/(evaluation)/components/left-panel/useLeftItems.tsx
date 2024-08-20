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
import {
  buildRoute,
  FIRM_EVALUATION_PAGE,
} from '@/app/constants/url'

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
        section: 'Application',
      })) || [])
    ]
  };
  const homeItem: NavItem = {
    section: 'Home',
    child: [{ section: 'Home', url: applicationData?.id + '/evaluation', title: 'Home', id: 0 }]
  };

  return {
    navItems: [homeItem, applicationItem, ...questionnaireItems, ...analystQuestionnaireItems, ...staticNavItems],
    isLoading,
    error
  };
}
