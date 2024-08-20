"use client"

import React, { useState, useEffect } from 'react'
import { Grid, Table } from "@trussworks/react-uswds"
import styles from './SubsidiaryPage.module.scss'

interface SubsidiariesTableProps {
    subsidiariesTableData: [{
        id: string;
        isSelected: string;
        subsidiary_name: string;
        parent_company: string;
        address: string;
        owner: string;
        email: string;
        phone_number: string;
        notes: string;
    }],
    handleTableAction: (param: any) => void
}

const SubsidiariesTable: React.FC<SubsidiariesTableProps> = (
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
                                    <th scope="col">Subsidiary Name</th>
                                    <th scope="col">Parent Company</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRowData.map((row, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(row)}
                                        className={styles['row']}
                                    >
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.subsidiary_name}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.parent_company}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.address}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.owner}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.email}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.phone_number}</td>
                                        <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.notes}</td>
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

export default SubsidiariesTable
