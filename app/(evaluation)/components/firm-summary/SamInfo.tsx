'use client'
import { SamEntity } from '@/app/services/types/application-service/Application'
import { Alert, Table } from '@trussworks/react-uswds'
import moment from 'moment'
import { useCurrentApplication } from '../../firm/useApplicationData'

function SamInfo() {
  const { applicationData, error } = useCurrentApplication();
  const samEntity = applicationData?.sam_entity ?? null;

  if (error) {
    return <Alert headingLevel='h4' type="error" heading="">Error loading Sam Information</Alert>;
  }

  return (
    <>
      <div className='grid-row margin-0'>
        <div className="grid-col-12">
          <h5 className="margin-0">Business Details</h5>
        </div>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">Legal Business Name</th>
                <th scope="col">DBA</th>
                <th scope="col">SAM UEI</th>
                <th scope="col">Tax ID</th>
                <th scope="col">UEI Status</th>
                <th scope="col">Exclusion Status</th>
                <th scope="col">Debt subject to Offset</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{samEntity?.legal_business_name || 'N/A'}</td>
                <td>{samEntity?.dba_name || 'N/A'}</td>
                <td>{samEntity?.uei || 'N/A'}</td>
                <td>{samEntity?.tax_identifier_number || 'N/A'}</td>
                <td>{samEntity?.exclusion_status_flag || 'N/A'}</td>
                <td>{samEntity?.exclusion_status_flag || 'N/A'}</td>
                <td>{samEntity?.debt_subject_to_offset_flag || 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="grid-col-12">
          <h5 className="margin-0">Identification and Status</h5>
        </div>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">SAM Registration status</th>
                <th scope="col">SAM Registration last updated</th>
                <th scope="col">SAM Registration Expiration date</th>
                <th scope="col">Physical Address</th>
                <th scope="col">Business Website</th>
                <th scope="col">Business Start Date</th>
                <th scope="col">CAGE Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{registrationStatus(samEntity)}</td>
                <td>{samEntity ? moment(samEntity?.last_update_date).format('MM/DD/yy') : 'N/A'}</td>
                <td>{samEntity ? moment(samEntity?.expiration_date).format('MM/DD/yy') : 'N/A'}</td>
                <td>{getAddress(samEntity)}</td>
                <td>{samEntity?.entity_url ?? 'N/A'}</td>
                <td>{samEntity ? moment(samEntity?.business_start_date).format('MM/DD/yy') : 'N/A'}</td>
                <td>{samEntity?.cage_code ?? 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default SamInfo;

function registrationStatus(samEntity: SamEntity | null) {
  if (!samEntity) {return 'N/A'}
  const today = new Date().getTime();
  const expirationDate = new Date(samEntity.expiration_date).getTime();
  return today > expirationDate ? 'Expired' : 'Active';
}

function getAddress(samEntity: SamEntity | null) {
  if (!samEntity) {return 'N/A'}
  return `${samEntity.physical_addr_1} ${samEntity.physical_addr_2} ${samEntity.physical_city} ${ samEntity.physical_state_or_province} ${samEntity.physical_zip_code_5}`
}
