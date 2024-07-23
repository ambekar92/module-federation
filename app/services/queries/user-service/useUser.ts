import { USER_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import { fetcherGET } from "../../fetcher";
import { User } from "../../types/user-service/User";

export function useUser(userId: String) {
    return useSWR<User>(`${USER_ROUTE}/${userId}`, fetcherGET) // TODO change to fetcher from services/fetcher once pr pull/486 is merged

}