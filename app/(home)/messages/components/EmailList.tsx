import { Grid } from '@trussworks/react-uswds';
import React from 'react';
import { emails } from '../utils/constants';
import styles from '../utils/forms.module.scss';

interface EmailListProps {
  focusedEmailId: number | null;
  // eslint-disable-next-line no-unused-vars
  setFocusedEmailId: (id: number | null) => void;
}

const EmailList: React.FC<EmailListProps> = ({ focusedEmailId, setFocusedEmailId }) => {
  return (
    <div>
      {emails.map((email, index) => (
        <div
          key={email.id}
          className={'cursor-pointer position-relative'}
          onClick={() => setFocusedEmailId(email.id)}
        >
          {focusedEmailId === email.id ?
            <div className={`
							${styles['email-focused']}
							${index === emails.length - 1 && styles['email-focused-last']}
						`}></div>
			 			: ''
          }
          <Grid row className='flex-align-center'>
            <Grid col={3} className='display-flex'>
              <Grid col={2}>
                <div className={`${styles['email-dot-icon']}`}>
                  {email.read === false && focusedEmailId !== email.id && (
                    <img
                      className="logo_sm margin-right-05"
                      src="/messageIcons/sba_dot_circle.png"
                      alt="read_mail"
                    />
                  )}
                </div>
              </Grid>
              <Grid col={10}>
                <div className={styles['email-icon']}>{email.icon}</div>
              </Grid>
            </Grid>
            <Grid col={9}>
              <p className={`${styles['name-text']} text-primary margin-y-0`}>{email.from}</p>
              <p className={`${styles['name-subject']} margin-top-0 margin-bottom-05`}>{email.subject}</p>
              <div className={`${styles['name-mail']} margin-y-0`}>{email.date}</div>
            </Grid>

          </Grid>
          {index !== emails.length - 1 && <div className={styles['line']} />}
        </div>
      ))}
    </div>
  );
};

export default EmailList;
