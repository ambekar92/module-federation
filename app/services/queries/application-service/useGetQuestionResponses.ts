
import useSWR from 'swr';
import { QuestionAnswer } from '@/app/shared/form-builder/questionnaire-types/question';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';

export function useGetQuestionResponses(sectionUrl: string) {

  return useSWR<QuestionAnswer[]>( sectionUrl ? `${QUESTIONNAIRE_ROUTE}/${sectionUrl}`: null)
}
