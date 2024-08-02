import { COMPLETE_EVALUATION_TASK_ROUTE } from "@/app/constants/routes";
import useSWRMutation from "swr/mutation";
import { confirmVAStatus } from "../../api/evaluation-service/confirmVAStatus";

export function useUpdateVAStatus() {
    return useSWRMutation(COMPLETE_EVALUATION_TASK_ROUTE, confirmVAStatus, {
        onSuccess: () => {

        },
        onError: (error) => {
            
        }
    })
}