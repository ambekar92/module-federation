import { CustomTable } from '@/app/shared/components/CustomTable';
import { capitalizeAndSplit } from '../helpers';
import { IndividualFormType } from '../individual/schema';
import { Owner } from './types';
import { OrganizationFormType } from '../organization/schema';

const OwnersList = ({ owners, handleEditOwner, handleDeleteOwner }: { owners: Owner[], handleEditOwner: (idx: number) => void, handleDeleteOwner: (idx: number) => void }) => {
  const individualHeaders = [
    { id: 'legalName', headerName: 'Legal Name' },
    { id: 'email', headerName: 'Email' },
    { id: 'ownershipPercent', headerName: 'Ownership (%)' },
    { id: 'maritalStatus', headerName: 'Marital Status' },
    { id: 'veteranStatus', headerName: 'Veteran Status' },
  ];

  const organizationHeaders = [
    { id: 'organizationName', headerName: 'Organization Name' },
    { id: 'email', headerName: 'Email' },
    { id: 'ownershipPercent', headerName: 'Ownership (%)' },
    { id: 'phoneNumber', headerName: 'Phone Number' },
  ];

  const individualRows = owners
    .filter((owner): owner is IndividualFormType & { ownerType: 'individual' } => owner.ownerType === 'individual')
    .map((owner, index) => ({
      id: index,
      legalName: `${owner.firstName} ${owner.middleName ?? ''} ${owner.lastName}`,
      email: owner.contactInfo.email,
      ownershipPercent: owner.ownershipPercent,
      maritalStatus: capitalizeAndSplit(owner.maritalStatus ?? ''),
      veteranStatus: capitalizeAndSplit(owner.isVeteran ?? ''),
    }));

  const organizationRows = owners
    .filter((owner): owner is OrganizationFormType & { ownerType: 'organization' } => owner.ownerType === 'organization')
    .map((owner, index) => ({
      id: index,
      organizationName: owner.orgName,
      email: owner.contactInfo.email,
      ownershipPercent: owner.ownershipPercent,
      phoneNumber: owner.contactInfo.phoneNumber,
    }));

  return (
    <>
      {individualRows.length > 0 && (
        <>
          <h3>Individual Owners</h3>
          <CustomTable
            header={individualHeaders}
            rows={individualRows}
            editable={true}
            remove={true}
            onEdit={handleEditOwner}
            onDelete={handleDeleteOwner}
          />
        </>
      )}
      {organizationRows.length > 0 && (
        <>
          <h3>Organization Owners</h3>
          <CustomTable
            header={organizationHeaders}
            rows={organizationRows}
            editable={true}
            remove={true}
            onEdit={handleEditOwner}
            onDelete={handleDeleteOwner}
          />
        </>
      )}
    </>
  );
}

export default OwnersList;
