'use client'
import { GET_NOTIFICATIONS_ROUTE, NOTIFYING_READ_MESSAGE_ROUTE } from '@/app/constants/local-routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { INotification } from '@/app/services/types/communication-service/Notification'
import Spinner from '@/app/shared/components/spinner/Spinner'
import CloseIcon from '@mui/icons-material/Close'
import DraftsIcon from '@mui/icons-material/Drafts'
import EmailIcon from '@mui/icons-material/Email'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Avatar, IconButton } from '@mui/material'
import { Grid } from '@trussworks/react-uswds'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from './NavbarNotification.module.scss'

export const NavbarNotification: React.FC = () => {
  const [showFilterReadUnread, setShowFilterReadUnread] = useState(false)
  const [showMarkReadUnread, setShowMarkReadUnread] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'read' | 'unread'>('all')
  const session = useSessionUCMS()
  const { data: notificationData, error, isLoading, mutate } = useSWR<INotification[]>(
    session.data.user.id ? `${GET_NOTIFICATIONS_ROUTE}?user_id=${session.data.user.id}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      errorRetryCount: 5,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 5) {return}
        setTimeout(() => revalidate({ retryCount }), 5000)
      }
    }
  )

  const [filteredNotifications, setFilteredNotifications] = useState<INotification[]>([])

  useEffect(() => {
    if (notificationData) {
      setFilteredNotifications(
        filterType === 'all'
          ? notificationData
          : notificationData.filter((item) =>
            filterType === 'read' ? !item.unread : item.unread
          )
      )
    }
  }, [notificationData, filterType])

  const handleClickFilter = () => {
    setShowFilterReadUnread(!showFilterReadUnread)
    setShowMarkReadUnread(false)
  }

  const handleClickMore = () => {
    setShowMarkReadUnread(!showMarkReadUnread)
    setShowFilterReadUnread(false)
  }

  const handleSelectFilter = (type: 'read' | 'unread') => {
    setFilterType(type)
    setShowFilterReadUnread(false)
  }

  const handleCloseFilterMenu = () => {
    setFilterType('all')
  }

  const markAsRead = async (id: number) => {
    try {
      const payload = {
        user_id: session.data.user_id,
        id
      }
      await axios.put(NOTIFYING_READ_MESSAGE_ROUTE, payload)
      mutate()
    } catch (error) {
      // Error handled
    }
  }

  const markAllAsRead = async () => {
    if (!notificationData) {return}

    try {
      const promises = notificationData
        .filter(item => item.unread)
        .map(item => markAsRead(item.id))

      await Promise.all(promises)
      mutate()
    } catch (error) {
      // Error handled
    }
  }

  const markAllAsUnread = async () => {
    try {
      const payload = {
        user_id: session.data.user_id,
        mark_all_as_unread: true
      }
      await axios.put(NOTIFYING_READ_MESSAGE_ROUTE, payload)
      mutate()
    } catch (error) {
      // Error handled
    }
  }

  return (
    <>
      <div className="line-height-mono-4">
        <Grid row className="margin-1">
          <Grid col={5} className="display-flex">
            <h3 className="flex-fill margin-0">
              Notifications
              <span className={styles['notification-count']}>{filteredNotifications.length}</span>
            </h3>
          </Grid>

          <Grid col={3}>
            <div className="display-flex flex-column">
              {filterType !== 'all' && (
                <div className={styles['filterSelected']}>
                  <IconButton
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    {filterType === 'read' ? <DraftsIcon fontSize="small" /> : <EmailIcon fontSize="small" />}
                  </IconButton>
                  <IconButton
                    onClick={handleCloseFilterMenu}
                    className={styles['notification-mainMenu']}
                    disableRipple
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </Grid>

          <Grid col={2}>
            <div className="display-flex flex-column">
              <IconButton
                onClick={handleClickFilter}
                className={styles['notification-mainMenu']}
                disableRipple
              >
                <FilterListIcon />
              </IconButton>
            </div>
          </Grid>

          <Grid col={2}>
            <div className="display-flex flex-column">
              <IconButton
                onClick={handleClickMore}
                className={styles['notification-mainMenu']}
                disableRipple
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          </Grid>

          {showFilterReadUnread && (
            <>
              <Grid col={6}>
                <div
                  className={styles['navFilterMenu']}
                  onClick={() => handleSelectFilter('read')}
                >
                  Read
                </div>
              </Grid>
              <Grid col={6}>
                <div
                  className={styles['navFilterMenu']}
                  onClick={() => handleSelectFilter('unread')}
                >
                  Unread
                </div>
              </Grid>
            </>
          )}

          {showMarkReadUnread && (
            <>
              <Grid col={6}>
                <div
                  className={styles['navFilterMenu']}
                  onClick={markAllAsRead}
                >
                  Mark All As Read
                </div>
              </Grid>
              <Grid col={6}>
                <div
                  className={styles['navFilterMenu']}
                  onClick={markAllAsUnread}
                >
                  Mark All As Unread
                </div>
              </Grid>
            </>
          )}
        </Grid>

        {isLoading && <div className={styles['notification-lineItem']}><Spinner center /></div>}
        {error && <div className={styles['notification-lineItem']}><p>An error has occurred.</p></div>}
        {!isLoading && !error && filteredNotifications.length === 0 && <div className={styles['notification-lineItem']}><p>No notifications found.</p></div>}
        {filteredNotifications.length > 0 && !isLoading && filteredNotifications.map((item, index) => (
          <div
            key={index}
            className={styles['notification-lineItem']}
            onClick={() => markAsRead(item.id)}
          >
            <hr />
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
                <h4 className={`margin-0 ${styles['title-description']}`}>
                  {item.title ?? ''}
                </h4>
                <p className={`margin-0 ${styles['title-description']}`}>
                  {item.message}
                </p>
                <h6 className={`margin-0 text-normal ${styles['text-h6']}`}>
                  {item.created_at ?? ''}
                </h6>
              </Grid>
              <Grid
                col={1}
                className="display-flex flex-justify-center flex-align-center"
              >
                {item.unread ? (
                  <FiberManualRecordIcon
                    className={styles['notify-status']}
                  />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </>
  )
}
