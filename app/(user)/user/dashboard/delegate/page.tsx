'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application } from '@/app/services/types/application-service/Application'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { getEntityByDelegateId } from '@/app/shared/utility/getEntityByUserId'
import { Collection } from '@trussworks/react-uswds'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ApplicationCards from '../components/ApplicationCards'

export default function DelegateDashboardPage() {
  const { data: session } = useSessionUCMS()
  const [entityId, setEntityId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchEntityData() {
      if (session?.user_id) {
        const entityData = await getEntityByDelegateId(session.user_id)
        if (entityData && entityData.length > 0) {
          setEntityId(entityData[entityData.length - 1].id)
        }
      }
    }
    fetchEntityData()
  }, [session?.user_id])

  const url = entityId ? `${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}` : null

  const { data, error } = useSWR<Application[]>(url)

  if (error) {return <div>Error: {error.message}</div>}
  if (!data) {return <Spinner center />}

  return (
    <>
      <div>
        <h1>Welcome, {session?.user?.name}</h1>
      </div>

      <h2 className="text-size-2xl margin-y-0 border-bottom padding-y-2 border-base-lighter">Applications</h2>
      {data.length > 0 ? (
        <div>
          <Collection>
            <ApplicationCards
              data={data}
            />
          </Collection>
        </div>
      ) : (
        <div>No applications found.</div>
      )}
    </>
  )
}
