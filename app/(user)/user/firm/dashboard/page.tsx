'use client'
import { faEllipsisVertical, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  CardHeader,
  Collection,
  CollectionMeta,
  Link,
  Tag,
} from '@trussworks/react-uswds'
import moment from 'moment'
import { Fragment, ReactElement, useEffect, useState } from 'react'
import { mockApplications, mockNews } from './mockData'
import { Application, News } from './types'
import { useSession } from 'next-auth/react'
import styles from './FirmDashboard.module.scss'
import DeleteWithdrawConfirmationModal from './components/delete-withdraw-confirmation-modal/DeleteWithdrawConfirmationModal'

const FirmUserDashboard = () => {
  const [news, setNews] = useState<News[]>()
  const [applications, setApplications] = useState<Application[]>()
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [actionButton, setActionButton] = useState<ReactElement>()
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false)
  const [confirmationType, setConfirmationType] = useState<string | undefined>('')

  const applicationDeleteOrWithdraw = async (event: any, id: number) => {
    setOpenConfirmationModal(false) // this makes sure the state is reset
    const status = (event.currentTarget as HTMLElement).dataset.status

    if (status === 'In progress') {
      setActionButton(
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            data-type="delete"
            className={styles.actionButton}
            onClick={handleActionButtonClick}
          >
            <div className={styles.container}>Delete Application</div>
          </Button>
          <Button
            type="button"
            className={styles.closeIcon}
            onClick={() => setClickedId(null)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>,
      )
    } else if (status === 'Submitted') {
      setActionButton(
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
        </div>,
      )
    }

    setClickedId(id)
  }

  const handleActionButtonClick = (event: any) => {
    const type = (event.currentTarget as HTMLElement).dataset.type

    setConfirmationType(type)
    setClickedId(null)
    setOpenConfirmationModal(true)
  }

  useEffect(() => {
    setNews(mockNews)
  }, [])

  useEffect(() => {
    setApplications(mockApplications)
  })

  const session = useSession()
  return (
    <>
      <div>
        <h1>Welcome {session.data?.user?.name}</h1>
        <p>[Business name]</p>
      </div>

      <div>
        <div className="display-flex flex-row flex-justify flex-align-self-center">
          <h2>News</h2>
          <Link href="#">Open</Link>
        </div>
        <CardGroup>
          {news?.map((n) => (
            <Card headerFirst key={n.id} gridLayout={{ desktop: { col: 4 } }}>
              <CardHeader>
                <h3 className="usa-card__heading">{n.title}</h3>
                <p className="font-sans-6 text-primary margin-top-1"></p>
              </CardHeader>

              <CardBody>
                <p>{n.description}</p>
              </CardBody>
              <CardFooter>
                <Button type="button" outline className="usa-button">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardGroup>
      </div>

      <div>
        <h2>Applications</h2>
        <Collection>
          {applications?.map((a) => (
            <Fragment key={a.id}>
              <h3>{a.status}</h3>
              <Card
                containerProps={{
                  className: 'bg-primary-lighter border-0',
                }}
              >
                <CardHeader className="display-flex flex-row flex-justify">
                  <h4>{a.title}</h4>
                  {clickedId === a.id ? (
                    actionButton
                  ) : (
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      data-status={a.status}
                      className="cursor-pointer"
                      onClick={(e) => applicationDeleteOrWithdraw(e, a.id)}
                    />
                  )}
                </CardHeader>
                <CardBody>
                  {a.status === 'In progress' && (
                    <span>{a.percentComplete}% Complete</span>
                  )}
                </CardBody>
                <CardFooter className="display-flex flex-row">
                  <div>
                    {a.tags?.length > 0 && (
                      <CollectionMeta aria-label="Topics">
                        {a.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </CollectionMeta>
                    )}
                    {a.status === 'Submitted' && (
                      <div className="display-flex flex-row margin-top-2">
                        <div className="margin-right-2">
                          <strong>ID</strong> {a.id}
                        </div>
                        <div>
                          <strong>Submitted</strong>{' '}
                          {moment(a.submittedDate).format('MM/DD/YYYY')}
                        </div>
                      </div>
                    )}
                  </div>
                  {a.status !== 'Submitted' && (
                    <Button className="margin-left-auto" type="button">
                      {a.status === 'In progress' ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
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
