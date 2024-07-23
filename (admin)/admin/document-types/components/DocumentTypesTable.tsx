'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Table, Icon, Grid, Button } from '@trussworks/react-uswds'
import useSWR from 'swr'
import { documentTypesFetcherGET } from '../utils/fetch'
import { documentTypes } from '../tmp'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import { DOCUMENT_TYPES_ENDPOINT } from '../../../../constants/routes'
import ModalsDeleteUser from './DeleteUserModal'
import CustomAlert from './Alerts'

const PAGE_SIZE = 50

interface IDocument {
  id: number
  name: string
  description: string
  document_class: string
}
const DocumentTypesTable = async ({
  searchParams,
  onRowCountChange,
  newRow,
  addDocumentLoad,
}: {
  searchParams: {
    sortColumn: 'name' | 'description' | 'document_class'
    sortOrder: 'asc' | 'desc'
    q: string
    page: string
  }
  onRowCountChange: (count: number) => void
  newRow: any
  addDocumentLoad: any
}) => {
  const sortData = (dataToSort: any | IDocument[]) => {
    return dataToSort
      .sort((a: any, b: any) =>
        searchParams.sortColumn === 'name' && searchParams.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : searchParams.sortColumn === 'name' &&
              searchParams.sortOrder === 'desc'
            ? b.name.localeCompare(a.name)
            : searchParams.sortColumn === 'description' &&
                searchParams.sortOrder === 'asc'
              ? a.description.localeCompare(b.description)
              : searchParams.sortColumn === 'description' &&
                  searchParams.sortOrder === 'desc'
                ? b.description.localeCompare(a.description)
                : searchParams.sortColumn === 'document_class' &&
                    searchParams.sortOrder === 'asc'
                  ? a.document_class.localeCompare(b.document_class)
                  : searchParams.sortColumn === 'document_class' &&
                      searchParams.sortOrder === 'desc'
                    ? b.document_class.localeCompare(a.document_class)
                    : 0,
      )
      .filter((item: any) =>
        `${item.name.toLowerCase()} ${item.description.toLowerCase()} ${item.document_class.toLowerCase()}`.includes(
          (searchParams.q ?? '').toLowerCase(),
        ),
      )
  }

  const [data, setData] = useState([] as any | IDocument[])

  const [shouldFetch, setShouldFetch] = useState(true)
  const [editingUserRowId, setEditingUserRowId] = useState<number | null>(null)
  const [successRowId, setSuccessRowId] = useState<number | null>(null)
  const [showBlankMessage, setShowBlankMessage] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { data: responseData, error: responseError } = useSWR(
    () => shouldFetch && DOCUMENT_TYPES_ENDPOINT,
    documentTypesFetcherGET,
  )

  useEffect(() => {
    if (responseData) {
      setData([...sortData(responseData), newRow])
      onRowCountChange(responseData.length)
    }
    if (responseError) {
      //use dummy data if API endpoint is down
      setShouldFetch(false)
      setData([...sortData(documentTypes)])
    }
  }, [responseData, responseError, onRowCountChange, newRow])

  useEffect(() => {
    responseData
      ? setData([...sortData(responseData)])
      : setData([...sortData(documentTypes)])
  }, [searchParams])

  useEffect(() => {

    setIsLoading(false)
    addDocumentLoad(false)
  }, [])

  const handleEditUsers = (rowId: number) => {
    setEditingUserRowId(rowId)
    setSuccessRowId(rowId)
  }
  const handleCancel = () => {
    setEditingUserRowId(null)
  }

  const handleDeleteUsers = (userId: number) => {
    setData((prevBodyData: any) =>
      prevBodyData.filter((row: any) => row.id !== userId),
    )
  }

  const nameRefInput = useRef<HTMLInputElement>(null)
  const descriptionRefInput = useRef<HTMLInputElement>(null)
  const DocClassRefInput = useRef<HTMLInputElement>(null)

  const handleSave = (index: number) => {
    const newName = nameRefInput.current?.value || ''
    const newDescription = descriptionRefInput.current?.value || ''
    const newDocClass = DocClassRefInput.current?.value || ''

    if (newName === '' && newDescription === '' && newDocClass === '') {
      setShowBlankMessage(true)
      setEditingUserRowId(index)
    }
    if (newName !== '' || newDescription !== '' || newDocClass !== '') {
      setData((prevBodyData: any) =>
        prevBodyData.map((item: any) =>
          item.id === index
            ? {
              id: item.id,
              document_category: {},
              name: newName ? newName : item.name,
              description: newDescription ? newDescription : item.description,
              document_class: newDocClass ? newDocClass : item.document_class,
            }
            : item,
        ),
      )

      setShowSuccessAlert(true)
      setEditingUserRowId(null)
    }
  }

  return (
    <>

      {showSuccessAlert ? (
        <CustomAlert
          label={'The Users information has been successfully updated.'}
        />
      ) : (
        <div />
      )}
      <Table bordered fullWidth={true}>
        <TableHeader />
        <tbody>
          {data
            ?.slice(
              (parseInt(searchParams.page) - 1) * PAGE_SIZE,
              (parseInt(searchParams.page) - 1) * PAGE_SIZE + PAGE_SIZE,
            )
            .map((item: any) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.document_class}</td>
                  <td>
                    <Grid row>
                      <Grid className="margin-left-2 margin-top-2 padding-top-1">
                        <Icon.Edit
                          className="cursor-pointer"
                          onClick={() => handleEditUsers(item.id)}
                        />
                      </Grid>
                      <Grid>
                        <div className="margin-top-1">
                          <ModalsDeleteUser
                            onClick={() => handleDeleteUsers(item.id)}
                          ></ModalsDeleteUser>
                        </div>
                      </Grid>
                    </Grid>
                  </td>
                </tr>
                {editingUserRowId === item.id && (
                  <tr>
                    <>
                      <td>
                        <Grid className="margin-right-2 margin-left-2">
                          <div>
                            {' '}
                            <label style={{ color: 'gray' }}>Name</label>
                          </div>
                          <input ref={nameRefInput} type="text" />
                        </Grid>
                      </td>
                      <td>
                        <Grid className="flex-4 margin-right-2">
                          <div>
                            <label style={{ color: 'gray' }}>Description</label>
                          </div>
                          <input ref={descriptionRefInput} type="text" />
                        </Grid>
                        {showBlankMessage && (
                          <div className="margin-top-1">
                            <span className="usa-input-helper-text error-message">
                              {'Required Field'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        <Grid className="flex-2 margin-right-2">
                          <div>
                            <label
                              style={{ color: 'gray', paddingRight: '10px' }}
                            >
                              Description Class
                            </label>
                          </div>
                          <input ref={DocClassRefInput} type="text" />
                        </Grid>
                      </td>
                      <td>
                        <Grid className="grid-col flex-1 margin-top-4">
                          <Button
                            outline
                            type="button"
                            onClick={() => handleCancel()}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleSave(item.id)}
                          >
                            Save
                          </Button>
                        </Grid>
                      </td>
                    </>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </Table>
      {Math.ceil(data?.length / PAGE_SIZE) > 1 && (
        <TablePagination total={Math.ceil(data?.length / PAGE_SIZE)} />
      )}
    </>
  )
}

export default DocumentTypesTable
