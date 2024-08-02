import useSWR from "swr";
import { useParams } from "next/navigation";
import { useSessionUCMS } from "@/app/lib/auth";
import { FIRM_APPLICATIONS_ROUTE } from "@/app/constants/routes";
import { Application } from "../types/application-service/Application";

export function useApplication() {
    const session = useSessionUCMS();
    const {entityId} = useParams<{entityId: string}>();
    const url = entityId ? `${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}` :
    session.data?.user?.id ? `${FIRM_APPLICATIONS_ROUTE}?user_id=${session.data?.user?.id}` : '';
    return useSWR<Application[]>(url)
}