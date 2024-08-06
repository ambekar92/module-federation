'use client'
import { fetcherGET } from '@/app/services/fetcher-legacy'
import { Documents as Document, DocumentsType } from '@/app/services/types/document'
import HeightIcon from '@mui/icons-material/Height'
import { Table } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { GET_DOCUMENTS } from '../../../constants/routes'
import styles from './Documents.module.scss'

function Documents() {
  const { application_id } = useParams();
  // Get Documents Data
  const { data: responseData, error: responseError } =
    useSWR<DocumentsType>(
      application_id
        ? `${GET_DOCUMENTS}/?application_id=${application_id}`
        : null,
      fetcherGET,
    )

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
              {responseError && (
                <div>Could not load documents. Please try again later.</div>
              )}

              {responseData && Array.isArray(responseData) &&
                responseData.map((item: Document) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.file_name}</td>
                      <td>{item.created_at}</td>
                      <td>{item.document_type?.name}</td>
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
