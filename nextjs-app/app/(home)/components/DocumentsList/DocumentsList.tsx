'use client'
import React, { useState } from 'react'
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
