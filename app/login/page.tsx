import React from 'react';
import UCMSAlert from '../shared/components/UCMSAlert/UCMSAlert';
import { Card } from '@trussworks/react-uswds';
import { getSessionServer } from '../lib/auth';
import styles from './Login.module.scss';
import LoginButton from './LoginButton';
import { redirect } from 'next/navigation';
import {
  CLAIM_YOUR_BUSINESS, SELECT_INTENDED_PROGRAMS, DASHBOARD, ADMIN_DASHBOARD,
  USER_DASHBOARD_PAGE
} from '@/app/constants/url'
import { Role } from '../shared/types/role';
import { debug } from 'console';

export default async function Login({searchParams}: {searchParams: {next: string}}) {
  const session = await getSessionServer();
  if(session) {
    const firstPermissionSlug = session.permissions?.at(0)?.slug;
    const lastPermissionSlug = session.permissions?.at(-1)?.slug;

    if (typeof firstPermissionSlug === 'string' && typeof lastPermissionSlug === 'string') {
      switch (firstPermissionSlug) {
        case Role.INTERNAL:
          switch (lastPermissionSlug) {
            case Role.ADMIN:
              redirect(ADMIN_DASHBOARD);
              break;
            default:
              redirect(USER_DASHBOARD_PAGE);
          }
          break;
        case Role.EXTERNAL:
          switch (lastPermissionSlug) {
            case Role.EXTERNAL:
              // Todo
              // Need to validate application progress for router.push
              redirect(CLAIM_YOUR_BUSINESS);
              break;
            case Role.PRIMARY_QUALIFYING_OWNER:
              // Todo
              // Need to validate application progress for redirect
              redirect(CLAIM_YOUR_BUSINESS);
              break;
            case Role.CONTRIBUTOR:
              redirect(DASHBOARD);
              break;
            default:
              redirect('/');
          }
          break;
        default:
          redirect('/');
      }
    } else {
      redirect('/');
    }
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
