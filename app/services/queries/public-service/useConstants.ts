
import useSWR from 'swr';
import { Constant } from '../../types/public-service/Constant';
import { CONSTANT_ROUTE } from '@/app/constants/local-routes';

export function useConstants() {
  return useSWR<Constant[]>(`${CONSTANT_ROUTE}`)
}
