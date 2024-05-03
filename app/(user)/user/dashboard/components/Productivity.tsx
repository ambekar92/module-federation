import React from 'react';
import styles from '../WorkloadDashboard.module.scss'
import { Card } from '@trussworks/react-uswds';

const Productivity = () => {
  return (
    <div>
        <h3>Productivity</h3>

        <div className={styles.cardContainer}>
            <Card >
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
                <span className={styles.count}>6 dats</span>
                <strong className={styles.cardText}>My average processing time</strong>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default Productivity