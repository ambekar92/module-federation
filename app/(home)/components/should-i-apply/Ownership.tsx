'use client'
import ProgramCard from '@/app/shared/components/ownership/ProgramCard'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select, { MultiValue } from 'react-select'
import { z } from 'zod'
import Styles from './ShoudIApplyForm.module.scss'
import { checkIfUSAddress } from './utils/helpers'
import { OwnershipSchema } from './utils/schema'
import { ProgramOption, SelectOption, SocialDisadvantagesData, programOptions } from './utils/types'
import {
  SBA_LOGO_ONE_URL
} from '../../../constants/image'

type Inputs = z.infer<typeof OwnershipSchema>

const Ownership = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
  const [ displayDisadvantageError, setDisplayDisadvantageError] = useState<boolean>()
  const [ displayPrograms, setDisplayPrograms ] = useState<boolean>()
  const [filteredEligiblePrograms, setFilteredEligiblePrograms] = useState<ProgramOption[]>([]);

  const {
    control,
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(OwnershipSchema),
    defaultValues: {
      socialDisadvantages: [],
    	gender: undefined,
    	ownershipPercentage: undefined,
    	veteran: undefined,
      businessLocation: undefined
    }
  })

  const socialDisadvantages = watch('socialDisadvantages');
  const usCitizen = watch('usCitizen');
  const businessLocation = watch('businessLocation');

  const handleSelectChange = (newValue: MultiValue<SelectOption>) => {
    setSelectedOptions([...newValue])
    const values = newValue.map((option) => option.value)
    setValue('socialDisadvantages', values, { shouldValidate: true })
  }

  const disadvantageOptions: SelectOption[] = SocialDisadvantagesData.map((disadvantage) => ({
    value: disadvantage.value,
    label: disadvantage.label
  }))

  useEffect(() => {
    if (usCitizen === 'Yes' && businessLocation) {
      if(checkIfUSAddress(businessLocation)) {
        const programs = programOptions.filter(program =>
          program.disadvantages.some(disadvantage =>
            socialDisadvantages.includes(disadvantage)
          )
        );
        setFilteredEligiblePrograms(programs);
      }
    } else {
      setFilteredEligiblePrograms([]);
    }
  }, [usCitizen, businessLocation, socialDisadvantages]);

  const handleSubmit = async () => {
    await trigger().then(
      (isValid) => {
        const userData = getValues();

        if(userData.socialDisadvantages.length === 0) {
          setDisplayDisadvantageError(true)
        } else if(isValid) {
          if(userData.veteran === 'Yes') {
            setValue('socialDisadvantages', [...userData.socialDisadvantages, 'veteran'], { shouldValidate: true })
          } else {
            setValue('socialDisadvantages', userData.socialDisadvantages.filter(item => item !== 'veteran'), { shouldValidate: true })
          }
          setDisplayPrograms(true);
        }
      }
    )
  }
  return (
    <GridContainer containerSize='widescreen'>
      <header className={`${Styles.header}`}>
        <img className="height-8 margin-bottom-1" alt='SBA Logo Icon' src={SBA_LOGO_ONE_URL} />
      </header>

      <h1 className='font-sans-3xl'>Should I Apply?</h1>
      <p>Provide information regarding the ownership of your business.  Ensure that you accurately fill out all relevant fields.</p>
      <p className={Styles.italic}>NOTE: Total ownership cannot exceed 100%</p>

      <section>
        <h2 className={Styles.header_2}>OWNER INFORMATION</h2>
        <p>Provide information regarding the ownership of your business. Ensure that you accurately fill out all relevant fields.</p>

        <form className='ownership-form'>
          <Grid row gap={4}>
            <Grid tablet={{col: true}}>
              <Label htmlFor="gender" requiredMarker>
                <span className='text-bold'>
								Gender
                </span>
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Grid row gap={2}>
                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="gender-m"
                          type="radio"
                          value="M"
                          checked={field.value === 'M'}
                          onChange={() => field.onChange('M')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="gender-m">
                      		M
                        </Label>
                      </div>

                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="gender-f"
                          type="radio"
                          value="F"
                          checked={field.value === 'F'}
                          onChange={() => field.onChange('F')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="gender-f">
                      		F
                        </Label>
                      </div>

                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="gender-x"
                          type="radio"
                          value="X"
                          checked={field.value === 'X'}
                          onChange={() => field.onChange('X')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="gender-x">
                      		X
                        </Label>
                      </div>
                    </Grid>
                    {error && (
                      <div className={Styles.error_text}>
                        <span className="error-message">Required Field</span>
                      </div>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid tablet={{col: true}}>
              <Label htmlFor="usCitizen" requiredMarker>
                <span className='text-bold'>
									US Citizen
                </span>
              </Label>
              <Controller
                name="usCitizen"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Grid row gap={2}>
                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="usCitizen-yes"
                          type="radio"
                          value="Yes"
                          checked={field.value === 'Yes'}
                          onChange={() => field.onChange('Yes')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="usCitizen-yes">
                      		Yes
                        </Label>
                      </div>
                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="usCitizen-no"
                          type="radio"
                          value="No"
                          checked={field.value === 'No'}
                          onChange={() => field.onChange('No')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="usCitizen-no">
                      		No
                        </Label>
                      </div>
                    </Grid>
                    {error && (
                      <div className={Styles.error_text}>
                        <span className="error-message">Required Field</span>
                      </div>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid tablet={{col: true}}>
              <Label htmlFor="veteran" requiredMarker>
                <span className='text-bold'>
									Veteran
                </span>
              </Label>
              <Controller
                name="veteran"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Grid row gap={2}>
                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="veteran-yes"
                          type="radio"
                          value="Yes"
                          checked={field.value === 'Yes'}
                          onChange={() => field.onChange('Yes')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="veteran-yes">
                      		Yes
                        </Label>
                      </div>
                      <div className="usa-radio">
                        <input
                          className="usa-radio__input"
                          id="veteran-no"
                          type="radio"
                          value="No"
                          checked={field.value === 'No'}
                          onChange={() => field.onChange('No')}
                        />
                        <Label className={`${Styles.usa_radio__label} usa-radio__label`} htmlFor="veteran-no">
                      		No
                        </Label>
                      </div>
                    </Grid>
                    {error && (
                      <div className={Styles.error_text}>
                        <span className="error-message">Required Field</span>
                      </div>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>

          <div className='margin-top-4'>
            <Label className="text-clamp--label" htmlFor="socialDisadvantages" requiredMarker>
              <span className='text-bold'>
								8a Social Disadvantage (Choose any that apply)
              </span>
            </Label>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  marginTop: '0.5rem',
                  borderRadius: '8px',
                  minHeight: '2.45rem',
                  height: '56px',
                  borderColor: '#BFBFBF',
                  outline: state.isFocused ? '3px solid #0f73ff' : ''
                })
              }}
              classNamePrefix="ownership-info-disadvantages"
              options={disadvantageOptions}
              isMulti={true}
              onChange={handleSelectChange}
              value={selectedOptions}
              isOptionDisabled={(option) =>
                (option.value !== 'not_claiming' &&
									 selectedOptions.some((o) => o.value === 'not_claiming')) ||
								(option.value === 'not_claiming' &&
									 selectedOptions.length > 0 &&
									 selectedOptions.some((o) => o.value !== 'not_claiming'))
						 }
            />
            {displayDisadvantageError && (
              <div className={Styles.error_text}>
                <span className="error-message">Required Field</span>
              </div>
            )}
          </div>

          <div className="margin-top-4">
            <Label htmlFor="ownershipPercentage" requiredMarker>
              <span className='text-bold'>
								Ownership Percentage
              </span>
            </Label>
            <Controller
              name="ownershipPercentage"
              control={control}
              rules={{ required: true, min: 0.01, max: 100 }}
              render={({ field: {ref, ...field}, fieldState: { error } }) => (
                <>
                  <TextInput
                    id='ownership-percentage'
                    style={{ height: '56px' }}
                    type="number"
                    className={`${Styles.input_text} ${Styles.width_fit}`}
                    {...field}
                    inputRef={ref}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') {
                        field.onChange(undefined)
                      } else {
                        const numericValue = parseFloat(value)
                        if (!isNaN(numericValue) && numericValue <= 100 && numericValue >= 0.01) {
                          field.onChange(numericValue)
                        }
                      }
                    }}
                    max={100}
                    step="0.01"
                    min="0.01"
                  />
                  {error && (
                    <div className={Styles.error_text}>
                      <span className="error-message">Required Field</span>
                    </div>
                  )}
                </>
              )}
            />
          </div>

          <div className='margin-top-4'>
            <Label htmlFor="businessLocation" requiredMarker>
              <span className='text-bold'>
								Business Location
              </span>
            </Label>
            <Controller
              name="businessLocation"
              control={control}
              rules={{ required: true, min: 0.01, max: 100 }}
              render={({ field: {ref, ...field}, fieldState: { error } }) => (
                <>
                  <div className={`display-flex flex-wrap ${Styles.column_gap}`}>
                    <TextInput
                      id='business-location'
                      style={{ height: '56px' }}
                      type="text"
                      className={`${Styles.input_text} margin-bottom-1`}
                      {...field}
                      inputRef={ref}
                    />
                    <div className='display-flex flex-auto flex-align-center'>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4417 20.9469H17.9575V15.5154C17.9575 14.6943 17.3048 14.0417 16.4838 14.0417H13.5153C12.6943 14.0417 12.0417 14.6943 12.0417 15.5154C12.0417 16.3364 12.6943 16.989 13.5153 16.989H14.989V20.9259H13.5153C12.6943 20.9259 12.0417 21.5785 12.0417 22.3996C12.0417 23.2206 12.6943 23.8733 13.5153 23.8733H18.4417C19.2627 23.8733 19.9153 23.2206 19.9153 22.3996C19.9153 21.5785 19.2627 20.9259 18.4417 20.9259V20.9469Z" fill="#595959"/>
                        <path d="M15.9785 12.0627C16.5048 12.0627 17.0101 11.8522 17.368 11.4943C17.7259 11.1364 17.9364 10.6312 17.9364 10.1048C17.9364 9.57853 17.7259 9.07326 17.368 8.71536C17.0101 8.35747 16.5048 8.14697 15.9785 8.14697C15.4522 8.14697 14.9469 8.35747 14.589 8.71536C14.2311 9.07326 14.0206 9.57853 14.0206 10.1048C14.0206 10.6312 14.2311 11.1364 14.589 11.4943C14.9469 11.8522 15.4522 12.0627 15.9785 12.0627Z" fill="#595959"/>
                        <path d="M27.1575 4.84169C24.189 1.87327 20.189 0.210083 15.9996 0.210083C11.8101 0.210083 7.78903 1.87327 4.84166 4.84169C1.87324 7.81011 0.210083 11.8101 0.210083 15.9996C0.210083 20.189 1.87324 24.2101 4.84166 27.1575C7.81008 30.1259 11.8101 31.789 15.9996 31.789C20.189 31.789 24.2101 30.1259 27.1575 27.1575C30.1048 24.1891 31.789 20.189 31.789 15.9996C31.789 11.8101 30.1259 7.78906 27.1575 4.84169ZM25.0522 25.0733C22.6522 27.4733 19.389 28.8207 15.9785 28.8207C12.568 28.8207 9.30482 27.4733 6.90482 25.0733C4.50482 22.6733 3.15745 19.4101 3.15745 15.9996C3.15745 12.589 4.50482 9.32588 6.90482 6.92588C9.30482 4.52588 12.568 3.17851 15.9785 3.17851C19.389 3.17851 22.6522 4.52588 25.0522 6.92588C27.4522 9.32588 28.7996 12.589 28.7996 15.9996C28.7996 19.4101 27.4522 22.6733 25.0522 25.0733Z" fill="#595959"/>
                      </svg>

                      <a className='margin-left-1' href="/">Hubzone Calculator</a>
                    </div>
                  </div>
                  {error && (
                    <div className={Styles.error_text}>
                      <span className="error-message">Required Field</span>
                    </div>
                  )}
                </>
              )}
            />
          </div>

          <div className='display-flex flex-row flex-justify-end margin-top-8'>
            <Link className={'usa-button usa-button--outline'} href={'/should-i-apply'}>Back</Link>
            <Button className={'usa-button margin-left-205'} type='button' onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </section>

      {displayPrograms && (
        usCitizen === 'No'
          ? <section>
            <Alert className={Styles.alert} type='warning' headingLevel='h3' noIcon>
              Based on your responses, you are not eligible for the 8(a) Business Development Program as it requires US citizenship. Review the eligibility criteria detailed <a href='/'>here</a>.
            </Alert>
          </section>
          : filteredEligiblePrograms.length > 0
            ? <section className={`${Styles.section} ${Styles.programs}`}>
              <h2 className={Styles.header_2}>Eligible Programs</h2>
              <p>Based on your responses you are eligible to apply for the following programs.</p>
              <div className={'disadvantage-grid'}>
                {filteredEligiblePrograms.map((program, index) => (
                  <ProgramCard key={index} program={program.name} description={program.description} />
                ))}
              </div>
            </section>
            : <section>
              <Alert className={Styles.alert} type='warning' headingLevel='h3' noIcon>
                Based on your responses, you are not eligible for the 8(a) Business Development Program. Review the eligibility criteria detailed <a href='/'>here</a>.
              </Alert>
            </section>
      )}
    </GridContainer>
  )
}
export default Ownership
