'use client'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Task } from '../types'
import { useState } from 'react';
import styles from '../WorkloadDashboard.module.scss'
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from '@mui/material';

const FirmInfoCell = ({task}:{task: Task}) => {
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

  function handleMouseEnter() {
    setSize('xs');
    
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