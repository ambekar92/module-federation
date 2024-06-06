import { Box, Chip } from '@mui/material';
import { ErrorMessage, Grid, Label } from '@trussworks/react-uswds';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { socialDisadvantages } from '../helpers';

const SocialDisadvantages = () => {
  const disadvantageOptions = socialDisadvantages.map(disadvantage => ({
    value: disadvantage.value,
    label: disadvantage.label
  }));

  return (
    <>
      <h3 className='margin-bottom-0'>Social Disadvantage</h3>
      <Controller
        name='socialDisadvantages'
        render={({field, fieldState: {error}}) => <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
            <Label className='margin-top-0 maxw-full' htmlFor='social_disadvantages' requiredMarker={true}>
              Are you claiming social disadvantage under the 8(a) program (if not, please select ‘Not Claiming Social Disadvantage’)?
            </Label>
            <ErrorMessage>{error?.message}</ErrorMessage>
            <Select
              id="social_disadvantages"
              isMulti
              value={disadvantageOptions.filter(option => field.value.includes(option.value))}
              onChange={(selected) => {
                field.onChange(selected ? selected.map(option => option.value) : []);
              }}
              options={disadvantageOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  marginTop: '0.5rem',
                  borderRadius: '8px',
                  minHeight: '2.45rem',
                  height: '56px',
                  borderColor: error ? '#e41d3d' : '#565c65',
                  outline: state.isFocused ? '3px solid #0f73ff' : '',
                  cursor: 'pointer'
                })
              }}
              isOptionDisabled={(option) =>
                (option.value !== 'not_claiming' && field.value.includes('not_claiming')) ||
                (option.value === 'not_claiming' && field.value.length && !field.value.includes('not_claiming'))
              }
              closeMenuOnSelect={false}
            />
          </Grid>
        </Grid>}
      />
    </>
  )
}

export default SocialDisadvantages;
