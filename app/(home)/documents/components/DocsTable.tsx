import { DocumentUpload } from '@/app/services/types/document-service/DocumentUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@trussworks/react-uswds';
import { useMemo, useState } from 'react';
import styles from '../utils/DocumentsList.module.scss';

type SortableKeys = 'file_name' | 'created_at' | 'updated_at' | 'author';

type SortConfig = {
  key: SortableKeys;
  direction: 'ascending' | 'descending';
};

function DocsTable({ documentsData }: { documentsData: DocumentUpload[] }) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = useMemo(() => {
    const sortableItems = [...documentsData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'author') {
          aValue = `${a.upload_user.first_name} ${a.upload_user.last_name}`;
          bValue = `${b.upload_user.first_name} ${b.upload_user.last_name}`;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        if (!aValue || !bValue) {return 0;}
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [documentsData, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (name: SortableKeys) => {
    if (!sortConfig) {
      return <Icon.UnfoldMore />;
    }
    return sortConfig.key === name ?
      (sortConfig.direction === 'ascending' ? <Icon.ArrowDropUp /> : <Icon.ArrowDropDown />)
      : <Icon.UnfoldMore />;
  };

  const LoadTableRow = () => {
    return sortedData.map((item: DocumentUpload, index: number) => {
      return (
        <tr key={index}>
          <th scope="row">
            <a href={`/${item.signed_url}`} target="_blank" rel="noopener noreferrer">{item.file_name}</a>
          </th>
          <td>{item.upload_user.first_name} {item.upload_user.last_name}</td>
          <td>{new Date(item.created_at).toLocaleString()}</td>
          <td>{new Date(item.updated_at).toLocaleString()}</td>
        </tr>
      )
    })
  }

  return (
    <div className={styles['documents-list-folders']}>
      <h2>
        Files{' '}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </h2>

      <div className="usa-table-container--scrollable" tabIndex={0}>
        <table className="usa-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
                onClick={() => requestSort('file_name')}
              >
                <span>File Name</span>
                <span className={styles['tableSortIcon']}>
                  {getSortDirection('file_name')}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
                onClick={() => requestSort('author')}
              >
                <span>Author</span>
                <span className={styles['tableSortIcon']}>
                  {getSortDirection('author')}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
                onClick={() => requestSort('created_at')}
              >
                <span>Created</span>
                <span className={styles['tableSortIcon']}>
                  {getSortDirection('created_at')}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
                onClick={() => requestSort('updated_at')}
              >
                <span>Updated</span>
                <span className={styles['tableSortIcon']}>
                  {getSortDirection('updated_at')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <LoadTableRow />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DocsTable
