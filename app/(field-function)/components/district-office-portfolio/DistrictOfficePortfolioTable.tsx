'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Alert, Button, ButtonGroup, Grid, Table } from '@trussworks/react-uswds'
import styles from './DistrictOfficePortfolio.module.scss'
import HeightIcon from '@mui/icons-material/Height'
import DistrictOfficePortfolioModal from './DistrictOfficePortfolioModal'
import { ModalRef } from '@trussworks/react-uswds'
import Primary from '@/app/(entity)/firm-profile/[entity_id]/Primary'

const DistrictOfficePortfolioTable = () => {

  const districtOfficePortfolioTableData = [
    {
      id: 1,
      businessName: 'Cyberdyne Systems UEI: 8B843892014',
      receivedFrom: 'Home Office',
      businessAddress: '0000 Business Drive, New York, NY, 00000',
      assignedAnalyst: 'None',
      approvalDate: '06/28/2024',
      primaryOwner: 'Mr. & Mrs. Smith'
    },
    {
      id: 2,
      businessName: 'BeatStars UEI: 7L305741295',
      receivedFrom: 'Home Office',
      businessAddress: '0000 Business Drive, New York, NY, 00000',
      assignedAnalyst: 'None',
      approvalDate: '06/28/2024',
      primaryOwner: 'Mr. & Mrs. Smith'
    },
    {
      id: 3,
      businessName: 'LogicGate UEI: 0F147852941',
      receivedFrom: 'Home Office',
      businessAddress: '0000 Business Drive, New York, NY, 00000',
      assignedAnalyst: 'None',
      approvalDate: '06/28/2024',
      primaryOwner: 'Mr. & Mrs. Smith'
    },
    {
      id: 4,
      businessName: 'Preplexity AI UEI: 4J025479654',
      receivedFrom: 'Home Office',
      businessAddress: '0000 Business Drive, New York, NY, 00000',
      assignedAnalyst: 'None',
      approvalDate: '06/28/2024',
      primaryOwner: 'Mr. & Mrs. Smith'
    },
  ]

  const [selectedRowData, setSelectedRowData] = useState(districtOfficePortfolioTableData);
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
      <Grid row>
        <Grid col={6}>
          <h2>New Business Intake</h2>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
          <ButtonGroup type="default">

            <Button type="button"
              outline
              // onClick={handleCancel}
              disabled={true}
            >
                            Assign
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
        <Grid col={12}>
          <div className={styles['scroll-container']}>
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
                    <span>Received From</span>
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
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}><a className="usa-link" href="javascript:void(0);">{row.businessName}</a></td>
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.receivedFrom}</td>
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.businessAddress}</td>
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.assignedAnalyst}</td>
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.approvalDate}</td>
                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.primaryOwner}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Grid>
      </Grid>
      {!confirmStatus &&
                <Grid row>
                  <Grid col={12}>
                    <div className="padding-top-5">
                      <Alert type="info" heading="Reason for Transfer" headingLevel="h1">
                        {'Note to be typed up by the one initiating the transfer. This note will be attached to the Firm and can be read by the new District Office when they view the Business in their Assign Business to BOS modal'}
                      </Alert>
                    </div>
                  </Grid>
                </Grid>
      }

      <DistrictOfficePortfolioModal
        modalRef={confirmRef}
        data={modalData}
        handleAction={handleConfirmSubmit}
      />
    </>
  )
}

export default DistrictOfficePortfolioTable
