import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Grid,
  GridContainer,
  TextInput,
  ButtonGroup,
} from '@trussworks/react-uswds'
import { Labeled, SelectLabel } from './Labeled'
import styles from './EditEntityProfileInfo.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { EntityProfileSchema, defaultValues } from './utils/constants'
import { PrefixesTypes, SuffixesTypes, StatesTypes } from './utils/constants'

interface EntityProfileProps {
  onInformationSaved: (saved: boolean) => void
  onEditProfile: (person: any) => void
}

const EditInfo: React.FC<EntityProfileProps> = ({
  onInformationSaved,
  onEditProfile,
}) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<z.infer<typeof EntityProfileSchema>>({
    mode: 'all',
    resolver: zodResolver(EntityProfileSchema),
  })
  const getFieldStyle = (errors: Record<string, any>, fieldName: string) => {
    return {
      height: '60px',
      borderColor: errors[fieldName] ? '#a30000' : '#25bb73',
    }
  }

  const max = 100
  const randomNumber = Math.floor(Math.random() * (max - 10)) + 11

  const handleCancel = () => {
    reset(defaultValues)
  }

  const onSubmit = (data: z.infer<typeof EntityProfileSchema>) => {
    onInformationSaved(true)

    const updatedEntityProfileUser = [
      data.prefixes,
      data.firstName,
      data.lastName,
      data.suffixes ? data.suffixes : '',
      data.email,
      data.addressOne,
      data.addressTwo ? data.addressTwo : '',
      data.city,
      data.state,
      data.zipCode,
      data.phoneNumber,
    ]

    const structuredEntityProfileUser = {
      id: randomNumber,
      name:
        updatedEntityProfileUser[0] +
        ' ' +
        updatedEntityProfileUser[1] +
        ' ' +
        updatedEntityProfileUser[2] +
        ' ' +
        updatedEntityProfileUser[3],
      email: updatedEntityProfileUser[4],
      firstLineAddress: updatedEntityProfileUser[5],
      secondLineAddress:
        updatedEntityProfileUser[6] +
        ' ' +
        updatedEntityProfileUser[7] +
        ' ' +
        updatedEntityProfileUser[8] +
        ' ' +
        updatedEntityProfileUser[9],
      phoneNumber: updatedEntityProfileUser[10],
    }
    onEditProfile(structuredEntityProfileUser)
    reset(defaultValues)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          <GridContainer className="padding-x-0" containerSize="widescreen">
            <GridContainer
              containerSize="widescreen"
              className={'width-full padding-y-2 margin-top-2 bg-base-lightest'}
            >
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  paddingBottom: '.5rem',
                }}
              >
                ENTITY INFO
              </p>
              <div className="padding-bottom-3">
                <Labeled label={'Name'} id={'Name'} />
                <TextInput
                  className={`${styles['usa-textarea']} width-full maxw-full input_text margin-top-neg-2`}
                  id="EntityName"
                  name="EntityName"
                  type="text"
                  value="[Entity Name]"
                  disabled
                ></TextInput>
              </div>
              <div className="padding-bottom-3">
                <Labeled label={'Type'} id={'Type'} />
                <TextInput
                  className={`${styles['usa-textarea']} width-full maxw-full input_text margin-top-neg-2`}
                  id="TypeName"
                  name="TypeName"
                  type="text"
                  value="[Entity Type]"
                  disabled
                ></TextInput>
              </div>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  paddingBottom: '.5rem',
                }}
              >
                CONTACT
              </p>
              <Grid row>
                <Grid className="flex-1 padding-right-2">
                  <SelectLabel label={'Prefixes'} id={'prefixes'} />
                  <Controller
                    control={control}
                    {...register('prefixes')}
                    render={({ field }) => (
                      <select
                        name="prefixes"
                        id="prefixes"
                        className="width-full maxw-full padding-top-3"
                        style={getFieldStyle(errors, 'Prefixes')}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">--</option>
                        {Object.values(PrefixesTypes).map((type, idx) => (
                          <option
                            value={type}
                            onChange={field.onChange}
                            key={idx}
                          >
                            {' '}
                            {type}{' '}
                          </option>
                        ))}{' '}
                      </select>
                    )}
                  />
                  {errors && errors.prefixes && (
                    <div
                      className={
                        styles['error_text'] + ' usa-input-helper-text'
                      }
                    >
                      <span
                        className="error-message"
                        id="agreement-signature-input-error-message"
                      >
                        {errors.prefixes.message}
                      </span>
                    </div>
                  )}
                </Grid>
                <Grid className="flex-5">
                  <Labeled label={'First Name'} id={'First Name'} />
                  <Controller
                    control={control}
                    {...register('firstName')}
                    render={({ field: { ref, ...field } }) => (
                      <>
                        <TextInput
                          className={'width-full maxw-full input_text margin-top-neg-2'}
                          style={{ height: '60px' }}
                          id="First-Name"
                          type="text"
                          inputRef={ref}
                          {...field}
                          validationStatus={
                            errors.firstName?.message ? 'error' : 'success'
                          }
                        />
                        {errors && errors.firstName && (
                          <div
                            className={
                              styles['error_text'] + ' usa-input-helper-text'
                            }
                          >
                            <span
                              className="error-message"
                              id="agreement-signature-input-error-message"
                            >
                              {errors.firstName.message}
                            </span>
                          </div>
                        )}{' '}
                      </>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="flex-1 padding-top-3">
                <Labeled label={'Middle Name'} id={'Middle Name'} />
                <Controller
                  control={control}
                  {...register('middleName')}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <TextInput
                        className={'width-full maxw-full input_text margin-top-neg-2'}
                        style={{ height: '60px' }}
                        id="middleName"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={
                          errors.middleName?.message ? 'error' : 'success'
                        }
                      />
                      {errors && errors.middleName && (
                        <div
                          className={
                            styles['error_text'] + ' usa-input-helper-text'
                          }
                        >
                          <span
                            className="error-message"
                            id="agreement-signature-input-error-message"
                          >
                            {errors.middleName.message}
                          </span>{' '}
                        </div>
                      )}{' '}
                    </>
                  )}
                />
              </Grid>
              <Grid
                row
                className="display-flex flex-row flex-justify padding-top-3"
                gap={2}
              >
                <Grid className="flex-8">
                  <Labeled label={'Last Name'} id={'Last Name'} />
                  <Controller
                    control={control}
                    {...register('lastName')}
                    render={({ field: { ref, ...field } }) => (
                      <>
                        <TextInput
                          className={'width-full maxw-full input_text margin-top-neg-2'}
                          style={{ height: '60px' }}
                          id="Last-Name"
                          type="text"
                          inputRef={ref}
                          {...field}
                          validationStatus={
                            errors.lastName?.message ? 'error' : 'success'
                          }
                        />
                        {errors && errors.lastName && (
                          <div
                            className={
                              styles['error_text'] + ' usa-input-helper-text'
                            }
                          >
                            <span
                              className="error-message"
                              id="agreement-signature-input-error-message"
                            >
                              {errors.lastName.message}{' '}
                            </span>{' '}
                          </div>
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid className="flex-2">
                  <SelectLabel label={'Suffixes'} id={'suffixes'} />
                  <Controller
                    control={control}
                    {...register('suffixes')}
                    render={({ field }) => (
                      <select
                        name="suffixes"
                        id="suffixes"
                        className="display-flex flex-row flex-justify padding-top-3 width-full maxw-full"
                        style={getFieldStyle(errors, 'suffixes')}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="--"></option>
                        {Object.values(SuffixesTypes).map((type, idx) => (
                          <option
                            value={type}
                            onChange={field.onChange}
                            key={idx}
                          >
                            {type}
                          </option>
                        ))}{' '}
                      </select>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="padding-top-3">
                <Labeled label={'Email Address'} id={'email'} />
                <Controller
                  control={control}
                  {...register('email')}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <TextInput
                        className={'width-full maxw-full input_text margin-top-neg-2'}
                        style={{ height: '60px' }}
                        id="email"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={
                          errors.email?.message ? 'error' : 'success'
                        }
                      />
                      {errors && errors.email && (
                        <div
                          className={
                            styles['error_text'] + ' usa-input-helper-text'
                          }
                        >
                          <span
                            className="error-message"
                            id="agreement-signature-input-error-message"
                          >
                            {errors.email.message}
                          </span>{' '}
                        </div>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid className="padding-top-3">
                <Labeled label={'Phone Number'} id={'phone'} />
                <Controller
                  control={control}
                  {...register('phoneNumber')}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <TextInput
                        className={'width-full maxw-full input_text margin-top-neg-2'}
                        style={{ height: '60px' }}
                        id="phoneNumber"
                        type="number"
                        inputRef={ref}
                        {...field}
                        validationStatus={
                          errors.phoneNumber?.message ? 'error' : 'success'
                        }
                      />
                      {errors && errors.phoneNumber && (
                        <div
                          className={
                            styles['error_text'] + ' usa-input-helper-text'
                          }
                        >
                          <span
                            className="error-message"
                            id="agreement-signature-input-error-message"
                          >
                            {errors.phoneNumber.message}{' '}
                          </span>{' '}
                        </div>
                      )}{' '}
                    </>
                  )}
                />
              </Grid>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  paddingBottom: '.5rem',
                  paddingTop: '1.2rem',
                }}
              >
                MAILING ADDRESS
              </p>
              <Grid className="flex-5">
                <Labeled label={'Address 1'} id={'AddressOne'} />
                <Controller
                  control={control}
                  {...register('addressOne')}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <TextInput
                        className={'width-full maxw-full input_text margin-top-neg-2'}
                        style={{ height: '60px' }}
                        id="AddressOne"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={
                          errors.addressOne?.message ? 'error' : 'success'
                        }
                      />
                      {errors && errors.addressOne && (
                        <div
                          className={
                            styles['error_text'] + ' usa-input-helper-text'
                          }
                        >
                          <span
                            className="error-message"
                            id="agreement-signature-input-error-message"
                          >
                            {errors.addressOne.message}
                          </span>
                        </div>
                      )}{' '}
                    </>
                  )}
                />
              </Grid>
              <Grid className="flex-5 padding-top-3">
                <Labeled label={'Address 2'} id={'AddressTwo'} />
                <Controller
                  control={control}
                  {...register('addressTwo')}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <TextInput
                        className={'width-full maxw-full input_text margin-top-neg-2'}
                        style={{ height: '60px' }}
                        id="AddressTwo"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={
                          errors.addressTwo?.message ? 'error' : 'success'
                        }
                      />
                      {errors && errors.addressTwo && (
                        <div
                          className={
                            styles['error_text'] + ' usa-input-helper-text'
                          }
                        >
                          <span
                            className="error-message"
                            id="agreement-signature-input-error-message"
                          >
                            {' '}
                            {errors.addressTwo.message}
                          </span>
                        </div>
                      )}{' '}
                    </>
                  )}
                />
              </Grid>
              <Grid row>
                <Grid className="flex-4 padding-top-3">
                  <Labeled label={'City'} id={'City'} />
                  <Controller
                    control={control}
                    {...register('city')}
                    render={({ field: { ref, ...field } }) => (
                      <>
                        <TextInput
                          className={'width-full maxw-full input_text margin-top-neg-2'}
                          style={{ height: '60px' }}
                          id="City"
                          type="text"
                          inputRef={ref}
                          {...field}
                          validationStatus={
                            errors.city?.message ? 'error' : 'success'
                          }
                        />
                        {errors && errors.city && (
                          <div
                            className={
                              styles['error_text'] + ' usa-input-helper-text'
                            }
                          >
                            <span
                              className="error-message"
                              id="agreement-signature-input-error-message"
                            >
                              {' '}
                              {errors.city.message}
                            </span>
                          </div>
                        )}{' '}
                      </>
                    )}
                  />
                </Grid>
                <Grid className="flex-4 padding-right-2 padding-top-3 padding-x-2">
                  <SelectLabel label={'State'} id={'state'} />
                  <Controller
                    control={control}
                    {...register('state')}
                    render={({ field }) => (
                      <select
                        name="state"
                        id="state"
                        className="width-full maxw-full padding-top-3"
                        style={getFieldStyle(errors, 'State')}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="">--</option>
                        {Object.values(StatesTypes).map((type, idx) => (
                          <option
                            value={type}
                            onChange={field.onChange}
                            key={idx}
                          >
                            {type}
                          </option>
                        ))}{' '}
                      </select>
                    )}
                  />
                  {errors && errors.state && (
                    <div
                      className={
                        styles['error_text'] + ' usa-input-helper-text'
                      }
                    >
                      <span
                        className="error-message"
                        id="agreement-signature-input-error-message"
                      >
                        {errors.state.message}
                      </span>
                    </div>
                  )}
                </Grid>
                <Grid className="flex-4 padding-top-3">
                  {' '}
                  <Labeled label={'Zip Code'} id={'zipCode'} />
                  <Controller
                    control={control}
                    {...register('zipCode')}
                    render={({ field: { ref, ...field } }) => (
                      <>
                        <TextInput
                          className={'width-full maxw-full input_text margin-top-neg-2'}
                          style={{ height: '60px' }}
                          id="zipCode"
                          type="text"
                          inputRef={ref}
                          {...field}
                          validationStatus={
                            errors.zipCode?.message ? 'error' : 'success'
                          }
                        />
                        {errors && errors.zipCode && (
                          <div
                            className={
                              styles['error_text'] + ' usa-input-helper-text'
                            }
                          >
                            <span
                              className="error-message"
                              id="agreement-signature-input-error-message"
                            >
                              {' '}
                              {errors.zipCode.message}
                            </span>
                          </div>
                        )}{' '}
                      </>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid row className="padding-top-2">
                <ButtonGroup type="default">
                  <Button type="submit" disabled={!isValid}>
                    Save
                  </Button>
                  <div className="margin-left-2">
                    <Button type="button" unstyled onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </ButtonGroup>
              </Grid>
            </GridContainer>
          </GridContainer>
        }{' '}
      </form>
    </>
  )
}

export default EditInfo
