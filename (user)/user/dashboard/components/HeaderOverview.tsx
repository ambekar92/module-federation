'use client'
import { Select } from '@trussworks/react-uswds';
import styles from '../WorkloadDashboard.module.scss';

const HeaderOverview = () => {
    return (
        <div className={styles.header}>
            <Select id="input-select" name="input-select">
                <option>Option 1</option>
                <option>Option 2</option>
            </Select>

                <div  className={styles.cardInline}>
                    <span className={styles.count}>116</span> <strong>Tasks</strong>
                </div>
                <div  className={styles.cardInline}>
                    <span className={styles.count}>28</span> <strong>Assigned</strong>
                </div>
        </div>
    )
}

export default HeaderOverview