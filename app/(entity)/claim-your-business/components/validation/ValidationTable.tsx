import { Table } from '@trussworks/react-uswds';
import { CmbResponseType } from '../../utils/types';

interface ValidationTableProps {
  profiles: CmbResponseType;
}

const ValidationTable: React.FC<ValidationTableProps> = ({ profiles }) => (
  <Table bordered={false}>
    <div>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>
          SAM.gov profile
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Business Name</th>
          <td>{profiles.sam_entity.legal_business_name}</td>
        </tr>
        <tr>
          <th scope="row">DBA</th>
          <td>{profiles.sam_entity.dba_name}</td>
        </tr>
        <tr>
          <th scope="row">Business UEI</th>
          <td>{profiles.sam_entity.uei}</td>
        </tr>
        <tr>
          <th scope="row">Business Address</th>
          <td>{`${profiles.sam_entity.physical_addr_1}, ${profiles.sam_entity.physical_addr_2},`}
            <br/>{`${profiles.sam_entity.physical_city}, ${profiles.sam_entity.physical_state_or_province}, ${profiles.sam_entity.physical_zip_code_5}`}</td>
        </tr>
        <tr>
          <th scope="row">Government Contact</th>
          <td>{`${profiles.sam_entity.govt_bus_poc_first_name} ${profiles.sam_entity.govt_bus_poc_last_name}`}</td>
        </tr>
        <tr>
          <th scope="row">Business Type</th>
          <td>{profiles.sam_business_type}</td>
        </tr>
        <tr>
          <th scope="row">Entity Structure</th>
          <td>{profiles.sam_entity_structure}</td>
        </tr>
        <tr>
          <th scope="row">NAICS Code</th>
          <td>{profiles.sam_entity.naics_code_string}</td>
        </tr>
      </tbody>
    </div>
  </Table>
);

export default ValidationTable;
