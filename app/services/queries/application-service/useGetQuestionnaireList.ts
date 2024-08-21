import { QUESTIONNAIRE_LIST_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { QuestionnaireListItem } from "../../types/application-service/QuestionnaireItem";

export function useGetQuestionnaireList(applicationContributorId: number | null | undefined) {
    return useSWR<QuestionnaireListItem[]>( (!!applicationContributorId && isNaN(applicationContributorId) === false) ? `${QUESTIONNAIRE_LIST_ROUTE}/${applicationContributorId}` : null, fetcher) 
}