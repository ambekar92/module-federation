import {
  ErrorMessage,
  Grid,
  Label,
  TextInput,
  Select,
} from '@trussworks/react-uswds'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { EntityFormType } from '../schema'
import { formatPhoneNumber } from '../helpers'
import { USA_STATES } from '@/app/constants/usa-states'

const ContactLocation = () => {
  const { control } = useFormContext<EntityFormType>()

  return (
    <>
      <h3 className="margin-bottom-0 padding-bottom-2">Contact Location</h3>
      <Grid row gap="md">
        <Grid className="display-flex flex-column" row col={12}>
          <Label
            requiredMarker={true}
            className="margin-top-0"
            htmlFor="mailing_address"
          >
            Street Address
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextInput
                className="maxw-full"
                type="text"
                id="mailing_address"
                placeholder="--"
                name={'contactLocation.mailingAddress'}
                value={field.value}
                onChange={field.onChange}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactLocation.mailingAddress')
                      .error?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactLocation.mailingAddress')
                      .error?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactLocation.mailingAddress'}
            control={control}
          />
          <ErrorMessage>
            {
              control.getFieldState('contactLocation.mailingAddress').error
                ?.message
            }
          </ErrorMessage>
        </Grid>

        <Grid className="display-flex flex-column" row col={12}>
          <Label className="margin-top-0" htmlFor="mailing_address2">
            Street address line 2
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextInput
                className="maxw-full"
                type="text"
                id="mailing_address2"
                placeholder="--"
                name={'contactLocation.mailingAddress2'}
                value={field.value}
                onChange={field.onChange}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactLocation.mailingAddress2')
                      .error?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactLocation.mailingAddress2')
                      .error?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactLocation.mailingAddress2'}
            control={control}
          />
          <ErrorMessage>
            {
              control.getFieldState('contactLocation.mailingAddress').error
                ?.message
            }
          </ErrorMessage>
        </Grid>

        <Grid
          className="display-flex flex-column"
          col={12}
          tablet={{ col: 6 }}
          desktop={{ col: 4 }}
        >
          <Label requiredMarker={true} className="margin-top-0" htmlFor="city">
            City
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextInput
                className="maxw-full"
                type="text"
                id="city"
                placeholder="--"
                name={'contactLocation.city'}
                value={field.value}
                onChange={field.onChange}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactLocation.city').error
                      ?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactLocation.city').error
                      ?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactLocation.city'}
            control={control}
          />
          <ErrorMessage>
            {control.getFieldState('contactLocation.city').error?.message}
          </ErrorMessage>
        </Grid>

        <Grid
          className="display-flex flex-column"
          col={12}
          tablet={{ col: 6 }}
          desktop={{ col: 4 }}
        >
          <Label requiredMarker={true} className="margin-top-0" htmlFor="state">
            State, territory, or military post
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <Select
                className="maxw-full"
                id={'state'}
                value={field.value}
                name={'state'}
                onChange={field.onChange}
              >
                {USA_STATES.map((state, index) => (
                  <option key={index} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </Select>
            )}
            name={'contactLocation.state'}
            control={control}
          />
          <ErrorMessage>
            {control.getFieldState('contactLocation.state').error?.message}
          </ErrorMessage>
        </Grid>

        <Grid
          className="display-flex flex-column"
          col={12}
          tablet={{ col: 6 }}
          desktop={{ col: 4 }}
        >
          <Label requiredMarker={true} className="margin-top-0" htmlFor="zip">
            ZIP Code
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextInput
                className="maxw-full"
                type="text"
                id="zip"
                placeholder="--"
                name={'contactLocation.zip'}
                value={field.value}
                onChange={field.onChange}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactLocation.zip').error
                      ?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactLocation.zip').error
                      ?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactLocation.zip'}
            control={control}
          />
          <ErrorMessage>
            {control.getFieldState('contactLocation.zip').error?.message}
          </ErrorMessage>
        </Grid>

        <Grid className="display-flex flex-column" col={12}>
          <Label className="margin-top-0" htmlFor="urbanization">
            Urbanization (Puerto Rico only)
          </Label>

          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextInput
                className="maxw-full"
                type="text"
                id="urbanization"
                placeholder="--"
                name={'contactLocation.urbanization'}
                value={field.value}
                onChange={field.onChange}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactLocation.urbanization')
                      .error?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactLocation.urbanization')
                      .error?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactLocation.urbanization'}
            control={control}
          />
          <ErrorMessage>
            {
              control.getFieldState('contactLocation.zurbanizationip').error
                ?.message
            }
          </ErrorMessage>
        </Grid>

        {/* <Grid row gap="md">
        <Grid
          className="display-flex flex-column"
          mobile={{ col: 12 }}
          tablet={{ col: 12 }}
        >
          <Label requiredMarker={true} htmlFor="phone_number">
            Phone Number
          </Label>

          <Controller
            render={({ field }) => (
              <TextInput
                maxLength={12}
                className="maxw-full"
                type="text"
                id="phone_number"
                placeholder="000-000-0000"
                value={formatPhoneNumber(field.value)}
                onChange={(e) =>
                  field.onChange(formatPhoneNumber(e.target.value))
                }
                name={'contactInfo.phoneNumber'}
                validationStatus={
                  field.value
                    ? !control.getFieldState('contactInfo.phoneNumber').error
                        ?.message
                      ? 'success'
                      : 'error'
                    : control.getFieldState('contactInfo.phoneNumber').error
                          ?.message
                      ? 'error'
                      : undefined
                }
              />
            )}
            name={'contactInfo.phoneNumber'}
            control={control}
          />
          <ErrorMessage>
            {control.getFieldState('contactInfo.phoneNumber').error?.message}
          </ErrorMessage>
        </Grid>
      </Grid> */}
      </Grid>
    </>
  )
}

export default ContactLocation
