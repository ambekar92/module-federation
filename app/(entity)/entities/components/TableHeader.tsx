'use client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Entities.module.scss'
import { useEffect } from 'react'
import { Tooltip } from '@trussworks/react-uswds'

const TableHeader = () => {
  const searchParams = useSearchParams()
  const searchParamsState = new URLSearchParams(
    Array.from(searchParams.entries()),
  )
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!searchParamsState.get('sortColumn')) {
      searchParamsState.set('sortColumn', 'legal_business_name')
      searchParamsState.set('sortOrder', 'asc')
    }
    if (!searchParamsState.get('page')) {
      searchParamsState.set('page', '1')
    }
    const q = searchParamsState.toString()
    router.push(`${pathName}?${q}`)
  }, [pathName, router, searchParamsState])

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
        <th onClick={() => setQueryParams('legal_business_name')}>
          <span className={styles.tableHeadCell}>
            Legal Business Name{' '}
            {searchParams.get('sortColumn') === 'legal_business_name' && (
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
        <th onClick={() => setQueryParams('uei')}>
          <span className={styles.tableHeadCell}>
            UEI{' '}
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
        <th onClick={() => setQueryParams('dba_name')}>
          <span className={styles.tableHeadCell}>
            dba_name{' '}
            {searchParams.get('sortColumn') === 'dba_name' && (
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
        <th onClick={() => setQueryParams('entity_structure')}>
          <span className={styles.tableHeadCell}>
            entity_structure{' '}
            {searchParams.get('sortColumn') === 'entity_structure' && (
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
        <th onClick={() => setQueryParams('sam_extract_code')}>
          <span className={styles.tableHeadCell}>
            sam_extract_code{' '}
            {searchParams.get('sortColumn') === 'sam_extract_code' && (
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
      </tr>
    </thead>
  )
}

export default TableHeader
