'use client'
import React from 'react'
import { Table } from '@trussworks/react-uswds'
import styles from './Documents.module.scss'
import HeightIcon from '@mui/icons-material/Height'
import useSWR from 'swr'
import { GET_DOCUMENTS, USER_ROUTE } from '../../../constants/routes'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'
import { fetcherGET } from '@/app/services/fetcher'
import { useSession } from 'next-auth/react'
import { DocumentListResponse } from '../../../shared/types/responses'

function Documents() {
  const { applicationId } = useApplicationId()
  const session = useSession()
  const user_id = session?.data?.user_id

  // Get Documents Data
  const { data: responseData, error: responseError } =
    useSWR<DocumentListResponse>(
      applicationId
        ? `${GET_DOCUMENTS}/?user_id=${user_id}&application_id=${applicationId}`
        : null,
      fetcherGET,
    )

  // Get User Info
  const { data: resData, error: resError } = useSWR<any>(
    applicationId ? `${USER_ROUTE}/${user_id}` : null,
    fetcherGET,
    { revalidateOnFocus: false },
  )

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
              {responseError && (
                <div>{responseError.response?.data?.errors[0]}</div>
              )}

              {responseData &&
                responseData?.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.file_name}</td>
                      <td>{item.uploaded_at}</td>
                      <td>{item.document_type}</td>
                      <td>
                        {resData
                          ? `${resData.first_name} ${resData.last_name}`
                          : ' '}
                      </td>
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
