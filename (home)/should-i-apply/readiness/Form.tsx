'use client'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { ShouldIApplyFormType } from '../schema';
import { Alert, ErrorMessage, FormGroup, Label, Radio, TextInput } from '@trussworks/react-uswds';
import { Show } from '@/app/shared/components/Show';

const ReadinessForm = () => {
    const { watch, control, setValue } = useFormContext<ShouldIApplyFormType>();

    const isGeneratingRevenue = watch('readiness.isGeneratingRevenue');
    const recordOfQualityGoods = watch('readiness.recordOfQualityGoods');
    const electronicPayments = watch('readiness.electronicPayments');
    const coverCost = watch('readiness.coverCost');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('should-i-apply') || '{}')
        if (data.readiness) {
            setValue('readiness', data.ownership)
        }
    }, [])

  return (
    <form>
       <Controller 
        name='readiness'
        control={control}
        render={() => <>
            <Controller control={control} name='readiness.isGeneratingRevenue' render={({ field }) => (
                <FormGroup className="bg-white radius-sm padding-4">
                    <Label style={{maxWidth: '100%'}} htmlFor='isGeneratingRevenue'>1. Is your business generating revenue?</Label>
                    <Radio
                    checked={field.value === 'yes'}
                     value='yes' onChange={field.onChange} name="isGeneratingRevenue" id='isGeneratingRevenue-yes' label='Yes'></Radio>
                    <Radio
                    checked={field.value === 'no'}
                     value='no' onChange={field.onChange} name="isGeneratingRevenue" id='isGeneratingRevenue-no' label='No'></Radio>
                    <Show>
                        <Show.When isTrue={isGeneratingRevenue === 'no'}>
                            <Alert headingLevel='h6' type='warning'>
                                <span>
                                    SBA requires two years of revenue to show that you are ready for the SBA Certification Program. However, 
                                    SBA may waive this requirement if you can provide other evidence that your company is ready  for the program. 
                                    Click <a href="#">here</a> to learn more
                                </span>
                            </Alert>
                        </Show.When>
                    </Show>
                </FormGroup>
            )} />
            <Controller control={control} name='readiness.recordOfQualityGoods' render={({ field }) => (
                <FormGroup className="bg-white radius-sm padding-4">
                    <Label style={{maxWidth: '100%'}} htmlFor='recordOfQualityGoods'>2. Do you have a track record of delivering quality goods and services on time and within budget?</Label>
                    <Radio 
                    checked={field.value === 'yes'}
                    value='yes' onChange={field.onChange} name="recordOfQualityGoods" id='recordOfQualityGoods-yes' label='Yes'></Radio>
                    <Radio 
                    checked={field.value === 'no'}
                    value='no' onChange={field.onChange} name="recordOfQualityGoods" id='recordOfQualityGoods-no' label='No'></Radio>
                    <Show>
                        <Show.When isTrue={recordOfQualityGoods === 'no'}>
                            <Alert headingLevel='h6' type='warning'>
                                <span>
                                    The best way to show that your company is ready for the SBA Certification Program is to have a track record of successful performance.
                                </span>
                            </Alert>
                        </Show.When>
                    </Show>
                </FormGroup>
            )} />
            <Controller control={control} name='readiness.electronicPayments' render={({ field }) => (
                <FormGroup className="bg-white radius-sm padding-4">
                    <Label style={{maxWidth: '100%'}} htmlFor='electronicPayments'>3. Can you invoice and receive payments electronically?</Label>
                    <Radio 
                    checked={field.value === 'yes'}
                    value='yes' onChange={field.onChange} name="electronicPayments" id='electronicPayments-yes' label='Yes'></Radio>
                    <Radio 
                    checked={field.value === 'no'}
                    value='no' onChange={field.onChange} name="electronicPayments" id='electronicPayments-no' label='No'></Radio>
                    <Show>
                        <Show.When isTrue={electronicPayments === 'no'}>
                            <Alert headingLevel='h6' type='warning'>
                                <span>
                                    You will be required to invoice and receive payments electronically.
                                </span>
                            </Alert>
                        </Show.When>
                    </Show>
                </FormGroup>
            )} />
            <Controller control={control} name='readiness.coverCost' render={({ field }) => (
                <FormGroup className="bg-white radius-sm padding-4">
                    <Label style={{maxWidth: '100%'}} htmlFor='coverCost'>4. Can you cover your costs (hire personnel, purchase equipment, cover overhead expenses, etc.) prior to receiving your first payment?</Label>
                    <Radio
                    checked={field.value === 'yes'}
                     value='yes' onChange={field.onChange} name="coverCost" id='coverCost-yes' label='Yes'></Radio>
                    <Radio 
                    checked={field.value === 'no'}
                    value='no' onChange={field.onChange} name="coverCost" id='coverCost-no' label='No'></Radio>
                    <Show>
                        <Show.When isTrue={coverCost === 'no'}>
                            <Alert headingLevel='h6' type='warning'>
                                <span>
                                    You'll need to have sufficient capital to cover contract start-up costs before you receive your first payment.
                                    Check out SBA's <a href="#">Fund Your Business</a> for helpful resources.
                                </span>
                            </Alert>
                        </Show.When>
                    </Show>
                </FormGroup>
            )} />
        </>}
        /> 
    </form>
  )
}

export default ReadinessForm