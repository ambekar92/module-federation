'use client';
import { Button, ButtonGroup, Grid, GridContainer, Label, Select, Table, TextInput } from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import { setDisplayStepNavigation, setStep } from '../redux/applicationSlice';
import { useApplicationDispatch } from '../redux/hooks';
import ControlAndOperationsLayout from '../components/control-and-operations/ControlAndOperationsLayout';

type Operator = {
  prefix?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  position: string;
  principalType: string;
  licenseHolder: boolean;
};

function ControlAndOperations() {
  const dispatch = useApplicationDispatch();

  const [operators, setOperators] = useState<Operator[]>([]);
  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [position, setPosition] = useState('');
  const [principalType, setPrincipalType] = useState('');
  const [licenseHolder, setLicenseHolder] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    dispatch(setStep(2));
    dispatch(setDisplayStepNavigation(true));
  }, [dispatch]);

  const capitalizeAndSplit = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleAddOperator = () => {
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
      };

      setOperators(prevOperators => [...prevOperators, newOperator]);

      // Reset form fields
      setPrefix('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setSuffix('');
      setPosition('');
      setPrincipalType('');
      setLicenseHolder(undefined);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <ControlAndOperationsLayout>
      <GridContainer containerSize='widescreen' className='bg-base-lightest padding-y-2 margin-top-2'>
        <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
            <Label htmlFor='prefix'>Prefix</Label>
            <Select className='height-full radius-lg' id='prefix' name='prefix' value={prefix} onChange={(e) => setPrefix(e.target.value)}>
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

        <Grid row className='display-flex flex-column'>
          <Label htmlFor='position'>Title/Position</Label>
          <TextInput className='maxw-full' type='text' id='position' placeholder='--' name='position' value={position} onChange={(e) => setPosition(e.target.value)} />
        </Grid>

        <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
            <Label className='margin-top-0' htmlFor='principal_type'>Principal Type (Officer, Director, Member)</Label>
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
          <Button type='button' onClick={handleAddOperator}>Add</Button>
          <Button type='button' unstyled className='padding-x-2'>Cancel</Button>
        </ButtonGroup>

        {operators.length > 0 && (
          <Table bordered className='width-full'>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Title/Position</th>
                <th scope="col">Principal Type</th>
                <th scope="col">License Holder</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((operator, index) => (
                <tr key={index}>
                  <td>{`${operator.firstName} ${operator.middleName} ${operator.lastName}`}</td>
                  <td>{operator.position}</td>
                  <td>{capitalizeAndSplit(operator.principalType || '')}</td>
                  <td>{operator.licenseHolder ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </GridContainer>
    </ControlAndOperationsLayout>
  );
}

export default ControlAndOperations;
