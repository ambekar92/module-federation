"use client"

import React, { useState, useRef, useEffect } from 'react';
import styles from './ContributorPage.module.scss'
import SubsidiariesForm from './ContributorForm';
import { ModalRef, Alert } from '@trussworks/react-uswds'
import SubsidiariesTable from './ContributorTable';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

import { Button, ButtonGroup, FormGroup, Grid, Icon, InputGroup, InputSuffix, TextInput } from "@trussworks/react-uswds"

const ContributorPage = () => {
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
            contributor_name: "John Smith",
            title: "CEO",
            associated_firms: "Firm A1, Firm A2",
            email: "address@domin.ext",
            isSelected: false,

            firstName: "John",
            middleName: "",
            lastName: "Smith",
            prefix: "",
            suffix: "",
            phone_number: "(555) 111-7777",
            country_code: "",
        },
        {
            id: 2,
            contributor_name: "John Doe",
            title: "Board Member",
            associated_firms: "N/A",
            email: "address@domin.ext",
            isSelected: false,

            firstName: "John",
            middleName: "",
            lastName: "Doe",
            prefix: "",
            suffix: "",
            phone_number: "(555) 111-7777",
            country_code: "",
        },
        {
            id: 3,
            contributor_name: "Lana D Rey",
            title: "Chair",
            associated_firms: "Firm 5",
            email: "address@domin.ext",
            isSelected: false,

            firstName: "Lana",
            middleName: "D",
            lastName: "Rey",
            prefix: "",
            suffix: "",
            phone_number: "(555) 111-7777",
            country_code: "",
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
            contributor_name: selectedItem[0]?.contributor_name,
            title: selectedItem[0]?.title,
            associated_firms: selectedItem[0]?.associated_firms,
            email: selectedItem[0]?.email,
            isSelected: false,
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
                item.contributor_name.toLowerCase().includes(searchName.toLowerCase())
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
    const handleSaveFrom = (data: any, type: any) => {
        if (type === 'Save') {
            setTableData([...tableData, data])
            setShowForm(false)

            // Remove the highlight after 2 seconds
            setTimeout(() => {
                setTableData(prevItems => {
                    return prevItems.map(item => {
                        if (item.id === data.id) {
                            return { ...item, isNew: false };
                        }
                        return item;
                    });
                });
            }, 2000);

        } else {
            setTableData(prevItems =>
                prevItems.map(item =>
                    item.id === data.id ? data : item
                )
            );
            setShowForm(false)
        }




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
                    <h1 className="margin-bottom-0">Contributors</h1>
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
                    <h2 className="margin-top-1">Contributors</h2>
                </Grid>
                <Grid col={6} className="display-flex flex-justify-end">
                    <ButtonGroup type="default">
                        <Button
                            type="button"
                            outline
                            disabled={(selectedRowData.length > 1 || selectedRowData.length === 0) ? true : false}
                        // onClick={""}
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
                            Contributor was successfully deleted.
                        </Alert>
                    </Grid>
                }

                <Grid row className='margin-bottom-105'>
                    {selectedRowData.map((item, index) => (
                        <div key={index} className={styles['filterSelected']}>
                            <span>{item.contributor_name}</span>
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

export default ContributorPage
