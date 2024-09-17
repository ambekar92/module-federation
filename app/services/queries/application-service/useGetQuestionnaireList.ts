import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import useSWR from 'swr';
import { QuestionnaireListItem } from '../../types/application-service/QuestionnaireItem';

export function useGetQuestionnaireList(applicationContributorId: number | null | undefined) {
  return useSWR<QuestionnaireListItem[]>( (!!applicationContributorId && isNaN(applicationContributorId) === false) ? `${QUESTIONNAIRE_ROUTE}/${applicationContributorId}` : null)
}
