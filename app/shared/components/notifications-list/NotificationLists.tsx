import React from 'react'
import styles from './NotificationList.module.scss'
import NotificationHeader from './NotificationHeader'
import { Divider, Grid } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import notificationData from './notificationData.json'

function NotificationLists() {

  const LoadNotificationData = () => {
    return notificationData.data?.map((item, index) => {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={3} md={1} lg={1} justifyContent={'center'}>
              <AccountCircle className={styles['notify-profile']} />
            </Grid>
            <Grid item xs={7} md={9} lg={9}>
              <p className={styles['notify-header']}>{item.title}</p>
              <p className={styles['notify-description']}>{item.description}</p>
              <p className={styles['notify-duration']}>{item.created_at}</p>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <FiberManualRecordIcon className={styles['notify-status']} />
            </Grid>
          </Grid>
          <Divider />
        </>
      )
    })
  }

  return (
    <div className={styles['notification-list']}>
      <NotificationHeader />
      <div className={styles['notify-list']}>
        <LoadNotificationData />
      </div>
    </div>
  )
}

export default NotificationLists
