'use client'
import { Show } from '@/app/shared/components/Show'
import { Alert, Button, Table, TextInput } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Controller, useFormContext } from 'react-hook-form'
import { ShouldIApplyFormType } from '../schema'
import { matchSchema } from './schema'
import { API_ROUTE } from '@/app/constants/routes'
import { NAICS_CODES_ROUTE } from '@/app/constants/local-routes'

const initialState = [{
  naics_code: '',
  description: '',
  award_amount: null
}]

type InitialState = typeof initialState;

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' aria-disabled={pending || disabled} disabled={pending || disabled}>Submit</Button>
  )
}

const MatchForm = () => {
  const { control, watch, setValue } = useFormContext<ShouldIApplyFormType>()
  const [state, formAction] = useFormState(getNaicsCodeDetails, initialState);
  const [localStorageData, setLocalStorageData] = useState<any | null>(null);
  const [savedState, setSavedState] = useState<InitialState | null | string>(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const naics_code = watch('match.naics_code');

  useEffect(() => {
    const localStorageData = localStorage.getItem('should-i-apply');
    setLocalStorageData(localStorageData);
  }, [])

  useEffect(() => {
    if (state && Array.isArray(state)) {
      if (state.length > 0 && state[0]?.naics_code) {
        setSavedState(state);
      } else {
        setSavedState('No matching records found. Please try again.');
      }
    } else if (state && !Array.isArray(state)) {
      setSavedState('No matching records found. Please try again.')
    } else if (localStorageData && submitCount === 0) {
      const parsedData = JSON.parse(localStorageData);
      setValue('match.naics_code', parsedData?.match?.searchTerm);
      setSavedState(parsedData?.match?.results || 'No matching records found. Please try again.');
    }
    setValue('match.results', state)
  }, [state, localStorageData, submitCount, setValue])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitCount(prev => prev + 1);
    setHasSubmitted(true);
    formAction(new FormData(event.currentTarget));
  }

  function formatMoney(amount: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(amount);
  }

  return (
    <div>
      <form className='bg-base-lightest padding-2 radius-sm' style={{ display: 'flex', gap: '1rem' }} onSubmit={handleSubmit}>
        <Controller control={control} name='match.naics_code' render={({ field }) => (
          <TextInput placeholder='NAICS Code / Description'
            onChange={field.onChange}
            value={field.value}
            style={{ border: 'none', marginTop: '0', maxWidth: '100%' }} id='naics_code' name='naics_code' type='text' />
        )} />
        <SubmitButton disabled={!naics_code || naics_code?.trim().length === 0} />
      </form>
      {hasSubmitted && savedState &&
        <>
          <Show>
            <Show.When isTrue={Array.isArray(savedState) && savedState.length > 0} >
              <Alert heading='Success' headingLevel='h2' type='success' role='status' aria-live='polite'>
                <p>Based on the NAICS code you provided, it appears the Federal Government buys what you sell.
                  Continue to see if your should apply to the SBA Certification Program.
                </p>
              </Alert>
            </Show.When>
            <Show.Otherwise>
              <Alert heading='Sorry' headingLevel='h2' type='warning' role='status' aria-live='polite'>
                <p>Based on the NAICS code you provided, it appears the Federal Government does not buy what you sell.
                  You may want to pursue business in other NAICS codes if you want to do business with the Federal Government.
                </p>
              </Alert>
            </Show.Otherwise>
          </Show>
          {savedState && Array.isArray(savedState) && savedState.length > 0 && <Table className='width-full'>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >NAICS Code</th>
                <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >Description</th>
                <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >Amount awarded in FY23</th>
              </tr>
            </thead>
            <tbody>
              {savedState.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.naics_code}</td>
                  <td>{el.description}</td>
                  <td>{el.award_amount && formatMoney(el.award_amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>}
        </>
      }
    </div>
  )
}

export default MatchForm;

async function getNaicsCodeDetails(prevState: any, formData: FormData): Promise<InitialState | undefined> {
  const data = matchSchema.parse({
    naics_code: formData.get('naics_code') as string
  });
  try {
    const searchTerm = data.naics_code.replace(/[^0-9]/g, '') ? `naics_code=${data.naics_code.replace(/[^0-9]/g, '')}` : `keyword=${data.naics_code.replace(/[0-9]/g, '').trim()}`;
    const response = await fetch(`${NAICS_CODES_ROUTE}?${searchTerm}`);
    const results = await response.json();
    const saved = JSON.parse(localStorage.getItem('should-i-apply') || '{}');
    saved.match = {results: results, searchTerm: data.naics_code};
    localStorage.setItem('should-i-apply', JSON.stringify(saved));
    return results as InitialState;
  } catch (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {console.error(error)}
  }
}
