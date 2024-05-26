'use client';
import { Button, ButtonGroup, Grid, Label, Select as UsSelect, Table, TextInput } from '@trussworks/react-uswds';
import Select, { MultiValue } from 'react-select';
import { useApplicationDispatch, useApplicationSelector } from '../../redux/hooks';
import { selectApplication, setOwnerType, setOwnershipPercentageTotal } from '../../redux/applicationSlice';
import { useEffect, useState } from 'react';
import { SocialDisadvantageOption, disadvantageOptions, formatPhoneNumber, formatSSN, capitalizeAndSplit } from './helpers';
import { sbaProgramOptions  } from '@/app/constants/sba-programs';

// TODO: Table needs to work with both organizations and individuals
type Owner = {
  ownerType: 'individual' | 'organization';
  prefix?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  hasOtherName?: boolean;
  organizationName?: string;
  organizationPercentage?: number;
  hasAltOrganizationName?: boolean;
  emailAddress: string;
  phoneNumber: string;
  socialDisadvantages: SocialDisadvantageOption[] | [];
  martialStatus?: string;
  veteranStatus?: string;
  gender?: string;
  citizenship?: boolean;
  ssn?: string;
  spouseOwner?: boolean;
};

function Partnership() {
  const { ownerType } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const [owners, setOwners] = useState<Owner[]>([]);

  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [hasOtherName, setHasOtherName] = useState<boolean | undefined>(undefined);
  const [organizationName, setOrganizationName] = useState('');
  const [organizationPercentage, setOrganizationPercentage] = useState<number | undefined>();
  const [hasAltOrganizationName, setHasAltOrganizationName] = useState<boolean | undefined>(undefined);
  const [emailAddress, setEmailAddress] = useState('');
  const [ssn, setSSN] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socialDisadvantages, setSocialDisadvantages] = useState<SocialDisadvantageOption[]>([]);
  const [martialStatus, setMartialStatus] = useState('');
  const [veteranStatus, setVeteranStatus] = useState('');
  const [gender, setGender] = useState('');
  const [citizenship, setCitizenship] = useState<boolean | undefined>(undefined);
  const [spouseOwner, setSpouseOwner] = useState<boolean | undefined>(undefined);
  const [eligiblePrograms, setEligiblePrograms] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOwnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'individual' | 'organization' | '';
    if (value === 'individual' || value === 'organization') {
      dispatch(setOwnerType(value));
    } else {
      dispatch(setOwnerType(null));
    }
  };

  const handleAddOwner = () => {
    const requiredFieldsFilled =
		ownerType === 'individual'
		  ? firstName && lastName && emailAddress && organizationPercentage !== undefined && martialStatus && veteranStatus
		  : organizationName && emailAddress && organizationPercentage !== undefined;

    if (requiredFieldsFilled) {
      const newOwner: Owner = {
        ownerType: ownerType!,
        prefix,
        firstName,
        middleName,
        lastName,
        suffix,
        hasOtherName,
        organizationName,
        organizationPercentage,
        hasAltOrganizationName,
        emailAddress,
        phoneNumber: formatPhoneNumber(phoneNumber),
        socialDisadvantages,
        martialStatus,
        veteranStatus,
        gender,
        citizenship,
        ssn,
        spouseOwner
      };

      if (editingIndex !== null) {
        setOwners(prevOwners => {
          const updatedOwners = [...prevOwners];
          updatedOwners[editingIndex] = newOwner;
          return updatedOwners;
        });
        setEditingIndex(null);
      } else {
        setOwners(prevOwners => [...prevOwners, newOwner]);
      }

      organizationPercentage && dispatch(setOwnershipPercentageTotal(organizationPercentage));

      // Reset form fields
      setPrefix('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setSuffix('');
      setHasOtherName(undefined);
      setOrganizationName('');
      setOrganizationPercentage(0);
      setHasAltOrganizationName(undefined);
      setEmailAddress('');
      setPhoneNumber('');
      setSocialDisadvantages([]);
      setMartialStatus('');
      setVeteranStatus('');
      setGender('');
      setSSN('');
      setCitizenship(undefined);
      setSpouseOwner(undefined);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleEditOwner = (index: number) => {
    const owner = owners[index];
    setPrefix(owner.prefix || '');
    setFirstName(owner.firstName || '');
    setMiddleName(owner.middleName || '');
    setLastName(owner.lastName || '');
    setSuffix(owner.suffix || '');
    setHasOtherName(owner.hasOtherName);
    setOrganizationName(owner.organizationName || '');
    setOrganizationPercentage(owner.organizationPercentage);
    setHasAltOrganizationName(owner.hasAltOrganizationName);
    setEmailAddress(owner.emailAddress);
    setPhoneNumber(owner.phoneNumber);
    setSocialDisadvantages(owner.socialDisadvantages);
    setMartialStatus(owner.martialStatus || '');
    setVeteranStatus(owner.veteranStatus || '');
    setGender(owner.gender || '');
    setSSN(owner.ssn || '');
    setCitizenship(owner.citizenship);
    setSpouseOwner(owner.spouseOwner);
    setEditingIndex(index);
  };

  const handleSelectChange = (newValue: MultiValue<SocialDisadvantageOption>) => {
    setSocialDisadvantages([...newValue]);
  }

  useEffect(() => {
    const updateEligiblePrograms = () => {
      const eligibleProgramsSet = new Set<string>();

      owners.forEach(owner => {
        sbaProgramOptions.forEach(program => {
          if (
            program.disadvantages.some(disadvantage => owner.socialDisadvantages.map(sd => sd.value).includes(disadvantage)) ||
            (owner.gender === 'f' && program.disadvantages.includes('female')) ||
            (owner.veteranStatus === 'veteran' && program.disadvantages.includes('veteran')) ||
            (owner.veteranStatus === 'service_disabled_veteran' && program.disadvantages.includes('disabledVeteran'))
          ) {
            eligibleProgramsSet.add(program.name);
          } else {
            if (owner.gender !== 'f' && program.disadvantages.includes('female')) {
              eligibleProgramsSet.delete(program.name);
            }
            if (owner.veteranStatus !== 'veteran' && program.disadvantages.includes('veteran')) {
              eligibleProgramsSet.delete(program.name);
            }
            if (owner.veteranStatus !== 'service_disabled_veteran' && program.disadvantages.includes('disabledVeteran')) {
              eligibleProgramsSet.delete(program.name);
            }
          }
        });
      });

      const programsArray = Array.from(eligibleProgramsSet);
      setEligiblePrograms(programsArray);
      localStorage.setItem('eligiblePrograms', JSON.stringify(programsArray));

      // Clear the eligible programs from localStorage after 5 minutes
      setTimeout(() => {
        localStorage.removeItem('eligiblePrograms');
      }, 300000); // 300000 ms = 5 minutes
    };

    updateEligiblePrograms();
  }, [owners]);

  return (
    <>
      <h3 className='margin-y-0'>Identification</h3>
      <Grid row className='display-flex flex-column'>
        <Label className='margin-top-0' htmlFor='identification'>Type of Owner</Label>
        <UsSelect className='maxw-full height-7 radius-lg' id='identification' name='identification' onChange={handleOwnerTypeChange}>
          <option value="">--</option>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </UsSelect>
      </Grid>

      {ownerType !== null && (
        <>
          {ownerType === 'individual' && (
            <>
              <Grid row gap='md'>
                <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
                  <Label htmlFor='prefix'>Prefix</Label>
                  <UsSelect className='height-full radius-lg' id='prefix' name='prefix' value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                    <option>--</option>
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                    <option value="mrs">Mrs.</option>
                  </UsSelect>
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
                  <UsSelect className='height-full radius-lg' id='suffix' name='suffix' value={suffix} onChange={(e) => setSuffix(e.target.value)}>
                    <option>--</option>
                    <option value="jr">Jr.</option>
                    <option value="sr">Sr.</option>
                    <option value="i">I</option>
                    <option value="ii">II</option>
                    <option value="iii">III</option>
                  </UsSelect>
                </Grid>
              </Grid>

              <Grid row className='display-flex flex-column'>
                <Label htmlFor='organization_percentage'>Ownership (%)</Label>
                <TextInput className='maxw-full' type='number' max={100} id='organization_percentage' placeholder='--' name='organization_percentage' value={organizationPercentage} onChange={(e) => setOrganizationPercentage(parseInt(e.target.value))} />
              </Grid>

              <Grid row gap='md'>
                <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 6 }}>
                  <Label htmlFor='citizenship'>Are you a legal citizen of the US?</Label>
                  <div className='usa-radio display-flex gap-1 bg-base-lightest'>
                    <input
                      className="usa-radio__input"
                      id='citizenship_yes'
                      type="radio"
                      value="true"
                      name='citizenship'
                      checked={citizenship === true}
                      onChange={() => setCitizenship(true)}
                    />
                    <Label className="usa-radio__label" htmlFor='citizenship_yes'>
      								Yes
                    </Label>
                    <input
                      className="usa-radio__input"
                      id='citizenship_no'
                      type="radio"
                      value="false"
                      name='citizenship'
                      checked={citizenship === false}
                      onChange={() => setCitizenship(false)}
                    />
                    <Label className="usa-radio__label margin-left-2" htmlFor='citizenship_no'>
     								 No
                    </Label>
                  </div>
                </Grid>
                <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 6 }}>
                  <Label htmlFor='other_name'>Has this individual ever gone by another name?</Label>
                  <div className='usa-radio display-flex gap-1 bg-base-lightest'>
                    <input
                      className="usa-radio__input"
                      id='other_name_yes'
                      type="radio"
                      value="true"
                      name='other_name'
                      checked={hasOtherName === true}
                      onChange={() => setHasOtherName(true)}
                    />
                    <Label className="usa-radio__label" htmlFor='other_name_yes'>
                      Yes
                    </Label>

                    <input
                      className="usa-radio__input"
                      id='other_name_no'
                      type="radio"
                      value="false"
                      name='other_name'
                      checked={hasOtherName === false}
                      onChange={() => setHasOtherName(false)}
                    />
                    <Label className="usa-radio__label margin-left-2" htmlFor='other_name_no'>
                      No
                    </Label>
                  </div>
                </Grid>
              </Grid>

              <Grid row gap='md'>
                <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 3 }}>
                  <Label htmlFor='ssn'>SSN</Label>
                  <TextInput
                    className='maxw-full'
                    type='text'
                    id='ssn'
                    placeholder='000-00-0000'
                    name='ssn'
                    value={ssn}
                    onChange={(e) => setSSN(formatSSN(e.target.value))}
                  />
                </Grid>

                <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 9 }}>
                  <Label htmlFor='veteran_status'>Are you a veteran of the US military?</Label>
                  <UsSelect className='maxw-full height-7 radius-lg' id='veteran_status' name='veteran_status' value={veteranStatus} onChange={(e) => setVeteranStatus(e.target.value)}>
                    <option value="">--</option>
                    <option value="not_applicable">Not Applicable</option>
                    <option value="veteran">Veteran</option>
                    <option value="service_disabled_veteran">Service-Disabled Veteran</option>
                  </UsSelect>
                </Grid>
              </Grid>

              <Grid row className='display-flex flex-column'>
                <Label htmlFor='martial_status'>Martial Status</Label>
                <UsSelect className='height-7 radius-lg maxw-full' id='martial_status' name='martial_status' value={martialStatus} onChange={(e) => setMartialStatus(e.target.value)}>
                  <option>--</option>
                  <option value="married_owner">Married - Spouse is an owner, officer, board member, partner, etc. of the applicant business</option>
                  <option value="married_not_owner">Married - Spouse is NOT an owner, officer, board member, partner, etc. of the applicant business</option>
                  <option value="unmarried">Unmarried</option>
                  <option value="separated">Legally Separated</option>
                </UsSelect>
              </Grid>

              <Grid row gap='md'>
                <Grid mobile={{ col: 12}} tablet={{col: 6}}>
                  <Label htmlFor='spouse_owner'>
    							Gender
                  </Label>
                  <div className='usa-radio display-flex gap-1 bg-base-lightest'>
                    <input
                      className="usa-radio__input"
                      id='gender_m'
                      type="radio"
                      value="m"
                      name='gender'
                      checked={gender === 'm'}
                      onChange={() => setGender('m')}
                    />
                    <Label className="usa-radio__label" htmlFor='gender_m'>
     							 M
                    </Label>
                    <input
                      className="usa-radio__input"
                      id='gender_f'
                      type="radio"
                      value="f"
                      name='gender'
                      checked={gender === 'f'}
                      onChange={() => setGender('f')}
                    />
                    <Label className="usa-radio__label  margin-left-2" htmlFor='gender_f'>
     							 F
                    </Label>
                    <input
                      className="usa-radio__input"
                      id='gender_x'
                      type="radio"
                      value="x"
                      name='gender'
                      checked={gender === 'x'}
                      onChange={() => setGender('x')}
                    />
                    <Label className="usa-radio__label  margin-left-2" htmlFor='gender_x'>
     							 X
                    </Label>
                  </div>
                </Grid>

                <Grid mobile={{ col: 12}} tablet={{col: 6}}>
                  <Label htmlFor='spouse_owner'>
    							Is your spouse an owner, officer, board member, partner, etc. of the applicant business?
                  </Label>
                  <div className='usa-radio display-flex gap-1 bg-base-lightest'>
                    <input
                      className="usa-radio__input"
                      id='spouse_owner_yes'
                      type="radio"
                      value="true"
                      name='spouse_owner'
                      checked={spouseOwner === true}
                      onChange={() => setSpouseOwner(true)}
                    />
                    <Label className="usa-radio__label" htmlFor='spouse_owner_yes'>
     							 Yes
                    </Label>
                    <input
                      className="usa-radio__input"
                      id='spouse_owner_no'
                      type="radio"
                      value="false"
                      name='spouse_owner'
                      checked={spouseOwner === false}
                      onChange={() => setSpouseOwner(false)}
                    />
                    <Label className="usa-radio__label margin-left-2" htmlFor='spouse_owner_no'>
      							No
                    </Label>
                  </div>
                </Grid>
              </Grid>

            </>
          )}

          {ownerType === 'organization' && (
            <>
              <Grid row className='display-flex flex-column'>
                <Label htmlFor='organization_name'>Organization Name</Label>
                <TextInput className='maxw-full' type='text' id='organization_name' placeholder='--' name='organization_name' value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
              </Grid>

              <Grid row className='display-flex flex-column'>
                <Label htmlFor='organization_percentage'>Ownership (%)</Label>
                <TextInput className='maxw-full' type='number' max={100} id='organization_percentage' placeholder='--' name='organization_percentage' value={organizationPercentage} onChange={(e) => setOrganizationPercentage(parseInt(e.target.value))} />
              </Grid>

              <Grid row gap='md' className='flex-column'>
                <Label className='width-full maxw-full' htmlFor='alt_organization_name'>Has this organization ever gone by another name?</Label>
                <div className='usa-radio display-flex gap-1 bg-base-lightest'>
                  <input
                    className="usa-radio__input"
                    id='alt_organization_name_yes'
                    type="radio"
                    value="true"
                    name='alt_organization_name'
                    checked={hasAltOrganizationName === true}
                    onChange={() => setHasAltOrganizationName(true)}
                  />
                  <Label className="usa-radio__label" htmlFor='alt_organization_name_yes'>
                    Yes
                  </Label>

                  <input
                    className="usa-radio__input"
                    id='alt_organization_name_no'
                    type="radio"
                    value="false"
                    name='alt_organization_name'
                    checked={hasAltOrganizationName === false}
                    onChange={() => setHasAltOrganizationName(false)}
                  />
                  <Label className="usa-radio__label margin-left-2" htmlFor='alt_organization_name_no'>
                    No
                  </Label>
                </div>
              </Grid>
            </>
          )}

          <h3 className='margin-bottom-0'>Contact Information</h3>
          <Grid className='display-flex flex-column' row>
            <Label className='margin-top-0' htmlFor='email_address'>Email Address</Label>
            <TextInput className='maxw-full' type='email' id='email_address' placeholder='--' name='email_address' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </Grid>

          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
              <Label htmlFor='phone_number'>Phone Number</Label>
              <TextInput
                className='maxw-full'
                type='text'
                id='phone_number'
                placeholder='000-000-0000'
                name='phone_number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              />
            </Grid>
          </Grid>

          <h3 className='margin-bottom-0'>Social Disadvantages</h3>
          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
              <Label className='margin-top-0' htmlFor='social_disadvantages'>Claim Disadvantage</Label>
              <Select
                data-testid="social-disadvantage-select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    marginTop: '0.5rem',
                    borderRadius: '8px',
                    minHeight: '2.45rem',
                    height: '56px',
                    borderColor: '#565c65',
                    outline: state.isFocused ? '3px solid #0f73ff' : '',
                    cursor: 'pointer'
                  })
                }}
                options={disadvantageOptions}
                isMulti={true}
                onChange={handleSelectChange}
                value={socialDisadvantages}
                isOptionDisabled={(option) =>
                  (option.value !== 'not_claiming' &&
									socialDisadvantages.some((o) => o.value === 'not_claiming')) ||
									(option.value === 'not_claiming' &&
									socialDisadvantages.length > 0 &&
									socialDisadvantages.some((o) => o.value !== 'not_claiming'))
								 }
              />
            </Grid>
          </Grid>

          <ButtonGroup className='margin-top-2'>
            <Button type='button' onClick={handleAddOwner}>Add</Button>
            <Button type='button' unstyled className='padding-x-2'>Cancel</Button>
          </ButtonGroup>

          {owners.length > 0 && (
            <Table bordered className='width-full'>
              <thead>
                <tr>
                  <th scope="col">Legal Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ownership (%)</th>
                  <th scope="col">Martial Status</th>
                  <th scope="col">Veteran Status</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.ownerType === 'individual' ? `${owner.firstName} ${owner.middleName} ${owner.lastName}` : owner.organizationName}</td>
                    <td>{owner.emailAddress}</td>
                    <td>{owner.organizationPercentage}</td>
                    <td>{capitalizeAndSplit(owner.martialStatus || '')}</td>
                    <td>{capitalizeAndSplit(owner.veteranStatus || '')}</td>
                    <td>
                      <Button type="button" onClick={() => handleEditOwner(index)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
}

export default Partnership;
