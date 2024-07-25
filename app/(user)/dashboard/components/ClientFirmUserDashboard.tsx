'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher-legacy'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application } from '@/app/services/types/application'
import getEntityByUserId from '@/app/shared/utility/getEntityByUserId'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Collection
} from '@trussworks/react-uswds'
import { ReactElement, useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '../utils/FirmDashboard.module.scss'
import { humanizeText } from '../utils/helpers'
import ApplicationCard from './ApplicationCard'
import DeleteWithdrawConfirmationModal from './delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'

export default function ClientFirmUserDashboard() {
  const { data: session, status } = useSessionUCMS();
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('')
  const [userId, setUserId] = useState<number | null>(null);
  const [entityId, setEntityId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id);
    }
  }, [session, status]);

  useEffect(() => {
    async function fetchEntityData() {
      if (userId) {
        const entityData = await getEntityByUserId(userId);
        if (entityData && entityData.length > 0) {
          setEntityId(entityData[entityData.length - 1].id);
        }
      }
    }
    fetchEntityData();
  }, [userId]);

  const url = entityId ? `${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}` :
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

  const handleActionButtonClick = (event: React.MouseEvent) => {
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
        <p><i>{data[data.length - 1]?.sam_entity?.legal_business_name || ''}</i></p>
      </div>

      <h2 className='text-size-2xl'>Applications</h2>
      <span className='text-size-lg'><strong>{humanizeText(data[0]?.workflow_state || '')}</strong></span>
      {data && data.length > 0 && (
        <div>
          <Collection>
            <ApplicationCard
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
          entityId={entityId}
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
