import { useMemo } from 'react';
import useSWR from 'swr';
import { QuestionnaireItem } from '../types/types';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';

const INVALID_ROLES = ['screener', 'reviewer', 'admin', 'supervisor', 'analyst'];
const MAX_CONTRIBUTORS = 5;

function isValidContributor(contributor: any): boolean {
  return contributor?.id && !INVALID_ROLES.includes(contributor?.application_role?.name);
}

function getUniqueContributors(allContributors: any[]): any[] {
  const uniqueContributors: any[] = [];
  const addedIds = new Set();

  for (const contributor of allContributors) {
    if (isValidContributor(contributor) && !addedIds.has(contributor.id)) {
      uniqueContributors.push(contributor);
      addedIds.add(contributor.id);
    }
    if (uniqueContributors.length === MAX_CONTRIBUTORS) {break;}
  }

  return uniqueContributors;
}

export function useContributorData(applicationData: any) {
  const contributors = useMemo(() =>
    getUniqueContributors(applicationData?.application_contributor || []),
  [applicationData]
  );

  const questionList1 = useSWR<QuestionnaireItem[]>(
    contributors[0]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[0].id}` : null
  );
  const questionList2 = useSWR<QuestionnaireItem[]>(
    contributors[1]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[1].id}` : null
  );
  const questionList3 = useSWR<QuestionnaireItem[]>(
    contributors[2]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[2].id}` : null
  );
  const questionList4 = useSWR<QuestionnaireItem[]>(
    contributors[3]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[3].id}` : null
  );
  const questionList5 = useSWR<QuestionnaireItem[]>(
    contributors[4]?.id ? `${QUESTIONNAIRE_ROUTE}/${contributors[4].id}` : null
  );

  const contributorData = [
    { data: questionList1.data, isLoading: questionList1.isLoading, error: questionList1.error },
    { data: questionList2.data, isLoading: questionList2.isLoading, error: questionList2.error },
    { data: questionList3.data, isLoading: questionList3.isLoading, error: questionList3.error },
    { data: questionList4.data, isLoading: questionList4.isLoading, error: questionList4.error },
    { data: questionList5.data, isLoading: questionList5.isLoading, error: questionList5.error },
  ];

  const navItems = contributorData.map(data => data.data);
  const isLoading = contributorData.some(data => data.isLoading);
  const errors = contributorData.filter(data => data.error).map(data => data.error);

  return {
    contributors,
    navItems,
    isLoading,
    errors
  };
}
