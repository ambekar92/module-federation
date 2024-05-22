'use client'
import { Button, TextInput } from '@trussworks/react-uswds'
import React, { useEffect, useState } from 'react'
import Styles from './ShoudIApplyForm.module.scss'
import { NaicsCodeType } from './utils/types'
import useSWR from 'swr'
import { naicsFetcherGET } from './utils/fetch'

const NaicsSearch = () => {
  const [input, setInput] = useState({
    code: '',
    keyword: ''
  });
  const [shouldFetch, setShouldFetch] = useState(false);
  const [results, setResults] = useState<NaicsCodeType[]>([]);
  const [attemptedSearch, setAttemptedSearch] = useState(false);

  const { data: responseData, error: responseError } = useSWR<NaicsCodeType[] | { message: string }>(
    shouldFetch ? `/amount-awarded?${input.code ? '?naics_code='+input.code : ''}${input.keyword ? '&keyword='+input.keyword : ''}` : null,
    naicsFetcherGET
  )

  useEffect(() => {
    if (responseError) {
      return;
    }
    if (responseData && 'message' in responseData) {
      setResults([])
      return;
    }
    if (responseData) {
      setResults(responseData);
    }
    // Reset fetch trigger
    setShouldFetch(false);
  }, [responseData, responseError]);

  const handleSearch = (): void => {
    setAttemptedSearch(true);
    if(input.code !== '' || input.keyword !== '') {
      setShouldFetch(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setAttemptedSearch(false);
    setInput({
      code: value.replace(/[^0-9]/g, ''),
      keyword: value.replace(/[0-9]/g, '').trim()
    });
  }

  return (
    <>
      <div className='margin-top-205'>
        <label htmlFor="naics">Type in your NAICS or a description of your business to see how much the Federal Government has awarded in your field.</label>
        <div className={`display-flex ${Styles.column_gap} margin-top-105`}>
          <TextInput
            name='naics'
            id="naics"
            type='text'
            placeholder='Enter NAICS code or industry Title'
            className={`${Styles.input_text}`}
            onChange={handleChange}
          />
          <Button type='button' className="height-6 margin-top-105" onClick={handleSearch}>Search</Button>
        </div>
      </div>
      {attemptedSearch && input.code === '' && input.keyword === '' && (
        <h3>Please enter a valid input to search.</h3>
      )}
      {attemptedSearch && results?.length === 0 && (
        <h3>No matching records found. Please try again.</h3>
      )}
      {results && (
        <div className='ownership-table'>
          <table className='usa-table usa-table-borderless'>
            <tbody>
              {results.map((result: NaicsCodeType, index) => (
                <tr key={index}>
                  <td><strong>{result.naics_code}</strong></td>
                  <td>{result.description}</td>
                  <td>Total Awarded: <strong>{result.award_amount === 'NULL' ? '$0' : result.award_amount}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
export default NaicsSearch
