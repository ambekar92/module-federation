'use client'
import { NaicsCodeType } from '@/app/(home)/should-i-apply-legacy/components/utils/types';
import { NAICS_CODES_ROUTE } from '@/app/constants/local-routes';
import { Table } from '@trussworks/react-uswds';
import useSWR from 'swr';
import { useCurrentApplication } from '../../firm/useApplicationData';

function NaicsCodes() {
  const { applicationData } = useCurrentApplication();
  const { data: responseData, error: responseError } = useSWR<NaicsCodeType[]>(
    applicationData && applicationData.sam_entity.naics_code_string
      ? `${NAICS_CODES_ROUTE}?naics_code=${applicationData.sam_entity.naics_code_string}`
      : null,
  );

  if (!responseData || responseError) {
    return <Alert headingLevel='h4' type="error" heading="">Error loading NAICS codes</Alert>;
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
