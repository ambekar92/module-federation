import { Alert, Pagination, Table } from '@trussworks/react-uswds'
import React, { useState } from 'react'
import { ColumnKeys, Columns, SearchEntityType } from './schema';
import { useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ENTITY_PAGE, buildRoute } from '@/app/constants/url';
import styles from './Entities.module.scss';
import Link from 'next/link';

const columnHeaders = [{label: Columns.BUSINESS_NAME, key: 'legal_business_name'}, {label: Columns.UEI, key: 'uei'}];
const pageSize = 5;

const EntitiesTable = () => {
  const { getValues, watch, setValue } = useFormContext<SearchEntityType>();

  const entites = watch('entities');
  const sortColumn =  watch('sortColumn') || getValues('sortColumn');
  const isAsc = watch('isAsc') || getValues('isAsc');
  const page = watch('page') || getValues('page');
  const error = watch('error') || getValues('error');
  const loading = watch('loading') || getValues('loading');

  function sortEntities() {
    return (a: any, b: any) => {
      const aVal = a[sortColumn] ?? '';
      const bVal = b[sortColumn] ?? '';
      return  aVal.toString().localeCompare(bVal.toString()) * (isAsc ? 1 : -1);
    }
  }

  return (
    <div>
      {!loading && !error && (!entites || entites.length === 0) &&
        <div className="padding-top-5">
          <Alert type="info" heading="No Results Found" headingLevel="h4">
            {'I’m sorry, we couldn’t find any results matching your criteria.'}
          </Alert>
        </div>}

      {entites && entites.length > 0 &&
      <>
        <Table bordered fullWidth={true}>
          <thead>
            <tr>
              {columnHeaders.map((column) => (
                <th
                  key={column.key}
                  onClick={() => {setValue('sortColumn', column.key as ColumnKeys); setValue('isAsc', !isAsc)}}
                  className={styles.columnHeader}>{column.label} {sortColumn === column.key &&
                <span><FontAwesomeIcon icon={isAsc ? faChevronDown : faChevronUp} /></span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entites.sort(sortEntities()).slice((page-1)*pageSize, (page-1)*pageSize + pageSize).map((entity: any, idx: number) => (
              <tr key={entity.uei || idx}>
                <td>
                  <Link href={buildRoute(ENTITY_PAGE, {entityId: entity.id})}>{entity.legal_business_name}</Link>
                </td>
                <td>{entity.uei ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={page}
          maxSlots={5}
          onClickNext={() => setValue('page', page+1)}
          onClickPageNumber={(_, p) => setValue('page', p)}
          onClickPrevious={() => setValue('page', page-1)}
          pathname=""
          totalPages={Math.ceil(entites.length / pageSize)}
        />
      </>
      }
    </div>
  )
}

export default EntitiesTable
