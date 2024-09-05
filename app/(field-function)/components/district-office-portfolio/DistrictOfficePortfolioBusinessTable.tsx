'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonGroup, Grid, Table } from '@trussworks/react-uswds'
import styles from './DistrictOfficePortfolio.module.scss'
import HeightIcon from '@mui/icons-material/Height'
import DistrictOfficePortfolioModal from './DistrictOfficePortfolioModal'
import { ModalRef } from '@trussworks/react-uswds'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const DistrictOfficePortfolioBusinessTable = () => {

  const districtOfficePortfolioBusinessTableData = [
    {
      'id': 1,
      'business_name': 'Cyberdyne Systems',
      'uei_value': '8B843892014',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Esme Goulden',
      'approval_date': '06/28/2024',
      'primary_owner': 'Sarah Conner'
    },
    {
      'id': 2,
      'business_name': 'Acme Corp',
      'uei_value': '6B93894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Logan Curley',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 3,
      'business_name': 'Globex, Inc.',
      'uei_value': '2K84389765',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Ashton Hagan',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 4,
      'business_name': 'Olivia Pope & Associates',
      'uei_value': '2MV843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Darcy Alesbury',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 5,
      'business_name': 'Wonka Candies',
      'uei_value': '9H843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Ted Wolstencroft',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 6,
      'business_name': 'Krusty Krab',
      'uei_value': '9H843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Marigold McAnalyst',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 7,
      'business_name': 'StarkTech, LLC',
      'uei_value': '2MV843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Larry LaLonde',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 8,
      'business_name': 'StarkTech, LLC',
      'uei_value': '2MV843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Fletcher Oconnell',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 9,
      'business_name': 'Cheers Pub & Eatery',
      'uei_value': '2MV843894130',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Fletcher Oconnell',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    },
    {
      'id': 10,
      'business_name': 'Ollivander\'s Wand Shop',
      'uei_value': '2K84389765',
      'business_address': '0000 Business Drive, New York, NY, 00000',
      'assigned_analyst': 'Steve Stephenson',
      'approval_date': '06/28/2024',
      'primary_owner': 'Mr. & Mrs. Smith'
    }
  ]

  const [selectedRowData, setSelectedRowData] = useState(districtOfficePortfolioBusinessTableData);
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
    const filteredItems = selectedRowData.filter(item => item.isSelected === true);
    if (filteredItems.length > 0) {
      setConfirmStatus(false)
    } else {
      setConfirmStatus(true)
    }
    // handleTableAction(selectedRowData);
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
      <Grid row className='margin-top-4'>
        <Grid col={12}>
          <h2 className='margin-bottom-1'>Assigned Businesses</h2>
          <p className='margin-0' >Total</p>
          <p className='margin-top-1 font-mono-md margin-bottom-0'>{selectedRowData.length}</p>
        </Grid>
        <Grid col={6}>
          <select
            id="role"
            style={{ width: '350px' }}
            name="selectedOptionRole"
            className="usa-select"
          >
            <option value="">--</option>
            <option value="true">All Analysts</option>
          </select>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
          <ButtonGroup type="default">
            <Button type="button"
              outline
              // onClick={handleCancel}
              disabled={true}
            >
                            Re-assign
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={confirmStatus}
            >
                            Transfer
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Grid row>
        <div className={styles['scroll-container2']}>
          <Table bordered className={styles['tableScroll']}>
            <thead>
              <tr>
                <th scope="col">
                  <span>Business Name</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>UEI</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Business Address</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Assigned Analyst</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Approval Date</span>
                  <span className={styles['tableSortIcon']}>
                    <HeightIcon />
                  </span>
                </th>
                <th scope="col">
                  <span>Primary Owner</span>
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
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.business_name}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.uei_value}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.business_address}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.assigned_analyst}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.approval_date}</td>
                  <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.primary_owner}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Grid>

      <Grid row className='margin-top-2'>
        <Grid col={12} className="display-flex flex-justify-end margin-bottom-1">
          <span className='margin-0 margin-right-2'>Export to Excel </span> <FileDownloadOutlinedIcon color='info'/>
        </Grid>
      </Grid>

      <DistrictOfficePortfolioModal
        modalRef={confirmRef}
        data={modalData}
        handleAction={handleConfirmSubmit}
      />
    </>
  ) 
}

export default DistrictOfficePortfolioBusinessTable
