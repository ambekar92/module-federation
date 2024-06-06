import { Table } from '@trussworks/react-uswds';
import { IBusinessProfile } from '../../utils/types';
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
        <td>{profile.legal_business_name}</td>
      </tr>
      <tr>
        <th scope="row">DBA</th>
        <td>{profile.dba_name}</td>
      </tr>
      <tr>
        <th scope="row">Business UEI</th>
        <td>{profile.uei}</td>
      </tr>
      <tr>
        <th scope="row">Business Address</th>
        <td>{`${profile.physical_address_1}, ${profile.physical_address_2},`}
          <br/>{`${profile.physical_city}, ${profile.mailing_address_state_or_province}, ${profile.physical_zip_code_5}`}</td>
      </tr>
      <tr>
        <th scope="row">Government Contact</th>
        <td>{`${profile.govt_bus_poc_first_name} ${profile.govt_bus_poc_last_name}`}</td>
      </tr>
      <tr>
        <th scope="row">Entity Structure</th>
        <td>Corporate Entity (Not Tax Exempt)</td>
      </tr>
      <tr>
        <th scope="row">Business Structure</th>
        <td>Limited Liability Company</td>
      </tr>
    </tbody>
  </Table>
);

export default ValidationTable;
