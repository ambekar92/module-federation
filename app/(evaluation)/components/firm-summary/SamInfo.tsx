import React from 'react'
import { Table } from '@trussworks/react-uswds'

function SamInfo() {
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
                <td>Acme Corp is the place to be working these days, LLC</td>
                <td>Lorem Ipsum</td>
                <td>JFKSJHSAQ4</td>
                <td>(SSN) 666-96-1234</td>
                <td>Active</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
                <td>Active</td>
                <td>02/24/2023</td>
                <td>11/18/2023</td>
                <td>12219 Braddock Falls, McLearn, Va 22032</td>
                <td>Active</td>
                <td>09/20/2021</td>
                <td>Lorem Ipsum</td>
              </tr>
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default SamInfo

