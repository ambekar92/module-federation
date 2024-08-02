'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Table } from '@trussworks/react-uswds'
import useSWR from 'swr'
import fetcher from '@/app/services/fetcher'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { USER_ROLES_ROUTE } from '@/app/constants/routes'
import styles from './Entities.module.scss'



const PAGE_SIZE = 10

interface IDocument {
  id: 1
  slug: string
  name: string
  description: string
}

const UserRole: any[] = []

const UserRoleTable = async ({
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
        searchParams.sortColumn === 'name' 
      && searchParams.sortOrder === 'asc'
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
        `${item.name.toLowerCase()}`.includes(
          (searchParams.q ?? '').toLowerCase(),
        ),
      )
  }

  const [data, setData] = useState([] as any | IDocument[])
  const [shouldFetch, setShouldFetch] = useState(true)
const [showDisplay, setShowDisplay] = useState(false)

  const {
    data: responseData,
    error: responseError,
    isLoading,
  } = useSWR(`${USER_ROLES_ROUTE}`, fetcher)

  const convertToTableData = (dataToConvert: any | IDocument[]) => {
    const convertedData = [] as IDocument[]

    dataToConvert.forEach((item: any, index: number) => {
      const convertedItem = {
        id: item?.id,
        name: item?.name,
        description: item?.description,
      } as IDocument
      convertedData[index] = convertedItem
    })
    return convertedData
  }

  useEffect(() => {
    if (responseData) {
      setData([...sortData(convertToTableData(responseData))])
    }
    if (responseError) {
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setData([...sortData(convertToTableData(UserRole))])
    }
    if(searchParams.q){
        setShowDisplay(true)
    }
   
  }, [responseData, responseError, searchParams, showDisplay])

  return (
    <> {data.length === 0 && !showDisplay ?(<div>Loading...</div>) : data.length > 0 ? (
      <Table  className={`${styles['table']} usa-table--striped`}
        bordered
        fullWidth={true}>
        <TableHeader />
        <tbody>
            {data?.slice(
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
      </Table>) : (searchParams.q !== null && data.length === 0 && showDisplay===true ) ?( <div className="padding-top-5">
        <Alert type="info" heading="No Results Found" headingLevel="h4">
          {'I’m sorry, we couldn’t find any results matching your criteria.'}
        </Alert>
      </div>):(<div></div>)}

      {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
         <div className="display-flex flex-column flex-align-end">
        <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
        </div>
      )}
    </>
  )
}

export default UserRoleTable
