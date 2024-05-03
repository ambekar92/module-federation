import React from 'react';
import UCMSAlert from '../shared/components/UCMSAlert/UCMSAlert';
import { Card } from '@trussworks/react-uswds';
import { getSessionServer } from '../lib/auth';
import styles from './Login.module.scss';
import LoginButton from './LoginButton';
import { redirect } from 'next/navigation';

export default async function Login({searchParams}: {searchParams: {next: string}}) {
  const session = await getSessionServer();
  if(session) {
    redirect(`${searchParams.next || '/home'}`)
  }
  return (
    <>
      <Card
        style={{
          width: '70%',
          margin: 'auto',
          marginTop: '2rem',
          listStyle: 'none',
        }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Welcome</h1>
            <p>Log in to access your account.</p>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.actionButtons}>
              <LoginButton action="Sign In" />
              <LoginButton action="Create New Account" />
            </div>
            <div className={styles.note}>
              <h3>Federal Employee?</h3>
              <p>
                If you are a federal employee or SBA contracting <br />
                officer, please visit the <a href="#">employee account page.</a>
              </p>
            </div>
          </div>
          <UCMSAlert
            styles={{ display: 'flex', flexDirection: 'row' }}
            title={'Warning'}
            text={
              <div className="margin-top-2">
                <strong>
                  This is a U.S. Small Business Administration federal
                  government computer system that is for official use only.
                </strong>
                <p className="margin-top-0">
                  The system is subject to monitoring and anyone using this
                  system expressly consents to such monitoring. Individuals
                  found performing unauthorized activities may be subject to
                  disciplinary action including criminal prosecution.
                </p>
              </div>
            }
          ></UCMSAlert>
        </div>
      </Card>
    </>
  )
}
