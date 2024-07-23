'use client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './DocumentTypes.module.scss';
import { useEffect } from 'react';
import { Tooltip } from '@trussworks/react-uswds';

const TableHeader = () => {
  const searchParams = useSearchParams();
  const searchParamsState = new URLSearchParams(Array.from(searchParams.entries()));
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!searchParamsState.get('sortColumn')) {
      searchParamsState.set('sortColumn', 'name')
      searchParamsState.set('sortOrder', 'asc')
    }
    if (!searchParamsState.get('page')) {
      searchParamsState.set('page', '1')
    }
    const q = searchParamsState.toString();
    router.push(`${pathName}?${q}`)
  }, [pathName])

  function setQueryParams(colName: string) {
    const sortOrder = colName === searchParamsState.get('sortColumn') ? searchParamsState.get('sortOrder') === 'asc' ? 'desc' : 'asc' : 'asc';
    searchParamsState.set('sortColumn', colName);
    searchParamsState.set('sortOrder', sortOrder);
    const q = searchParamsState.toString();
    router.push(`${pathName}?${q}`)
  }

  return (
    <thead>
      <tr>
        <th onClick={() => setQueryParams('name')}>
          <span className={styles.tableHeadCell}>Name {searchParams.get('sortColumn') === 'name' &&
                        <FontAwesomeIcon icon={(searchParams.get('sortOrder') === 'asc') ? faChevronDown : faChevronUp} />}</span>

        </th>
        <th onClick={() => setQueryParams('description')}>
          <span className={styles.tableHeadCell}>Description {searchParams.get('sortColumn') === 'description' && <FontAwesomeIcon icon={(searchParams.get('sortOrder') === 'asc') ? faChevronDown : faChevronUp} />}</span>

        </th>
        <th onClick={() => setQueryParams('documentClass')}>
          <Tooltip style={{background: 'transparent', outline: 'none', color: 'inherit'}} label='Identifies the document as pertaining to a user, an entity or SBA internal document' >
            <span className={styles.tableHeadCell}>Document Class {searchParams.get('sortColumn') === 'documentClass' && <FontAwesomeIcon icon={(searchParams.get('sortOrder') === 'asc') ? faChevronDown : faChevronUp} />}</span>
          </Tooltip>
        </th>
        <th onClick={() => setQueryParams('documentClass')}>
          <Tooltip style={{background: 'transparent', outline: 'none', color: 'inherit'}} label='Identifies the document as pertaining to a user, an entity or SBA internal document' >
            <span className={styles.tableHeadCell}>Actions   </span>
          </Tooltip>
        </th>
      </tr>
    </thead>
  )
}

export default TableHeader
