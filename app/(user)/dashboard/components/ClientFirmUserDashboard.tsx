'use client'
import InvitationCodeForm from '@/app/(entity)/claim-your-business/components/forms/InvitationCodeForm'
import { GET_APPLICATIONS_ROUTE, GET_ENTITIES_ROUTE } from '@/app/constants/local-routes'
import { buildRoute, CLAIM_YOUR_BUSINESS, DELEGATE_DASHBOARD_PAGE, SELECT_INTENDED_PROGRAMS_PAGE } from '@/app/constants/url'
import { useSessionUCMS } from '@/app/lib/auth'
import { Application, EntitiesType } from '@/app/services/types/application-service/Application'
import { Show } from '@/app/shared/components/Show'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import { Button, ButtonGroup, Collection, Grid } from '@trussworks/react-uswds'
import { useParams, useRouter } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '../utils/FirmDashboard.module.scss'
import ApplicationCards from './ApplicationCards'
import DeleteWithdrawConfirmationModal from './delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { getApplicationRole } from '@/app/shared/utility/getApplicationRole'
import { useApplication } from '@/app/services/queries/application-service/useApplication'
import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'

type Props = {
  internalUser?: boolean
}

export default function ClientFirmUserDashboard({internalUser = false}: Props) {
  const router = useRouter()
  const { data: session, status } = useSessionUCMS()
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('')
  const [enterInvitationCode, setEnterInvitationCode] = useState(false);
  const [userId, setUserId] = useState<number | null>(null)
  const url = userId ? `${GET_APPLICATIONS_ROUTE}?user_id=${userId}` : null
  const { data, error, isLoading } = useSWR<Application[]>(url);
  const params = useParams()
  const {data: intrnlAppication} = useApplication(ApplicationFilterType.entity_id, params.id) ;
  const { data: entityData } = useSWR<EntitiesType[]>(
    (!isLoading && (Array.isArray(data) && data?.length === 0 || !data) && session?.user_id) ? `${GET_ENTITIES_ROUTE}?owner_user_id=${session.user_id}` : null
  );

  const hasDelegate = session?.permissions?.some(permission => permission.slug.includes('delegate'))
  const applicationRole = (data && session?.user_id) && getApplicationRole(data, session?.user_id)

  useEffect(() => {
    if (status === 'authenticated' && session?.user_id) {
      setUserId(session.user_id)
    }
  }, [session, status])

  useEffect(() => {
    if (hasDelegate || applicationRole === 'delegate') {
      router.push(DELEGATE_DASHBOARD_PAGE)
    }
  }, [hasDelegate, applicationRole])

  const applicationDeleteOrWithdraw = async (event: any, id: number) => {
    // Prevent default action and event bubbling if needed
    event.preventDefault()
    event.stopPropagation()
    if(!data) {return;}
    const currentApplication = Array.isArray(data) && data.find(app => app.id === id)
    if (!currentApplication) {return;}

    const status = currentApplication.workflow_state
    // Conditional rendering based on status
    const buttons =
		status === 'returned_to_firm' || status === 'return_to_firm' ||
		status === 'request_for_information' || status === 'under_review'
		  ? <></>
		  : status === 'submitted'
		    ? (
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
		    )
		    : (
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

  const onEnterCodeCancel = () => {
    setEnterInvitationCode(false)
  }

  const handleApply = () => {
    if(entityData && entityData.length > 0) {
      window.location.href = buildRoute(SELECT_INTENDED_PROGRAMS_PAGE, {
        entity_id: entityData[entityData.length - 1].id,
      })
    } else {
      window.location.href = CLAIM_YOUR_BUSINESS
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data || isLoading) {
    return <Spinner center />
  }

  return (
    <>
      <Show>
        <Show.When isTrue={enterInvitationCode === true}>
          <InvitationCodeForm onEnterCodeCancel={onEnterCodeCancel} cancelText='Cancel' />
        </Show.When>
      </Show>
      <Grid row>
        {!internalUser && <Grid col={12}>
          <h1>Welcome, {session?.user?.name}</h1>
        </Grid>}
        {!internalUser && <Grid col={12} className="display-flex flex-justify-end margin-bottom-1">
          <ButtonGroup type="default">
            <Button type="button" onClick={() => setEnterInvitationCode(true)} outline className="display-flex align-items-center">
              <AppRegistrationOutlinedIcon className="margin-right-1" />
              <span style={{ marginTop: '4px' }}>Invitation Code</span>
            </Button>
            {(!data || (Array.isArray(data) && data.length === 0) || (data && 'error' in data)) && (
              <Button type="button" onClick={handleApply} outline className="display-flex align-items-center">
                <PostAddOutlinedIcon className="margin-right-1" />
                <span style={{ marginTop: '4px' }}>Apply</span>
              </Button>
            )}
          </ButtonGroup>
        </Grid>}
      </Grid>

      <h2 className="text-size-2xl margin-y-0 border-bottom padding-y-2 border-base-lighter">Applications</h2>
      {!internalUser && data && data.length > 0 && (
        <div>
          <Collection>
            <ApplicationCards
              internalUser={internalUser}
              data={data}
              clickedId={clickedId}
              actionButton={actionButton}
              applicationDeleteOrWithdraw={applicationDeleteOrWithdraw}
            />
          </Collection>
        </div>
      )}
      {internalUser && intrnlAppication && intrnlAppication.length > 0 && (
        <div>
          <Collection>
            <ApplicationCards
              internalUser={internalUser}
              data={intrnlAppication}
              clickedId={clickedId}
              actionButton={actionButton}
              applicationDeleteOrWithdraw={applicationDeleteOrWithdraw}
            />
          </Collection>
        </div>
      )}
      {((!internalUser && (!data || data.length === 0)) || (internalUser && !intrnlAppication)) && <div>No applications found.</div>}
      {openConfirmationModal && (
        <DeleteWithdrawConfirmationModal
          openConfirmationModal={openConfirmationModal}
          confirmationType={confirmationType}
          clickedId={clickedId}
          resetClickedId={resetClickedId}
          applicationData={Array.isArray(data) ? data : null}
        />
      )}
    </>
  )
}
