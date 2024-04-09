'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  AccordionItemProps,
  Label,
  TextInput,
  ButtonGroup,
  Button,
  Link,
  Alert,
} from '@trussworks/react-uswds'
import {
  FormData,
  BusinessSchema,
  formFieldsHelperText,
} from './ClaimBusinessFormTypes'
import { Style } from 'util'

// Mock Data/API calls until BE is ready
const claimedBusinesses = ['123456789012', '123456789013']
const lostBusinessProfiles = ['123456789014', '123456789015']
const getBusinessesClaimed = (uei: string) =>
  Promise.resolve(claimedBusinesses.includes(uei))
const getLostBusinessProfile = (uei: string) =>
  Promise.resolve(lostBusinessProfiles.includes(uei))

interface claimBusinessFormProps {
  claimFormComplete: () => void
}

function ClaimBusinessForm() {
  // {
  // claimFormComplete = () => {},
  // }: claimBusinessFormProps
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    getValues,
    setValue,
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(BusinessSchema),
  })

  type FormValues = {
    textInput: string
  }

  const [showAlert, setShowAlert] = useState(false)
  const [showErrorUEI, setShowErrorUEI] = useState(false)
  const [showErrorCageCode, setShowErrorCageCode] = useState(false)
  const [showErrorBAN, setShowErrorBAN] = useState(false)
  const [showErrorTIN, setShowErrorTIN] = useState(false)

  const onSubmit = async (data: FormData) => {
    console.log('data = ', data)
    getBusinessesClaimed(data.uei).then((result) => {
      if (result) {
        setError('serverError', { type: 'submit', message: 'already claimed' })
        return setShowAlert(true)
      }
      getLostBusinessProfile(data.uei).then((result) => {
        if (result) {
          console.log('Can not find Business Profile.')
          setError('serverError', {
            type: 'submit',
            message: 'not found',
          })
          return setShowAlert(true)
        }
        claimFormComplete()
      })
    })
  }

  const filterText = (input: string) => {
    return input.replace(/[\s~`!@#$%^&*(){}[];:"'<,.>?\/\\|_+=-]/g, '')
  }

  const onChangeFilterText = async (e: Event) => {
    //remove spaces and special characters from input field
    if (e.target.value && e.target.value.length > 0) {
      const result = filterText(e.target.value)
      setValue(e.target.name, result)
    }
  }

  const onBlur = async (e: Event) => {
    if (errors.serverError) {
      delete errors.serverError
      setShowAlert(false)
    }
    if (getValues('cageCode') === undefined) {
      if (errors.cageCode) {
        delete errors.cageCode
      }
      setValue('cageCode', '')
    }
    if (errors) {
      switch (e.target?.name) {
        case 'uei':
          !showErrorUEI && setShowErrorUEI(true)
          break
        case 'cageCode':
          !showErrorCageCode &&
            e.target.value.length > 0 &&
            setShowErrorCageCode(true)
          break
        case 'bankAccountNumber':
          !showErrorBAN && setShowErrorBAN(true)
          break
        case 'tin':
          !showErrorTIN && setShowErrorTIN(true)
      }
    }
  }

  const accordionProps: AccordionItemProps[] = [
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Verify your business ownership with sam.gov
        </div>
      ),
      content: (
        <span>
          SBA uses the business information from your{' '}
          <a
            href="https://sam.gov/content/home"
            target="_blank"
            title="Open SAM.gov"
            rel="noreferrer"
          >
            SAM.gov
          </a>{' '}
          account to verify your identity.
          <br />
          <br />
          Before you begin:
          <ul>
            <li>
              We recommend confirming your UEI, TIN, CAGE (if applicable), and
              bank account number in SAM.gov{' '}
              <a
                href="https://sam.gov/content/entity-registration"
                target="_blank"
                title="Get Started with Registration and the Unique Entity ID
"
                rel="noreferrer"
              >
                https://sam.gov/content/entity-registration
              </a>
              .
            </li>
            <li>
              Ensure your SAM.gov account is current and active.{' '}
              <a
                href="https://sam.gov/content/status-tracker"
                target="_blank"
                title="Check Entity Status"
                rel="noreferrer"
              >
                https://sam.gov/content/status-tracker
              </a>
            </li>
            <li>
              <b role="note">
                Note that if you make changes to your SAM.gov account, it will
                not be available in UCMS until after it has been reviewed and
                ACTIVATED by SAM.gov.
              </b>
            </li>
          </ul>
          <b role="note">
            IMPORTANT NOTE: SBA will only accept submissions from Qualified
            Owners (primary, majority business owners). If you are not a
            Qualified Owner, DO NOT PROCEED.
          </b>
        </span>
      ),
      expanded: true,
      id: '123',
      className: 'myCustomAccordionItem',
      headingLevel: 'h4',
    },
  ]

  return (
    <>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} onBlur={onBlur}>
        <Accordion bordered={true} items={accordionProps} />
        <Label htmlFor="UEI" requiredMarker>
          Unique Entity ID (UEI)
        </Label>
        <Controller
          control={control}
          name="textInput"
          {...register('uei', {
            onChange: onChangeFilterText,
          })}
          render={({ field: { ref, ...field } }) => (
            <>
              <TextInput
                className={showErrorUEI ? 'icon' : ''}
                id="input-uei"
                name="input-uei"
                type="text"
                inputRef={ref}
                minlength="12"
                maxlength="12"
                {...field}
                validationStatus={
                  showErrorUEI
                    ? errors.uei?.message
                      ? 'error'
                      : 'success'
                    : 'info'
                }
              />
              <div className="usa-input-helper-text">
                <span
                  className={errors && errors.uei ? 'error-message' : ''}
                  id="uei-input-error-message"
                >
                  {formFieldsHelperText.uei}
                </span>
              </div>
            </>
          )}
        />

        <Label htmlFor="CAGE Code">CAGE Code</Label>
        <Controller
          control={control}
          name="textInput"
          {...register('cageCode')}
          render={({ field: { ref, ...field } }) => (
            <>
              <TextInput
                className={showErrorCageCode ? 'icon' : ''}
                id="input-cageCode"
                name="input-cageCode"
                type="text"
                inputRef={ref}
                maxlength="5"
                {...field}
                defaultValue=""
                validationStatus={
                  showErrorCageCode
                    ? errors.cageCode?.message
                      ? 'error'
                      : 'success'
                    : 'info'
                }
              />
              <div className="usa-input-helper-text">
                <span
                  className={
                    showErrorCageCode && errors && errors.cageCode
                      ? 'error-message'
                      : ''
                  }
                  id="cageCode-input-error-message"
                >
                  {formFieldsHelperText.cageCode}
                </span>
              </div>
            </>
          )}
        />

        <Label htmlFor="Bank Account Number" requiredMarker>
          Bank Account Number
        </Label>
        <Controller
          control={control}
          name="textInput"
          {...register('bankAccountNumber')}
          render={({ field: { ref, ...field } }) => (
            <>
              <TextInput
                className={showErrorBAN ? 'icon' : ''}
                id="input-bankAccountNumber"
                name="input-bankAccountNumber"
                type="text"
                inputRef={ref}
                maxlength="30"
                {...field}
                validationStatus={
                  showErrorBAN
                    ? errors.bankAccountNumber?.message
                      ? 'error'
                      : 'success'
                    : 'info'
                }
              />
              <div className="usa-input-helper-text">
                <span
                  className={
                    errors && errors.bankAccountNumber ? 'error-message' : ''
                  }
                  id="bankAccountNumber-input-error-message"
                >
                  {formFieldsHelperText.bankAccountNumber}
                </span>
              </div>
            </>
          )}
        />

        <Label htmlFor="TIN" requiredMarker>
          Taxpayer Identification Numbers (TIN)
        </Label>
        <Controller
          control={control}
          name="textInput"
          {...register('tin', {
            onChange: onChangeFilterText,
          })}
          render={({ field: { ref, ...field } }) => (
            <>
              <TextInput
                className={showErrorTIN ? 'icon' : ''}
                id="input-tin"
                name="input-tin"
                type="text"
                inputRef={ref}
                minlength="9"
                maxlength="9"
                {...field}
                validationStatus={
                  showErrorTIN
                    ? errors.tin?.message
                      ? 'error'
                      : 'success'
                    : 'info'
                }
              />
              <div className="usa-input-helper-text">
                <span
                  className={errors && errors.tin ? 'error-message' : ''}
                  id="tin-input-error-message"
                >
                  {formFieldsHelperText.tin}
                </span>
              </div>
            </>
          )}
        />
        <br />
        {errors && errors.serverError?.message && (
          <div>
            {errors.serverError.message === 'already claimed' ? (
              <Alert
                role="alert"
                className="wide"
                type="error"
                heading="This business has already been claimed."
                headingLevel="h4"
              >
                <ul>
                  <li>
                    If you claimed the business using another email account,
                    please log in using that account.
                  </li>
                  <li>
                    If your business has other qualified owners, please ensure
                    that they have not already claimed the business. Each
                    business can only be claimed once.
                  </li>
                  <li>
                    If none of the above are true, you can contact UCMS support
                    for further assistance.
                  </li>
                </ul>
              </Alert>
            ) : (
              <Alert
                type="error"
                heading="The information you entered does not match SAM.gov."
                headingLevel="h4"
              >
                Log into{' '}
                <a
                  href="https://sam.gov/content/home"
                  target="_blank"
                  title="Open SAM.gov"
                  rel="noreferrer"
                >
                  SAM.gov
                </a>{' '}
                and confirm that ALL of the fields below EXACTLY MATCH what
                you’ve provided below. Also make sure you are manually entering
                these fields; do not cut & paste:
                <ul>
                  <li>
                    Company Unique Entity ID (UEI). If your company has multiple
                    UEIs, please provide the UEI for your main location. The
                    other fields should correspond to the UEI entered.
                  </li>
                  <li>
                    Taxpayer Identification Numbers (TIN). Note that this could
                    be your SSN or your company EIN. Verify with SAM.gov which
                    one you should use.
                    <ul>
                      <li>
                        Make sure to omit any dashes when entering this field.
                      </li>
                      <li>
                        TIN is always a 9-digit number. Note that the IRS
                        website sometimes obscures the last digit from view.
                      </li>
                    </ul>
                  </li>
                  <li>CAGE Code. Must match the account number below.</li>
                  <li>
                    Bank Account Number. This value must be entered{' '}
                    <b>EXACTLY</b> as it was provided to SAM.gov. . If you
                    entered this value into SAM.gov with spaces, dashes, leading
                    zeros, or other characters, you MUST include these when you
                    enter it into Certify. If you have multiple CAGE Codes, you
                    must provide the account number associated with the provided
                    CAGE.
                  </li>
                </ul>
              </Alert>
            )}
            <br />
          </div>
        )}
        <div className="default-btn">
          <div className="usa-button-group-container">
            <ButtonGroup type="default">
              <Button
                role="button"
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                Find
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </>
  )
}

export default ClaimBusinessForm
