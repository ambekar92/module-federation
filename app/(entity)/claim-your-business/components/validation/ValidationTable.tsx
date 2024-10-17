import React from 'react';
import { CmbResponseType } from '../../utils/types';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';

interface ValidationTableProps {
  profiles: CmbResponseType;
}

const StyledTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: 0,
  border: '1px solid #DFE1E2',
  borderRadius: '8px',
  overflow: 'hidden',
});

const StyledTableCell = styled(TableCell)({
  backgroundColor: '#F0F0F0',
  fontWeight: 'bold',
  width: '30%',
  borderBottom: '1px solid #DFE1E2',
});

const StyledDataCell = styled(TableCell)({
  borderBottom: '1px solid #DFE1E2',
});

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

  return (
    <>
      {profiles.sam_entity.map((entity, index) => {
        const businessType = getBusinessType(
          entity.entity_structure,
          profiles.sam_business_type,
        )
        return (
          <StyledTable key={index} style={{ tableLayout: 'fixed', width: '100%' }}>
            <TableBody>
              <TableRow>
                <StyledTableCell>Business Name</StyledTableCell>
                <StyledDataCell>{entity.legal_business_name}</StyledDataCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>DBA</StyledTableCell>
                <StyledDataCell>{entity.dba_name}</StyledDataCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Address</StyledTableCell>
                <StyledDataCell>
                  {entity.physical_addr_1}, {entity.physical_addr_2 && `${entity.physical_addr_2},`}
                  <br />
                  {`${entity.physical_city}, ${entity.physical_state_or_province}, ${entity.physical_zip_code_5}`}
                </StyledDataCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Entity Type</StyledTableCell>
                <StyledDataCell>{businessType}</StyledDataCell>
              </TableRow>
              <TableRow>
                <StyledTableCell style={{ borderBottom: 'none' }}>NAICS Code</StyledTableCell>
                <StyledDataCell style={{ borderBottom: 'none' }}>
                  <div style={{ wordBreak: 'break-all' }}>
                    {entity.naics_code_string}
                  </div>
                </StyledDataCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Government Contact</StyledTableCell>
                <StyledDataCell>{`${entity.govt_bus_poc_first_name} ${entity.govt_bus_poc_last_name}`}</StyledDataCell>
              </TableRow>
            </TableBody>
          </StyledTable>
        )
      })}
    </>
  )
}

export default ValidationTable;
