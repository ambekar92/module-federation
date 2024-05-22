/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
import useSWR from 'swr'
import { ApiResponse, fetcherGET } from '../../../../services/fetcher'
import Styles from '../ClaimMyBusiness.module.scss'
import { GET_ENTITY_DATA } from '@/app/constants/routes'

interface IClaimInputs {
  claimFormComplete: (responseData: ApiResponse) => void
  handleOpen: () => void
  control: Control<ClaimBusinessInputs>
  errors: FieldErrors<ClaimBusinessInputs>
  handleSubmit: UseFormHandleSubmit<ClaimBusinessInputs>
  isValid: boolean
  touchedFields: UseFormStateReturn<ClaimBusinessInputs>['touchedFields']
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
    cageCode: '',
    bankAccountNumber: '',
    serverError: undefined,
  })
  const [shouldFetch, setShouldFetch] = useState(false)

  // conditional useSWR hook, runs once button is clicked and shouldFetch is true
  const { data: responseData, error: responseError } = useSWR(
    () =>
      shouldFetch &&
      GET_ENTITY_DATA(queryParams.uei, queryParams.tin, queryParams.cageCode, queryParams.bankAccountNumber),
    fetcherGET,
  )

  /* waits for responseData or responseError to change and checks that there
    is no errors and if there is data before calling the onSubmit function
    to handle the rest of the functionalities */
  useEffect(() => {
    if (responseError) {
      setShouldFetch(false)
      setError('serverError', { type: 'submit', message: 'server error' })
      handleOpen()
      return
    }

    if (responseData) {
      setShouldFetch(false)
      onSubmit(queryParams)
    }
  }, [responseData, responseError])

  /* This function set the new query parameter values after button is clicked
   and sets shouldFetch to true so the useSWR hook calls the API */
  const handleBusinessClaim: SubmitHandler<ClaimBusinessInputs> = async (
    formData,
  ) => {
    setQueryParams({
      ...queryParams,
      uei: formData.uei,
      tin: formData.tin,
      cageCode: formData.cageCode,
      bankAccountNumber: formData.bankAccountNumber,
    })
    setShouldFetch(true)
  }

  const onSubmit = async (formData: ClaimBusinessInputs) => {
    try {

      if (responseData && responseData.message === 'This business has already been claimed') {
        setError('serverError', { type: 'submit', message: 'already claimed' })
        handleOpen()
        return
      }

      if (responseData && responseData.message === 'No matching record found') {
        setShouldFetch(false)
        setError('serverError', { type: 'submit', message: 'not found' })
        handleOpen()
        return
      }

      responseData && claimFormComplete(responseData)
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
      <form
        onSubmit={handleSubmit(handleBusinessClaim)}
        className={Styles.form}
      >
        {fieldKeys.map((key) => (
          <div key={key} data-testid={`input-${key}`}>
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
              <span className={errors[key] && 'text-secondary'}>
                {claimBusinessInputDetails[key].fieldHelper}
              </span>
            </div>
          </div>
        ))}
        <p className="text-bold text-red text-right">
          If you are not a Qualifying Owner, DO NOT PROCEED.
        </p>
        <div className="float-right">
          <ButtonGroup type="default">
            <Button type="submit">
              Find
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </Grid>
  )
}

export default ClaimInputs
