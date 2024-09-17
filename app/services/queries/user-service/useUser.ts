import useSWR from 'swr';
import { User } from '../../types/user-service/User';
import { USER_ROUTE } from '@/app/constants/local-routes';

export function useUser(userId: string | null | undefined) {
  return useSWR<User>(userId ? `${USER_ROUTE}/${userId}` : null)
}

export function useUsers(filterType: 'id' | 'first_name' | 'last_name' | 'email' | 'is_active' | 'role_slug' | '' = '', filterValue: any =  '') {
  return useSWR<User[]>(`${USER_ROUTE}?${filterType}=${filterValue}`)
}
