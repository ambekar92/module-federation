import React from 'react'
import { Table } from '@trussworks/react-uswds'

function NaicsCodes() {
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
              <tr>
                <td>898658745</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</td>
                <td>Extra Medium Small Size</td>
              </tr>
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default NaicsCodes

