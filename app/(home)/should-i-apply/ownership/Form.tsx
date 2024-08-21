'use client'
import {
  Alert,
  ErrorMessage,
  FormGroup,
  Icon,
  Label,
  Radio,
  Select,
} from '@trussworks/react-uswds'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ShouldIApplyFormType } from '../schema'

export default function OwnershipForm() {
  const { watch, control, setValue } = useFormContext<ShouldIApplyFormType>()

  const usC = watch('ownership.USCitizen')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('should-i-apply') || '{}')
    if (data.ownership) {
      setValue('ownership', data.ownership)
    }
  }, [])

  return (
    <Controller
      control={control}
      name="ownership"
      render={() => (
        <>
          <Controller
            control={control}
            name="ownership.ownOver50Percent"
            render={({ field }) => (
              <FormGroup className="bg-white radius-sm padding-4">
                <Label htmlFor="ownOver50Percent">
                  Do you own 51% or more of your business?
                </Label>
                <Radio
                  checked={field.value === 'yes'}
                  value="yes"
                  onChange={field.onChange}
                  name="ownOver50Percent"
                  id="ownOver50Percent-yes"
                  label="Yes"
                ></Radio>
                <Radio
                  value="no"
                  checked={field.value === 'no'}
                  onChange={field.onChange}
                  name="ownOver50Percent"
                  id="ownOver50Percent-no"
                  label="No"
                ></Radio>
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="ownership.gender"
            render={({ field }) => (
              <FormGroup className="bg-white radius-sm padding-4">
                <Label htmlFor="gender">Sex</Label>
                <Select
                  name="gender"
                  id="gender"
                  data-testid="testid-gender-select-should-i-apply"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <option value="">--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormGroup>
            )}
          />

          <Controller
            name="ownership.socialDisadvantage"
            control={control}
            render={({ field }) => (
              <FormGroup className="bg-white radius-sm padding-4">
                <Label htmlFor="socialDisadvantage">
                  Are you claiming Social Disadvantage?{' '}
                  <Icon.Info className="text-primary-dark"></Icon.Info>
                </Label>
                <Radio
                  onChange={field.onChange}
                  name="socialDisadvantage"
                  id="socialDisadvantage-yes"
                  value={'yes'}
                  label="Yes"
                  checked={field.value === 'yes'}
                ></Radio>
                <Radio
                  value={'no'}
                  onChange={field.onChange}
                  name="socialDisadvantage"
                  id="socialDisadvantage-no"
                  label="No"
                  checked={field.value === 'no'}
                ></Radio>
              </FormGroup>
            )}
          />

          <Controller
            name="ownership.USCitizen"
            control={control}
            render={({ field }) => (
              <FormGroup className="bg-white radius-sm padding-4">
                <Label htmlFor="USCitizen">US Citizen</Label>
                <Select
                  name="USCitizen"
                  id="USCitizen"
                  data-testid="testid-us-citizen-select-should-i-apply"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option>--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </FormGroup>
            )}
          />

          <Controller
            control={control}
            name="ownership.veteran"
            render={({ field }) => (
              <FormGroup className="bg-white radius-sm padding-4">
                <Label htmlFor="veteran">Veteran</Label>
                <Select
                  name="veteran"
                  id="veteran"
                  data-testid="testid-veteran-select-should-i-apply"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <option>--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </FormGroup>
            )}
          />
          {usC === 'no' && (
            <Alert type="warning" heading="Sorry" headingLevel="h1">
              <p>
                Based on your responses&apos; it doesn&apos;t look like you are
                eligible for SBA Certification Programs.
              </p>
            </Alert>
          )}
        </>
      )}
    />
  )
}
