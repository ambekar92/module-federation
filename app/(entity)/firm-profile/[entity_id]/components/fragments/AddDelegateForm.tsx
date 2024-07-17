import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DelegateFormSchema } from '../utils/schemas'
import { DelegateFormInputType } from '../utils/types'
import DelegateFormInputs from './DelegateFormInputs'
import { setDelegates } from '../store/formSlice'
import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'

function AddDelegateForm() {
  const { userId, applicationId, contributorId } = useApplicationId()

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<DelegateFormInputType>({
    resolver: zodResolver(DelegateFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  return (
    <GridContainer
      className="width-full height-full maxw-full display-flex flex-column padding-0"
      containerSize="widescreen"
    >
      <Grid row col={12}>
        <DelegateFormInputs
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          isValid={isValid}
          touchedFields={touchedFields}
          setValue={setValue}
          getValues={getValues}
          trigger={trigger}
          reset={reset}
          userDetails={{ userId, applicationId, contributorId }}
        />
      </Grid>
    </GridContainer>
  )
}

export default AddDelegateForm
