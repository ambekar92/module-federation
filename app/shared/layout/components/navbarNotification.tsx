import { Grid, Icon } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'
import Styles from './navbarNotification.module.scss'

interface notificationsList {
  id: string
  icon: React.JSX.Element
  from: string
  read: React.JSX.Element
  message: string
  link: React.JSX.Element
  delete: React.JSX.Element
  time: string
}

export const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<notificationsList[]>([
    {
      id: '1',
      icon: <Icon.AccountCircle />,
      from: 'Karen Smith',
      read: <Icon.Mail />,
      delete: <Icon.Delete />,
      link: <a>click here</a>,
      message: 'This is a test message',
      time: '3 mins ago',
    },
    {
      id: '2',
      icon: <Icon.AccountCircle />,
      from: 'Richard Stone',
      read: <Icon.MailOutline />,
      delete: <Icon.Delete />,
      message: 'This is a test message',
      link: <a>click here</a>,
      time: '10 mins ago',
    },
    {
      id: '3',
      icon: <Icon.AccountCircle />,
      from: 'Elizabeth Maines',
      read: <Icon.Mail />,
      delete: <Icon.Delete />,
      message: 'This is a test message',
      link: <a>click here</a>,
      time: '2 hours ago',
    },
  ])

  const handleDelete = (notificationId: string) => {
    setNotifications(
      notifications.filter((notif) => notif.id !== notificationId)
    )
  }

  useEffect(() => {
    setNotifications(notifications)
  }, [notifications])

  return (
    <>

      {notifications.map((item, index: number) => (
        <div key={item.id}>
          <Grid className={`${Styles['display-emails']}`}>
            <Grid className={`${Styles['email-icon']}`}>{item.icon}</Grid>

            <Grid className={`${Styles['name-read']}`}>{item.read}</Grid>
            <Grid>
              {' '}
              <button
                className={`${Styles['usa-nav__primary']}`}
                onClick={() => handleDelete(item.id)}
              >
                {item.delete}
              </button>{' '}
            </Grid>
            <Grid className={`${Styles['name-from']}`}>{item.from}</Grid>
            <Grid className={`${Styles['name-body']}`}>{item.message}</Grid>
            <Grid className={`${Styles['name-body']}`}>{item.link}</Grid>
            <Grid className={`${Styles['notification-time']}`}>
              {item.time}
            </Grid>
          </Grid>
          {index !== notifications.length - 1 && <hr />}
        </div>
      ))}
    </>
  )
}
