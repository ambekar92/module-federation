'use client'
import { useSessionUCMS } from '@/app/lib/auth'
import { useApplication } from '@/app/services/queries/useApplication'
import { faEllipsisVertical, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Collection
} from '@trussworks/react-uswds'
import { Fragment, ReactElement, useState } from 'react'
import FirmApplicationCard from '../../components/FirmApplicationCard'
import DeleteWithdrawConfirmationModal from '../../components/delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'
import styles from '../../utils/FirmDashboard.module.scss'
import Spinner from '@/app/shared/components/spinner/Spinner'

interface FirmUserDashboardPageProps {
  params: {
    entityId?: number;
  };
}

const FirmUserDashboard: React.FC<FirmUserDashboardPageProps> = ({ params: {entityId} }) => {
  const session = useSessionUCMS();
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('');

  const { data, error } = useApplication();

  // is this needed?
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <Spinner center />
  }

  return (
    <>
      <div>
        <h1>Welcome, {session.data?.user?.name}</h1>
      </div>

      <h2>Applications</h2>
      {data && !!data.length && <div>
        <Collection>
          {data?.map((a) => (
            <Fragment key={a.id}>
              <FirmApplicationCard
                title={a.application_type.description}
                id={a.id}
                status={a.workflow_state}
                programs={a.program_application.map(pa => pa.programs.name)}
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
      </div>}
      {(!data || !data.length) && <div> No applications found.
      </div>}
      {openConfirmationModal && (
        <DeleteWithdrawConfirmationModal
          openConfirmationModal={openConfirmationModal}
          confirmationType={confirmationType}
          entityId={entityId}
        />
      )}
    </>
  )
}

export default FirmUserDashboard
