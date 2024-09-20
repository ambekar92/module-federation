import { USER_DASHBOARD_PRODUCTIVITY_ROUTE } from '@/app/constants/local-routes';
import { useSessionUCMS } from '@/app/lib/auth';
import { fetcherGET } from '@/app/services/fetcher-legacy';
import { Show } from '@/app/shared/components/Show';
import { Card } from '@trussworks/react-uswds';
import useSWR from 'swr';
import styles from '../WorkloadDashboard.module.scss';
import { IProductivity } from '../types';
import { useIsReviewersDashboard } from '../hooks/useIsReviewersDashboard';
import Spinner from '@/app/shared/components/spinner/Spinner';
import fetcher from '@/app/services/fetcher';

const Productivity = () => {
  const {data: {user_id}} = useSessionUCMS();
  const {data, isLoading}  = useSWR<IProductivity[]>(`${USER_DASHBOARD_PRODUCTIVITY_ROUTE}/${user_id}`);
  const {completed_tasks_current_month, completed_tasks_current_quarter, completed_tasks_current_fiscal_year, average_processing_time_seconds} = (data && data.length) ? data[0] : [] as any;
  const isReviewersDashboard = useIsReviewersDashboard();

  return (
    <div>
      <h3>{isReviewersDashboard ? 'Team Productivity' : 'Productivity'}</h3>
      {isLoading && <Spinner center />}
      {!isLoading && <>
        <Show>
          <Show.When isTrue={!isReviewersDashboard}>
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
                  <span className={styles.count}>0</span>
                  <strong className={styles.cardText}>Tasks at risk</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>0</span>
                  <strong className={styles.cardText}>Unassigned Tasks</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>0 </span>
                  <strong className={styles.cardText}>Tasks completed this month</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>0 </span>
                  <strong className={styles.cardText}>Tasks completed this quater</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>0 </span>
                  <strong className={styles.cardText}>Tasks completed this fiscal year</strong>
                </div>
              </Card>
              <Card >
                <div className={styles.card}>
                  <span className={styles.count}>0 days</span>
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
