'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'
import { Application } from '@/app/services/types/application'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Collection
} from '@trussworks/react-uswds'
import { Session } from 'next-auth'
import { ReactElement, useState } from 'react'
import useSWR from 'swr'
import styles from '../utils/FirmDashboard.module.scss'
import { humanizeText } from '../utils/helpers'
import ApplicationCard from './ApplicationCard'
import DeleteWithdrawConfirmationModal from './delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'

export interface ClientFirmUserDashboardProps {
	session: Session | null;
}

export default function ClientFirmUserDashboard({ session }: ClientFirmUserDashboardProps) {
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('')
  const { userId, entityId: entity_id } = useApplicationId()

  const url = entity_id ? `${FIRM_APPLICATIONS_ROUTE}?entity_id=${entity_id}` :
    userId ? `${FIRM_APPLICATIONS_ROUTE}?user_id=${userId}` : null;

  const { data, error } = useSWR(url, fetcherGET<Application[]>)

  const applicationDeleteOrWithdraw = async (event: any, id: number) => {
    // Prevent default action and event bubbling if needed
    event.preventDefault();
    event.stopPropagation();

    const status = event.currentTarget.getAttribute('data-status');

    // Conditional rendering based on status
    const buttons = (status === 'In progress') ? (
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
    ) : (
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
    );

    setActionButton(buttons);
    setClickedId(id);
  };

  const handleActionButtonClick = (event: any) => {
    const type = (event.currentTarget as HTMLElement).dataset.type

    setConfirmationType(type)
    setOpenConfirmationModal(true)
  }

  const resetClickedId = () => {
    setClickedId(null)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Welcome, {session?.user?.name}</h1>
        <p><i>{data[data.length - 1].sam_entity.legal_business_name ? data[data.length - 1].sam_entity.legal_business_name : ''}</i></p>
      </div>

      <h2 className='text-size-2xl'>Applications</h2>
      <span className='text-size-lg'><strong>{humanizeText(data[0].workflow_state)}</strong></span>
      {data && !!data.length && <div>
        <Collection>
          <ApplicationCard
            data={data}
            clickedId={clickedId} actionButton={actionButton}
            applicationDeleteOrWithdraw={applicationDeleteOrWithdraw}
          />
        </Collection>
      </div>}
      {(!data || !data.length) && <div> No applications found.
      </div>}
      {openConfirmationModal && (
        <DeleteWithdrawConfirmationModal
          entityId={entity_id}
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
