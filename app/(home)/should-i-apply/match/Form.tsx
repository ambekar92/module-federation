'use client'
import { Show } from '@/app/shared/components/Show'
import { Alert, Button, Table, TextInput } from '@trussworks/react-uswds'
import React, { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Controller, useFormContext } from 'react-hook-form'
import { ShouldIApplyFormType } from '../schema'
import { matchSchema } from './schema'

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
  const [localStorageData, setLocalStorageData] = React.useState<any | null>(null);
  const [savedState, setSavedState] = React.useState<InitialState | null | string>(null);
  const naics_code = watch('match.naics_code');

  useEffect(() => {
    const localStorageData = localStorage.getItem('should-i-apply');
    setLocalStorageData(localStorageData);
  }, [])

  useEffect(() => {
    if (state && Array.isArray(state) && state[0]?.naics_code) {
      setSavedState(state);
    } else if (state && !Array.isArray(state)) {
      setSavedState('No matching records found. Please try again.')
    } else if (localStorageData) {
      setValue('match.naics_code', JSON.parse(localStorageData)?.match?.searchTerm);
      setSavedState(JSON.parse(localStorageData)?.match?.results);
    }
    setValue('match.results', state)

  }, [state, localStorageData])

  return (
    <div>
      <form className='bg-base-lightest padding-2 radius-sm' style={{ display: 'flex', gap: '1rem' }} action={formAction}>
        <Controller control={control} name='match.naics_code' render={({ field }) => (
          <TextInput placeholder='NAICS Code / Description'
            onChange={field.onChange}
            value={field.value}
            style={{ border: 'none', marginTop: '0', maxWidth: '100%' }} id='naics_code' name='naics_code' type='text' />
        )} />
        <SubmitButton disabled={!naics_code || naics_code?.trim().length === 0} />
      </form>
      {savedState &&
                <>
                  <Show>
                    <Show.When isTrue={Array.isArray(savedState)} >
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
                  {savedState && Array.isArray(savedState) && <Table className='width-full'>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >NAICS Code</th>
                        <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >Description</th>
                        <th style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} >Amount awarded in FY21</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedState?.map((el, idx) => (
                        <tr key={idx}>
                          <td>{el.naics_code}</td>
                          <td>{el.description}</td>
                          <td>{el.award_amount}</td>
                        </tr>
                      ))
                      }
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/amount-awarded?&${searchTerm}`);
    const results = await response.json();
    const saved = JSON.parse(localStorage.getItem('should-i-apply') || '{}');
    saved.match = {results: results, searchTerm: data.naics_code};
    localStorage.setItem('should-i-apply', JSON.stringify(saved));
    return results as InitialState;
  } catch (error) {
    console.error(error)
  }
}
