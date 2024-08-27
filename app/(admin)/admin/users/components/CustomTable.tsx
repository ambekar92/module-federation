'use client'
import { Button, Grid, Icon, Pagination, Table } from '@trussworks/react-uswds'
import React, { FC, useEffect, useRef, useState } from 'react'
import CustomAlert from './Alerts'
import { TableHeader } from './CustomTableHeader'
import styles from './DeleteUser.module.scss'
import ModalsDeleteUser from './DeleteUserForm'
//fetch api
import { USER_ROUTE } from '@/app/constants/routes'
import fetcher from '@/app/services/fetcher'
import { Avatar } from '@mui/material'
import useSWR from 'swr'
import { CustomTableProps, users } from '../components/utils/types'

const CustomTable: FC<CustomTableProps> = ({
  headers,
  addSuccessUser,
  onRowCountChange,
  newRow,
}) => {
  const { data } = useSWR<users>(USER_ROUTE, fetcher)
  const [editingUserRowId, setEditingUserRowId] = useState<number | null>(null)
  const [, setSuccessRowId] = useState<number | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showBlankMessage, setShowBlankMessage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const PAGE_SIZE = 5

  const UserListNoData: any[] = []
  const userData = data ? data : UserListNoData
  const combinedData = [newRow, ...userData]
  const [bodyData, setBodyData] = useState(combinedData)

  useEffect(() => {
    if (data) {
      setBodyData(combinedData)
      onRowCountChange(combinedData.length)
    }
  }, [data, onRowCountChange, newRow])

  const handleEditUsers = (rowId: number) => {
    setEditingUserRowId(rowId)
    setSuccessRowId(rowId)
  }

  const handleCancel = () => {
    setEditingUserRowId(null)
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }
  const handleDeleteUsers = (userId: number) => {
    setBodyData((prevBodyData: any) =>
      prevBodyData.filter((row: any) => row.id !== userId),
    )
  }

  const roleSelectRef = useRef<HTMLSelectElement>(null)
  const permissionSelectRef = useRef<HTMLSelectElement>(null)
  const actDevCheckRef = useRef<HTMLSelectElement>(null)

  const handleSave = (index: number) => {
    const newRole = roleSelectRef.current?.value || ''
    const newPermission = permissionSelectRef.current?.value || ''
    const newStatus = actDevCheckRef.current?.value || ''

    if (
      (newRole === '--' && newPermission === '--' && newStatus === '--') ||
      newRole === '--' ||
      newPermission === '--' ||
      newStatus === '--'
    ) {
      setShowBlankMessage(true)
      setEditingUserRowId(index)
    }
    if (newRole !== '--' && newPermission !== '--' && newStatus !== '--') {
      setBodyData((prevBodyData: any) =>
        prevBodyData.map((combinedData: any) =>
          combinedData.id === index
            ? {
              id: combinedData.id,
              username: combinedData.username,
              first_name: combinedData.first_name,
              last_name: combinedData.last_name,
              email: combinedData.email,
              is_staff: newRole === 'true' ? true : false,
              is_superuser: newPermission === 'true' ? true : false,
              is_active: newStatus === 'true' ? true : false,
              last_login: combinedData.last_login,
              date_joined: combinedData.date_joined,
            }
            : combinedData,
        ),
      )
      setShowSuccessAlert(true)
    }
  }

  const filterRows = bodyData.filter((row) => Object.keys(row).length > 0)

  return (
    <>
      <Table className={styles['usa-table']} fullWidth={true}>
        <TableHeader headers={headers} editable={true} remove={true} />
        <tbody>
          {filterRows
            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
            .map((tableRow: any) => (
              <React.Fragment key={tableRow.id}>
                <tr key={tableRow.id} >
                  <>
                    <td key={`${tableRow.id}`}>
                      <Grid row>
                        <Grid className="margin-left-2">
                          <Avatar>{`${tableRow.first_name} ${tableRow.last_name}`}</Avatar>
                        </Grid>
                        <Grid className="margin-left-2 margin-top-2">
                          {tableRow.first_name} {tableRow.last_name}
                        </Grid>
                      </Grid>
                      {addSuccessUser && tableRow.id === 1 ? (
                        <CustomAlert name={tableRow.first_name} />
                      ) : (
                        <div></div>
                      )}
                    </td>

                    <td>
                      <div className="margin-left-2"> {tableRow.email}</div>
                      {addSuccessUser && tableRow.id === 1 ? (
                        <div className="margin-top-6"></div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                    <td>
                      <div className="margin-left-3">  {tableRow.is_staff === true ? 'Staff' : 'Not Staff'}</div>

                      {addSuccessUser && tableRow.id === 1 ? (
                        <div className="margin-top-6"></div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                    <td>
                      <div className="margin-left-3">  {tableRow.is_superuser === true
                        ? 'Access All'
                        : 'View Only'}</div>

                      {addSuccessUser && tableRow.id === 1 ? (
                        <div className="margin-top-6"></div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                    <td>
                      <div className="margin-left-3">  {tableRow.is_active === true ? 'Active' : 'Deactivated'}</div>

                      {addSuccessUser && tableRow.id === 1 ? (
                        <div className="margin-top-6"></div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                    <td>
                      <>
                        <Grid row>
                          <Grid>
                            <div className="margin-left-2"style={{marginTop: '11px'}}>
                              <Icon.Edit
                                className="cursor-pointer margin-top-1"
                                onClick={() => handleEditUsers(tableRow.id)}
                              />
                            </div>
                          </Grid>
                          <Grid>
                            <div className="margin-left-0">
                              <ModalsDeleteUser
                                onClick={() => handleDeleteUsers(tableRow.id)}
                              />{' '}
                            </div>
                          </Grid>
                        </Grid>
                        {addSuccessUser && tableRow.id === 1 ? (
                          <div className="margin-top-6"></div>
                        ) : (
                          <div></div>
                        )}
                      </>
                    </td>
                  </>
                </tr>

                {editingUserRowId === tableRow.id && (
                  <tr>
                    <td colSpan={headers.length}>
                      {showSuccessAlert ? (
                        <CustomAlert
                          label={
                            'The Users information has been successfully updated.'
                          }
                        />
                      ) : (
                        <>
                          <Grid row>
                            <Grid className="flex-1 margin-right-2 margin-left-2">
                              <label style={{ color: 'gray' }}>Role</label>
                              <select
                                className="usa-select"
                                ref={roleSelectRef}
                              >
                                <option>--</option>
                                <option value="true">Staff</option>
                                <option value="false">Not Staff</option>
                              </select>
                            </Grid>
                            <Grid className="flex-1 margin-right-2">
                              <label style={{ color: 'gray' }}>
                                Permissions
                              </label>
                              <select
                                className="usa-select"
                                ref={permissionSelectRef}
                              >
                                {' '}
                                <option value="">--</option>
                                <option value="true">Access All</option>
                                <option value="false">View Only</option>
                              </select>
                              {showBlankMessage && (
                                <div className="margin-top-1">
                                  <span className="usa-input-helper-text error-message">
                                    {'Required Field'}
                                  </span>
                                </div>
                              )}
                            </Grid>
                            <Grid className="flex-1 margin-right-2">
                              <label style={{ color: 'gray' }}>
                                Activate/Deactivate
                              </label>
                              <select
                                className="usa-select"
                                ref={actDevCheckRef}
                              >
                                <option>--</option>
                                <option value="true">Activate</option>
                                <option value="false">Deactivate</option>
                              </select>
                            </Grid>
                            <Grid className="margin-top-4">
                              <Button
                                type="button"
                                onClick={() => handleCancel()}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleSave(tableRow.id)}
                              >
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

          <></>
        </tbody>
      </Table>
      <Grid className="display-flex flex-column flex-align-end" row>
        <Grid>
          {Math.ceil(combinedData?.length / PAGE_SIZE) > 1 && (
            <Pagination
              pathname=""
              maxSlots={7}
              currentPage={currentPage}
              onClickNext={() => handlePageChange(currentPage + 1)}
              onClickPageNumber={(_, p) => handlePageChange(p)}
              onClickPrevious={() => handlePageChange(currentPage - 1)}
              totalPages={Math.ceil(combinedData.length / PAGE_SIZE)}
              className="float-right"
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
export default CustomTable
