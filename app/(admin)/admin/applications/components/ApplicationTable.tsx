'use client'
import { APPLICATION_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import Spinner from '@/app/shared/components/spinner/Spinner'
import { Alert, Table } from '@trussworks/react-uswds'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import TableHeader from '../components/TableHeader'
import styles from './Entities.module.scss'
import TablePagination from './TablePagination'
const PAGE_SIZE = 8

interface IApplication {
  entity_id: number
  expiration_date: string
  legal_business_name: string
  uei: string
  tax_identifier_number: string
  dba_name: string
  created_at: string
  updated_at: string
}
const application: IApplication[] = []
const ApplicationTable = async ({
  searchParams,
}: {
  searchParams: {
    sortColumn:
      | 'uei'
      | 'deleted_at'
      | 'legal_business_name'
      | 'tax_identifier_number'
      | 'dba_name'
      | 'created_at'
      | 'updated_at'
    sortOrder: 'asc' | 'desc'
    q: string
    page: string
  }
}) => {
  const sortData = (dataToSort: any | IApplication[]) => {
    return dataToSort
      .sort((a: any, b: any) =>
        searchParams.sortColumn === 'uei' && searchParams.sortOrder === 'asc'
          ? a.uei.localeCompare(b.uei)
          : searchParams.sortColumn === 'uei' &&
              searchParams.sortOrder === 'desc'
            ? b.uei.localeCompare(a.uei)
            : searchParams.sortColumn === 'deleted_at' &&
                searchParams.sortOrder === 'asc'
              ? a.deleted_at.localeCompare(b.deleted_at)
              : searchParams.sortColumn === 'deleted_at' &&
                  searchParams.sortOrder === 'desc'
                ? b.deleted_at.localeCompare(a.deleted_at)
                : searchParams.sortColumn === 'legal_business_name' &&
                    searchParams.sortOrder === 'asc'
                  ? a.legal_business_name.localeCompare(b.legal_business_name)
                  : searchParams.sortColumn === 'legal_business_name' &&
                      searchParams.sortOrder === 'desc'
                    ? b.tax_identifier_number.localeCompare(
                      a.tax_identifier_number,
                    )
                    : searchParams.sortColumn === 'tax_identifier_number' &&
                        searchParams.sortOrder === 'asc'
                      ? a.tax_identifier_number.localeCompare(
                        b.tax_identifier_number,
                      )
                      : searchParams.sortColumn === 'tax_identifier_number' &&
                          searchParams.sortOrder === 'desc'
                        ? b.dba_name.localeCompare(a.dba_name)
                        : searchParams.sortColumn === 'dba_name' &&
                            searchParams.sortOrder === 'asc'
                          ? a.dba_name.localeCompare(b.dba_name)
                          : searchParams.sortColumn === 'dba_name' &&
                              searchParams.sortOrder === 'desc'
                            ? b.dba_name.localeCompare(a.dba_name)
                            : searchParams.sortColumn === 'created_at' &&
                                searchParams.sortOrder === 'asc'
                              ? a.created_at.localeCompare(b.created_at)
                              : searchParams.sortColumn === 'created_at' &&
                                  searchParams.sortOrder === 'desc'
                                ? b.created_at.localeCompare(a.updated_at)
                                : searchParams.sortColumn === 'updated_at' &&
                                    searchParams.sortOrder === 'asc'
                                  ? a.updated_at.localeCompare(b.updated_at)
                                  : searchParams.sortColumn === 'updated_at' &&
                                      searchParams.sortOrder === 'desc'
                                    ? b.updated_at.localeCompare(a.updated_at)
                                    : 0,
      )
      .filter((item: any) =>
        ` ${item.uei.toLowerCase()}`.includes(
          (searchParams.q ?? '').toLowerCase(),
        ),
      )
  }
  const [data, setData] = useState([] as any | IApplication[])
  const [shouldFetch, setShouldFetch] = useState(true)

  const { data: responseData, error: responseError, isLoading } = useSWR(`${APPLICATION_ROUTE}`);

  const convertToTableData = (dataToConvert: any | IApplication[]) => {
    const convertedData = [] as IApplication[]
    dataToConvert.forEach((item: any, index: number) => {
      const convertedItem = {
        entity_id: item?.entity?.entity_id,
        expiration_date: item?.sam_entity?.expiration_date,
        legal_business_name: item?.sam_entity?.legal_business_name,
        uei: item?.sam_entity?.uei,
        tax_identifier_number: item?.sam_entity?.tax_identifier_number,
        dba_name: item?.sam_entity?.dba_name,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      } as IApplication
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
      setData([...sortData(convertToTableData(application))])
    }
  }, [responseData, responseError])

  useEffect(() => {
    responseData
      ? setData([...sortData(convertToTableData(responseData))])
      : setData([...sortData(convertToTableData(application))])
  }, [searchParams])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  return (
    <> {data?.length === 0 ? (
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
        <tbody className={styles['table']}>
          {isLoading ? (
            <tr>
              <td><Spinner center /></td>
            </tr>
          ) : (
            data
              ?.slice(
                (parseInt(searchParams.page) - 1) * PAGE_SIZE,
                (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE,
              )
              .map((item: any) => (
                <tr key={item.id}>
                  <td>{item.uei}</td>
                  <td>{item.uei}</td>
                  <td>{item.created_at}</td>
                  <td>{item.legal_business_name}</td>
                  <td>{item.dba_name}</td>
                  <td>{item.deleted_at ? 'Deactivated' : 'Active'}</td>
                  <td>{formatDate(item.updated_at)}</td>
                </tr>
              ))
          )}
        </tbody>
      </Table>     )}
    {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
      <div className="display-flex flex-column flex-align-end">
        <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
      </div>
    )}

    </>
  )
}
export default ApplicationTable
