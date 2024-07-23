import { THREADS_ROUTE } from "@/app/constants/routes";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcherGET } from "../../fetcher";
import { Thread } from "../../types/communication-service/Thread";

export function useThreads() {
    const params = useParams<{messageId: string}>();
    return useSWR<Thread[]>(`${THREADS_ROUTE}?uuid=${params.messageId}`, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged
}

