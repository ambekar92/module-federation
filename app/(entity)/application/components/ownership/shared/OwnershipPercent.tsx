import { ErrorMessage, Grid, Label, TextInput } from '@trussworks/react-uswds';
import React, { useEffect } from 'react'
import { Controller, UseFormClearErrors, UseFormSetError, useFormContext } from 'react-hook-form'
import { useApplicationSelector } from '../../../redux/hooks';
import { selectApplication } from '../../../redux/applicationSlice';
import { Owner } from './types';

const OwnershipPercent = ({editedItem, clearErrors, setError}: {editedItem:  Owner | null,  clearErrors: UseFormClearErrors<any>, setError: UseFormSetError<any>,}) => {
    const {control, watch, setValue } = useFormContext();
    const { ownershipPercentageTotal } = useApplicationSelector(selectApplication);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length <= 3) {
            setValue('ownershipPercent', e.target.value)
        }
    
    }

    useEffect(() => {
      const sub = watch((data) => {
        if (!editedItem && (Number(data.ownershipPercent ?? 0) + Number(ownershipPercentageTotal ?? 0)) > 100) {
          setError('ownershipPercent', {message: 'Total ownership percentage cannot exceed 100%'})
        } else if (!!editedItem && (Number(data.ownershipPercent ?? 0) + Number(ownershipPercentageTotal) - Number(editedItem.ownershipPercent??0)) > 100) {
          setError('ownershipPercent', {message: 'Total ownership percentage cannot exceed 100%'})
        } else {
          clearErrors('ownershipPercent')
        }
      })
      return () => sub.unsubscribe();
    }, [watch, ownershipPercentageTotal, editedItem, setError, clearErrors])

  return (
    <Grid row className='display-flex flex-column'>
    <Label htmlFor={'ownershipPercent'} requiredMarker={true}>Ownership (%)</Label>
    
    <Controller
        name={'ownershipPercent'}
        control={control}
        render={({ field }) =>
            <TextInput className='maxw-full' type='number' id={''} placeholder='--'
                value={field.value ??''}
                name={''}
                maxLength={3}
                min={1}
                max={100}
                onChange={handleChange}
                validationStatus = { field.value ? (!control.getFieldState('ownershipPercent').error?.message ? 'success' : 'error'): (control.getFieldState('ownershipPercent').error?.message ? 'error' : undefined) }
            />
        }
    />
    <ErrorMessage>{control.getFieldState('ownershipPercent').error?.message}</ErrorMessage>
</Grid>
  )
}

export default OwnershipPercent