import React from 'react'
import { CustomTable } from '@/app/shared/components/CustomTable'
import { capitalizeAndSplit } from '@/app/shared/utility/capitalizeAndSplit';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import { setCurrentOperatorEditIndex, setOperators, setShowControlOperationsForm } from '../../redux/applicationSlice';

const ControlOperationsTable = () => {
  const {operators, currentOperatorEditIndex} = useApplicationSelector(state => state.application);
  const dispatch = useApplicationDispatch();

  const tableHeaders = [
    { id: 'Name', headerName: 'Legal Name' },
    { id: 'Position', headerName: 'Title/Position' },
    { id: 'Email', headerName: 'Email' },
    { id: 'PrincipalType', headerName: 'Principal Type' },
    { id: 'LicenseHolder', headerName: 'License Holder' },
  ];

  const tableRows = operators.map((operator, index) => ({
    id: index,
    Name: `${operator.prefix ? capitalizeAndSplit(operator.prefix) + '. ' : ''}${operator.firstName} ${operator.middleName ? operator.middleName + ' ' : ''}${operator.lastName}`,
    Position: operator.position,
    Email: operator.emailAddress,
    PrincipalType: capitalizeAndSplit(operator.principalType!),
    LicenseHolder: operator.licenseHolder ? 'Yes' : 'No'
  }));

  function handleEditOperator(index: number) {
    dispatch(setCurrentOperatorEditIndex(index));
    dispatch(setShowControlOperationsForm(true))
  }

  function handleDeleteOperator(index: number) {
    if (currentOperatorEditIndex === index) {return;} // cannot delete entry that's being edited
    const newOperators = operators.filter((_, i) => i !== index);
    dispatch(setOperators(newOperators));
  }

  return (
    <>
      {operators.length > 0 ? (
        <div className='padding-x-2'>
          <CustomTable
            header={tableHeaders}
            rows={tableRows}
            editable={true}
            remove={true}
            onEdit={handleEditOperator}
            onDelete={handleDeleteOperator}
          />
        </div>
      ) : null}
    </>
  )
}

export default ControlOperationsTable
