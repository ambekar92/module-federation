import { USER_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import fetcher from "../../fetcher";
import { User } from "../../types/user-service/User";

export function useUser(userId: String) {
    return useSWR<User>(`${USER_ROUTE}/${userId}`, fetcher) 
}

export function useUsers(filterType: 'id' | 'first_name' | 'last_name' | 'email' | 'is_active' | 'role_slug' | '' = '', filterValue: any =  '') {
    return useSWR<User[]>(`${USER_ROUTE}?${filterType}=${filterValue}`, fetcher) 
}