import React from 'react';
import styles from '../WorkloadDashboard.module.scss'
import { Card } from '@trussworks/react-uswds';

const OpenAssignments = () => {
  return (
    <div>
        <h3>Open Assignments</h3>

        <div className={styles.cardContainer}>
            <Card >
                <div className={styles.card}>
                <span className={styles.count}>11</span>
                <strong className={styles.cardText}>Total tasks assigned</strong>
                </div>
            </Card>
            <Card >
                <div className={styles.card}>
                <span className={styles.count}>5</span>
                <strong className={styles.cardText}>Total tasks actionable</strong>
                </div>
            </Card>
            <Card >
                <div className={styles.card}>
                <span className={styles.count}>42 days</span>
                <strong className={styles.cardText}>Oldest application assigned</strong>
                <span className={styles.helpText}>(from Date Submitted)</span>
                </div>
            </Card>
            <Card >
                <div className={styles.card}>
                <span className={styles.count}>6 dats</span>
                <strong className={styles.cardText}>Oldest application assigned</strong>
                <span className={styles.helpText}>(from Task Created)</span>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default OpenAssignments