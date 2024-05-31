import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage, Grid, Label, TextInput } from '@trussworks/react-uswds'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import ActionButtons from '../shared/ActionButtons'
import ContactInfo from '../shared/ContactInfo'
import GoneByAnotherName from '../shared/GoneByAnotherName'
import OwnershipPercent from '../shared/OwnershipPercent'
import SocialDisadvantages from '../shared/SocialDisadvantages'
import { Owner, OwnershipType } from '../shared/types'
import { defaultValues } from './constants'
import { OrganizationFormType, schema } from './schema'


type Props = {
    handleAddOwner: (data: any) => void,
    editedItem: Owner | null
}

const OrganizationForm = ({handleAddOwner, editedItem}: Props) => {
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    })
    useEffect(() => {
        if (editedItem) {
            methods.reset(editedItem as OrganizationFormType)
        }
    }, [editedItem])

    useEffect(() => {
        const sub = methods.watch((data) => {
        })
        return () => sub.unsubscribe()
    }, [])

    return (
        <>
        <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 10 }}>
                <Label requiredMarker={true} htmlFor='org_name'>Organization Name</Label>
                <ErrorMessage>{methods.formState.errors?.orgName?.message}</ErrorMessage>
                <Controller
                    name={'orgName'}
                    control={methods.control}
                    render={({ field }) =>
                        <TextInput
                            value={field.value}
                            name={'orgName'}
                            onChange={field.onChange}
                            className='maxw-full' type='text' id='last_name' placeholder='--' />
                    }
                />
            </Grid>
        </Grid>
        <FormProvider {...methods}>
            <OwnershipPercent editedItem={editedItem} setError={methods.setError} clearErrors={methods.clearErrors}/>
            <GoneByAnotherName type={OwnershipType.organization} />
            <ContactInfo />
            <SocialDisadvantages />
            <ActionButtons handleAddOwner={handleAddOwner}/>
        </FormProvider>
        </>
    )
}

export default OrganizationForm