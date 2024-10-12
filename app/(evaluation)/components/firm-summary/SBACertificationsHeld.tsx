import { ApplicationFilterType } from '@/app/services/queries/application-service/applicationFilters'
import { useApplication } from '@/app/services/queries/application-service/useApplication'
import { Alert, Table } from '@trussworks/react-uswds'
import { useParams } from 'next/navigation'
import React from 'react'
import moment from 'moment';

const SBACertificationsHeld = () => {
  const params = useParams<{application_id: string}>();
  const {data, error} = useApplication(ApplicationFilterType.id, params.application_id)
  if (error) {
    return <Alert type="error" heading="" headingLevel={'h2'}>Unable to fetch data</Alert>
  }
  return (
    <>
      <div className='grid-row margin-0'>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">Program</th>
                <th scope="col">Status</th>
                <th scope="col">Entrance Date</th>
                <th scope="col">Exit Date</th>
              </tr>
            </thead>
            <tbody>
              {data && Array.isArray(data) && data[0].certifications?.length > 0 && data?.[0].certifications.map(
                p =>
                  <tr key={p.id}>
                    <td>{p.program.title}</td>
                    <td>{p.workflow_state}</td>
                    <td>{moment(p.expiry_date).format('MMMM Do, YYYY')}</td>
                    <td>{moment(p.issue_date).format('MMMM Do, YYYY')}</td>
                  </tr>
              )}
              {
                (!data || !Array.isArray(data) || data[0].program_application?.length === 0) && <tr>
                  <td colSpan={4} className="text-center">No data found</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default SBACertificationsHeld
