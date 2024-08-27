import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@trussworks/react-uswds'
import styles from './DocumentsList.module.scss'
import { DocumentsType } from '@/app/services/types/document'
import { faker } from '@faker-js/faker'

function DocumentsListFoldersTable({documentsData}: {documentsData: DocumentsType}) {
  const LoadTableRow = () => {
    if(documentsData) {
      return documentsData.map((item: any, index: number) => {
        return (
          <tr key={index}>
            <th scope="row">{item.file_name}</th>
            {/* <td data-sort-value="3">{item.doc_owner_user_id}</td> */}
            <td data-sort-value="3">{faker.person.fullName()}</td>
            <td data-sort-value="3">{item.created_at}</td>
            <td data-sort-value="3">{item.updated_at}</td>
          </tr>
        )
      })
    } else {
      return <></>
    }
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
              >
                <span> File Name </span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Author </span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Created</span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
                </span>
              </th>
              <th
                data-sortable
                scope="col"
                role="columnheader"
                className={styles['table-th']}
              >
                <span>Updated</span>
                <span className={styles['tableSortIcon']}>
                  {' '}
                  <Icon.UnfoldMore />{' '}
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

export default DocumentsListFoldersTable
