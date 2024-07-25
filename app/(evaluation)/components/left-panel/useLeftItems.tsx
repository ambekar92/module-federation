import { useEffect, useState } from 'react';
import { NavItem, Params, QuestionnaireItem } from '../../types/types';
import { getStaticNavItems } from './constants';
import { useParams } from 'next/navigation';
import useSWR from 'swr'
import { QUESTIONNAIRE_LIST_ROUTE } from "@/app/constants/routes";
import { fetcherGET } from "@/app/services/fetcher-legacy";

export function useLeftItems() {
  const [questionnaireItems, setQuestionnaireItems] = useState<NavItem[]>([]);
  const [staticNavItems, setStaticNavItems] = useState<NavItem[]>([]);
  const params = useParams<Params>();

  const { data: navItems, isLoading, error } = useSWR<QuestionnaireItem[]>(`${QUESTIONNAIRE_LIST_ROUTE}/${params.application_id}`, fetcherGET);

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

  return {navItems: [...questionnaireItems, ...staticNavItems], isLoading, error}
}
