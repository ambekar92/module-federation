import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage, Grid, Label, Select, TextInput } from '@trussworks/react-uswds'
import { useEffect } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { formatSSN } from '../helpers'
import ActionButtons from '../shared/ActionButtons'
import ContactInfo from '../shared/ContactInfo'
import GoneByAnotherName from '../shared/GoneByAnotherName'
import OwnershipPercent from '../shared/OwnershipPercent'
import SocialDisadvantages from '../shared/SocialDisadvantages'
import { Owner, OwnershipType } from '../shared/types'
import { defaultValues } from './constants'
import { IndividualFormType, schema } from './schema'

type Props = {
	handleAddOwner: SubmitHandler<any>,
	editedItem: Owner | null
}

const IndividualForm = ({handleAddOwner, editedItem}: Props) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues
  })

  useEffect(() => {
    if (editedItem) {
      methods.reset(editedItem as IndividualFormType)
    }
  }, [editedItem])

  return (
    <>
      <div>
        <Grid row gap='md' >
          <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
            <Label htmlFor='prefix'>Prefix</Label>
            <Controller
              name={'prefix'}
              control={methods.control}
              render={({ field }) =>
                <Select
                  id={'prefix'}
                  value={field.value}
                  name={'prefix'}
                  onChange={field.onChange}
                >
                  <option>--</option>
                  <option value="mr">Mr.</option>
                  <option value="ms">Ms.</option>
                  <option value="mrs">Mrs.</option>
                </Select>
              } />

          </Grid>

          <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 5 }}>
            <Label htmlFor='first_name' requiredMarker={true}>First Name</Label>

            <Controller
              name={'firstName'}
              control={methods.control}
              render={({ field }) =>
                <TextInput className='maxw-full'
                  value={field.value}
                  name={'firstName'}
                  onChange={field.onChange}
                  type='text' id='first_name' placeholder='--'
                  validationStatus = { field.value ? (!methods.formState.errors?.firstName?.message ? 'success' : 'error'): (methods.formState.errors?.firstName?.message ? 'error' : undefined) } />
              } />
            <ErrorMessage>{methods.formState.errors?.firstName?.message}</ErrorMessage>
          </Grid>

          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 5 }}>
            <Label htmlFor='middle_name'>Middle Name</Label>
            <Controller
              name={'middleName'}
              control={methods.control}
              render={({ field }) =>

                <TextInput
                  value={field.value}
                  name={'middleName'}
                  onChange={field.onChange}
                  className='maxw-full' type='text' id='middle_name' placeholder='--' />
              }
            />
          </Grid>
        </Grid>

        <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 10 }}>
            <Label requiredMarker={true} htmlFor='last_name'>Last Name</Label>

            <Controller
              name={'lastName'}
              control={methods.control}
              render={({ field }) =>
                <TextInput
                  value={field.value}
                  name={'lastName'}
                  onChange={field.onChange}
                  className='maxw-full' type='text' id='last_name' placeholder='--'
                  validationStatus = { field.value ? (!methods.formState.errors?.lastName?.message ? 'success' : 'error'): (methods.formState.errors?.lastName?.message ? 'error' : undefined) } />
              }
            />
            <ErrorMessage>{methods.formState.errors?.lastName?.message}</ErrorMessage>
          </Grid>

          <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
            <Label htmlFor={'suffix'}>Suffix</Label>
            <Controller
              name={'suffix'}
              control={methods.control}
              render={({ field }) =>
                <Select className='height-7 radius-lg' id={'suffix'}
                  value={field.value}
                  name={'suffix'}
                  onChange={field.onChange}
                >
                  <option>--</option>
                  <option value="jr">Jr.</option>
                  <option value="sr">Sr.</option>
                  <option value="i">I</option>
                  <option value="ii">II</option>
                  <option value="iii">III</option>
                </Select>
              }
            />

          </Grid>
        </Grid>

        <Grid row className='display-flex flex-column'>
          <FormProvider {...methods}>
            <OwnershipPercent editedItem={editedItem} clearErrors={methods.clearErrors} setError={methods.setError}/>
          </FormProvider>

        </Grid>

        <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 6 }}>
            <Label requiredMarker={true} htmlFor={'USCitizen'}>Are you a legal citizen of the US?</Label>

            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='citizenship_yes'
                type="radio"
                value="true"
                {...methods.register('USCitizen')}
              />
              <Label className="usa-radio__label" htmlFor='citizenship_yes'>
                        Yes
              </Label>
              <input
                className="usa-radio__input"
                id='citizenship_no'
                type="radio"
                value="false"
                {...methods.register('USCitizen')}
              />
              <Label className="usa-radio__label margin-left-2" htmlFor='citizenship_no'>
                        No
              </Label>
            </div>
            <ErrorMessage>{methods.formState.errors?.USCitizen?.message as string}</ErrorMessage>
          </Grid>
          <FormProvider {...methods}>
            <GoneByAnotherName type={OwnershipType.individual} />
          </FormProvider>
        </Grid>

        <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 3 }}>
            <Label requiredMarker={true} htmlFor={'SSN'}>SSN</Label>

            <Controller
              name={'SSN'}
              control={methods.control}
              render={({ field }) =>
                <TextInput
                  className='maxw-full'
                  type='text'
                  id={'SSN'}
                  placeholder='000-00-0000'
                  value={formatSSN(field.value ?? '')}
                  name={'SSN'}
                  onChange={e => field.onChange(formatSSN(e.target.value))}
                  validationStatus = { field.value ? (!methods.formState.errors?.SSN?.message ? 'success' : 'error'): (methods.formState.errors?.SSN?.message ? 'error' : undefined) }
                />
              }
            />
            <ErrorMessage>{methods.formState.errors?.SSN?.message}</ErrorMessage>
          </Grid>

          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 9 }}>
            <Label requiredMarker={true} htmlFor='veteran_status'>Are you a veteran of the US military?</Label>

            <Controller
              name='isVeteran'
              control={methods.control}
              render={({ field }) =>
                <Select className='maxw-full height-7 radius-lg' id='veteran_status'
                  value={field.value ?? ''}
                  name='isVeteran'
                  onChange={field.onChange}
                  validationStatus = { field.value ? (!methods.formState.errors.isVeteran?.message ? 'success' : 'error'): (methods.formState.errors.isVeteran?.message ? 'error' : undefined) }
                >
                  <option value="">--</option>
                  <option value="not_applicable">Not Applicable</option>
                  <option value="veteran">Veteran</option>
                  <option value="service_disabled_veteran">Service-Disabled Veteran</option>
                </Select>
              }
            />
            <ErrorMessage>{methods.formState.errors.isVeteran?.message}</ErrorMessage>
          </Grid>
        </Grid>

        <Grid row className='display-flex flex-column'>
          <Label requiredMarker={true} htmlFor='martial_status'>Marital Status</Label>

          <Controller
            name={'maritalStatus'}
            control={methods.control}
            render={({ field }) =>
              <Select className='height-7 radius-lg maxw-full' id='martial_status'
                value={field.value ?? ''}
                name={'maritalStatus'}
                onChange={field.onChange}
                validationStatus = { field.value ? (!methods.formState.errors?.maritalStatus?.message ? 'success' : 'error'): (methods.formState.errors?.maritalStatus?.message ? 'error' : undefined) }
              >
                <option>--</option>
                <option value="married_owner">Married - Spouse is an owner, officer, board member, partner, etc. of the applicant business</option>
                <option value="married_not_owner">Married - Spouse is NOT an owner, officer, board member, partner, etc. of the applicant business</option>
                <option value="unmarried">Unmarried</option>
                <option value="separated">Legally Separated</option>
              </Select>
            }
          />
          <ErrorMessage>{methods.formState.errors?.maritalStatus?.message}</ErrorMessage>
        </Grid>

        <Grid row gap='md'>
          <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
            <Label requiredMarker={true} htmlFor='spouse_owner'>
                    Gender
            </Label>

            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='gender_m'
                type="radio"
                value="m"
                {...methods.register('gender')}
              />
              <Label className="usa-radio__label" htmlFor='gender_m'>
                        M
              </Label>
              <input
                className="usa-radio__input"
                id='gender_f'
                type="radio"
                value="f"
                {...methods.register('gender')}
              />
              <Label className="usa-radio__label  margin-left-2" htmlFor='gender_f'>
                        F
              </Label>
              <input
                className="usa-radio__input"
                id='gender_x'
                type="radio"
                value="x"
                {...methods.register('gender')}
              />
              <Label className="usa-radio__label  margin-left-2" htmlFor='gender_x'>
                        X
              </Label>
            </div>
            <ErrorMessage>{methods.formState.errors?.gender?.message}</ErrorMessage>
          </Grid>

          <Grid mobile={{ col: 12 }} tablet={{ col: 6 }}>
            <Label requiredMarker={true} htmlFor='spouse_owner'>
                    Is your spouse an owner, officer, board member, partner, etc. of the applicant business?
            </Label>

            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='spouse_owner_yes'
                type="radio"
                value='yes'
                {...methods.register('isSpouseAnOwner')}
              />
              <Label className="usa-radio__label" htmlFor='spouse_owner_yes'>
                        Yes
              </Label>
              <input
                className="usa-radio__input"
                id='spouse_owner_no'
                type="radio"
                value='no'
                {...methods.register('isSpouseAnOwner')}
              />
              <Label className="usa-radio__label margin-left-2" htmlFor='spouse_owner_no'>
                        No
              </Label>
            </div>
            <ErrorMessage>{methods.formState.errors?.isSpouseAnOwner?.message}</ErrorMessage>
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <ContactInfo />
          <SocialDisadvantages />
          <ActionButtons handleAddOwner={handleAddOwner}/>
        </FormProvider></div>

    </>
  )
}

export default IndividualForm
