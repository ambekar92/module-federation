import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { NavItem, Params, QuestionnaireItem } from '../../types/types';
import { getStaticNavItems } from './constants';
import { useApplicationData } from '../../firm/useApplicationData';
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters';

export function useLeftItems() {
  const [questionnaireItems, setQuestionnaireItems] = useState<NavItem[]>([]);
  const [staticNavItems, setStaticNavItems] = useState<NavItem[]>([]);
  const params = useParams<Params>();
  const { applicationData } = useApplicationData(ApplicationFilterType.id, params.application_id);
  const firstContributorId = applicationData?.application_contributor?.[0]?.id;
  const { data: navItems, isLoading, error } = useSWR<QuestionnaireItem[]>(firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null, fetcher);

  useEffect(() => {
    if (!params.application_id) { return; }
    const items = getStaticNavItems(params.application_id);
    setStaticNavItems(items)
  }, [params]);

  useEffect(() => {
    const sectionItemsMap = new Map<string, QuestionnaireItem[]>();
    if (navItems && Array.isArray(navItems)) {
      for (const item of navItems) {
        if (!sectionItemsMap.has(item.section)) {
          sectionItemsMap.set(item.section, [])
        }
        sectionItemsMap.get(item.section)!.push(item)
      }
      const sectionItems = Array.from(sectionItemsMap.entries()).map(([sectionName, items]) => ({ section: sectionName, child: items }))
      setQuestionnaireItems(sectionItems);
    }
  }, [navItems])

  const applicationItem: NavItem = {
    section: 'Application',
    child: [{ title: 'Application', url: `/${params.application_id}/evaluation`, section: 'Application' }]
  };

  return {
    navItems: [applicationItem, ...questionnaireItems, ...staticNavItems],
    isLoading,
    error
  }
}
