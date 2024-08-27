'use client'
import React from 'react'
import { Table } from '@trussworks/react-uswds'
import { NaicsCodeType } from '@/app/(home)/should-i-apply-legacy/components/utils/types'
import { useCurrentApplication } from '../../firm/useApplicationData';
import useSWR from 'swr';
import fetcher from '@/app/services/fetcher';
import { API_ROUTE } from '@/app/constants/routes';

function NaicsCodes() {
  const { applicationData } = useCurrentApplication();
  const { data: responseData, error: responseError } = useSWR<NaicsCodeType[]>(
    applicationData && applicationData.sam_entity.naics_code_string
      ? `${API_ROUTE}/amount-awarded?naics_code=${applicationData.sam_entity.naics_code_string}`
      : null,
    fetcher
  );

  if (!responseData || responseError) {
    return null;
  }

  return (
    <>
      <div className='grid-row margin-0'>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">NAICS Code</th>
                <th scope="col">Description</th>
                <th scope="col">Small Size Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
                <tr key={index}>
                  <td>{item.naics_code}</td>
                  <td>{item.description}</td>
                  <td>Small Size Business</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default NaicsCodes
