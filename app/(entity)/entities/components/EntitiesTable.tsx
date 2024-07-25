'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@trussworks/react-uswds'
import useSWR from 'swr'
import { fetcherGET } from '@/app/services/fetcher';
import { entitiesFetcherGET } from '../utils/fetch'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { ENTITIES_ROUTE } from '@/app/constants/routes'
import { EntitiesType } from '@/app/services/types/application';
const PAGE_SIZE = 50

interface IDocument {
  id: number
  legal_business_name?: string
  uei: string
  dba_name: string
  entity_structure: string
  sam_extract_code: string
}
const entities: any[] = [];
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
      .filter((item: any) =>
        `${item.legal_business_name.toLowerCase()} ${item.uei.toLowerCase()} ${item.dba_name.toLowerCase()} ${item.entity_structure.toLowerCase()} ${item.sam_extract_code.toLowerCase()}`.includes(
          (searchParams.q ?? '').toLowerCase(),
        ),
      )
  }

  const [data, setData] = useState([] as any | IDocument[])
  const [shouldFetch, setShouldFetch] = useState(true)

  const { data: responseData, error: responseError, isLoading } = useSWR(`${ENTITIES_ROUTE}`, fetcherGET<EntitiesType[]>);
  
  const convertToTableData = (dataToConvert: any | IDocument[]) => {
    const convertedData = [] as IDocument[]
    dataToConvert.forEach((item: any, index: number) => {
      const convertedItem = {
        id: item?.id,
        legal_business_name: item?.sam_entity?.legal_business_name,
        uei: item?.sam_entity?.uei,
        dba_name: item?.sam_entity?.dba_name,
        entity_structure: item?.sam_entity?.entity_structure,
        sam_extract_code: item?.sam_entity?.sam_extract_code,
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
      setData([...sortData(convertToTableData(entities))])
    }
  }, [responseData, responseError])

  useEffect(() => {
    responseData
      ? setData([...sortData(convertToTableData(responseData))])
      : setData([...sortData(convertToTableData(entities))])
  }, [searchParams])

  return (
    <>
      <Table bordered fullWidth={true}>
        <TableHeader />
        <tbody>
          {isLoading? (
            <tr>
              <td>Loading...</td>
            </tr>
          ):(data.lenth === 0)? (<div>There are no data</div>):(
            data
              ?.slice(
                (parseInt(searchParams.page) - 1) * PAGE_SIZE,
                (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE,
              )
              .map((item: any) => (
                <tr key={item.id}>
                  <td>{item.legal_business_name}</td>
                  <td>{item.uei}</td>
                  <td>{item.dba_name}</td>
                  <td>{item.entity_structure}</td>
                  <td>{item.sam_extract_code}</td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
      {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
        <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
      )}
    </>
  )
}

export default EntitiesTable
