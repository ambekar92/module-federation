import { CONSTANT_ROUTE } from '@/app/constants/routes';
import useSWR from 'swr';
import { Constant } from '../../types/public-service/Constant';

export function useConstants() {
  return useSWR<Constant[]>(`${CONSTANT_ROUTE}`)
}
