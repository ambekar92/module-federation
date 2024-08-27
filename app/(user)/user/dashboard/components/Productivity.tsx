import { USER_PRODUCTIVITY_ROUTE } from '@/app/constants/routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { fetcherGET } from '@/app/services/fetcher-legacy';
import { Show } from '@/app/shared/components/Show';
import { Card } from '@trussworks/react-uswds';
import useSWR from 'swr';
import styles from '../WorkloadDashboard.module.scss';
import { IProductivity } from '../types';
import { Role } from '@/app/shared/types/role';
import { useCurrentPath } from '../hooks/useCurrentPath';
import Spinner from '@/app/shared/components/spinner/Spinner';

const Productivity = () => {
  const {data: {user_id, permissions}} = useSessionUCMS();
  const {data, isLoading}  = useSWR(`${USER_PRODUCTIVITY_ROUTE}/${user_id}`, fetcherGET<IProductivity[]>) || [];
  const {completed_tasks_current_month, completed_tasks_current_quarter, completed_tasks_current_fiscal_year, average_processing_time_seconds} = (data && data.length) ? data[0] : [] as any;
  const { isReviewersDashboard, isTasksDashboard } = useCurrentPath();

  // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
  function isRole(permissions: any, role: any) {
    return false;
  }

  return (
    <div>
      <h3>{isReviewersDashboard ? 'Team Productivity' : 'Productivity'}</h3>
      {isLoading && <Spinner center />}
      {!isLoading && <>
        <Show>
          <Show.When isTrue={isTasksDashboard}>
            <div className={styles.cardContainer}>
              <Card>
                <div className={styles.card}>
                  <span className={styles.count}>{completed_tasks_current_month ?? 'N/A'}</span>
                  <strong className={styles.cardText}>Total tasks completed this month</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>{completed_tasks_current_quarter ?? 'N/A'}</span>
                  <strong className={styles.cardText}>Total tasks completed this quarter</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>{completed_tasks_current_fiscal_year ?? 'N/A'}</span>
                  <strong className={styles.cardText}>Total tasks created this fiscal year</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>{average_processing_time_seconds ?? 'N/A'}</span>
                  <strong className={styles.cardText}>My average processing time</strong>
                </div>
              </Card>
            </div>
          </Show.When>
          <Show.Otherwise>
            <div className={styles.cardContainer}>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>13</span>
                  <strong className={styles.cardText}>Tasks at risk</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>42</span>
                  <strong className={styles.cardText}>Unassigned Tasks</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>42 </span>
                  <strong className={styles.cardText}>Tasks completed this month</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>6 </span>
                  <strong className={styles.cardText}>Tasks completed this quater</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>6 </span>
                  <strong className={styles.cardText}>Tasks completed this fiscal year</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>6 days</span>
                  <strong className={styles.cardText}>Average processing times</strong>
                </div>
              </Card>
            </div>
          </Show.Otherwise>
        </Show>
      </> }

    </div>
  )
}

export default Productivity
