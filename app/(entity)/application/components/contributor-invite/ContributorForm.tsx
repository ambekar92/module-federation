'use client';
import { CustomTable } from '@/app/shared/components/CustomTable';
import { Button, ButtonGroup, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { selectApplication, setContributors, setIsAddingContributor, setStep } from '../../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import { applicationSteps } from '../../utils/constants';
import { Contributor } from './types';
import { UserApplicationInfo } from '../ownership/Partnership';

function ContributorForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { isAddingContributor, contributors } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const updateUserApplicationInfo = (partialUpdate: Partial<UserApplicationInfo>) => {
    const existingInfo: UserApplicationInfo = JSON.parse(localStorage.getItem('userApplicationInfo') || '{}');
    const updatedInfo = { ...existingInfo, ...partialUpdate };
    localStorage.setItem('userApplicationInfo', JSON.stringify(updatedInfo));
    return updatedInfo;
  };

  useEffect(() => {
    const userApplicationInfo = localStorage.getItem('userApplicationInfo');
    if (userApplicationInfo) {
      const { contributors } = JSON.parse(userApplicationInfo) as UserApplicationInfo;
      dispatch(setContributors(contributors));
    }
  }, [dispatch]);

  const handleAddNew = () => {
    dispatch(setIsAddingContributor(true));
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setEditingIndex(null);
  };

  const handleAddOrUpdateContributor = () => {
    const requiredFieldsFilled =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      emailAddress.trim() !== '';

    if (requiredFieldsFilled) {
      const newContributor: Contributor = {
        firstName,
        lastName,
        emailAddress,
        contributorRole: 'role_spouse', // Default to spouse role
      };

      let updatedContributors;
      if (editingIndex !== null) {
        updatedContributors = contributors.map((contributor, index) => {
          if (index === editingIndex) {
            return { ...newContributor, contributorRole: contributor.contributorRole }; // Preserve role type
          }
          return contributor;
        });
        setEditingIndex(null);
      } else {
        updatedContributors = [...contributors, newContributor];
      }

      dispatch(setContributors(updatedContributors));
      updateUserApplicationInfo({ contributors: updatedContributors });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmailAddress('');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleDeleteContributor = (index: number) => {
    const updatedContributors = contributors.filter((_, i) => i !== index);
    dispatch(setContributors(updatedContributors));
    updateUserApplicationInfo({ contributors: updatedContributors });
  };

  const handleEditOwner = (index: number) => {
    const owners = contributors.filter(contributor => contributor.contributorRole === 'role_owner');
    const owner = owners[index];
    setFirstName(owner.firstName || '');
    setLastName(owner.lastName || '');
    setEmailAddress(owner.emailAddress);
    setEditingIndex(contributors.indexOf(owner));
    dispatch(setIsAddingContributor(true));
  };

  const handleEditSpouse = (index: number) => {
    const spouses = contributors.filter(contributor => contributor.contributorRole === 'role_spouse');
    const spouse = spouses[index];
    setFirstName(spouse.firstName || '');
    setLastName(spouse.lastName || '');
    setEmailAddress(spouse.emailAddress);
    setEditingIndex(contributors.indexOf(spouse));
    dispatch(setIsAddingContributor(true));
  };

  const handleEditOther = (index: number) => {
    const others = contributors.filter(contributor => contributor.contributorRole === 'role_other');
    const other = others[index];
    setFirstName(other.firstName || '');
    setLastName(other.lastName || '');
    setEmailAddress(other.emailAddress);
    setEditingIndex(contributors.indexOf(other));
    dispatch(setIsAddingContributor(true));
  };

  useEffect(() => {
    dispatch(setStep(applicationSteps.contributorInvitation.stepIndex));
    dispatch(setIsAddingContributor(false));
  }, [dispatch]);

  const roleDisplayName = (role: string) => {
    switch (role) {
      case 'role_owner':
        return 'Owner';
      case 'role_spouse':
        return 'Spouse';
      case 'role_other':
        return 'Other';
      default:
        return role;
    }
  };

  const tableHeaders = [
    { id: 'Name', headerName: 'Legal Name' },
    { id: 'Role', headerName: 'Role' },
    { id: 'Email', headerName: 'Email' },
  ];

  const ownerTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_owner')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  const spouseTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_spouse')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  const otherTableRows = contributors
    .filter(contributor => contributor.contributorRole === 'role_other')
    .map((contributor, index) => ({
      id: index,
      Name: `${contributor.firstName} ${contributor.lastName}`,
      Role: roleDisplayName(contributor.contributorRole),
      Email: contributor.emailAddress,
    }));

  return (
    <>
      <hr className="margin-y-3 width-full border-base-lightest" />

      <div className="display-flex flex-justify flex-align-center">
        <h3 className="margin-y-0">Contributors & Spouses</h3>
        <Button type="button" outline onClick={handleAddNew}>
          Add New
        </Button>
      </div>

      {isAddingContributor && (
        <GridContainer containerSize='widescreen' className='width-full padding-y-2 margin-top-2 bg-base-lightest'>
          <Grid row gap='md'>
            <Grid className="display-flex flex-column" mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <Label htmlFor="first_name">First Name</Label>
              <TextInput
                className="maxw-full"
                type="text"
                id="first_name"
                placeholder="--"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid className="display-flex flex-column" mobile={{ col: 12 }} tablet={{ col: 6 }}>
              <Label htmlFor="last_name">Last Name</Label>
              <TextInput
                className="maxw-full"
                type="text"
                id="last_name"
                placeholder="--"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid className="display-flex flex-column" row>
            <Label htmlFor="email_address">Email Address</Label>
            <TextInput
              className="maxw-full"
              type="email"
              id="email_address"
              placeholder="--"
              name="email_address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Grid>

          <ButtonGroup className='margin-top-2'>
            <Button type='button' onClick={handleAddOrUpdateContributor}>{editingIndex !== null ? 'Update' : 'Add'}</Button>
            <Button
              type='button'
              unstyled
              className='padding-x-2'
              onClick={() => {
                setFirstName('');
                setLastName('');
                setEmailAddress('');
                setEditingIndex(null);
                dispatch(setIsAddingContributor(false));
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </GridContainer>
      )}

      {ownerTableRows.length > 0 && (
        <>
          <h3>Owners</h3>
          <CustomTable
            header={tableHeaders}
            rows={ownerTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditOwner}
            onDelete={handleDeleteContributor}
          />
        </>
      )}

      {spouseTableRows.length > 0 && (
        <>
          <h3>Spouses</h3>
          <CustomTable
            header={tableHeaders}
            rows={spouseTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditSpouse}
            onDelete={handleDeleteContributor}
          />
        </>
      )}

      {otherTableRows.length > 0 && (
        <>
          <h3>Other Disadvantaged Owners</h3>
          <CustomTable
            header={tableHeaders}
            rows={otherTableRows}
            editable={true}
            remove={true}
            onEdit={handleEditOther}
            onDelete={handleDeleteContributor}
          />
        </>
      )}

      <div className='flex-fill'></div>

      <hr className='margin-y-3 width-full border-base-lightest'/>

      <ButtonGroup className='display-flex flex-justify border-top padding-y-2 margin-top-2 margin-right-2px'>
        <Link className='usa-button usa-button--outline' href={applicationSteps.documentUpload.link}>
          Previous
        </Link>
        <Link className='usa-button' href={applicationSteps.sign.link}>
          Next
        </Link>
      </ButtonGroup>
    </>
  );
}

export default ContributorForm;
