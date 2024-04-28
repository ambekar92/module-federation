'use client'
import { Button, TextInput } from '@trussworks/react-uswds'
import React, { useState } from 'react'
import Styles from './ShoudIApplyForm.module.scss'
import naicsCodes from './utils/naicsCodes.json'
import { NaicsCodeType } from './utils/types'

const NaicsSearch = () => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<NaicsCodeType[]>([]);

  const handleSearch = (): void => {
    const filteredResults = naicsCodes.filter((item: NaicsCodeType) =>
      item.code.includes(input) || item.title.toLowerCase().includes(input.toLowerCase())
    );
    setResults(filteredResults);
  };
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          />
          <Button type='button' className="height-6 margin-top-105" onClick={handleSearch}>Search</Button>
        </div>
      </div>
      {results.length > 0 && (
        <div className='ownership-table'>
          <table className='usa-table usa-table-borderless'>
            <tbody>
              {results.map((result: NaicsCodeType, index) => (
                <tr key={index}>
                  <td>{result.code}</td>
                  <td>{result.title}</td>
                  <td>Total Awarded: ${result.awarded}</td>
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
