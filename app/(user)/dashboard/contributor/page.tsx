'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { useApplication } from '@/app/services/queries/application-service/useApplication'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { Collection } from '@trussworks/react-uswds'
import ApplicationCards from '../../user/dashboard/components/ApplicationCards'

export default function ContributorDashboardPage() {
  const { data: session } = useSessionUCMS()
  const { data, isLoading, error } = useApplication(ApplicationFilterType.user_id, session?.user_id);

  if (error) {return <div>Error: {error.message}</div>}
  if (!data || isLoading) {return <Spinner center />}

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
