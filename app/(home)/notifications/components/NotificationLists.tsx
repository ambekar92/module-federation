'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './NotificationList.module.scss'
import NotificationHeader from './NotificationHeader'
import { Grid, GridContainer } from '@trussworks/react-uswds'
// Icons
import AccountCircle from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

//API
import Service from '../../../services/fetcher'

// Data
import notificationData from './notificationData.json'


const NotificationLists = () => {
  const dataFetchedRef = useRef(false);
  const [getNotificationData, setNotificationData] = useState<any>([]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData(); // Calling only once
  }, []);


  const fetchData = async () => {
    let user_id = 2;
    const response = await Service.getNotifications(user_id);
    // console.log('>> Response: ', response);
    setNotificationData(response?.data)
  }


  return (
    <GridContainer containerSize='desktop' className={'margin-top-5'}>
      <NotificationHeader />
      <div className='margin-top-5 line-height-mono-4'>
        <h1>Notification Count from API: {getNotificationData?.length}</h1>
        {notificationData.data?.map((item, index) => {
          return (
            <div key={index}>
              <Grid row>
                <Grid col={2} className='display-flex flex-justify-center flex-align-center'>
                  <AccountCircle className={`height-6 width-6 ${styles['icons-account']}`} />
                </Grid>
                <Grid col={9}>
                  <h4 className='margin-0'>{item.title}</h4>
                  <p className='margin-0'>
                    {item.description}
                  </p>
                  <h6 className={`margin-0 text-normal ${styles['text-h6']}`}>{item.created_at}</h6>
                </Grid>
                <Grid col={1} className='display-flex flex-justify-center flex-align-center'>
                  <FiberManualRecordIcon className={styles['notify-status']} />
                </Grid>
              </Grid>
              <hr />
            </div>
          )
        })}
      </div>
    </GridContainer>
  )
}

export default NotificationLists
