import React from 'react';
import { Card } from '@trussworks/react-uswds';
import styles from '../WorkloadDashboard.module.scss';
import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';

const OpenAssignments: React.FC<{ tasks: UserTaskDashboard[] | undefined }> = ({ tasks }) => {
  if (!tasks || tasks.length === 0 || tasks?.error ) {
    return <div>No tasks available</div>;
  }

  const totalTasksAssigned = tasks.length;
  const totalTasksActionable = tasks.filter(task => task.status === 'ASSIGNED').length;

  const oldestFromSubmitted = tasks
    .filter(task => task.submitted_on)
    .reduce((oldest, task) => {
      const submittedDate = new Date(task.submitted_on!);
      return submittedDate < oldest ? submittedDate : oldest;
    }, new Date());

  const oldestFromCreated = tasks.reduce((oldest, task) => {
    const createdDate = new Date(task.assignment_date);
    return createdDate < oldest ? createdDate : oldest;
  }, new Date());

  const daysSinceSubmitted = Math.floor((new Date().getTime() - oldestFromSubmitted.getTime()) / (1000 * 3600 * 24));
  const daysSinceCreated = Math.floor((new Date().getTime() - oldestFromCreated.getTime()) / (1000 * 3600 * 24));

  return (
    <div>
      <h3>Open Assignments</h3>
      <div className={styles.cardContainer}>
        <Card>
          <div className={styles.card}>
            <span className={styles.count}>{totalTasksAssigned}</span>
            <strong className={styles.cardText}>Total tasks assigned</strong>
          </div>
        </Card>
        <Card>
          <div className={styles.card}>
            <span className={styles.count}>{totalTasksActionable}</span>
            <strong className={styles.cardText}>Total tasks actionable</strong>
          </div>
        </Card>
        <Card>
          <div className={styles.card}>
            <span className={styles.count}>{daysSinceSubmitted} days</span>
            <strong className={styles.cardText}>Oldest application assigned</strong>
            <span className={styles.helpText}>(from Date Submitted)</span>
          </div>
        </Card>
        <Card>
          <div className={styles.card}>
            <span className={styles.count}>{daysSinceCreated} days</span>
            <strong className={styles.cardText}>Oldest application assigned</strong>
            <span className={styles.helpText}>(from Task Created)</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OpenAssignments;
