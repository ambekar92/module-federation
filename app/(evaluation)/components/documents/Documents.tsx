import React from 'react'
import { Table } from '@trussworks/react-uswds'
import DocumentData from '../utils/documentData.json'
import styles from './Documents.module.scss'
import HeightIcon from '@mui/icons-material/Height'

function Documents() {
  return (
    <>
      <div className="grid-row margin-0">
        <div className="grid-col-12">
          <h1>Documents</h1>
          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{' '}
          </p>
        </div>

        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">
                  <span>Document Name</span>
                  <span className={styles['tableSortIcon']}>
                    {' '}
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Upload Date</span>
                  <span className={styles['tableSortIcon']}>
                    {' '}
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Document Type</span>
                  <span className={styles['tableSortIcon']}>
                    {' '}
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Uploaded by</span>
                  <span className={styles['tableSortIcon']}>
                    {' '}
                    <HeightIcon />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {DocumentData.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.document_name}</td>
                    <td>{item.upload_date}</td>
                    <td>{item.document_type}</td>
                    <td>{item.uploaded_by}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Documents
