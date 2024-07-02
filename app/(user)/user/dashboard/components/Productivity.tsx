import { USER_PRODUCTIVITY_ROUTE } from '@/app/constants/routes';
import { Show } from '@/app/shared/components/Show';
import { Card } from '@trussworks/react-uswds';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import styles from '../WorkloadDashboard.module.scss';
import { fetcherGET } from '@/app/services/fetcher';
import { IProductivity } from '../types';

const Productivity = ({ isSupervisor }: { isSupervisor: boolean }) => {
    const userId = useSession().data?.user_id;
    const {data, isLoading}  = useSWR(`${USER_PRODUCTIVITY_ROUTE}/${userId}`, fetcherGET<IProductivity[]>) || [];
    const {completed_tasks_current_month, completed_tasks_current_quarter, completed_tasks_current_fiscal_year, average_processing_time_seconds} = (data && data.length) ? data[0] : [] as any;
    return (
        <div>
            <h3>{isSupervisor ? 'Team Productivity' : 'Productivity'}</h3>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <>
                <Show>
                <Show.When isTrue={!isSupervisor}>
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