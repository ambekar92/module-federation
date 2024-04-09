'use client'
import React, { useState } from 'react'
import styles from './DocumentsList.module.scss'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import foldersData from './foldersData.json'

function DocumentsListFolders() {

  const LoadTableRow = () => {
    return foldersData.data?.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.name}</th>
          <td data-sort-value="3">{item.author}</td>
          <td data-sort-value="3">{item.created}</td>
          <td data-sort-value="3">{item.program}</td>
          <td data-sort-value="3">{item.modified}</td>
        </tr>
      )
    })
  }

  return (
    <div className={styles['documents-list-folders']}>
      <h2>
        Folders{' '}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </h2>

      <div className="usa-table-container--scrollable" tabIndex={0}>
        <table className="usa-table usa-table--striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th data-sortable scope="col" role="columnheader">Name</th>
              <th data-sortable scope="col" role="columnheader">Author</th>
              <th data-sortable scope="col" role="columnheader">Created</th>
              <th data-sortable scope="col" role="columnheader">Program</th>
              <th data-sortable scope="col" role="columnheader">Modified</th>
            </tr>
          </thead>
          <tbody>
            <LoadTableRow/>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DocumentsListFolders
