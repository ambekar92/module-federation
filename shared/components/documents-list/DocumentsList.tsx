import React from 'react'
import styles from './DocumentsList.module.scss'
import DocumentHeader from './DocumentHeader'

function DocumentsList() {
  return (
    <div className={styles['documents-list']}>
      <DocumentHeader />
    </div>
  )
}

export default DocumentsList
