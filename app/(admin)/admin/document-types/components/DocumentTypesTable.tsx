'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@trussworks/react-uswds'
import useSWR from 'swr'
import { documentTypesFetcherGET } from '../utils/fetch'
import { documentTypes } from '../tmp'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { DOCUMENT_TYPES_ENDPOINT } from '../../../../constants/routes'

const PAGE_SIZE = 50

interface IDocument {
  id: number
  name: string
  description: string
  document_class: string
}

const DocumentTypesTable = async ({
  searchParams,
}: {
  searchParams: {
    sortColumn: 'name' | 'description' | 'document_class'
    sortOrder: 'asc' | 'desc'
    q: string
    page: string
  }
}) => {
  const sortData = (dataToSort: any | IDocument[]) => {
    return dataToSort
      .sort((a: any, b: any) =>
        searchParams.sortColumn === 'name' && searchParams.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : searchParams.sortColumn === 'name' &&
              searchParams.sortOrder === 'desc'
            ? b.name.localeCompare(a.name)
            : searchParams.sortColumn === 'description' &&
                searchParams.sortOrder === 'asc'
              ? a.description.localeCompare(b.description)
              : searchParams.sortColumn === 'description' &&
                  searchParams.sortOrder === 'desc'
                ? b.description.localeCompare(a.description)
                : searchParams.sortColumn === 'document_class' &&
                    searchParams.sortOrder === 'asc'
                  ? a.document_class.localeCompare(b.document_class)
                  : searchParams.sortColumn === 'document_class' &&
                      searchParams.sortOrder === 'desc'
                    ? b.document_class.localeCompare(a.document_class)
                    : 0,
      )
      .filter((item: any) =>
        `${item.name.toLowerCase()} ${item.description.toLowerCase()} ${item.document_class.toLowerCase()}`.includes(
          (searchParams.q ?? '').toLowerCase(),
        ),
      )
  }

  const [data, setData] = useState([] as any | IDocument[])
  const [shouldFetch, setShouldFetch] = useState(true)

  const { data: responseData, error: responseError } = useSWR(
    () => shouldFetch && DOCUMENT_TYPES_ENDPOINT,
    documentTypesFetcherGET,
  )

  useEffect(() => {
    if (responseData) {
      setData([...sortData(responseData)])
    }
    if (responseError) {
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setData([...sortData(documentTypes)])
    }
  }, [responseData, responseError])

  useEffect(() => {
    responseData
      ? setData([...sortData(responseData)])
      : setData([...sortData(documentTypes)])
  }, [searchParams])

  return (
    <>
      <Table bordered fullWidth={true}>
        <TableHeader />
        <tbody>
          {data
            ?.slice(
              (parseInt(searchParams.page) - 1) * PAGE_SIZE,
              (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE,
            )
            .map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.document_class}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
        <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
      )}
    </>
  )
}

export default DocumentTypesTable
