import { MESSAGES_ROUTE } from "@/app/constants/routes";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Message } from "../../types/communication-service/Message";
import { fetcherGET } from "../../fetcher";

export function useMessages() {
    const params = useParams<{id: string}>();
    return useSWR<Message[]>(`${MESSAGES_ROUTE}/${params.id}`, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged
}

