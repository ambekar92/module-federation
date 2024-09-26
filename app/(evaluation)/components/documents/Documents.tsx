'use client'
import { Documents as Document, DocumentsType } from '@/app/services/types/document'
import HeightIcon from '@mui/icons-material/Height'
import { Alert, Table } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import styles from './Documents.module.scss'
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes'
import { makeDatePretty } from '@/app/shared/utility/formateDate'
import humanizeString from 'humanize-string'

function Documents() {
  const { application_id } = useParams();
  const { data: responseData, error: responseError } =
    useSWR<DocumentsType>(
      application_id
        ? `${APPLICATION_DOCUMENTS_ROUTE}/?application_id=${application_id}`
        : null
    )

  if (responseError){
    return <Alert headingLevel='h4' type="error" heading="">Error loading Documents</Alert>;
  }

  return (
    <>
      <div className="grid-row margin-0">
        <div className="grid-col-12">
          <h1>Documents</h1>
          <p>
            Below is a table of documents uploaded by the business specific to this application. You can sort any column by clicking the arrows in the column header. Once selected, documents will open in a new tab.
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

              {responseData && Array.isArray(responseData) &&
                responseData.map((item: Document) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <a href={`/${item.path_name}`} target="_blank" rel="noopener noreferrer">{item.file_name}</a>
                      </td>
                      <td>{makeDatePretty(item.created_at)}</td>
                      <td>{humanizeString(item.document_type?.name)}</td>
                      <td>
                        {responseData
                          ? `${item.upload_user.first_name} ${item.upload_user.last_name}`
                          : ' '}
                      </td>
                    </tr>
                  )
                })}
              {
                (!responseData || !responseData?.length) && <tr><td colSpan={4}>No documents found.</td></tr>
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Documents
