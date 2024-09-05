'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { DELEGATE_DASHBOARD_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application } from '@/app/services/types/application-service/Application'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Collection } from '@trussworks/react-uswds'
import { useRouter } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '../utils/FirmDashboard.module.scss'
import ApplicationCards from './ApplicationCards'
import DeleteWithdrawConfirmationModal from './delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'

export default function ClientFirmUserDashboard() {
  const router = useRouter()
  const { data: session, status } = useSessionUCMS()
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>(
    '',
  )
  const [userId, setUserId] = useState<number | null>(null)
  const hasDelegate = session?.permissions?.some(permission => permission.slug.includes('delegate'))

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id)
    }
  }, [session, status])

  useEffect(() => {
    if (hasDelegate) {
      router.push(DELEGATE_DASHBOARD_PAGE)
    }
  }, [hasDelegate])

  const url = userId ? `${FIRM_APPLICATIONS_ROUTE}?user_id=${userId}` : null

  const { data, error } = useSWR<Application[]>(url);

  const applicationDeleteOrWithdraw = async (event: any, id: number) => {
    // Prevent default action and event bubbling if needed
    event.preventDefault()
    event.stopPropagation()
    if(!data) {return;}
    const currentApplication = data.find(app => app.id === id)
    if (!currentApplication) {return;}

    const status = currentApplication.workflow_state
    console.log(currentApplication)
    // Conditional rendering based on status
    const buttons =
    status === 'submitted' ? (
      <div className={styles.buttonContainer}>
        <Button
          type="button"
          data-type="withdraw"
          className={styles.actionButton}
          onClick={handleActionButtonClick}
        >
          <div className={styles.container}>Withdraw Application</div>
        </Button>
        <Button
          type="button"
          className={styles.closeIcon}
          onClick={() => setClickedId(null)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    ) : (
      <div className={styles.buttonContainer}>
        <Button
          type="button"
          data-type="delete"
          className={styles.actionButton}
          onClick={handleActionButtonClick}
        >
          Delete Application
        </Button>
        <Button
          type="button"
          className={styles.closeIcon}
          onClick={() => setClickedId(null)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    )

    setActionButton(buttons)
    setClickedId(id)
  }

  const handleActionButtonClick = (event: React.MouseEvent) => {
    const type = (event.currentTarget as HTMLElement).dataset.type

    setConfirmationType(type)
    setOpenConfirmationModal(true)
  }

  const resetClickedId = () => {
    setClickedId(null)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <Spinner center />
  }

  return (
    <>
      <div>
        <h1>Welcome, {session?.user?.name}</h1>
      </div>

      <h2 className="text-size-2xl margin-y-0 border-bottom padding-y-2 border-base-lighter">Applications</h2>
      {data && data.length > 0 && (
        <div>
          <Collection>
            <ApplicationCards
              data={data}
              clickedId={clickedId}
              actionButton={actionButton}
              applicationDeleteOrWithdraw={applicationDeleteOrWithdraw}
            />
          </Collection>
        </div>
      )}
      {(!data || data.length === 0) && <div>No applications found.</div>}
      {openConfirmationModal && (
        <DeleteWithdrawConfirmationModal
          entityId={data[0].entity.entity_id}
          openConfirmationModal={openConfirmationModal}
          confirmationType={confirmationType}
          clickedId={clickedId}
          resetClickedId={resetClickedId}
          applicationData={data}
        />
      )}
    </>
  )
}
