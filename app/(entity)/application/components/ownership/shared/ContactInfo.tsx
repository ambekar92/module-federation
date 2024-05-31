import { ErrorMessage, Grid, Label, TextInput } from '@trussworks/react-uswds'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { IndividualFormType } from '../individual/schema';
import { formatPhoneNumber } from '../helpers';

const ContactInfo = () => {
    const { control } = useFormContext<IndividualFormType>();

    return (
        <>
            <h3 className='margin-bottom-0'>Contact Information</h3>
            <Grid className='display-flex flex-column' row>
                <Label requiredMarker={true} className='margin-top-0' htmlFor='email_address'>Email Address</Label>
                <ErrorMessage>{control.getFieldState('contactInfo.email').error?.message}</ErrorMessage>
                <Controller
                    render={({ field, fieldState: { error } }) => (
                        <TextInput
                            className='maxw-full' type='email' id='email_address' placeholder='--'
                            name={'contactInfo.email'}
                            value={field.value}
                            onChange={field.onChange} />
                    )}
                    name={'contactInfo.email'}
                    control={control}
                />
            </Grid>

            <Grid row gap='md'>
                <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
                    <Label requiredMarker={true} htmlFor='phone_number'>Phone Number</Label>
                    <ErrorMessage>{control.getFieldState('contactInfo.phoneNumber').error?.message}</ErrorMessage>
                    <Controller
                        render={({ field }) => (
                            <TextInput 
                            maxLength={12}
                            className='maxw-full' type='text' id='phone_number' placeholder='000-000-0000' 
                            value={formatPhoneNumber(field.value)} 
                            onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                            name={'contactInfo.phoneNumber'}
                             />
                        )}
                        name={'contactInfo.phoneNumber'}
                        control={control}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default ContactInfo