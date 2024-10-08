'use client'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import HeightIcon from '@mui/icons-material/Height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './TableHeader.module.scss';

const TableHeader = ({
  defaultSortColumn,
  columns,
}: {
  defaultSortColumn: string,
  columns: { val: string, label: string, sortable?: boolean }[],
}) => {
  const searchParams = useSearchParams();
  const searchParamsState = new URLSearchParams(Array.from(searchParams.entries()));
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!searchParamsState.get('sortColumn')) {
      searchParamsState.set('sortColumn', defaultSortColumn)
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
    router.push(`${pathName}?${q}`, {scroll: false})
  }

  return (
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.val} onClick={() =>{col.sortable &&  setQueryParams(col.val)}} style={{ backgroundColor: '#F0F0F0', width: (100 / columns.length).toString() + '%' }}>
            <span className={`text-base-darker ${styles.tableHeadCell}`}>
              {col.label}
              {col.sortable && (
                searchParams.get('sortColumn') === col.val && searchParams.get('sortOrder') === 'asc'
                  ? <FontAwesomeIcon icon={faChevronDown} />
                  : <HeightIcon />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
