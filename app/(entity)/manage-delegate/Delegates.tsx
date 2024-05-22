import { Table,
  Button,
  ButtonGroup,
} from '@trussworks/react-uswds'
import React from 'react'

const Delegates = () => {
  return (
    <>
      <h2 className="float-left">Delegates</h2>
      <ButtonGroup className="float-right">
        <Button type='button' outline>Edit</Button>
        <Button type='button'>Add New</Button>
      </ButtonGroup>
      <Table fullWidth bordered>
        <thead>
          <tr>
            <th data-testid="first-name">First Name</th>
            <th data-testid="last-name">Last Name</th>
            <th data-testid="email">Email</th>
            <th data-testid="status">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john.doe@example.com</td>
            <td>Active</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default Delegates
