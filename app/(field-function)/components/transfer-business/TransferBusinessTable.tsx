"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonGroup, FormGroup, Grid, Icon, InputGroup, InputSuffix, Label, Table, Textarea, TextInput } from "@trussworks/react-uswds"
import styles from './TransferBusiness.module.scss'
import HeightIcon from '@mui/icons-material/Height'
import TransferBusinessConfirmModal from './TransferBusinessConfirmModal'
import { ModalRef } from '@trussworks/react-uswds'

interface TransferBusinessTableProps {
    transferBusinessTableData: [{
        id: string;
        isSelected: string;
        name: string;
        title: string;
        businesses: string;
    }],
}

const TransferBusinessTable: React.FC<TransferBusinessTableProps> = (
    { transferBusinessTableData }
) => {

    const [selectedRowData, setSelectedRowData] = useState(transferBusinessTableData);
    const [confirmStatus, setConfirmStatus] = useState(true);
    const transferConfirmRef = useRef<ModalRef>(null)
    const [modalData, setModalData] = useState('')
    const [searchName, setSearchName] = useState('')

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
        setSelectedRowData(transferBusinessTableData)
    }, [transferBusinessTableData])

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
        let obj = {
            title: "Are you sure?",
            description: "Ready to transfer this business to another District Office",
            buttonText: "Confirm"
        }
        setModalData(obj);
        transferConfirmRef.current?.toggleModal()
    }

    const handleSearch = () => {
        if (searchName === '') {
            setSelectedRowData(transferBusinessTableData)
        } else {
            const filteredItems = selectedRowData.filter(item =>
                item.districtOffice.toLowerCase().includes(searchName.toLowerCase())
            );
            if (filteredItems.length > 0) {
                const updatedItems = filteredItems.map(item => ({
                    ...item,
                    isSelected: true
                }));
                setSelectedRowData(updatedItems)
            }
        }
    }


    const handleConfirmSubmit = () => {

    }


    return (
        <>
            <Grid row>
                <Grid col={6} >
                    <h2 className='margin-top-0'>Would you like to transfer Cyberdyne Systems to another District Office?</h2>
                </Grid>
                <Grid col={6} className="display-flex flex-justify-end">
                    <FormGroup>
                        <InputGroup className={styles['searchBox']}>
                            <TextInput
                                id="search"
                                name="search"
                                type="search"
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <InputSuffix className={styles['searchBtn']}>
                                <Icon.Search
                                    onClick={handleSearch}
                                />
                            </InputSuffix>
                        </InputGroup>
                    </FormGroup>
                </Grid>
            </Grid>
            <Grid row>
                <div className={styles["scroll-container"]}>
                    <Table bordered className={styles["tableScroll"]}>
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
                                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.districtOffice}</td>
                                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.districtDirector}</td>
                                    <td className={row?.isSelected === true ? styles['selected-row'] : styles['row']}>{row.businesses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Grid>

            <Grid row className='margin-top-2'>
                <Grid col={12} >
                    <Label htmlFor="request-transfer-textarea">
                        Reason for Transfer
                    </Label>
                    <Textarea
                        className="display-flex flex-col maxw-full width-full"
                        id="request-transfer-textarea"
                        name="request-transfer-textarea"
                        maxLength={150}
                    />
                    <span className='text-light'>150 characters allowed</span>
                </Grid>
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

            <TransferBusinessConfirmModal
                modalRef={transferConfirmRef}
                data={modalData}
                handleAction={handleConfirmSubmit}
            />
        </>
    )
}

export default TransferBusinessTable
