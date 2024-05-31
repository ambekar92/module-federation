'use client';
import { Button, ButtonGroup, Grid, GridContainer, Label, Select, TextInput } from '@trussworks/react-uswds';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ControlAndOperationsLayout from '../components/control-and-operations/ControlAndOperationsLayout';
import { selectApplication, setContributors, setOperators } from '../redux/applicationSlice';
import { useApplicationDispatch, useApplicationSelector } from '../redux/hooks';
import { applicationSteps } from '../utils/constants';
import { CustomTable } from '@/app/shared/components/CustomTable';
import { UserApplicationInfo } from '../components/ownership/Partnership';
import { Contributor } from '../components/contributor-invite/types';

export type Operator = {
  prefix?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  position: string;
  principalType: string;
  licenseHolder: boolean;
  emailAddress: string;
};

const convertOperatorToContributor = (operator: Operator): Contributor => ({
  contributorRole: 'role_other',
  firstName: operator.firstName,
  lastName: operator.lastName,
  emailAddress: operator.emailAddress,
});

function ControlAndOperations() {
  const { isAddingOperator, operators, contributors } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [position, setPosition] = useState('');
  const [principalType, setPrincipalType] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [licenseHolder, setLicenseHolder] = useState<boolean | undefined>(undefined);

  const updateUserApplicationInfo = (partialUpdate: Partial<UserApplicationInfo>) => {
    const existingInfo: UserApplicationInfo = JSON.parse(localStorage.getItem('userApplicationInfo') || '{}');
    const updatedInfo = { ...existingInfo, ...partialUpdate };
    localStorage.setItem('userApplicationInfo', JSON.stringify(updatedInfo));
    return updatedInfo;
  };

  useEffect(() => {
    const userApplicationInfo = localStorage.getItem('userApplicationInfo');
    if (userApplicationInfo) {
      const { operators } = JSON.parse(userApplicationInfo) as UserApplicationInfo;
      if (operators) {
        dispatch(setOperators(operators));
      }
    }
  }, [dispatch]);

  const capitalizeAndSplit = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleAddOrUpdateOperator = () => {
    const requiredFieldsFilled = firstName && lastName && position && principalType !== '' && licenseHolder !== undefined;

    if (requiredFieldsFilled) {
      const newOperator: Operator = {
        prefix,
        firstName,
        middleName,
        lastName,
        suffix,
        position,
        principalType,
        licenseHolder: licenseHolder!,
        emailAddress
      };

      let updatedOperators;
      let updatedContributors;
      if (editIndex !== null) {
        updatedOperators = operators.map((operator, index) => index === editIndex ? newOperator : operator);
        updatedContributors = contributors.map((contributor, index) => index === editIndex ? convertOperatorToContributor(newOperator) : contributor);
        setEditIndex(null);
      } else {
        updatedOperators = [...operators, newOperator];
        updatedContributors = [...contributors, convertOperatorToContributor(newOperator)];
      }

      dispatch(setOperators(updatedOperators));
      dispatch(setContributors(updatedContributors));
      updateUserApplicationInfo({ operators: updatedOperators, contributors: updatedContributors });

      // Reset form fields
      setPrefix('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setSuffix('');
      setPosition('');
      setPrincipalType('');
      setLicenseHolder(undefined);
      setEmailAddress('');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleEditOperator = (index: number) => {
    const operator = operators[index];
    setPrefix(operator.prefix || '');
    setFirstName(operator.firstName || '');
    setMiddleName(operator.middleName || '');
    setLastName(operator.lastName || '');
    setSuffix(operator.suffix || '');
    setPosition(operator.position || '');
    setPrincipalType(operator.principalType || '');
    setLicenseHolder(operator.licenseHolder);
    setEmailAddress(operator.emailAddress || '');
    setEditIndex(index);
  };

  const handleDeleteOperator = (index: number) => {
    const updatedOperators = operators.filter((_, i) => i !== index);
    const updatedContributors = contributors.filter((_, i) => i !== index);
    dispatch(setOperators(updatedOperators));
    dispatch(setContributors(updatedContributors));
    updateUserApplicationInfo({ operators: updatedOperators, contributors: updatedContributors });
  };

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
    PrincipalType: capitalizeAndSplit(operator.principalType),
    LicenseHolder: operator.licenseHolder ? 'Yes' : 'No'
  }));

  return (
    <ControlAndOperationsLayout>
      {isAddingOperator && (
        <GridContainer containerSize='widescreen' className='width-full padding-y-2 margin-top-2 bg-base-lightest'>
          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
              <Label htmlFor='prefix'>Prefix</Label>
              <Select className='height-7 radius-lg' id='prefix' name='prefix' value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                <option>--</option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
              </Select>
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 5 }}>
              <Label htmlFor='first_name'>First Name</Label>
              <TextInput className='maxw-full' type='text' id='first_name' placeholder='--' name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 5 }}>
              <Label htmlFor='middle_name'>Middle Name</Label>
              <TextInput className='maxw-full' type='text' id='middle_name' placeholder='--' name='middle_name' value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </Grid>
          </Grid>

          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 10 }}>
              <Label htmlFor='last_name'>Last Name</Label>
              <TextInput className='maxw-full' type='text' id='last_name' placeholder='--' name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
              <Label htmlFor='suffix'>Suffix</Label>
              <Select className='height-full radius-lg' id='suffix' name='suffix' value={suffix} onChange={(e) => setSuffix(e.target.value)}>
                <option>--</option>
                <option value="jr">Jr.</option>
                <option value="sr">Sr.</option>
                <option value="i">I</option>
                <option value="ii">II</option>
                <option value="iii">III</option>
              </Select>
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

          <Grid row className='display-flex flex-column'>
            <Label htmlFor='position'>Title/Position</Label>
            <TextInput className='maxw-full' type='text' id='position' placeholder='--' name='position' value={position} onChange={(e) => setPosition(e.target.value)} />
          </Grid>

          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
              <Label htmlFor='principal_type'>Principal Type (Officer, Director, Member)</Label>
              <Select className='height-7 radius-lg maxw-full' id='principal_type' name='principal_type' value={principalType} onChange={(e) => setPrincipalType(e.target.value)}>
                <option>--</option>
                <option value="partner">Partner</option>
                <option value="member">Member</option>
                <option value="officer">Officer</option>
                <option value="board_member">Board Member</option>
                <option value="board_director">Board Director</option>
                <option value="other">Other</option>
              </Select>
            </Grid>
          </Grid>

          <Grid row gap='md' className='flex-column'>
            <Label className='width-full maxw-full' htmlFor='license_holder'>License Holder</Label>
            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='license_holder_yes'
                type="radio"
                value="true"
                name='license_holder'
                checked={licenseHolder === true}
                onChange={() => setLicenseHolder(true)}
              />
              <Label className="usa-radio__label" htmlFor='license_holder_yes'>
              Yes
              </Label>

              <input
                className="usa-radio__input"
                id='license_holder_no'
                type="radio"
                value="false"
                name='license_holder'
                checked={licenseHolder === false}
                onChange={() => setLicenseHolder(false)}
              />
              <Label className="usa-radio__label margin-left-2" htmlFor='license_holder_no'>
              No
              </Label>
            </div>
          </Grid>

          <ButtonGroup className='margin-top-2'>
            <Button type='button' onClick={handleAddOrUpdateOperator}>Add</Button>
            <Button type='button' unstyled className='padding-x-2'>Cancel</Button>
          </ButtonGroup>
        </GridContainer>
      )}

      {operators.length > 0 && (
        <CustomTable
          header={tableHeaders}
          rows={tableRows}
          editable={true}
          remove={true}
          onEdit={handleEditOperator}
          onDelete={handleDeleteOperator}
        />
      )}

      <div className='flex-fill'></div>
      <hr className='margin-y-3 width-full border-base-lightest'/>
      <ButtonGroup className='display-flex flex-justify margin-right-2px'>
        <Link href={applicationSteps.ownership.link} className='usa-button usa-button--outline'>
            Previous
        </Link>

        {operators.length > 0 ? (
          <Link href={applicationSteps.eligiblePrograms.link} className='usa-button'>
            Next
          </Link>
        ) : (
          <Button type='button' outline disabled className='usa-button'>
            Next
          </Button>
        )}
      </ButtonGroup>
    </ControlAndOperationsLayout>
  );
}

export default ControlAndOperations;
