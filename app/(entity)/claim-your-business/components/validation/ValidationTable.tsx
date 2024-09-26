import { Table } from '@trussworks/react-uswds'
import { CmbResponseType } from '../../utils/types'

interface ValidationTableProps {
  profiles: CmbResponseType
}

const ValidationTable: React.FC<ValidationTableProps> = ({ profiles }) => {
  const getBusinessType = (
    entityStructure: string,
    samBusinessType: string,
  ) => {
    const businessTypeMap: { [key: string]: string } = {
      '2J': 'Sole Proprietorship',
      '2K': 'Partnership',
      '2L': 'Corporate Entity (Not Tax Exempt)',
      '8H': 'Corporate Entity (Tax Exempt)',
      '2A': 'U.S. Government Entity',
      'CY': 'Country - Foreign Government',
      'X6': 'International Organization',
      'ZZ': 'Other',
    }
    let businessType =
      businessTypeMap[entityStructure as keyof typeof businessTypeMap] ||
      entityStructure
    if (entityStructure === '2L') {
      if (samBusinessType?.includes('LJ')) {
        businessType = 'LLC'
      }
    }
    return businessType
  }
  //fixed table layout and width
  return (
    <>
      {profiles.sam_entity.map((entity, index) => {
        const businessType = getBusinessType(
          entity.entity_structure,
          profiles.sam_business_type,
        )
        return (
          <div style={{ tableLayout: 'fixed' }} key={index}>
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
                  <td>{entity.legal_business_name}</td>
                </tr>
                <tr>
                  <th scope="row">DBA</th>
                  <td>{entity.dba_name}</td>
                </tr>
                <tr>
                  <th scope="row">Business UEI</th>
                  <td>{entity.uei}</td>
                </tr>
                <tr>
                  <th scope="row">Business Address</th>
                  <td>
                    {`${entity.physical_addr_1}, ${entity.physical_addr_2},`}
                    <br />
                    {`${entity.physical_city}, ${entity.physical_state_or_province}, ${entity.physical_zip_code_5}`}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Government Contact</th>
                  <td>{`${entity.govt_bus_poc_first_name} ${entity.govt_bus_poc_last_name}`}</td>
                </tr>
                <tr>
                  <th scope="row">Business Type</th>
                  <td>{businessType}</td>
                </tr>
                <tr>
                  <th scope="row">NAICS Code</th>
                  <td>
                    <div style={{ wordBreak: 'break-all' }}>
                      {entity.naics_code_string}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )
      })}
    </>
  )
}

export default ValidationTable
