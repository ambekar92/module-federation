'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { buildRoute, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import ClaimBusinessClient from './components/ClaimMyBusinessClient'
export default function ClaimBusinessPage() {
  const router = useRouter()
  const { data: session, status } = useSessionUCMS()

  useEffect(() => {
    if (status === 'authenticated' && session?.entities?.length > 0) {
      const lastEntity = session.entities[session.entities.length - 1]
      if (lastEntity?.entity_id) {
        router.push(
          buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, {
            entity_id: lastEntity.entity_id,
          }),
        )
      }
    }
  }, [status, session, router])

  if (status === 'loading' || !session) {
    return null
  }

  return <ClaimBusinessClient />
}
