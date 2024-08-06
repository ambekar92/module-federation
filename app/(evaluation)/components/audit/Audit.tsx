'use client'
import { useAudit } from '@/app/services/queries/useAudit'
import { Button, Table } from '@trussworks/react-uswds'
import moment from 'moment'
import React from 'react'

const Audit = ({page, pageSize}: {page: number, pageSize: number}) => {
  const { data, isLoading } = useAudit(page, pageSize)

  return (
    <>
      <h1>Audit</h1>
      <p>
        Below is a detailed, timestamped list of actions taken during this application’s review. You can sort any column by clicking the arrows in the column header.
      </p>
      <Button style={{marginLeft: 'auto', display: 'flex'}} type='button' outline>Export</Button>
      <Table bordered fullWidth>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((auditItem, index) => (
            <tr key={index}>
              <td>{moment(auditItem.timestamp).format('MM/DD/yyyy')}</td>
              <td>{auditItem.verb}</td>
              <td>{auditItem.actor.first_name} {auditItem.actor.last_name}</td>
              <td>{auditItem.userRole}</td>
              <td>{auditItem.details}</td>
            </tr>
          ))}
          {(!data || !Array.isArray(data) || !data.length) && !isLoading && <tr><td colSpan={5}>No audit items found.</td></tr>}
        </tbody>
      </Table>
    </>
  )
}

export default Audit
