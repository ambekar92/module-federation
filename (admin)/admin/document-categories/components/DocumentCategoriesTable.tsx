'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@trussworks/react-uswds'
import useSWR from 'swr'
import { documentCategoriesFetcherGET } from '../utils/fetch'
import { documentCategories } from '../tmp'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { DOCUMENT_CATEGORIES_ROUTE } from '../../../../constants/routes'

const PAGE_SIZE = 50

interface IDocument {
  id: number
  name: string
  description: string
}

const DocumentCategoriesTable = async ({
  searchParams,
}: {
  searchParams: {
    sortColumn: 'name' | 'description'
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
                : 0,
      )
      .filter((item: any) =>
        item.name.toLowerCase().includes((searchParams.q ?? '').toLowerCase()),
      )
  }

  const [data, setData] = useState([] as any | IDocument[])
  const [shouldFetch, setShouldFetch] = useState(true)

  const { data: responseData, error: responseError } = useSWR(
    () => shouldFetch && DOCUMENT_CATEGORIES_ROUTE,
    documentCategoriesFetcherGET,
  )

  useEffect(() => {
    if (responseData) {
      setData([...sortData(responseData)])
    }
    if (responseError) {
      console.log('responseError = ', responseError)
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setData([...sortData(documentCategories)])
    }
  }, [responseData, responseError])

  useEffect(() => {
    responseData
      ? setData([...sortData(responseData)])
      : setData([...sortData(documentCategories)])
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

export default DocumentCategoriesTable
