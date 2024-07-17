import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import { selectForm } from '../store/formSlice'
import { useFormSelector } from '../store/hooks'
import { DelegatesResponse } from '../utils/types'
import styles from './DelegateForm.module.scss'

type DelegateTableProps = {
	delegatesData?: DelegatesResponse[]
}

const DelegateTable: React.FC<DelegateTableProps> = ({ delegatesData }) => {
  const { delegates } = useFormSelector(selectForm);

  return (
    <Grid row className="width-full">
      <div className=" width-full">
        <table className="usa-table usa-table--borderless width-full">
          <thead>
            <tr>
              <td className={styles['text-bold']}>First Name</td>
              <td className={styles['text-bold']}>Last Name</td>
              <td className={styles['text-bold']}>Email</td>
              <td className={styles['text-bold']}>Status</td>
            </tr>
          </thead>
          <tbody>
            {delegatesData
              ? (
                delegatesData.map((delegate, index) => (
                  <tr key={index}>
                    <td>{delegate.first_name}</td>
                    <td>{delegate.last_name}</td>
                    <td>{delegate.email}</td>
                    <td>{delegate.invitation_status}</td>
                  </tr>
                ))
              )
              : (
                delegates.map((delegate, index) => (
                  <tr key={index}>
                    <td>{delegate.firstName}</td>
                    <td>{delegate.lastName}</td>
                    <td>{delegate.email}</td>
                    <td>Pending</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </Grid>
  )
}

export default DelegateTable
