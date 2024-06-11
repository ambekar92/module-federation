'use client'
import React, { FC, useState, useRef, useEffect } from 'react'
import { Table, Grid, Icon, Button } from '@trussworks/react-uswds'
import { TableHeader } from './CustomTableHeader'
import InitialsCircle from './AccountCircle'
import CustomAlert from './Alerts'
import ModalsDeleteUser from './DeleteUserForm'
import styles from './DeleteUser.module.scss'
import TablePagination from '../../../../shared/components/table-pagination/TablePagination'
import { ModalsAddUsers } from './AddNewUsersForm'

export interface CustomTableProps {
  headers: {
    id: number
    headerName: string
    render?: (rowData: any) => React.ReactNode
  }[]
  rows: any
  addSuccessUser?: any
  bordered?: boolean
  editable?: boolean
  remove?: boolean
  updatedData?: any
}

const CustomTable: FC<CustomTableProps> = ({
  headers,
  bordered,
  rows,
  addSuccessUser,
  editable,
  remove,
  updatedData,
}) => {
  const [bodyData, setBodyData] = useState(rows)
  const [editingUserRowId, setEditingUserRowId] = useState<number | null>(null)
  const [successRowId, setSuccessRowId] = useState<number | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showBlankMessage, setShowBlankMessage] = useState(false)
  const combinedData = [...bodyData, ...updatedData]
  const PAGE_SIZE = 5

  const handleEditUsers = (rowId: number) => {
    setEditingUserRowId(rowId)
    setSuccessRowId(rowId)
  }
  const handleCancel = () => {
    setEditingUserRowId(null)
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
        prevBodyData.map((bodyData: any, i: number) =>
          i + 1 === index
            ? {
              ...bodyData,
              Role: newRole,
              Permissions: newPermission,
              Status: newStatus,
            }
            : bodyData,
        ),
      )
      setShowSuccessAlert(true)
    }
  }

  useEffect(() => {}, [combinedData.length])
  return (
    <>
      <Table className={styles['usa-table']} fullWidth={true}>
        <TableHeader headers={headers} editable={true} remove={true} />
        <tbody>
          {combinedData.map((tableRow: any) => (
            <React.Fragment key={tableRow.id}>
              <tr key={tableRow.id}>
                {headers.map((header: any) => (
                  <td key={`${tableRow.id}-${header.id}`}>
                    {header.headerName === 'Name' ? (
                      <Grid row>
                        <Grid>
                          <InitialsCircle
                            name={`${tableRow[header.headerName]}`}
                          />
                        </Grid>
                        <Grid className="margin-left-2 margin-top-2">
                          {tableRow[header.headerName]}
                        </Grid>
                      </Grid>
                    ) : header.headerName === 'Edit' ? (
                      <div className="margin-top-2">
                        <Icon.Edit
                          className="cursor-pointer"
                          onClick={() => handleEditUsers(tableRow.id)}
                        />
                      </div>
                    ) : header.headerName === 'Delete' ? (
                      <ModalsDeleteUser
                        onClick={() => handleDeleteUsers(tableRow.id)}
                      />
                    ) : (
                      tableRow[header.headerName]
                    )}
                  </td>
                ))}
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
                            <select className="usa-select" ref={roleSelectRef}>
                              <option>--</option>
                              <option value="Owner">Owner</option>
                              <option value="Administrator">
                                Administrator
                              </option>
                              <option value="Viewer">Viewer</option>
                              <option value="Basic Editor">Basic Editor</option>
                              <option value="Manager">Manager</option>
                            </select>
                          </Grid>
                          <Grid className="flex-1 margin-right-2">
                            <label style={{ color: 'gray' }}>Permissions</label>
                            <select
                              className="usa-select"
                              ref={permissionSelectRef}
                            >
                              <option value="">--</option>
                              <option value="Access All">Access All</option>
                              <option value="Activate/Deactivate">
                                Activate/Deactivate
                              </option>
                              <option value="Add User">Add User</option>
                              <option value="Basic Editing">
                                Basic Editor
                              </option>
                              <option value="View Only">View Only</option>
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
                            <select className="usa-select" ref={actDevCheckRef}>
                              <option>--</option>
                              <option value="Activate">Activate</option>
                              <option value="Deactivate">Deactivate</option>
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
          {Math.ceil(bodyData?.length / PAGE_SIZE) > 1 && (
            <TablePagination
              totalPages={Math.ceil(bodyData?.length / PAGE_SIZE)}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
export default CustomTable
