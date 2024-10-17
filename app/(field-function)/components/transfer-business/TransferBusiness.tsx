'use client'

import React, { useRef } from 'react'
import { Card, Grid } from '@trussworks/react-uswds'
import styles from './TransferBusiness.module.scss'
import TransferBusinessTable from './TransferBusinessTable'
import TransferBusinessInstructionModal from './TransferBusinessInstructionModal'
import { ModalRef } from '@trussworks/react-uswds'

const TransferBusiness = () => {
  const instructionRef = useRef<ModalRef>(null)
  const transferBusinessTableData = [
    {
      id: 1,
      districtOffice: 'New Jersey District',
      districtDirector: 'John M.Blackstock',
      businesses: '55'
    },
    {
      id: 2,
      districtOffice: 'Baltimore District',
      districtDirector: 'Stephen Umberger',
      businesses: '49'
    },
    {
      id: 3,
      districtOffice: 'Metro NY District',
      districtDirector: 'John Mallano',
      businesses: '47'
    },
    {
      id: 4,
      districtOffice: 'Virginia District',
      districtDirector: 'John Mallano',
      businesses: '26'
    },
    {
      id: 5,
      districtOffice: 'Jersey District',
      districtDirector: 'John M.Blackstock',
      businesses: '23'
    }
  ]
  const handleInstructionSubmit = (data: any) => {
    console.log('>> handleInstructionSubmit ');
  }
  return (
    <>
      <p className='margin-bottom-1 text-bold'>My District Office Portfolio</p>
      <h1 className='margin-0'>Transfer Business to a Different District Office</h1>
      <hr style={{ margin: '2rem 0' }} />
      <h1 className='margin-0'>Business Profile</h1>

      <Card className={styles['cardStyle']}>
        <div>
          <h2 className='margin-0'>Cyberdyne Systems</h2>
        </div>
        <Grid row>
          <Grid col={6}>
            <p>Primary Owner | Sarah Conner</p>
            <p>Business Address | 0000 Business Drive, New York, NY, 00000</p>
            <p>Received From | Home Office</p>
          </Grid>
          <Grid col={6}>
            <p>Approved Application Date | 07/28/2024</p>
            <p>Assigned Analyst | Steve Stephenson</p>
            <p>Primary NAICS | 441120</p>
          </Grid>
        </Grid>
      </Card>

      <TransferBusinessTable
        transferBusinessTableData={transferBusinessTableData}
      />

      <TransferBusinessInstructionModal
        modalRef={instructionRef}
        handleAction={handleInstructionSubmit}
      />

    </>
  )
}

export default TransferBusiness
