'use client'
import { Grid } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'
import styles from './NavbarNotification.module.scss'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { GET_NOTIFICATION, NOTIFYING_READ_MESSAGE } from '@/app/constants/routes'
import { useSessionUCMS } from '@/app/lib/auth'
import fetcher from '@/app/services/fetcher'
import CloseIcon from '@mui/icons-material/Close'
import DraftsIcon from '@mui/icons-material/Drafts'
import EmailIcon from '@mui/icons-material/Email'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import useSWR from 'swr'
import { INotification } from '@/app/services/types/communication-service/Notification'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { axiosInstance } from '@/app/services/axiosInstance'

export const NavbarNotification: React.FC = () => {
  const [showFilterReadUnread, setShowFilterReadUnread] = useState(false)
  const [showMarkReadUnread, setShowMarkReadUnread] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'read' | 'unread'>('all')
  const session = useSessionUCMS()
  const { data: notificationData, error, isLoading, mutate } = useSWR<INotification[]>(
    session ? `${GET_NOTIFICATION}?user_id=${session.data.user_id}` : null,
    fetcher
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
      await axiosInstance.put(NOTIFYING_READ_MESSAGE, payload)
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
      await axiosInstance.put(NOTIFYING_READ_MESSAGE, payload)
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
        {filteredNotifications.map((item, index) => (
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
