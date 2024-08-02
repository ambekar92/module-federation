import { MAKE_RECOMMENDATION_ROUTE } from '@/app/constants/routes'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export function useMakeRecommendation() {
  const params = useParams<{ application_id: string }>()
  return useSWR<any[]>(
    params.application_id
      ? `${MAKE_RECOMMENDATION_ROUTE}/${params.application_id}`
      : null,
  )
}
