'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Table, Alert } from '@trussworks/react-uswds'
import useSWR from 'swr'
import fetcher from '@/app/services/fetcher'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { ENTITIES_ROUTE } from '@/app/constants/routes'
import styles from './Entities.module.scss'
import { useRouter } from 'next/navigation'

const PAGE_SIZE = 10

interface IDocument {
  id: number
  legal_business_name: string
  uei: string
  dba_name: string
  entity_structure: string
  sam_extract_code: string
  updated_at: string
  deleted_at: string
  owner_user_id: string
  sam_entity_id: number
}
const entities: any = []
const EntitiesTable = async ({
  searchParams,
}: {
  searchParams: {
    sortColumn:
      | 'legal_business_name'
      | 'uei'
      | 'dba_name'
      | 'entity_structure'
      | 'sam_extract_code'
    sortOrder: 'asc' | 'desc'
    q: string
    uei: string
    page: string
  }
}) => {
  const sortData = (dataToSort: any | IDocument[]) => {
    return dataToSort
      .sort((a: any, b: any) =>
        searchParams.sortColumn === 'legal_business_name' &&
        searchParams.sortOrder === 'asc'
          ? a.legal_business_name.localeCompare(b.legal_business_name)
          : searchParams.sortColumn === 'legal_business_name' &&
              searchParams.sortOrder === 'desc'
            ? b.legal_business_name.localeCompare(a.legal_business_name)
            : searchParams.sortColumn === 'uei' &&
                searchParams.sortOrder === 'asc'
              ? a.uei.localeCompare(b.uei)
              : searchParams.sortColumn === 'uei' &&
                  searchParams.sortOrder === 'desc'
                ? b.uei.localeCompare(a.uei)
                : searchParams.sortColumn === 'dba_name' &&
                    searchParams.sortOrder === 'asc'
                  ? a.dba_name.localeCompare(b.dba_name)
                  : searchParams.sortColumn === 'dba_name' &&
                      searchParams.sortOrder === 'desc'
                    ? b.dba_name.localeCompare(a.dba_name)
                    : searchParams.sortColumn === 'entity_structure' &&
                        searchParams.sortOrder === 'asc'
                      ? a.entity_structure.localeCompare(b.entity_structure)
                      : searchParams.sortColumn === 'entity_structure' &&
                          searchParams.sortOrder === 'desc'
                        ? b.entity_structure.localeCompare(a.entity_structure)
                        : searchParams.sortColumn === 'sam_extract_code' &&
                            searchParams.sortOrder === 'asc'
                          ? a.sam_extract_code.localeCompare(b.sam_extract_code)
                          : searchParams.sortColumn === 'sam_extract_code' &&
                              searchParams.sortOrder === 'desc'
                            ? b.sam_extract_code.localeCompare(
                                a.sam_extract_code,
                              )
                            : 0,
      )
      .filter((item: any) => {
        const searchTerm1 = searchParams.q?.toLowerCase() ?? ''
        const ueiTerm = searchParams.uei?.toLowerCase() ?? ''
        if (searchTerm1 || ueiTerm) {
          if (searchTerm1) {
            return item.legal_business_name.toLowerCase().includes(searchTerm1)
          } else if (ueiTerm) {
            return item.uei.toLowerCase().includes(ueiTerm)
          } else {
            return true
          }
        }
        if (searchTerm1 !== null && ueiTerm!== null) {
          const searchTerm = searchParams.q?.toLowerCase() ?? ''
          const ueiTerm = searchParams.uei?.toLowerCase() ?? ''
          item.legal_business_name.toLowerCase().includes(searchTerm) &&
            item.uei.toLowerCase().includes(ueiTerm)
        } else {
          return true
        }
      })
  }

  const convertToTableData = (dataToConvert: any | IDocument[]) => {
    const convertedData = [] as IDocument[]
    dataToConvert.forEach((item: any, index: number) => {
      const convertedItem = {
        id: item.id,
        sam_entity_id: item.sam_entity.sam_entity_id,
        updated_at: item.updated_at,
        deleted_at: item.deleted_at,
        owner_user_id: item.owner_user_id,
        legal_business_name: item.sam_entity.legal_business_name,
        uei: item.sam_entity.uei,
        dba_name: item.sam_entity.dba_name,
        entity_structure: item.sam_entity.entity_structure,
        sam_extract_code: item.sam_entity.sam_extract_code,
      } as IDocument
      convertedData[index] = convertedItem
    })
    return convertedData
  }

  const [data, setData] = useState([] as any | IDocument[])
  const [shouldFetch, setShouldFetch] = useState(true)

  const { data: responseData, error: responseError } = useSWR(
    () => shouldFetch && ENTITIES_ROUTE,
    fetcher,
  )
  // const sortedData = useCallback(() => {
  //   if (responseData) {
  //     setData([...sortData(convertToTableData(responseData))])
  //   }
  //   if (responseError) {
  //     //use dummy data if API endpoint is down
  //     setShouldFetch(false)
  //     setData([...sortData(convertToTableData(entities))])
  //   }
  // }, [data, sortData])
  useEffect(() => {
    if (responseData) {
      setData([...sortData(convertToTableData(responseData))])
    }
    if (responseError) {
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setData([...sortData(convertToTableData(entities))])
    }
  }, [responseData, responseError])

  useEffect(() => {
    responseData
      ? setData([...sortData(convertToTableData(responseData))])
      : setData([...sortData(convertToTableData(entities))])
  }, [searchParams])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  interface entitiesId {
    item: {
      sam_entity_id: string
    }
  }
  const handleClick = ({ item }: entitiesId) => {
    window.location.href = `/admin/entities/${item}`
  }
  return (
    <>
      {' '}
      {data?.length === 0 ? (
        <div className="padding-top-5">
          <Alert type="info" heading="No Results Found" headingLevel="h4">
            {'I’m sorry, we couldn’t find any results matching your criteria.'}
          </Alert>
        </div>
      ) : (
        <Table
          className={`${styles['table']} usa-table--striped`}
          bordered
          fullWidth={true}
        >
          <TableHeader />
          <tbody>
            {data
              ?.slice(
                (parseInt(searchParams.page) - 1) * PAGE_SIZE,
                (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE,
              )
              .map((item: any, index: number) => (
                <tr
                  key={index}
                  onClick={() => {
                    handleClick(item.sam_entity_id)
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{item.legal_business_name}</td>
                  <td>{item.uei}</td>
                  <td>{item.dba_name}</td>
                  <td>{item.deleted_at === null ? 'Active' : 'Inactive'}</td>
                  <td>{formatDate(item.updated_at)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
        <div className="display-flex flex-column flex-align-end">
          <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
        </div>
      )}
    </>
  )
}

export default EntitiesTable
