"use client"

import React, { useState, useEffect } from 'react'
import { Grid, Table } from "@trussworks/react-uswds"
import styles from './ContributorPage.module.scss'

interface ContributorTableProps {
    subsidiariesTableData: [{
        id: string;
        isSelected: string;
        contributor_name: string;
        title: string;
        associated_firms: string;
        email: string;

        firstName: string;
        middleName: string;
        lastName: string;
        prefix: string;
        suffix: string;
        phone_number: string;
        country_code: string;
    }],
    handleTableAction: (param: any) => void
}

const ContributorTable: React.FC<ContributorTableProps> = (
    { subsidiariesTableData, handleTableAction }
) => {

    const [selectedRowData, setSelectedRowData] = useState(subsidiariesTableData);
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
        setSelectedRowData(subsidiariesTableData)
    }, [subsidiariesTableData])

    useEffect(() => {
        handleTableAction(selectedRowData);
    }, [selectedRowData])

    return (
        <>
            <Grid row>
                <Grid row>
                    <div className={styles["scroll-container"]}>
                        <Table bordered className={styles["tableScroll"]}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Associated Firms</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Country Code</th>
                                    <th scope="col">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRowData.map((row, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(row)}
                                        className={styles['row']}
                                    >
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.contributor_name}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.title}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.associated_firms}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.email}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.country_code}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : (row?.isNew === true ? styles['accepted'] : styles['row']) }>{row.phone_number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ContributorTable
