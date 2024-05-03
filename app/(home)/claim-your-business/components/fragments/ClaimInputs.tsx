/* eslint-disable */
import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import {
  Control,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
  Controller,
  UseFormStateReturn,
} from 'react-hook-form'
import {
  claimBusinessInputDetails,
  getBusinessesClaimed,
  getLostBusinessProfile,
} from '../utils/helpers'
import { ClaimBusinessInputs } from '../utils/types'
import useSWR, { mutate } from 'swr'
import { fetcherGET } from '../../../../services/fetcher'
import Styles from '../ClaimMyBusiness.module.scss'

interface IClaimInputs {
  claimFormComplete: () => void
  handleOpen: () => void
  control: Control<ClaimBusinessInputs>
  errors: FieldErrors<ClaimBusinessInputs>
  handleSubmit: UseFormHandleSubmit<ClaimBusinessInputs>
  isValid: boolean
  touchedFields: UseFormStateReturn<ClaimBusinessInputs>['touchedFields']
  // eslint-disable-next-line no-unused-vars
  setError: (
    name: keyof ClaimBusinessInputs,
    error: {
      type: string
      message?: string
      shouldFocus?: boolean
    },
  ) => void
}

const fieldKeys: (keyof ClaimBusinessInputs)[] = [
  'uei',
  'cageCode',
  'bankAccountNumber',
  'tin',
]

const ClaimInputs = ({
  claimFormComplete,
  handleOpen,
  control,
  errors,
  handleSubmit,
  isValid,
  setError,
  touchedFields,
}: IClaimInputs) => {
  const [queryParams, setQueryParams] = useState({
    uei: '',
    tin: '',
    cage_code: '',
    account_hash: '',
  })
  const { data, error } = useSWR(
    `/validate-sam-with-entity-data?uei=${queryParams.uei}&tax_identifier_number=${queryParams.tin}&cage_code=${queryParams.cage_code}&account_hash=${queryParams.account_hash}`,
    fetcherGET,
  )

  const handleBusinessClaim = async (formData: ClaimBusinessInputs) => {
    setQueryParams({
      uei: formData.uei,
      tin: formData.tin,
      cage_code: formData.cageCode,
      account_hash: formData.bankAccountNumber,
    })

    mutate(
      `/validate-sam-with-entity-data?uei=${queryParams.uei}&tax_identifier_number=${queryParams.tin}&cage_code=${queryParams.cage_code}&account_hash=${queryParams.account_hash}`,
    )
  }

  const onSubmit: SubmitHandler<ClaimBusinessInputs> = async (formData) => {
    try {
      const data = await handleBusinessClaim(formData)
      const isClaimed = await getBusinessesClaimed(formData.uei)
      const isLostProfile = await getLostBusinessProfile(formData.uei)

      if (isClaimed) {
        setError('serverError', { type: 'submit', message: 'already claimed' })
        handleOpen()
        return
      }

      if (isLostProfile) {
        handleOpen()
        setError('serverError', {
          type: 'submit',
          message: 'not found',
        })
        handleOpen()
        return
      }

      // if (error.code === 'ERR_NETWORK') {
      //   setError('serverError', { type: 'submit', message: 'server error' })
      //   handleOpen()
      //   return
      // }

      console.log(error)

      claimFormComplete()
    } catch (error) {
      // console.error('Error submitting form:', error);
    }
  }

  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      // Filter out everything but digits
      return text.replace(/\D/g, '')
    }
    // Filter out non-alphanumeric characters (as per the original function)
    return text.replace(/[^a-zA-Z0-9]/g, '')
  }

  return (
    <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        {fieldKeys.map((key) => (
          <div key={key}>
            <Label
              htmlFor={`input-${key}`}
              requiredMarker={claimBusinessInputDetails[key].required}
            >
              {claimBusinessInputDetails[key].displayName}
            </Label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id={`input-${key}`}
                  type="text"
                  maxLength={claimBusinessInputDetails[key].maxlength}
                  className={errors[key] ? 'icon width-full' : ''}
                  onChange={(e) =>
                    field.onChange(filterText(e.target.value, key === 'tin'))
                  }
                  validationStatus={
                    errors[key]
                      ? 'error'
                      : touchedFields[key]
                        ? 'success'
                        : undefined
                  }
                  value={field.value!}
                />
              )}
            />
            <div className={`${Styles.mt_small} usa-input-helper-text`}>
              <span className={errors[key] && 'error-message'}>
                {claimBusinessInputDetails[key].fieldHelper}
              </span>
            </div>
          </div>
        ))}
        <p className="text-bold text-red text-right">
          If you are not a Qualified Owner, DO NOT PROCEED.
        </p>
        <div className="float-right">
          <ButtonGroup type="default">
            <Button type="submit" disabled={!isValid}>
              Find
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </Grid>
  )
}

export default ClaimInputs
