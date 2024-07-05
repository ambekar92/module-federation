import { Button, ButtonGroup, Table } from '@trussworks/react-uswds'

const Associated = () => {
  return (
    <div>
      <h2>Associated</h2>
      <Table fullWidth bordered>
        <thead>
          <tr>
            <th data-testid="business-name">Business Name</th>
            <th data-testid="dba">DBA</th>
            <th data-testid="uei">UEI</th>
            <th data-testid="address">Address</th>
            <th data-testid="status">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Business Name 1</td>
            <td>Business Name 2</td>
            <td>Name 3</td>
            <td>Name 4</td>
            <td>Name 5</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Associated
