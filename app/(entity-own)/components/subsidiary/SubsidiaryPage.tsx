"use client"

import React, { useState, useRef, useEffect } from 'react';
import styles from './SubsidiaryPage.module.scss'
import SubsidiariesForm from './SubsidiariesForm';
import { ModalRef, Alert } from '@trussworks/react-uswds'
import SubsidiariesTable from './SubsidiariesTable';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

import { Button, ButtonGroup, FormGroup, Grid, Icon, InputGroup, InputSuffix, TextInput } from "@trussworks/react-uswds"

const SubsidiaryPage = () => {
    const acceptRequestRef = useRef<ModalRef>(null)
    const [selectedRowData, setSelectedRowData] = useState([])
    const [formData, setFormData] = useState([])
    const [tableData, setTableData] = useState([])

    const [updatedTableData, setUpdatedTableData] = useState([])

    const [searchName, setSearchName] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [showAlert, setShowAlert] = useState(false)


    const subsidiariesTableData = [
        {
            id: 1,
            subsidiary_name: "Holding Company A",
            parent_company: "[Controlling Entity]",
            address: "123 Main St, Anytown, CA",
            owner: "Jane Smith",
            email: "Jabeoe@gmail.com",
            phone_number: "+1 (555) 555-1221",
            notes: "Note Text",
            isSelected: false
        },
        {
            id: 2,
            subsidiary_name: "Firm A1",
            parent_company: "Holding Company A",
            address: "123 Main St, Anytown, CA",
            owner: "Jane Smith",
            email: "Jabeoe@gmail.com",
            phone_number: "+1 (555) 555-1221",
            notes: "Note Text",
            isSelected: false
        },
        {
            id: 3,
            subsidiary_name: "Firm A2",
            parent_company: "Holding Company A",
            address: "123 Main St, Anytown, CA",
            owner: "Jane Smith",
            email: "Jabeoe@gmail.com",
            phone_number: "+1 (555) 555-1221",
            notes: "Note Text",
            isSelected: false
        },
        {
            id: 4,
            subsidiary_name: "Holding Company B",
            parent_company: "[Controlling Entity]",
            address: "123 Main St, Anytown, CA",
            owner: "Jane Smith",
            email: "Jabeoe@gmail.com",
            phone_number: "+1 (555) 555-1221",
            notes: "Note Text",
            isSelected: false
        },
        {
            id: 5,
            subsidiary_name: "Holding Company C",
            parent_company: "Holding Company A",
            address: "123 Main St, Anytown, CA",
            owner: "Jane Smith",
            email: "Jabeoe@gmail.com",
            phone_number: "+1 (555) 555-1221",
            notes: "Note Text",
            isSelected: false
        }
    ];

    useEffect(() => {
        setTableData(subsidiariesTableData);
    }, [])

    const handleFormRequest = (param: any, id: any) => {
        let updatedItems = formData.filter(item => item.id !== id);
        let selectedItem = formData.filter(item => item.id === id);
        setFormData(updatedItems)

        const newId = Math.floor(Math.random() * 1000) + 1;
        let reviewed = {
            id: newId,
            date: selectedItem[0]?.date,
            applicantFirm: selectedItem[0]?.companyName,
            owner: selectedItem[0]?.contactPerson,
            address: selectedItem[0]?.address,
            contact: "-",
            status: param === 'Reject' ? 'Rejected' : 'Accepted',
            isNew: true
        };

        setTableData(prevItems => {
            const updatedItems = [...prevItems, reviewed];
            return updatedItems.sort((a, b) => b.id - a.id); // Sort by id in ascending order
        });

        // Remove the highlight after 2 seconds
        setTimeout(() => {
            setTableData(prevItems => {
                return prevItems.map(item => {
                    if (item.id === newId) {
                        return { ...item, isNew: false };
                    }
                    return item;
                });
            });
        }, 2000);
    }

    const handleTableRequest = (data: any) => {
        const filteredItems = data.filter(item => item.isSelected === true);
        if (filteredItems.length > 0) {
            setShowForm(true)
        } else {
            setShowForm(false)
        }
        setSelectedRowData(filteredItems)
        setUpdatedTableData(data);
    }

    const handleCloseFilterMenu = (id: any) => {
        setUpdatedTableData(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isSelected: false } : item
            )
        );
    }

    const handleSearch = () => {
        if (searchName === '') {
            setTableData(subsidiariesTableData)
        } else {
            const filteredItems = tableData.filter(item =>
                item.subsidiary_name.toLowerCase().includes(searchName.toLowerCase())
            );
            if (filteredItems.length > 0) {
                const updatedItems = filteredItems.map(item => ({
                    ...item,
                    isSelected: true
                }));
                setTableData(updatedItems)
            }
        }
    }

    useEffect(() => {
        if (updatedTableData.length > 0) {
            setTableData(updatedTableData)
        }
    }, [updatedTableData])

    useEffect(() => {
        if (searchName === '') {
            setTableData(subsidiariesTableData)
        }
    }, [searchName])

    const addNew = () => {
        setShowForm(true)
    }
    const handleSaveFrom = (data: any) => {
        setTableData([...tableData, data])
        setShowForm(false)
    }
    const handleDeleteData = (id: any) => {
        const filteredItems = tableData.filter(item => item.id !== id);
        setTableData(filteredItems)
        setShowForm(false)
        setShowAlert(true)

        // Remove the highlight after 2 seconds
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    return (
        <>
            <Grid row>
                <Grid col={6}>
                    <h1 className="margin-bottom-0">Subsidiaries</h1>
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

            <hr style={{ margin: '1rem 0' }} />

            <Grid row>
                <Grid col={6}>
                    <h2 className="margin-top-1">Subsidiaries</h2>
                </Grid>
                <Grid col={6} className="display-flex flex-justify-end">
                    <ButtonGroup type="default">
                        <Button
                            type="button"
                            outline
                            disabled={(selectedRowData.length > 1 || selectedRowData.length === 0) ? true : false}
                            onClick={""}
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            onClick={addNew}
                            disabled={(selectedRowData.length > 0) ? true : false}
                        >
                            Add New
                        </Button>
                    </ButtonGroup>
                </Grid>

                {
                    showAlert &&
                    <Grid col={12} className="margin-bottom-105">
                        <Alert type="success" headingLevel="h4" noIcon>
                            sdfsdfsdf
                        </Alert>
                    </Grid>
                }


                <Grid row className='margin-bottom-105'>


                    {selectedRowData.map((item, index) => (
                        <div key={index} className={styles['filterSelected']}>
                            <span>{item.subsidiary_name}</span>
                            <IconButton
                                id="fade-button"
                                aria-controls={'fade-menu'}
                                aria-haspopup="true"
                                aria-expanded={'true'}
                                onClick={() => handleCloseFilterMenu(item?.id)}
                                className={styles['filterBtn']}
                                disableRipple
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    ))
                    }

                </Grid>
            </Grid>


            <SubsidiariesTable
                subsidiariesTableData={tableData}
                handleTableAction={handleTableRequest}
            />

            {
                showForm &&
                <SubsidiariesForm
                    data={selectedRowData}
                    handleAction={handleFormRequest}
                    handleCancelFrom={() => setShowForm(false)}
                    handleSaveFrom={handleSaveFrom}
                    handleDeleteData={handleDeleteData}
                />
            }


        </>
    )
}

export default SubsidiaryPage
