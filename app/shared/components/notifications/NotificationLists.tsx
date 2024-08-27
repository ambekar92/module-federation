'use client'
import { Grid } from '@trussworks/react-uswds'
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
import notificationData from './notificationData.json'

const NotificationLists = () => {
  const dataFetchedRef = useRef(false)
  const [getNotificationData, setNotificationData] = useState<any>([])
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [markAsAllReadStatus, setMarkAsAllReadStatus] = useState(false);
  const [markAsAllUnReadStatus, setMarkAsAllUnReadStatus] = useState(true);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return
    }
    dataFetchedRef.current = true
    fetchNotificationData() // Calling only once
  }, [])

  const fetchNotificationData = async () => {
    const user_id = 1
    const response = await Service.getNotifications(user_id)
    setNotificationData(response?.data)
  }

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
      <NotificationHeader selectMarkAsAllRead={markAsAllRead} selectMarkAsAllUnRead={markAsAllUnRead} />
      <div className="margin-top-5 line-height-mono-4">
        {notificationData.data?.map((item, index) => {
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
                  <h4 className="margin-0">{item.title}</h4>
                  <p className="margin-0">{item.description}</p>
                  <h6 className={`margin-0 text-normal ${styles['text-h6']}`}>
                    {item.created_at}
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
