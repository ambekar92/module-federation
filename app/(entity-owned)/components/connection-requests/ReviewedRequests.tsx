'use client'

import React from 'react';
import { Grid, Table } from '@trussworks/react-uswds'
import styles from './PendingRequests.module.scss'

interface AcceptRequestModalProps {
    reviewedRequestsData: [{
        id: string;
        status: string;
        contact: string;
        address: string;
        owner: string;
        applicantFirm: string;
        date: string,
        isNew: string
    }]
}

const ReviewedRequests: React.FC<AcceptRequestModalProps> = (
  { reviewedRequestsData }
) => {

  return (
    <>
      <Grid row>
        <Grid col={6}>
          <h2 className="margin-bottom-1">Reviewed Requests</h2>
        </Grid>

        <Grid row>
          <div className={styles['scroll-container']}>
            <Table bordered fullWidth>
              <thead>
                <tr>
                  <th scope="col">Connection Request</th>
                  <th scope="col">Applicant Firm</th>
                  <th scope="col">Applicant Firm Owner</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact Information</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {reviewedRequestsData.map((request, index) => (
                  // <tr key={index} style={{ transition: 'background-color 0.5s ease',backgroundColor: request.isNew ? '#dff0d8' : 'transparent' }}>
                  <tr key={index}>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.date}</td>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.applicantFirm}</td>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.owner}</td>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.address}</td>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.contact}</td>
                    <td className={request.isNew ? (request.status === 'Accepted' ? styles['accepted'] : styles['rejected']) : styles['normal']}>{request.status}</td>
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

export default ReviewedRequests
