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
   Alert
} from '@trussworks/react-uswds'
import { FormData, BusinessSchema } from './ClaimBusinessFormTypes'

// Mock Data/API calls until BE is ready
const claimedBusinesses = ['123456789012', '123456789013']
const lostBusinessProfiles = ['123456789014', '123456789015']
const getBusinessesClaimed = (uei: string) => Promise.resolve(claimedBusinesses.includes(uei))
const getLostBusinessProfile = (uei: string) => Promise.resolve(lostBusinessProfiles.includes(uei))

function ClaimBusinessForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      control
   } = useForm<FormData>({
      mode: 'all',
      resolver: zodResolver(BusinessSchema)
   })

   type FormValues = {
      textInput: string
   }

   const [isClaimReady, setIsClaimReady] = useState(false)

   const onSubmit = async (data: FormData) => {
      !isClaimReady &&
         getBusinessesClaimed(data.uei).then((result) => {
            if (result) {
               return setError('serverError', { type: 'submit', message: 'Business has already been claimed in UCMS.' })
            }
            getLostBusinessProfile(data.uei).then((result) => {
               if (result) {
                  console.log('Can not find Business Profile.')
                  return setError('serverError', {
                     type: 'submitError',
                     message: 'The Business Profile can not be found in sam.gov'
                  })
               }
               setIsClaimReady(true)
            })
         })
   }

   const accordionItemProps: AccordionItemProps[] = [
      {
         title: <div style={{ display: 'flex', justifyContent: 'space-between' }}>user information</div>,
         content: (
            <p>
               Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise
               thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to
               assemble, and to petition the Government for a redress of grievances.
            </p>
         ),
         expanded: false,
         id: '123',
         className: 'myCustomAccordionItem',
         headingLevel: 'h4'
      }
   ]

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            {errors && errors.serverError && (
               <div className="default-alert">
                  <Alert type="error" heading="Error Status" headingLevel="h4">
                     {errors.serverError.message}
                  </Alert>
                  <br />
               </div>
            )}
            <p>External User Basic information and company structure, what functionality this feature provides.</p>
            <Accordion bordered={false} items={accordionItemProps} />
            <br />
            <Label htmlFor="testInput" requiredMarker>
               Enter UEI
            </Label>
            <Controller
               control={control}
               name="textInput"
               {...register('uei')}
               render={({ field: { ref, ...field } }) => (
                  <>
                     <TextInput
                        className="icon"
                        id="input-uei"
                        name="input-uei"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={Boolean(errors.uei?.message) ? 'error' : 'success'}
                     />
                     {errors && errors.uei && (
                        <div className="usa-input-helper-text">
                           <span className="error-message" id="uei-input-error-message">
                              {errors.uei.message}
                           </span>
                        </div>
                     )}
                  </>
               )}
            />

            <Label htmlFor="testInput" requiredMarker>
               Enter Cage Code
            </Label>
            <Controller
               control={control}
               name="textInput"
               {...register('cageCode')}
               render={({ field: { ref, ...field } }) => (
                  <>
                     <TextInput
                        className="icon"
                        id="input-cageCode"
                        name="input-cageCode"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={Boolean(errors.cageCode?.message) ? 'error' : 'success'}
                     />
                     {errors && errors.cageCode && (
                        <div className="usa-input-helper-text">
                           <span className="error-message" id="cageCode-input-error-message">
                              {errors.cageCode.message}
                           </span>
                        </div>
                     )}
                  </>
               )}
            />

            <Label htmlFor="testInput" requiredMarker>
               Enter Bank Account Number
            </Label>
            <Controller
               control={control}
               name="textInput"
               {...register('bankAccountNumber')}
               render={({ field: { ref, ...field } }) => (
                  <>
                     <TextInput
                        className="icon"
                        id="input-bankAccountNumber"
                        name="input-bankAccountNumber"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={Boolean(errors.bankAccountNumber?.message) ? 'error' : 'success'}
                     />
                     {errors && errors.bankAccountNumber && (
                        <div className="usa-input-helper-text">
                           <span className="error-message" id="bankAccountNumber-input-error-message">
                              {errors.bankAccountNumber.message}
                           </span>
                        </div>
                     )}
                  </>
               )}
            />

            <Label htmlFor="testInput" requiredMarker>
               Enter TIN
            </Label>
            <Controller
               control={control}
               name="textInput"
               {...register('tin')}
               render={({ field: { ref, ...field } }) => (
                  <>
                     <TextInput
                        className="icon"
                        id="input-tin"
                        name="input-tin"
                        type="text"
                        inputRef={ref}
                        {...field}
                        validationStatus={Boolean(errors.tin?.message) ? 'error' : 'success'}
                     />
                     {errors && errors.tin && (
                        <div className="usa-input-helper-text">
                           <span className="error-message" id="tin-input-error-message">
                              {errors.tin.message}
                           </span>
                        </div>
                     )}
                  </>
               )}
            />
            <br />
            <br />
            <div className="default-btn">
               <div className="usa-button-group-container">
                  <ButtonGroup type="default">
                     <Link href="#" className="usa-button usa-button--outline">
                        Exit
                     </Link>
                     {isClaimReady ? (
                        <Button>Claim Business</Button>
                     ) : (
                        <Button type="submit" disabled={Object.keys(errors).length > 0}>
                           Enter
                        </Button>
                     )}
                  </ButtonGroup>
               </div>
            </div>
         </form>
      </>
   )
}

export default ClaimBusinessForm
