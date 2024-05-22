import { Show } from '@/app/shared/components/Show';
import { Card } from '@trussworks/react-uswds';
import styles from '../WorkloadDashboard.module.scss';

const Productivity = ({ isSupervisor }: { isSupervisor: boolean }) => {
    return (
        <div>
            <h3>{isSupervisor ? 'Team Productivity' : 'Productivity'}</h3>

            <Show>
                <Show.When isTrue={!isSupervisor}>
                    <div className={styles.cardContainer}>
                        <Card>
                            <div className={styles.card}>
                                <span className={styles.count}>13</span>
                                <strong className={styles.cardText}>Total tasks completed this month</strong>
                            </div>
                        </Card>
                        <Card >
                            <div className={styles.card}>
                                <span className={styles.count}>42</span>
                                <strong className={styles.cardText}>Total tasks completed this quarter</strong>
                            </div>
                        </Card>
                        <Card >
                            <div className={styles.card}>
                                <span className={styles.count}>42 days</span>
                                <strong className={styles.cardText}>Total tasks created this fiscal year</strong>
                            </div>
                        </Card>
                        <Card >
                            <div className={styles.card}>
                                <span className={styles.count}>6 days</span>
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
        </div>
    )
}

export default Productivity