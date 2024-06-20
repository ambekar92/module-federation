import { Grid } from '@trussworks/react-uswds'
import React, { useState } from 'react'
import { inboxTestData } from '../utils/constants'
import styles from '../utils/forms.module.scss'
import InitialsCircle from '../../../(admin)/admin/users/components/AccountCircle'
//fetch api
import useSWR from 'swr'
import { InboxResponse, InboxItem } from '../utils/types'
import { INBOX_ROUTE } from '@/app/constants/routes'
import { fetcherGET } from '@/app/services/fetcher'

interface EmailListProps {
  focusedEmailId: number | null
  // eslint-disable-next-line no-unused-vars
  setFocusedEmailId: (id: number | null) => void
}

const EmailListNoData: any[] = [];
const EmailList: React.FC<EmailListProps> = ({
  focusedEmailId,
  setFocusedEmailId,
}) => {
  const { data, error } = useSWR<InboxResponse>(INBOX_ROUTE, fetcherGET)
  const [read, setRead] = useState(false)

  const formatDate = (dateString: string): string => {
    const dateObj = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return dateObj.toLocaleString('en-US', options)
  }

  const inboxEmailData = data? data.results: EmailListNoData
  return (
    <div>
      {inboxEmailData.map((email: any, index: number) => (
        <div
          key={index}
          className={'cursor-pointer position-relative'}
          onClick={() => setFocusedEmailId(email.id)}
        >
          {focusedEmailId === email.id ? (
            <div
              className={`
							${styles['email-focused']}
							${index === inboxEmailData.length - 1 && styles['email-focused-last']}
						`}
            ></div>
          ) : (
            ''
          )}
          <Grid row className="flex-align-center">
            <Grid col={3} className="display-flex">
              <Grid col={2}>
                <div className={`${styles['email-dot-icon']}`}>
                  {
                    // using state for now, this needs to be changed once BE is ready
                    read === false && focusedEmailId !== email.id && (
                      <img
                        data-testid="emailList-test-list"
                        className="logo_sm margin-right-05"
                        src="/messageIcons/sba_dot_circle.png"
                        alt="read_mail"
                      />
                    )
                  }
                </div>
              </Grid>
              <Grid col={10}>
                <div  className={styles['email-icon']}>
                  {' '}
                  <InitialsCircle name={email.sender.display_name} />
                </div>
              </Grid>
            </Grid>
            <Grid col={9}>
              <p  className={`${styles['name-text']} text-primary margin-y-0`}>
                {email.sender.display_name}
              </p>
              <p  data-testid="email-subject"
                className={`${styles['name-subject']} margin-top-0 margin-bottom-05`}
              >
                {email.subject}
              </p>
              <div  className={`${styles['name-mail']} margin-y-0`}>
                {formatDate(email.sent_at)}
              </div>
            </Grid>
          </Grid>
          {index !== inboxEmailData.length - 1 && (
            <div className={styles['line']} />
          )}
        </div>
      ))}
    </div>
  )
}

export default EmailList
