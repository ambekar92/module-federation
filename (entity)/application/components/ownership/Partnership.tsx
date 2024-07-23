'use client';
import { Show } from '@/app/shared/components/Show';
import { Grid, Label, Select as UsSelect } from '@trussworks/react-uswds';
import { useState } from 'react';
import { selectApplication, setIsEditingOwner, setOwnerType, setOwnerTypeSelected, setOwners, setOwnershipPercentageTotal } from '../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import { useUserApplicationInfo } from '../../utils/useUserApplicationInfo';
import { Contributor } from '../contributor-invite/types';
import IndividualForm from './individual/IndividualForm';
import OrganizationForm from './organization/OrganizationForm';
import OwnersList from './shared/OwnersList';
import { Owner, OwnershipType } from './shared/types';

const convertOwnerToContributor = (owner: Owner): Contributor => {
  if (owner.ownerType === 'individual') {
    return {
      contributorRole: 'role_owner',
      firstName: owner.firstName,
      lastName: owner.lastName,
      emailAddress: owner.contactInfo.email,
    };
  } else {
    return {
      contributorRole: 'role_owner',
      emailAddress: owner.contactInfo.email,
    };
  }
};

function Partnership() {
  const { updateUserApplicationInfo } = useUserApplicationInfo();
  const { ownerType, ownerTypeSelected, owners } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();
  const [individualOwnerBeingEdited, setIndividualOwnerBeingEdited] = useState<Owner | null>(null);
  const [orgOwnerBeingEdited, setOrgOwnerBeingEdited] = useState<Owner | null>(null);

  const handleOwnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as OwnershipType | '';
    if (value === 'individual' || value === 'organization') {
      dispatch(setOwnerType(value as OwnershipType));
    } else {
      dispatch(setOwnerType(null));
    }
  };

  const handleEditOwner = (index: number) => {
    const owner = owners[index];
    if (owner) {
      dispatch(setOwnerType(owner.ownerType as OwnershipType));
      dispatch(setOwnerTypeSelected(true));
      if (owner.ownerType === 'individual') {
        setIndividualOwnerBeingEdited(owner);
        setOrgOwnerBeingEdited(null);
      } else if (owner.ownerType === 'organization') {
        setOrgOwnerBeingEdited(owner);
        setIndividualOwnerBeingEdited(null);
      }
      dispatch(setIsEditingOwner(true));
    }
  };

  function onOwnerAdd(owner: Owner) {
    let updatedOwners;
    let index = -1;

    if (individualOwnerBeingEdited || orgOwnerBeingEdited) {
      index = owners.findIndex(o => o === (individualOwnerBeingEdited || orgOwnerBeingEdited));
      if (index > -1) {
        updatedOwners = [...owners];
        updatedOwners[index] = owner;
      } else {
        updatedOwners = [...owners, owner];
      }
    } else {
      updatedOwners = [...owners, owner];
    }

    const updatedContributors = updatedOwners.map(convertOwnerToContributor);
    dispatch(setIsEditingOwner(false));

    updateUserApplicationInfo({
      totalPercent: updatedOwners.reduce((acc, owner) => acc + Number(owner.ownershipPercent), 0),
      owners: updatedOwners,
      contributors: updatedContributors,
    });

    setIndividualOwnerBeingEdited(null);
    setOrgOwnerBeingEdited(null);
    dispatch(setOwnerType(null));
    dispatch(setOwnerTypeSelected(false));

    updateTotalOwnershipPercentage(owner.ownershipPercent ?? '0', index);
  }

  const handleDeleteOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    const updatedContributors = updatedOwners.map(convertOwnerToContributor);

    updateUserApplicationInfo({
      totalPercent: updatedOwners.reduce((acc, owner) => acc + Number(owner.ownershipPercent), 0),
      owners: updatedOwners,
      contributors: updatedContributors,
    });

    updateTotalOwnershipPercentageOnDelete(index);
  };

  function updateTotalOwnershipPercentage(currentOwnerPercent: string, index: number) {
    let total = owners.reduce((acc, owner) => acc + Number(owner.ownershipPercent), 0);
    if (index > -1) {
      const owner = owners[index];
      if (owner) {
        total -= Number(owner.ownershipPercent);
      }
    }
    total += Number(currentOwnerPercent);

    updateUserApplicationInfo({ totalPercent: total });

    dispatch(setOwnershipPercentageTotal(total));
  }

  function updateTotalOwnershipPercentageOnDelete(index: number) {
    const owner = owners[index];
    let total = owners.reduce((acc, owner) => acc + Number(owner.ownershipPercent), 0);
    if (owner) {
      total -= Number(owner.ownershipPercent);
    }

    updateUserApplicationInfo({ totalPercent: total });
    dispatch(setOwnershipPercentageTotal(total));
  }

  return (
    <>
      {!!ownerTypeSelected && <>
        <h3 className='margin-y-0'>Identification</h3>
        <Grid row className='display-flex flex-column'>
          <Label className='margin-top-0' htmlFor='identification'>Type of Owner</Label>
          <UsSelect role='listbox' className='maxw-full height-7 radius-lg' id='identification' name='identification'
            value={ownerType ?? ''}
            onChange={handleOwnerTypeChange}
            validationStatus={ownerType ? 'success' : undefined}>
            <option value="">--</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </UsSelect>
        </Grid>
        <Show>
          <Show.When isTrue={ownerType === 'individual'}>
            <IndividualForm handleAddOwner={onOwnerAdd} editedItem={individualOwnerBeingEdited} />
          </Show.When>
        </Show>
        <Show>
          <Show.When isTrue={ownerType === 'organization'}>
            <OrganizationForm handleAddOwner={onOwnerAdd} editedItem={orgOwnerBeingEdited} />
          </Show.When>
        </Show>
      </>}

      <Show>
        <Show.When isTrue={owners.length > 0}>
          <OwnersList owners={owners} handleEditOwner={handleEditOwner} handleDeleteOwner={handleDeleteOwner} />
        </Show.When>
      </Show>
    </>
  );
}

export default Partnership;
