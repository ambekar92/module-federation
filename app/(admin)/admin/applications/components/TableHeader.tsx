'use client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Entities.module.scss'
import { useEffect } from 'react'

const tableHeader = [
  {
    endpointName: 'uei',
    headerName: 'Application Number',
  },
  {
    endpointName: 'uei',
    headerName: 'Application',
  },
  {
    endpointName: 'created_at',
    headerName: ' Application Status',
  },
  {
    endpointName: 'legal_business_name',
    headerName: 'Business Name',
  },
  {
    endpointName: 'dba_name',
    headerName: 'Owner Name',
  },
  {
    endpointName: 'deleted_at',
    headerName: 'Cert Status',
  },
  {
    endpointName: 'updated_at',
    headerName: 'Last Updated',
  },
]

const TableHeader = () => {
  const searchParams = useSearchParams()
  const searchParamsState = new URLSearchParams(
    Array.from(searchParams.entries()),
  )
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParamsState.get('sortColumn')) {
      searchParamsState.set('sortColumn', 'uei')
      searchParamsState.set('sortOrder', 'asc')
    }
    if (!searchParamsState.get('page')) {
      searchParamsState.set('page', '1')
    }
    const q = searchParamsState.toString()
    router.push(`${pathName}?${q}`)
  }, [pathName])

  function setQueryParams(colName: string) {
    const sortOrder =
      colName === searchParamsState.get('sortColumn')
        ? searchParamsState.get('sortOrder') === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc'
    searchParamsState.set('sortColumn', colName)
    searchParamsState.set('sortOrder', sortOrder)
    const q = searchParamsState.toString()
    router.push(`${pathName}?${q}`)
  }

  return (
    <thead>
      <tr>
        {tableHeader.map((item: any, index: number) => (
          <th key={index} onClick={() => setQueryParams(`${item.endpointName}`)}>
            <span className={styles.tableHeadCell}>
              {item.headerName}
              {searchParams.get('sortColumn') === 'uei' && (
                <FontAwesomeIcon
                  icon={
                    searchParams.get('sortOrder') === 'asc'
                      ? faChevronDown
                      : faChevronUp
                  }
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
