import { Button, ButtonGroup, Grid, Label, Select, TextInput } from '@trussworks/react-uswds';
import OwnershipLayout from '../../../components/OwnershipLayout';
import { useApplicationDispatch, useApplicationSelector } from '../../../redux/hooks';
import { selectApplication, setOwnerType } from '../../../redux/applicationSlice';

function Partnership() {
  const { ownerType } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  const handleOwnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'individual' | 'organization' | '';
    if (value === 'individual' || value === 'organization') {
      dispatch(setOwnerType(value));
    } else {
      dispatch(setOwnerType(null));
    }
  };

  return (
    <OwnershipLayout>
      <h3 className='margin-y-0'>Identification</h3>

      <Grid row className='display-flex flex-column'>
        <Label className='margin-top-0' htmlFor='identification'>Type of Owner</Label>
        <Select className='maxw-full height-7 radius-lg' id='identification' name='identification' onChange={handleOwnerTypeChange}>
          <option value="">--</option>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </Select>
      </Grid>

      <Grid row className='display-flex flex-column'>
        <Label htmlFor='position'>Title/Position</Label>
        <TextInput className='maxw-full' type='text' id='position' placeholder='--' name='position' />
      </Grid>

      {ownerType === 'individual' && (
        <>
          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
              <Label htmlFor='prefix'>Prefix</Label>
              <Select className='height-full radius-lg' id='prefix' name='prefix'>
                <option>--</option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
              </Select>
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 5 }}>
              <Label htmlFor='first_name'>First Name</Label>
              <TextInput className='maxw-full' type='text' id='first_name' placeholder='--' name='first_name' />
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 5 }}>
              <Label htmlFor='middle_name'>Middle Name</Label>
              <TextInput className='maxw-full' type='text' id='middle_name' placeholder='--' name='middle_name' />
            </Grid>
          </Grid>

          <Grid row gap='md'>
            <Grid className='display-flex flex-column' mobile={{ col: 10 }} tablet={{ col: 10 }}>
              <Label htmlFor='last_name'>Last Name</Label>
              <TextInput className='maxw-full' type='text' id='last_name' placeholder='--' name='last_name' />
            </Grid>

            <Grid className='display-flex flex-column' mobile={{ col: 2 }} tablet={{ col: 2 }}>
              <Label htmlFor='suffix'>Suffix</Label>
              <Select className='height-full radius-lg' id='suffix' name='suffix'>
                <option>--</option>
                <option value="jr">Jr.</option>
                <option value="sr">Sr.</option>
                <option value="i">I</option>
                <option value="ii">II</option>
                <option value="iii">III</option>
              </Select>
            </Grid>
          </Grid>

          <Grid row gap='md' className='flex-column'>
            <Label htmlFor='other_name'>Has this individual ever gone by another name?</Label>
            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='other_name__yes'
                type="radio"
                value="true"
                name='other_name'
              />
              <Label className="usa-radio__label" htmlFor='other_name__yes'>
                Yes
              </Label>

              <input
                className="usa-radio__input"
                id='other_name__no'
                type="radio"
                value="true"
                name='other_name'
              />
              <Label className="usa-radio__label margin-left-2" htmlFor='other_name__no'>
                No
              </Label>
            </div>
          </Grid>
        </>
      )}

      {ownerType === 'organization' && (
        <>
          <Grid row className='display-flex flex-column'>
            <Label htmlFor='organization_name'>Organization Name</Label>
            <TextInput className='maxw-full' type='text' id='organization_name' placeholder='--' name='organization_name' />
          </Grid>

          <Grid row className='display-flex flex-column'>
            <Label htmlFor='organization_percentage'>Organization (%)</Label>
            <TextInput className='maxw-full' type='number' max={100} id='organization_percentage' placeholder='--' name='organization_percentage' />
          </Grid>

          <Grid row gap='md' className='flex-column'>
            <Label className='width-full maxw-full' htmlFor='alt_organization_name'>Has this organization ever gone by another name?</Label>
            <div className='usa-radio display-flex gap-1 bg-base-lightest'>
              <input
                className="usa-radio__input"
                id='alt_organization_name__yes'
                type="radio"
                value="true"
                name='alt_organization_name'
              />
              <Label className="usa-radio__label" htmlFor='alt_organization_name__yes'>
                Yes
              </Label>

              <input
                className="usa-radio__input"
                id='alt_organization_name__no'
                type="radio"
                value="true"
                name='alt_organization_name'
              />
              <Label className="usa-radio__label margin-left-2" htmlFor='alt_organization_name__no'>
                No
              </Label>
            </div>
          </Grid>
        </>
      )}

      <h3 className='margin-bottom-0'>Contact Information</h3>
      <Grid row gap='md'>
        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 6 }}>
          <Label className='margin-top-0' htmlFor='email_address'>Email Address</Label>
          <TextInput className='maxw-full' type='email' id='email_address' placeholder='--' name='email_address' />
        </Grid>
      </Grid>

      <Grid row gap='md'>
        <Grid className='display-flex flex-column' mobile={{ col: 3 }} tablet={{ col: 3 }}>
          <Label htmlFor='country_code'>County Code</Label>
          <Select className='height-full radius-lg' id='country_code' name='country_code'>
            <option>--</option>
            <option value="us">US</option>
            <option value="uk">UK</option>
            <option value="eu">EU</option>
            <option value="jp">JP</option>
          </Select>
        </Grid>

        <Grid className='display-flex flex-column' mobile={{ col: 9 }} tablet={{ col: 9 }}>
          <Label htmlFor='phone_number'>Phone Number</Label>
          <TextInput className='maxw-full' type='tel' id='phone_number' placeholder='000-000-000' name='phone_number' />
        </Grid>
      </Grid>

      <h3 className='margin-bottom-0'>Social Disadvantages</h3>
      <Grid row gap='md'>
        <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
          <Label className='margin-top-0' htmlFor='social_disadvantages'>Claim Disadvantage</Label>
          <Select className='height-7 radius-lg' id='social_disadvantages' name='social_disadvantages'>
            <option>--</option>
            <option value="minority">Minority</option>
            <option value="gender">Gender</option>
            <option value="test">Test</option>
            <option value="hi_mom">Hi Mom</option>
          </Select>
        </Grid>
      </Grid>

      <ButtonGroup className='margin-top-2'>
        <Button type='button'>Add</Button>
        <Button type='button' unstyled className='padding-x-2'>Cancel</Button>
      </ButtonGroup>
    </OwnershipLayout>
  );
}
export default Partnership;
