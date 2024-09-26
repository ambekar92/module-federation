'use client'
import { Show } from '@/app/shared/components/Show'
import { Drawer, styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { Alert, FormGroup, Icon, Label, Radio, TextInput } from '@trussworks/react-uswds'
import React, { useCallback, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ShouldIApplyFormType } from '../schema'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} className='margin-left-1' style={{cursor: 'pointer'}} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#1a4480',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: '.5rem',
  },
}));

const EligibilityForm = () => {
  const {control, watch, setValue} = useFormContext<ShouldIApplyFormType>();
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const ownBusinessInUS = watch('eligibility.ownBusinessInUS');
  const businessRegisteredInSAM = watch('eligibility.businessRegisteredInSAM');
  const underFinancialLimits = watch('eligibility.underFinancialLimits');
  const provideAnnualFinancialStatement = watch('eligibility.provideAnnualFinancialStatement');
  const suspended = watch('eligibility.suspended');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('should-i-apply') || '{}')
    if (data.eligibility) {
      setValue('eligibility', data.eligibility)
    }
  }, [setValue])

  const updateLocalStorage = useCallback((name: string, value: any) => {
    const data = JSON.parse(localStorage.getItem('should-i-apply') || '{}')
    if (!data.eligibility) {
      data.eligibility = {}
    }
    data.eligibility[name] = value
    localStorage.setItem('should-i-apply', JSON.stringify(data))
  }, [])

  const createChangeHandler = (name: string, onChange: (value: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    onChange(value)
    updateLocalStorage(name, value)
  }

  function toggleDrawer(open: boolean) {
    setDrawerOpen(open)
  }

  return (
    <>
      <Drawer anchor='right'  open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <div style={{width: '400px', padding: '2rem'}}>
          <span onClick={() => toggleDrawer(false)} style={{float: 'right', cursor: 'pointer'}}><Icon.Close></Icon.Close></span>
          <h2>Financial Limits</h2>
          <p>
						Financial Limitations under the 8(a) program are restrictions in the following areas, personal income net worth, and total assets.
          </p>
          <hr />
          <h4>Examples</h4>
          <p>Annual personal income: $400,000 per year</p>
          <p>Net worth: $850,000</p>
          <ul>
            <li>
                (Value of everything you owe: $850,000 not including the value of your home, business, or retirement accounts)
            </li>
          </ul>
          <p>Total assets: $6.5 million (Not including retirement accounts).</p>
        </div>
      </Drawer>
      <Controller control={control} name='eligibility' render={() => (
        <>
          <Controller control={control} name="eligibility.ownBusinessInUS" render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="ownBusinessInUS">1. Do you own a small business located in the U.S.?</Label>
              <Radio
                checked={field.value === 'yes'}
                value='yes' onChange={createChangeHandler('ownBusinessInUS', field.onChange)} name="ownBusinessInUS" id='ownBusinessInUS-yes' label='Yes'></Radio>
              <Radio
                checked={field.value === 'no'}
                value='no' onChange={createChangeHandler('ownBusinessInUS', field.onChange)} name="ownBusinessInUS" id='ownBusinessInUS-no' label='No'></Radio>

              <Show>
                <Show.When isTrue={ownBusinessInUS === 'no'}>
                  <Alert headingLevel='h6' type='warning'>
                    <span>
                      You must own and control a small business in the U.S. to participate in the SBA Certification Program.
                    </span>
                  </Alert>
                </Show.When>
              </Show>
            </FormGroup>)} />

          <Controller name='eligibility.businessLocation' control={control} render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="employeesResideInHubZone">2. Do you believe your principal office is located in a HUBZone? </Label>
              <Radio onChange={createChangeHandler('businessLocation', field.onChange)} name="businessLocation" id='businessLocation-yes'
                value={'yes'}
                label='Yes' checked={field.value === 'yes'}></Radio>
              <Radio
                value={'no'}
                onChange={createChangeHandler('businessLocation', field.onChange)} name="businessLocation" id='businessLocation-no' label='No' checked={field.value === 'no'}></Radio>
            </FormGroup>)} />

          <Controller name='eligibility.employeesResideInHubZone' control={control} render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="employeesResideInHubZone">3. Do you believe that 35% of your employees reside in HUBZone? </Label>
              <Radio onChange={createChangeHandler('employeesResideInHubZone', field.onChange)} name="employeesResideInHubZone" id='employeesResideInHubZone-yes'
                value={'yes'}
                label='Yes' checked={field.value === 'yes'}></Radio>
              <Radio
                value={'no'}
                onChange={createChangeHandler('employeesResideInHubZone', field.onChange)} name="employeesResideInHubZone" id='employeesResideInHubZone-no' label='No' checked={field.value === 'no'}></Radio>
            </FormGroup>)} />

          <Controller name='eligibility.businessRegisteredInSAM' control={control} render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="USCitizen">4. Is your business registered at SAM.gov?</Label>
              <Radio
                checked={field.value === 'yes'}
                value='yes' onChange={createChangeHandler('businessRegisteredInSAM', field.onChange)} name="businessRegisteredInSAM" id='businessRegisteredInSAM-yes' label='Yes'></Radio>
              <Radio
                checked={field.value === 'no'}
                value='no' onChange={createChangeHandler('businessRegisteredInSAM', field.onChange)} name="businessRegisteredInSAM" id='businessRegisteredInSAM-no' label='No'></Radio>

              <Show>
                <Show.When isTrue={businessRegisteredInSAM === 'no'}>
                  <Alert headingLevel='h6' type='warning'>
                    <span>
                      Please ensure your SAM.gov account is active and current before applying for the SBA Certification Program.
                    </span>
                  </Alert>
                </Show.When>
              </Show>
            </FormGroup>
          )} />

          <Controller control={control} name='eligibility.underFinancialLimits' render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="underFinancialLimits">5. Are you under financial limits?
                <LightTooltip title='Click here to see more information on financial limits'  placement='top' >
                  <span onClick={() => toggleDrawer(true)}>
                    <Icon.Info  className="text-primary-dark"></Icon.Info>
                  </span>
                </LightTooltip>
              </Label>

              <Radio
                checked={field.value === 'yes'}
                value='yes' onChange={createChangeHandler('underFinancialLimits', field.onChange)} name="underFinancialLimits" id='underFinancialLimits-yes' label='Yes'></Radio>
              <Radio
                checked={field.value === 'no'}
                value='no' onChange={createChangeHandler('underFinancialLimits', field.onChange)} name="underFinancialLimits" id='underFinancialLimits-no' label='No'></Radio>

              <Show>
                <Show.When isTrue={underFinancialLimits === 'no'}>
                  <Alert headingLevel='h6' type='warning'>
                    <span>
                      You must be economically disadvantaged to participate in the 8(a) Business Development Program/SBA Program.
                    </span>
                  </Alert>
                </Show.When>
              </Show>
            </FormGroup>
          )}  />

          <Controller control={control} name='eligibility.provideAnnualFinancialStatement' render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="provideAnnualFinancialStatement">6. Can you provide annual financial statements (Balance Sheet and Income Statement)?</Label>
              <Radio
                checked={field.value === 'yes'}
                value='yes' onChange={createChangeHandler('provideAnnualFinancialStatement', field.onChange)} name="provideAnnualFinancialStatement" id='provideAnnualFinancialStatement-yes' label='Yes'></Radio>
              <Radio
                checked={field.value === 'no'}
                value='no' onChange={createChangeHandler('provideAnnualFinancialStatement', field.onChange)} name="provideAnnualFinancialStatement" id='provideAnnualFinancialStatement-no' label='No'></Radio>

              <Show>
                <Show.When isTrue={provideAnnualFinancialStatement === 'no'}>
                  <Alert headingLevel='h6' type='warning'>
                    <span>
                      SBA needs to review reliable financial statements to determine if your business is ready for the SBA Certification Program.
                    </span>
                  </Alert>
                </Show.When>
              </Show>
            </FormGroup>
          )}  />

          <Controller control={control} name='eligibility.suspended' render={({ field }) => (
            <FormGroup className="bg-white radius-sm padding-4">
              <Label style={{maxWidth: '100%'}} htmlFor="suspended">7. Do you affirm that neither this business, nor any of its owners, have ever been debarred or suspended by any federal entity?</Label>
              <Radio
                checked={field.value === 'yes'}
                value='yes' onChange={createChangeHandler('suspended', field.onChange)} name="suspended" id='suspended-yes' label='Yes'></Radio>
              <Radio
                checked={field.value === 'no'}
                value='no' onChange={createChangeHandler('suspended', field.onChange)} name="suspended" id='suspended-no' label='No'></Radio>

              <Show>
                <Show.When isTrue={suspended === 'no'}>
                  <Alert headingLevel='h6' type='warning'>
                    <span>
                      In order to participate in the SBA Certification Program, the owner(s) of the business must not have been debarred or suspended by a federal entity.
                    </span>
                  </Alert>
                </Show.When>
              </Show>
            </FormGroup>
          )}  />
        </>
      )} />
    </>
  )
}

export default EligibilityForm
