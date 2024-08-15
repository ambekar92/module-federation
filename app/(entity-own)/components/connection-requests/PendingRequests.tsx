"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup, Grid } from "@trussworks/react-uswds"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import styles from './PendingRequests.module.scss'
import AcceptRequestModal from './AcceptRequestModal';
import { ModalRef } from '@trussworks/react-uswds'
import ReviewedRequests from './ReviewedRequests';

const PendingRequests = () => {
    const scrollRef = useRef(null);
    const acceptRequestRef = useRef<ModalRef>(null)
    const [modalData, setModalData] = useState('')
    const [pendingData, setPendingData] = useState([])
    const [reviewedData, setReviewedData] = useState([])

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const pendingRequestsData = [
        {
            id: 1,
            companyName: "Blue Bottle Company, LLC",
            contactPerson: "Jonathan Smith",
            contactNumber: "(000) 000-0000",
            address: "123 Main Street, Baltimore, MD 21201",
            date: "08/02/2024"
        },
        {
            id: 2,
            companyName: "Yellow Runner Company, LLC",
            contactPerson: "Jonathan Smith",
            contactNumber: "(000) 000-0000",
            address: "123 Main Street, Baltimore, MD 21201",
            date: "08/04/2024"
        },
        {
            id: 3,
            companyName: "Runner Company 01, LLC",
            contactPerson: "Jonathan Smith",
            contactNumber: "(000) 000-0000",
            address: "123 Main Street, Baltimore, MD 21201",
            date: "08/07/2024"
        },
        {
            id: 4,
            companyName: "Yellow Company 02, LLC",
            contactPerson: "Jonathan Smith",
            contactNumber: "(000) 000-0000",
            address: "123 Main Street, Baltimore, MD 21201",
            date: "08/08/2024"
        }
    ];

    const reviewedRequestsData = [
        { id: 1, date: "Date", applicantFirm: "Firm 1", owner: "Fill", address: "1234", contact: "address@domain.com", status: "Rejected" },
        { id: 2, date: "Date", applicantFirm: "Firm 2", owner: "Fill", address: "1234", contact: "address@domain.com", status: "Accepted" },
        { id: 3, date: "Date", applicantFirm: "Firm 3", owner: "Fill", address: "1234", contact: "address@domain.com", status: "Rejected" },
        { id: 4, date: "Date", applicantFirm: "Firm 4", owner: "Fill", address: "1234", contact: "address@domain.com", status: "Accepted" }
    ];

    useEffect(() => {
        setPendingData(pendingRequestsData);
        setReviewedData(reviewedRequestsData);
    }, [])

    const handleAcceptRequest = (param: any, id: any) => {
        let updatedItems = pendingData.filter(item => item.id !== id);
        let selectedItem = pendingData.filter(item => item.id === id);
        setPendingData(updatedItems)

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

        setReviewedData(prevItems => {
            const updatedItems = [...prevItems, reviewed];
            return updatedItems.sort((a, b) => b.id - a.id); // Sort by id in ascending order
        });

        // Remove the highlight after 2 seconds
        setTimeout(() => {
            setReviewedData(prevItems => {
                return prevItems.map(item => {
                    if (item.id === newId) {
                        return { ...item, isNew: false };
                    }
                    return item;
                });
            });
        }, 2000);


    }
    // Accept
    const onAcceptClick = (description: any, id: any) => {
        let obj = {
            selectedId: id,
            title: "Accepct Request",
            description: " accpect " + description,
            buttonText: "Accepct"
        }
        setModalData(obj);
        acceptRequestRef.current?.toggleModal()
    }
    // Reject
    const onRejectClick = (description: any, id: any) => {
        let obj = {
            selectedId: id,
            title: "Reject Request",
            description: " reject " + description,
            buttonText: "Reject"
        }
        setModalData(obj);
        acceptRequestRef.current?.toggleModal()
    }

    return (
        <>
            <Grid row>
                <Grid col={6}>
                    <h2 className="margin-top-1">Pending Requests</h2>
                </Grid>
                <Grid col={6} className="display-flex flex-justify-end">
                    <ButtonGroup type="default">
                        <Button type="button" outline className={styles['btnRound']} onClick={scrollLeft}>
                            <ArrowBackIosOutlinedIcon className={styles['arrowBtn']} />
                        </Button>
                        <Button type="button" outline className={styles['btnRound']} onClick={scrollRight}>
                            <ArrowForwardIosOutlinedIcon className={styles['arrowBtn']} />
                        </Button>
                    </ButtonGroup>
                </Grid>

                <Grid row>
                    <div className={styles["scroll-container"]}>
                        <div
                            className={styles["scroll-content"]}
                            ref={scrollRef}
                            style={{
                                display: 'flex',
                                overflowX: 'auto',
                                scrollBehavior: 'smooth',
                                padding: '10px',
                                gap: '16px'
                            }}
                        >
                            {pendingData.length > 0 && pendingData.map((request, index) => (
                                <Grid className={styles['usa-card']}>
                                    <div className={styles['card_body']}>
                                        <h4 className="margin-0">{request.companyName}</h4>
                                        <p className={styles['card_body_text']}>
                                            <PersonOutlineOutlinedIcon className={styles['icon']} />
                                            <span> {request.contactPerson} | {request.contactNumber}</span>
                                        </p>
                                        <p className={styles['card_body_text']}>
                                            <StoreOutlinedIcon className={styles['icon']} />
                                            <span> {request.address} </span>
                                        </p>
                                        <p className={styles['card_body_date']}>{request.date}</p>
                                    </div>
                                    <div className={styles['card_buttons']}>
                                        <Button type="button" onClick={(e) => onAcceptClick(request.companyName, request.id)} className={styles['buttons']} >
                                            Accept
                                        </Button>
                                        <Button type="button" outline onClick={(e) => onRejectClick(request.companyName, request.id)} className={styles['buttons']}>
                                            Reject
                                        </Button>
                                    </div>
                                </Grid>
                            ))}

                            {pendingData.length === 0 &&
                                <span className={styles['pendingStatus']}>No pending request</span>
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>


            <ReviewedRequests
                reviewedRequestsData={reviewedData}
            />

            <AcceptRequestModal
                modalRef={acceptRequestRef}
                data={modalData}
                handleAction={handleAcceptRequest}
            />
        </>
    )
}

export default PendingRequests
