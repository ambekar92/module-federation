import { Table } from '@trussworks/react-uswds'
import { IBusinessProfile } from '../utils/types'
interface ValidationTableProps {
  profile: IBusinessProfile;
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
			 <td>{profile.name}</td>
		 </tr>
		 <tr>
			 <th scope="row">DBA</th>
			 <td>{profile.dba}</td>
		 </tr>
		 <tr>
			 <th scope="row">Business UEI</th>
			 <td>{profile.uei}</td>
		 </tr>
		 <tr>
			 <th scope="row">Business Address</th>
			 <td>{profile.address}</td>
		 </tr>
		 <tr>
			 <th scope="row">Government Contact</th>
			 <td>{profile.contact}</td>
		 </tr>
		 <tr>
			 <th scope="row">Business Structure</th>
			 <td>{profile.type}</td>
		 </tr>
		 <tr>
			 <th scope="row">Entity-Owned</th>
			 <td>{profile.owned}</td>
		 </tr>
	 </tbody>
  </Table>
)

export default ValidationTable
