import React from 'react'
import { Table } from '@trussworks/react-uswds'

function ControllingEntity() {
  return (
    <>
      <div className='grid-row margin-0'>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">Controlling Entity Type</th>
                <th scope="col">Controlling Entity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hawaiian Organiztion</td>
                <td>Bottle Trading Company</td>
              </tr>
            </tbody>
          </Table>
        </div>

      </div>

      <div className='grid-row margin-0'>
        <div className="grid-col-12">
          <Table bordered fullWidth>
            <thead>
              <tr>
                <th scope="col">Controlling Entity Parent Table</th>
                <th scope="col">Address</th>
                <th scope="col">Owner(s)</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bottle Trading Company</td>
                <td>123 Mian St, Anytown, CA</td>
                <td>Jane Smith</td>
                <td>+1 (555) 555-1212</td>
                <td>janedoe@gmail.com</td>
              </tr>
              <tr>
                <td>First Child Company of Bottle</td>
                <td>123 Mian St, Anytown, CA</td>
                <td>Jane Smith</td>
                <td>+1 (555) 555-1212</td>
                <td>janedoe@gmail.com</td>
              </tr>
            </tbody>
          </Table>
        </div>

      </div>
    </>
  )
}

export default ControllingEntity
