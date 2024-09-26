'use client'
import { Alert, Grid } from '@trussworks/react-uswds'
import { useEffect, useRef, useState } from 'react'
import NotificationHeader from './NotificationHeader'
import styles from './NotificationList.module.scss'
// Icons
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

//API
import Service from '../../../services/fetcher-legacy';

// Data
import { Avatar } from '@mui/material'
import { useSessionUCMS } from '@/app/lib/auth'
import { GET_NOTIFICATIONS_ROUTE } from '@/app/constants/local-routes'
import { INotification } from '@/app/services/types/communication-service/Notification'
import useSWR from 'swr'

const NotificationLists = () => {
  const session = useSessionUCMS();
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [markAsAllReadStatus, setMarkAsAllReadStatus] = useState(false);
  const [markAsAllUnReadStatus, setMarkAsAllUnReadStatus] = useState(true);
  const { data: notificationData} = useSWR<INotification[]>(
    session.data.user.id ? `${GET_NOTIFICATIONS_ROUTE}?user_id=${session.data.user.id}` : null
  )

  const handleToggleIcon = (id: any) => {
    setVisibleIcons((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const markAsAllRead = async () => {
    setMarkAsAllUnReadStatus(false)
    setMarkAsAllReadStatus(true)
  }

  const markAsAllUnRead = async () => {
    setMarkAsAllUnReadStatus(true)
    setMarkAsAllReadStatus(false)
  }

  return (
    <>
      <NotificationHeader selectMarkAsAllRead={markAsAllRead} selectMarkAsAllUnRead={markAsAllUnRead} cnt={notificationData && Array.isArray(notificationData) && notificationData.length || 0 } />
      <div className="margin-top-5 line-height-mono-4">
        {(notificationData as any)?.error && <Alert headingLevel='h2' type='error' heading="Could not load notifications. Please try again later." />}
        {notificationData && Array.isArray(notificationData) && notificationData?.map((item, index) => {
          return (
            <div key={index} className={styles['notification-lineItem']} onClick={() => handleToggleIcon(item.id)}>
              <Grid row>
                <Grid
                  col={2}
                  className="display-flex flex-justify-center flex-align-center"
                >
                  <Avatar
                    className={`height-6 width-6 ${styles['icons-account']}`}
                  ></Avatar>
                </Grid>
                <Grid col={9}>
                  <p className="margin-0">{item.message}</p>
                  <h6 className={`margin-0 text-normal ${styles['text-h6']}`}>
                    {new Date(item.timestamp).getMinutes()-new Date().getMinutes()} minutes ago.
                  </h6>
                </Grid>
                <Grid
                  col={1}
                  className="display-flex flex-justify-center flex-align-center"
                >
                  {(markAsAllUnReadStatus) &&
                    <>
                      {visibleIcons[item.id] ? <RadioButtonUncheckedIcon /> : <FiberManualRecordIcon className={styles['notify-status']} />}
                    </>
                  }
                  {(markAsAllReadStatus) &&
                    <>

                    </>
                  }
                </Grid>
              </Grid>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NotificationLists
