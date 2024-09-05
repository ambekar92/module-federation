import { QUESTIONNAIRE_LIST_ROUTE } from '@/app/constants/routes';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';
import { useCurrentApplication } from '../../firm/useApplicationData';
import { Params, QuestionnaireItem } from '../../types/types';
import { controlAndOperationQuestionnaire, getAnalystQuestionnaires, getStaticNavItems, ownershipQuestionnaire } from './constants';
import { useQuestionnaireState } from './useQuestionnaireState';

/**
 * Returns the navigation items for the left side bar of the application details page.
 * The items are fetched from the server and memoized.
 *
 * @returns an object with the following properties:
 * - `navItems`: an array of navigation items
 * - `isLoading`: a boolean indicating whether the data is loading
 * - `error`: an error object if there was an error fetching the data
 * - `applicationData`: the application data object
*/
export function useLeftItems() {
  const params = useParams<Params>();
  const { applicationData } = useCurrentApplication();
  const firstContributorId = useMemo(() => applicationData?.application_contributor?.[0]?.id, [applicationData]);
  const programApplications = useMemo(() => applicationData?.program_application || [], [applicationData]);
  const { data: navItems, isLoading, error } = useSWR<QuestionnaireItem[]>(
    firstContributorId ? `${QUESTIONNAIRE_LIST_ROUTE}/${firstContributorId}` : null,
  );
  const staticNavItems = useMemo(() => {
    if (!params.application_id) {return [];}
    return getStaticNavItems(params.application_id);
  }, [params.application_id]);
  const analystQuestionnaires = useMemo(() => getAnalystQuestionnaires(programApplications), [programApplications]);
  const { completedQuestionnaires } = useQuestionnaireState(applicationData, analystQuestionnaires);

  const analystQuestionnaireItems = useMemo(() => {
    if (firstContributorId) {
      return {
        section: 'Analyst Review',
        child: analystQuestionnaires.map((url, index) => ({
          id: index,
          section: 'Analyst Review',
          url: `/${params.application_id}${url}`,
          title: url.split('/').pop()
            ?.replace(/-/g, ' ')
            .replace(/(\b\w)/g, l => l.toUpperCase())
            .replace(/Analyst Questionnaire/g, '')
            .replace(/Eight A/g, '8(a)') || '',
          isCompleted: completedQuestionnaires[url.split('-').pop() || ''] || false
        }))
      };
    }
    return null;
  }, [firstContributorId, params.application_id, analystQuestionnaires, completedQuestionnaires]);

  const applicationItem = useMemo(() => ({
    section: 'Application',
    child: [
      {
        id: (navItems?.length || 0) + 1,
        title: 'Owner and Management',
        url: `/${params.application_id}${ownershipQuestionnaire}`,
        section: 'Application',
      },
      {
        id: (navItems?.length || 0) + 2,
        title: 'Control and Operation',
        url: `/${params.application_id}${controlAndOperationQuestionnaire}`,
        section: 'Application',
      },
      ...(navItems?.map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        section: 'Application',
      })) || [])
    ]
  }), [navItems, firstContributorId]);

  const homeItem = useMemo(() => ({
    section: 'Home',
    child: [{ section: 'Home', url: `${applicationData?.id}/evaluation`, title: 'Home', id: 0 }]
  }), [applicationData?.id]);

  const allNavItems = useMemo(() =>
    [homeItem, applicationItem, ...(analystQuestionnaireItems ? [analystQuestionnaireItems] : []), ...staticNavItems],
  [homeItem, applicationItem, analystQuestionnaireItems, staticNavItems]
  );

  return {
    navItems: allNavItems,
    isLoading,
    error,
    applicationData
  };
}
