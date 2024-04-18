import React from 'react'
import styles from './DocumentsList.module.scss'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import filesData from './filesData.json'

import { Icon } from '@trussworks/react-uswds'

function DocumentsListFolders() {
  const LoadTableRow = () => {
    return filesData.data?.map((item, index) => {
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
        Files{' '}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </h2>

      <div className="usa-table-container--scrollable" tabIndex={0}>
        <table className="usa-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span> Name </span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Author </span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Created</span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Program</span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Modified</span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <LoadTableRow />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DocumentsListFolders
