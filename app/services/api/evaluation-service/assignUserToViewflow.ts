import { ASSIGN_USER_TO_VIEWFLOW_ROUTE } from "@/app/constants/routes";
import { axiosInstance } from "../../fetcher";

export async function assignUserToViewflow(payload: AssignUserToViewflowPayload) {
    await axiosInstance.post(ASSIGN_USER_TO_VIEWFLOW_ROUTE, payload)
}