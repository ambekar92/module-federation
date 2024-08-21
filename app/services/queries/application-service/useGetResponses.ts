import { QUESTIONNAIRE_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { QuestionAnswer } from "@/app/shared/form-builder/questionnaire-types/question";

export function useGetResponses(sectionUrl: string) {
    
    return useSWR<QuestionAnswer[]>( sectionUrl ? `${QUESTIONNAIRE_ROUTE}/${sectionUrl}`: null, fetcher) 
}