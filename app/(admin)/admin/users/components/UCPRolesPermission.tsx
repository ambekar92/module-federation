'use client'
import React, { useState, useEffect } from 'react'
import styles from '../../../../(admin)/admin/configuration/components/Card.module.scss'
import { GridContainer, Grid, Header } from '@trussworks/react-uswds'
import CustomTable from '../components/CustomTable'
import { ModalsAddUsers } from './AddNewUsersForm'

import {
  adminHeader,
  adminBodyData,
} from '../../../../shared/components/forms/constant'
import CustomAlert from './Alerts'

interface TableRecord {
  id: number
  Name: string
  Email: string
  Role: any
  Permission: any
  Status: any
  Edit: string
  Delete: string
}

export default function OrganizeUsers(): JSX.Element {
  const [addSuccessUser, setAddSuccessUser] = useState(false)
  const [showNewUserAlert, setShowNewUserAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [records, setRecords] = useState<TableRecord[]>([])

  const handleAddRecord = (newRecord: any) => {
    setRecords([newRecord])
    setShowSuccessAlert(true)
  }

  return (
    <>
      <GridContainer containerSize="widescreen">
        <Grid row>
          <Grid col={12}>
            <Header className="shadow-2">
              <div className={`${styles['header-title']} margin-left-2`}>
                UCP User Roles and Permissions
              </div>
            </Header>{' '}
          </Grid>
        </Grid>
        <Grid row>
          <div
            className={`${styles['header-title']} margin-left-2 margin-top-3`}
          >
            User Management
          </div>
        </Grid>
        <Grid className="grid-row" row>
          <Grid className="flex-10 margin-left-2">
            Manage users roles and permissions.
          </Grid>

          <Grid className="display-flex flex-column flex-2 flex-align-end">
            <Grid>
              <ModalsAddUsers
                showAlert={setShowNewUserAlert}
                bodyData={adminBodyData}
                onAddUser={handleAddRecord}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid row>
          <Grid>
            {showSuccessAlert&& <CustomAlert
              label={'The Users permission has been successfully added.'}
            />}
          </Grid>
        </Grid>
        <CustomTable
          bordered={false}
          headers={adminHeader}
          rows={adminBodyData}
          updatedData={records}
          addSuccessUser={addSuccessUser}
          editable={true}
          remove={true}
        />
      </GridContainer>
    </>
  )
}
