import useSWR from 'swr';
import { User } from '../../types/user-service/User';
import { USER_ROUTE } from '@/app/constants/local-routes';

export function useUser(userId: string | null | undefined) {
  return useSWR<User>(userId ? `${USER_ROUTE}/${userId}` : null)
}

export function useUsers(filterType: 'id' | 'first_name' | 'last_name' | 'email' | 'is_active' | 'role_slug' | '' = '', filterValue: any =  '') {
  return useSWR<User[]>(`${USER_ROUTE}?${filterType}=${filterValue}`)
}
type UserFilterParams = {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_active?: boolean;
  role_slug?: string;
}

export function useUsersWithMultipleFilters(filters: UserFilterParams = {}) {
  const queryParams = new URLSearchParams(
    Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  return useSWR<User[]>(`${USER_ROUTE}${queryParams ? `?${queryParams}` : ''}`);
}
