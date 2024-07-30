import { USER_TASK_DASHBOARD_ROUTE } from "@/app/constants/routes";
import { useSessionUCMS } from "@/app/lib/auth";
import useSWR from "swr";
import { UserTaskDashboard } from "../../types/evaluation-service/UserTaskDashboard";

export function useUserTaskDashboard() {
    const session = useSessionUCMS();
    return useSWR<UserTaskDashboard[]>(`${USER_TASK_DASHBOARD_ROUTE}/${session.data.user_id}`)
    // return useSWR<UserTaskDashboard[]>(`${USER_TASK_DASHBOARD_ROUTE}/0`)
}


