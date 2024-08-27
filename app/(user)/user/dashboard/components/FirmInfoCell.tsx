'use client'
import { UserTaskDashboard } from '@/app/services/types/evaluation-service/UserTaskDashboard';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from '../WorkloadDashboard.module.scss';

const FirmInfoCell = ({task}:{task: UserTaskDashboard}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [size, setSize] = useState<SizeProp | undefined>('1x')

  function handleCopyUei(uei: string) {
    navigator.clipboard.writeText(uei).then(() => {
      setTimeout(() => setCopied(true) ,100)

      setTimeout(() => {
        setCopied(false)
      }, 500)
    })
  }

  return (
    <div className={styles.copiedContainer  }>
      {copied && <div className={styles.copiedText}>Copied!</div>}
      <span onClick={() => handleCopyUei(task.uei)} >
    ({task.uei})
        <FontAwesomeIcon
          size={copied ? 'xs' : '1x'}
          className={styles.copyIcon} icon={faCopy} />
      </span>
    </div>
  )
}

export default FirmInfoCell
