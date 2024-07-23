import { INBOX_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import { fetcherGET } from "../../fetcher";
import { InboxResponse } from "../../types/communication-service/Inbox";
import { useSessionUCMS } from "@/app/lib/auth";

export function useInbox() {
    const session = useSessionUCMS();
    // return useSWR<InboxResponse>(`${INBOX_ROUTE}/20`, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged
    return useSWR<InboxResponse>(`${INBOX_ROUTE}/${session.data.user_id}`, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged
}

