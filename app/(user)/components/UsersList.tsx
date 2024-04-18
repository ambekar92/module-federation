'use client'
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Grid,
  Pagination,
  Table,
} from '@trussworks/react-uswds'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RECORDS_PER_PAGE, data } from '../constants'
import { ColValues, ColumnNames, User, mapDisplayNameToUserKey } from '../types'
import { SearchBar } from './SearchBar'
import styles from './UsersList.module.scss'

const rowCss = 'usa-border font-mono-sm text-tabular text-center'

export const UsersList = () => {
  const users: User[] = data
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [sortState, setSortState] = useState<{
    colName: ColValues
    isAscending: boolean
  }>({
    colName: 'name',
    isAscending: true,
  })

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
    const sorted = filtered.sort((a, b) =>
      sortState.isAscending
        ? b[sortState.colName].localeCompare(a[sortState.colName])
        : a[sortState.colName].localeCompare(b[sortState.colName]),
    )
    setFilteredUsers(sorted)
    setCurrentPage(1)
  }, [searchQuery, sortState])

  return (
    <div className="grid-container-widescreen">
      <SearchBar setSearchQuery={setSearchQuery} />

      <Grid row className="margin-top-4">
        <Grid
          col={12}
          className={styles['v-align-middle-float-right']}
        >
          <Button type="submit">Export</Button>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col={12}>
          <div tabIndex={0}>
            <Table
              bordered={true}
              striped={true}
              scrollable={true}
              className={styles['usa-table']}
            >
              <thead>
                <tr className={styles['usa-table-header']}>
                  {Object.entries(ColumnNames).map(([header, displayName]) => (
                    <th
                      style={{ cursor: 'pointer' }}
                      data-sortable
                      scope="col"
                      role="columnheader"
                      key={header}
                      onClick={() =>
                        setSortState({
                          colName: mapDisplayNameToUserKey(displayName),
                          isAscending: !sortState.isAscending,
                        })
                      }
                    >
                      <>
                        {displayName}{' '}
                        {sortState.colName ===
                            mapDisplayNameToUserKey(displayName) && (
                          <FontAwesomeIcon
                            icon={sortState.isAscending ? faSortDesc : faSortAsc}
                          />
                        )}
                      </>
                    </th>
                  ))}
                </tr>
              </thead>
              {filteredUsers.length > 0 && (
                <tbody>
                  {filteredUsers
                    .slice(currentPage - 1, currentPage + RECORDS_PER_PAGE)
                    .map((user, index) => (
                      <tr key={index}>
                        <td className={rowCss}>
                          <Link href="#">{user.name}</Link>
                        </td>
                        <td className={rowCss}>{user.email}</td>
                        <td className={rowCss}>{user.status}</td>
                        <td className={rowCss}>{user.approved}</td>
                        <td className={rowCss}>{user.createdDate}</td>
                        <td className={rowCss}>{user.lastLogin}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </Table>
            {filteredUsers.length === 0 && <>No users found.</>}
          </div>

          {filteredUsers.length > 0 && (
            <Pagination
              pathname={''}
              maxSlots={7}
              currentPage={currentPage}
              onClickNext={() => setCurrentPage(currentPage + 1)}
              onClickPageNumber={(_, p) => setCurrentPage(p)}
              onClickPrevious={() => setCurrentPage(currentPage - 1)}
              totalPages={Math.ceil(filteredUsers.length / RECORDS_PER_PAGE)}
              className="float-right"
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}
