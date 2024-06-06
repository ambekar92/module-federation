'use client'
import { FIRM_APPLICATIONS_ROUTE } from '@/app/constants/routes'
import { ApplicationResponse, applicationFetcherGet } from '@/app/services/application-fetcher'
import { faEllipsisVertical, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Collection
} from '@trussworks/react-uswds'
import { useSession } from 'next-auth/react'
import { Fragment, ReactElement, useState } from 'react'
import useSWR from 'swr'
import FirmApplicationCard from '../components/FirmApplicationCard'
import DeleteWithdrawConfirmationModal from '../components/delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'
import styles from '../utils/FirmDashboard.module.scss'

interface FirmUserDashboardPageProps {
  params: {
    entityId?: number;
  };
}

const FirmUserDashboard: React.FC<FirmUserDashboardPageProps> = ({ params: {entityId}}) => {
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('')

  const url = entityId ? `${FIRM_APPLICATIONS_ROUTE}?entity_id=${entityId}` : `${FIRM_APPLICATIONS_ROUTE}`
  const { data, error } = useSWR<ApplicationResponse>(url, applicationFetcherGet);

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
    setClickedId(null)
    setOpenConfirmationModal(true)
  }

  const session = useSession()

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Welcome {session.data?.user?.name}</h1>
        <p>[Business name]</p>
      </div>

      <div>
        <h2>Applications</h2>
        <Collection>
          {data?.map((a) => (
            <Fragment key={a.id}>
              <FirmApplicationCard
                title={a.application_type.description}
                id={a.id}
                status={a.workflow_state}
                programs={a.program_application}
                updatedDate={a.updated_at}
                clickedId={clickedId}
                actionButton={clickedId === a.id ? (
                  actionButton
                ) : (
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    data-status={a.workflow_state}
                    className="cursor-pointer"
                    onClick={(e) => applicationDeleteOrWithdraw(e, a.id)}
                  />
                )}
                applicationDeleteOrWithdraw={applicationDeleteOrWithdraw}
              />
            </Fragment>
          ))}
        </Collection>
      </div>
      {openConfirmationModal && (
        <DeleteWithdrawConfirmationModal
          openConfirmationModal={openConfirmationModal}
          confirmationType={confirmationType}
        />
      )}
    </>
  )
}

export default FirmUserDashboard
