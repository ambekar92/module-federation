import { Grid } from '@trussworks/react-uswds'
import React from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import {
  selectForm
} from '../store/formSlice'
import { useFormSelector } from '../store/hooks'
import { DelegateFormInputType } from '../utils/types'
import styles from './DelegateForm.module.scss'

type DelegateTableProps = {
  isDisplay?: boolean
  setValue: UseFormSetValue<DelegateFormInputType>
  reset: UseFormReset<DelegateFormInputType>
  displayForm: () => void
}

const DelegateTable: React.FC<DelegateTableProps> = ({
  isDisplay,
  setValue,
  reset,
  displayForm,
}) => {
  const { delegates } = useFormSelector(selectForm)

  return (
    <Grid row className="width-full">
      <div className=" width-full">
        <table className="usa-table usa-table--borderless width-full">
          <thead>
            <tr>
              <td className={styles['text-bold']} >First Name</td>
              <td className={styles['text-bold']} >Last Name</td>
              <td className={styles['text-bold']} >Email</td>
              <td className={styles['text-bold']} >Status</td>
            </tr>
          </thead>
          <tbody>
            {delegates.map((delegate, index) => (
              <tr key={index}>
                <td>{delegate.firstName}</td>
                <td>{delegate.lastName}</td>
                <td>{delegate.email}</td>
                <td>Status</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Grid>
  )
}

export default DelegateTable
