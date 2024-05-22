import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import Styles from './forms.module.scss'
import { Icon } from '@trussworks/react-uswds'

interface EmailListProps {
  id: string
  dot: string
  icon: string
  from: string
  subject: string
  message: string
}
const emails = [
  {
    id: '1',
    dot: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_dot_circle.png"
        alt="read_mail"
      />
    ),
    icon: <Icon.AccountCircle />,
    from: 'Karen Smith',
    subject: 'Application',
    message: 'This is a test message',
  },
  {
    id: '2',
    dot: (
      <img
        className="logo_sm"
        src="/messageIcons/sba_dot_circle.png"
        alt="read_mail"
      />
    ),
    icon: <Icon.AccountCircle />,
    from: 'Richard Stone',
    subject: 'Application',
    message: 'This is a test message',
  },
]
const EmailList: React.FC = () => {
  return (
    <>
      {emails.map((item, index) => (
        <div key={item.id}>
          <Grid className={`${Styles['display-emails']}`} row>
            <Grid className={`${Styles['email-dot-icon']}`}>{item.dot}</Grid>
            <Grid className={`${Styles['email-icon']}`}>{item.icon}</Grid>
            <Grid className={`${Styles['name-text']}`}>{item.from}</Grid>
            <Grid className={`${Styles['name-subject']}`}>{item.subject}</Grid>
            <Grid className={`${Styles['name-mail']}`}>{item.message}</Grid>
          </Grid>
          {index !== emails.length - 1 && <div className={Styles['line']} />}
        </div>
      ))}
    </>
  )
}

export default EmailList
