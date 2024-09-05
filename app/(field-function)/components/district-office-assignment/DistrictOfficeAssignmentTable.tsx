'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonGroup, Grid, Table } from '@trussworks/react-uswds'
import styles from './DistrictOfficeAssignment.module.scss'
import HeightIcon from '@mui/icons-material/Height'
import DistrictOfficeAssignmentModal from './DistrictOfficeAssignmentModal'
import { ModalRef } from '@trussworks/react-uswds'

interface DistrictOfficeAssignmentTableProps {
    districtOfficeAssignmentTableData: [{
        id: string;
        isSelected: string;
        name: string;
        title: string;
        businesses: string;
    }],
    handleTableAction: (param: any) => void
}

const DistrictOfficeAssignmentTable: React.FC<DistrictOfficeAssignmentTableProps> = (
  { districtOfficeAssignmentTableData, handleTableAction }
) => {

  const [selectedRowData, setSelectedRowData] = useState(districtOfficeAssignmentTableData);
  const [confirmStatus, setConfirmStatus] = useState(true);
  const confirmRef = useRef<ModalRef>(null)
  const [modalData, setModalData] = useState('')

  const handleRowClick = (rowData: any) => {
    if (rowData.isSelected) {
      setSelectedRowData(prevItems =>
        prevItems.map(item =>
          item.id === rowData.id ? { ...item, isSelected: false } : item
        )
      );
    } else {
      setSelectedRowData(prevItems =>
        prevItems.map(item =>
          item.id === rowData.id ? { ...item, isSelected: true } : item
        )
      );
    }
  };

  useEffect(() => {
    setSelectedRowData(districtOfficeAssignmentTableData)
  }, [districtOfficeAssignmentTableData])

  useEffect(() => {
    const filteredItems = selectedRowData.filter(item => item.isSelected === true);
    if (filteredItems.length > 0) {
      setConfirmStatus(false)
    } else {
      setConfirmStatus(true)
    }
    handleTableAction(selectedRowData);
  }, [selectedRowData])

  const handleConfirm = () => {
    const obj = {
      title: 'Are you sure?',
      description: 'Ready to assign an Analyst to this business',
      buttonText: 'Confirm'
    }
    setModalData(obj);
    confirmRef.current?.toggleModal()
  }

  const handleConfirmSubmit = () => {

  }

  return (
    <>
      <h2 className='margin-top-0'>Would you like to assign a new Analyst to this business?</h2>
      <Grid row>
        <div className={styles['scroll-container']}>
          <Table bordered className={styles['tableScroll']}>
            <thead>
              <tr>
                <th scope="col">
                  <span>Name</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Title</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Businesses</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedRowData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(row)}
                  className={styles['row']}
                >
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.name}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.title}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.businesses}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Grid>

      <Grid row className='margin-top-4'>
        <Grid col={6} >
          <ButtonGroup type="default">
            <Button
              type="button"
              outline
              // onClick={handleCancel}
            >
                            Cancel
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end">
          <ButtonGroup type="default">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={confirmStatus}
            >
                            Confirm
            </Button>
          </ButtonGroup>
        </Grid>

      </Grid>

      <DistrictOfficeAssignmentModal
        modalRef={confirmRef}
        data={modalData}
        handleAction={handleConfirmSubmit}
      />
    </>
  )
}

export default DistrictOfficeAssignmentTable
