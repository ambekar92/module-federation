import { Table } from '@trussworks/react-uswds';
import { CmbResponseType } from '@/app/services/cmb-fetcher';

interface ValidationTableProps {
  profile: CmbResponseType;
}

const ValidationTable: React.FC<ValidationTableProps> = ({ profile }) => (
  <Table bordered={false}>
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
        <td>{profile.sam_entity.legal_business_name}</td>
      </tr>
      <tr>
        <th scope="row">DBA</th>
        <td>{profile.sam_entity.dba_name}</td>
      </tr>
      <tr>
        <th scope="row">Business UEI</th>
        <td>{profile.sam_entity.uei}</td>
      </tr>

      <tr>
        <th scope="row">NAICS Code</th>
        <td>{profile.sam_entity.naics_code_string}</td>
      </tr>

      <tr>
        <th scope="row">Business Address</th>
        <td>{`${profile.sam_entity.physical_address_1}, ${profile.sam_entity.physical_address_2},`}
          <br/>{`${profile.sam_entity.physical_city}, ${profile.sam_entity.mailing_address_state_or_province}, ${profile.sam_entity.physical_zip_code_5}`}</td>
      </tr>
      <tr>
        <th scope="row">Government Contact</th>
        <td>{`${profile.sam_entity.govt_bus_poc_first_name} ${profile.sam_entity.govt_bus_poc_last_name}`}</td>
      </tr>
      <tr>
        <th scope="row">Entity Structure</th>
        <td>{profile.sam_entity_structure}</td>
      </tr>
      <tr>
        <th scope="row">Business Structure</th>
        <td>{profile.sam_business_type}</td>
      </tr>
    </tbody>
  </Table>
);

export default ValidationTable;
