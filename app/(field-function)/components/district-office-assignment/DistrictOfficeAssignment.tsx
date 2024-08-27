'use client'

import React from 'react'
import { Button, Card, Grid, Table } from '@trussworks/react-uswds'
import styles from './DistrictOfficeAssignment.module.scss'
import DistrictOfficeAssignmentTable from './DistrictOfficeAssignmentTable'


const DistrictOfficeAssignment = () => {

    const districtOfficeAssignmentTableData = [
        {
            id: 1,
            name: "Ashton Hagan",
            title: "Analyst",
            businesses: "22"
        },
        {
            id: 2,
            name: "Ted Wolstencroft",
            title: "Analyst",
            businesses: "15"
        },
        {
            id: 3,
            name: "Harper Broadley",
            title: "Analyst",
            businesses: "10"
        },
        {
            id: 4,
            name: "Esme Goulden",
            title: "Analyst",
            businesses: "9"
        },
        {
            id: 5,
            name: "Esme 1",
            title: "Analyst",
            businesses: "9"
        },
        {
            id: 6,
            name: "Esme 2",
            title: "Analyst",
            businesses: "9"
        }
    ]

    const handleTableRequest = (data: any) => {
        console.log(">> Check ");

    }

    return (
        <>
            <p className='margin-bottom-1 text-bold'>My District Office Portfolio</p>
            <h1 className='margin-0'>Assign Business to Analyst</h1>
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

            <DistrictOfficeAssignmentTable
                districtOfficeAssignmentTableData={districtOfficeAssignmentTableData}
                handleTableAction={handleTableRequest}
            />


        </>
    )
}

export default DistrictOfficeAssignment
