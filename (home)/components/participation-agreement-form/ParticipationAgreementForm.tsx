'use client'
import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Checkbox,
  Form,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AgreementSchema } from './types'
import styles from './ParticipationAgreementForm.module.scss'
import { z } from 'zod'

const ParticipationAgreementForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof AgreementSchema>>({
    mode: 'all',
    resolver: zodResolver(AgreementSchema),
  })
  const onSubmit = (data: z.infer<typeof AgreementSchema>) => {
    return alert(
      `Success!\nSignature: ${data.agreementSignature}\nJob Title: ${data.jobTitle}`,
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form-inputs']}>
      <Label htmlFor="agreement-signature" requiredMarker>
        Signature Of Owner/Authorized Officer
      </Label>
      <Controller
        control={control}
        {...register('agreementSignature')}
        render={({ field: { ref, ...field } }) => (
          <>
            <TextInput
              id="agreement-signature"
              type="text"
              placeholder="Signature"
              inputRef={ref}
              {...field}
              validationStatus={
                errors.agreementSignature?.message ? 'error' : 'success'
              }
            />
            {errors && errors.agreementSignature && (
              <div className={styles['error-msg'] + ' usa-input-helper-text'}>
                <span
                  className="error-message"
                  id="agreement-signature-input-error-message"
                >
                  {errors.agreementSignature.message}
                </span>
              </div>
            )}
          </>
        )}
      />

      <Label htmlFor="job-title" requiredMarker>
        Title
      </Label>
      <Controller
        control={control}
        {...register('jobTitle')}
        render={({ field: { ref, ...field } }) => (
          <>
            <TextInput
              id="job-title"
              type="text"
              placeholder="Title"
              inputRef={ref}
              {...field}
              validationStatus={errors.jobTitle?.message ? 'error' : 'success'}
            />
            {errors && errors.jobTitle && (
              <div className={styles['error-msg'] + ' usa-input-helper-text'}>
                <span
                  className="error-message"
                  id="job-title-input-error-message"
                >
                  {errors.jobTitle.message}
                </span>
              </div>
            )}
          </>
        )}
      />
      <hr className={styles['bottom-form-divider']} />
      <div className={styles['default-btn']}>
        <Controller
          control={control}
          {...register('confirmCheckbox')}
          render={({ field: { ref, value, ...field } }) => (
            <>
              <Checkbox
                id="confirm-checkbox"
                label="By checking the box, you agree to the statement"
                inputRef={ref}
                {...field}
                value={value?.toString()} // Convert boolean to string as uswds checkbox does not expect boolean for the value
              />
            </>
          )}
        />
        <div className='default-btn'>
          <div className="usa-button-group-container">
            <ButtonGroup>
              <Button type="button" outline>
                Download copy
              </Button>
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ParticipationAgreementForm
