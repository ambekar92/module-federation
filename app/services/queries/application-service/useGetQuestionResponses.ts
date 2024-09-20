
import useSWR from 'swr';
import { QuestionAnswer } from '@/app/shared/form-builder/questionnaire-types/question';
import { QUESTIONNAIRE_ROUTE } from '@/app/constants/local-routes';
import { QaQuestionsType } from '@/app/shared/types/questionnaireTypes';

export function useGetQuestionResponses(sectionUrl: string) {
  return useSWR<QuestionAnswer[]>( sectionUrl ? `${QUESTIONNAIRE_ROUTE}/${sectionUrl}`: null)
}

export function useGetQuestionnaire(sectionUrl: string) {
  return useSWR<QaQuestionsType>( sectionUrl ? `${QUESTIONNAIRE_ROUTE}/${sectionUrl}`: null)
}
