import React from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { Grid } from '@trussworks/react-uswds'
import {
  deleteDelegate,
  editDelegate,
  selectForm,
  setEditingDelegate,
  updateInputKey,
} from '../store/formSlice'
import { useFormDispatch, useFormSelector } from '../store/hooks'
import { FormDelegateType, DelegateFormInputType } from '../utils/types'
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
  const dispatch = useFormDispatch()
  const { delegates, editingDelegate } = useFormSelector(selectForm)

  const handleEditDelegate = (index: number) => {
    const delegate = delegates[index]
    Object.entries(delegate).forEach(([key, value]) => {
      if (key !== 'id') {
        setValue(
          key as keyof FormDelegateType,
          typeof value !== 'string' ? '' : value,
        )
      }
    })
    dispatch(editDelegate(index))
    displayForm()
  }

  const handleDeleteDelegate = (index: number) => {
    if (
      editingDelegate !== null &&
      delegates[index].id === editingDelegate.id
    ) {
      // The owner being deleted is currently being edited, so reset the form
      reset({
        firstName: '',
        lastName: '',
        email: '',
      })
      dispatch(setEditingDelegate(null))
      dispatch(updateInputKey())
    }

    dispatch(deleteDelegate(index))
    displayForm()
  }

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
