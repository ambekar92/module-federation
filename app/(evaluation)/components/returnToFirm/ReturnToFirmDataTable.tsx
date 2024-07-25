'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Grid, Table } from '@trussworks/react-uswds'
import firmData from './firmData.json'
import styles from './ReturnToFirm.module.scss'
import ConfirmationModal from './Modals/ConfirmationModal'
import EditFormModal from './Modals/EditFormModal'
import CloseFormModal from './Modals/CloseFormModal'
import { useSession } from 'next-auth/react'

const FinalizeReturnToFirm = dynamic(
  () => import('./Modals/FinalizeReturnToFirm'),
  { ssr: false }
)

const ReturnToFirmDataTable: React.FC = () => {
  const sessionData = useSession()
  const [tableData, setTableData] = useState(firmData.data)
  const [rowId, setRowId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [closeModal, setCloseModal] = useState(false)
  const [selectedRowVal, setSelectedRowVal] = useState([])
  const [finalizeModal, setFinalizeModal] = useState(false)
  const [finalizeSuccess, setFinalizeSuccess] = useState(false)

  // handle Delete
  const closeDeleteModal = () => {
    setDeleteModal(false)
  }
  const handleDelete = (id: any) => {
    setDeleteModal(true)
    setRowId(id)
  }
  const deleteSelectedRecord = (status: any) => {
    if (status === 'yes') {
      const updatedItems = tableData.filter((item: any) => item.id !== rowId)
      setTableData(updatedItems)
      setDeleteModal(false)
    }
  }

  // handle Close
  const handleCloseModal = () => {
    setCloseModal(false)
  }
  const handleCloseOpenModal = () => {
    setCloseModal(true)
  }

  // handle Edit
  const closeEditModal = () => {
    setEditModal(false)
  }
  const handleEdit = (id: any) => {
    setEditModal(true);
    const updatedItems = tableData.filter((item: any) => item.id === id) as any;
    setSelectedRowVal(updatedItems);
    setRowId(id)
  }
  const handleSaveData = (descriptionVal: any) => {
    const updatedItems = tableData.map((item: any) =>
      item.id === rowId ? { ...item, description: descriptionVal } : item,
    )
    setTableData(updatedItems)
    setEditModal(false)
  }

  // handle Finalize
  const closeFinalizeModal = () => {
    setFinalizeModal(false)
  }
  const handleFinalize = () => {
    setFinalizeModal(true)
  }

  const sentData = (data: any) => {
    setFinalizeModal(false)
    setFinalizeSuccess(true)
  }

  return (
    <>
      <Grid row>
        <div className="width-full">
          <p className="text-bold">Created</p>
          <Table bordered={false} fullWidth>
            <thead>
              <tr>
                <th scope="col">
                  <span>Reason</span>
                </th>
                <th scope="col">
                  <span>Section</span>
                </th>
                <th scope="col">
                  <span>Status</span>
                </th>
                <th scope="col">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.reason}</td>
                    <td>{item.section}</td>
                    <td>{item.status}</td>
                    <td>
                      <span
                        className={`${styles['actionButton']}`}
                        onClick={() => handleEdit(item.id)}
                      >
                        {item.action1}
                      </span>
                      <span
                        className={`${styles['actionButton']} margin-left-4`}
                        onClick={() => handleDelete(item.id)}
                      >
                        {item.action2}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>

        <div className="margin-top-2">
          <Button
            type="button"
            className="float-left usa-button"
            onClick={handleFinalize}
          >
            {sessionData?.data?.permissions[0]?.slug === 'reviewer' ||
            sessionData?.data?.permissions[0]?.slug === 'analyst'
              ? 'Finalize RFI'
              : sessionData?.data?.permissions[0]?.slug === 'screener'
                ? 'Finalize RTF'
                : 'Finalize RTF'}
          </Button>
        </div>
      </Grid>

      {finalizeSuccess && (
        <Grid row className="margin-top-4">
          <div className="width-full">
            <p className="text-bold">Sent</p>
            <Table bordered={false} fullWidth>
              <thead>
                <tr>
                  <th scope="col">
                    <span>Name</span>
                  </th>
                  <th scope="col">
                    <span>Reasons</span>
                  </th>
                  <th scope="col">
                    <span>Status</span>
                  </th>
                  <th scope="col">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stark Tech, LLC - Return to Firm - 06/10/2024</td>
                  <td>Contains 2 RTFs</td>
                  <td>Sent</td>
                  <td>
                    <span className={`${styles['actionButton']}`}>View</span>
                    <span
                      className={`${styles['actionButton']} margin-left-4`}
                      onClick={() => handleCloseOpenModal()}
                    >
                      Close
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Grid>
      )}

      <ConfirmationModal
        open={deleteModal}
        handleSend={deleteSelectedRecord}
        handleCancel={closeDeleteModal}
      />

      <EditFormModal
        open={editModal}
        handleSend={handleSaveData}
        handleCancel={closeEditModal}
        selectedData={selectedRowVal}
      />

      <CloseFormModal
        open={closeModal}
        handleSend={()=> {}}
        handleCancel={handleCloseModal}
        selectedData={''}
      />

      <FinalizeReturnToFirm
        open={finalizeModal}
        handleSend={sentData}
        handleCancel={closeFinalizeModal}
        tableData={tableData}
      />
    </>
  )
}

export default ReturnToFirmDataTable
