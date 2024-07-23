'use client'
import React, { useState } from 'react'
import styles from '../../../../(admin)/admin/configuration/components/Card.module.scss'
import { GridContainer, Grid} from '@trussworks/react-uswds'
import CustomTable from '../components/CustomTable'
import { ModalsAddUsers } from './AddNewUsersForm'

import {
  adminHeader,
} from '../../../../shared/components/forms/constant'
import CustomAlert from './Alerts'

export default function OrganizeUsers(): JSX.Element {

  const [showNewUserAlert, setShowNewUserAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [rowCount, setRowCount] = useState(0)
  const [newRow, setNewRow] = useState([])

  return (
    <>
      <GridContainer containerSize="widescreen">
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
                rowCount={rowCount}
                onAddUser={setNewRow}
                showAlert={setShowNewUserAlert}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid row>
          <Grid>
            {showSuccessAlert && (
              <CustomAlert
                label={'The Users permission has been successfully added.'}
              />
            )}
          </Grid>
        </Grid>
        <CustomTable
          onRowCountChange={setRowCount}
          bordered={false}
          headers={adminHeader}
          addSuccessUser={showNewUserAlert}
          newRow={newRow}
        />
      </GridContainer>
    </>
  )
}
