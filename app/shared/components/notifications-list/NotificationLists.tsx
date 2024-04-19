import React from 'react'
import styles from './NotificationList.module.scss'
import NotificationHeader from './NotificationHeader'

function NotificationLists() {
  return (
    <div className={styles['documents-list']}>
      <NotificationHeader />
    </div>
  )
}

export default NotificationLists
