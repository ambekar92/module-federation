import { ErrorMessage, Grid, Label } from '@trussworks/react-uswds'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OwnershipType } from './types'

const GoneByAnotherName = ({type}: {type: OwnershipType}) => {
    const {register} = useFormContext();
  return (
    <Controller 
    {...register('goneByAnotherName')}
        render={({field, fieldState: {error}}) => <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 6 }}>
        <Label requiredMarker={true} htmlFor='other_name'>Has this {type} ever gone by another name?</Label>
        
        <div className='usa-radio display-flex gap-1 bg-base-lightest'>
            <input
                className="usa-radio__input"
                id='other_name_yes'
                type="radio"
                value="yes"
                {...register('goneByAnotherName')}
                onChange={field.onChange}
            />
            <Label className="usa-radio__label" htmlFor='other_name_yes'>
                Yes
            </Label>

            <input
                className="usa-radio__input"
                id='other_name_no'
                type="radio"
                value="no"
                {...register('goneByAnotherName')}
                onChange={field.onChange}
            />
            <Label className="usa-radio__label margin-left-2" htmlFor='other_name_no' >
                No
            </Label>
        </div>
        <ErrorMessage>{error?.message}</ErrorMessage>
</Grid>}
     />
    
  )
}

export default GoneByAnotherName