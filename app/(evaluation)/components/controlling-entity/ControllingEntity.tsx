'use client'

import HeightIcon from '@mui/icons-material/Height'
import { Table } from '@trussworks/react-uswds'
import styles from './ControllingEntity.module.scss'

function ControllingEntity() {
  let responseData = [
    {
      id: 1,
      file_name: "Document Name",
      created_at: "02/02/2024",
      document_type: "Type of Document",
      uploaded_by: "Personname Lastname"
    },
    {
      id: 2,
      file_name: "Document Name",
      created_at: "02/02/2024",
      document_type: "Type of Document",
      uploaded_by: "Personname Lastname"
    },
    {
      id: 3,
      file_name: "Document Name",
      created_at: "02/02/2024",
      document_type: "Type of Document",
      uploaded_by: "Personname Lastname"
    },
    {
      id: 4,
      file_name: "Document Name",
      created_at: "02/02/2024",
      document_type: "Type of Document",
      uploaded_by: "Personname Lastname"
    }
  ]

  return (
    <>
      <div className="grid-row margin-0">
        <div className="grid-col-12">
          <h1>Controlling Entity</h1>
          <p>
            Below is a table of Controlling Entity uploaded by the business specific to this application. You can sort any column by clicking the arrows in the column header. Once selected, Controlling Entity will open in a new tab.
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

              {responseData &&
                responseData.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.file_name}</td>
                      <td>{item.created_at}</td>
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

export default ControllingEntity
