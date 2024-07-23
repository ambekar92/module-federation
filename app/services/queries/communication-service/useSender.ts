import { USER_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import { fetcherGET } from "../../fetcher";
import { User } from "../../types/user-service/User";
import { useThreads } from "./useThreads";
import { Thread } from "../../types/communication-service/Thread";
import { useParams } from "next/navigation";

export function useSender() {
    const params = useParams<{messageId: string}>()
    const {data} = useThreads();
    const thread = data?.find((thread: Thread) => thread.uuid === params.messageId);
    return useSWR<User>(thread ? `${USER_ROUTE}/${thread.messages[0].sender}` : null, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged
}