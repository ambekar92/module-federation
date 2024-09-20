import {
  ADMIN_DASHBOARD,
  CLAIM_YOUR_BUSINESS,
  DASHBOARD,
  REVIEWERS_DASHBOARD_PAGE,
  TASKS_DASHBOARD_PAGE,
} from '@/app/constants/url';
import { Role } from '@/app/shared/types/role';
import { Card } from '@trussworks/react-uswds';
import { redirect } from 'next/navigation';
import { getSessionServer } from '../lib/auth';
import UCMSAlert from '../shared/components/UCMSAlert/UCMSAlert';
import styles from './Login.module.scss';
import LoginButton from './LoginButton';
type RoleType = `${Role}`;

/**
 *
 * @deprecated login action now happens through LoginMenu.tsx component
 */
export default async function Login({searchParams}: {searchParams: {next: string}}) {
  const session = await getSessionServer();
  if(session) {
    const firstPermissionSlug = session.permissions?.at(0)?.slug as RoleType;
    const lastPermissionSlug = session.permissions?.at(-1)?.slug as RoleType;
    if (firstPermissionSlug && lastPermissionSlug) {
      switch (firstPermissionSlug) {
        case Role.INTERNAL:
          switch (lastPermissionSlug) {
            case Role.ADMIN:
              redirect(ADMIN_DASHBOARD);
              break;
            case Role.ANALYST:
            case Role.ANALYST_HIGH_TIER:
            case Role.ANALYST_LOW_TIER:
            case Role.ANALYST_HIGH:
            case Role.ANALYST_LOW:
            case Role.ANALYST_CONTRIBUTOR_OGC:
            case Role.ANALYST_CONTRIBUTOR_OSS:
            case Role.REVIEWER:
            case Role.REVIEWER_HIGH_TIER:
            case Role.REVIEWER_LOW_TIER:
            case Role.REVIEWER_HIGH:
            case Role.REVIEWER_LOW:
              redirect(REVIEWERS_DASHBOARD_PAGE);
              break;
            default:
              redirect(TASKS_DASHBOARD_PAGE);
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
