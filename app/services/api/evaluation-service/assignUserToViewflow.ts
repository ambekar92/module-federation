import { ASSIGN_USER_TO_VIEWFLOW_ROUTE } from "@/app/constants/routes";
import { axiosInstance } from "../../axiosInstance";

export async function assignUserToViewflow(payload: AssignUserToViewflowPayload) {
    await axiosInstance.put(ASSIGN_USER_TO_VIEWFLOW_ROUTE, payload)
}