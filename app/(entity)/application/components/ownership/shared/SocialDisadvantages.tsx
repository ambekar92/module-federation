import { Box, Chip, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ErrorMessage, Grid, Label } from '@trussworks/react-uswds';
import { Controller } from 'react-hook-form';
import { socialDisadvantages } from '../helpers';

const SocialDisadvantages = () => {
  return (
    <>
      <h3 className='margin-bottom-0'>Social Disadvantage</h3>
      <Controller
        name='socialDisadvantages'
        render={({field, fieldState: {error}}) => <Grid row gap='md'>
          <Grid className='display-flex flex-column' mobile={{ col: 12 }} tablet={{ col: 12 }}>
            <Label className='margin-top-0 maxw-full' htmlFor='social_disadvantages' requiredMarker={true}>Are you claiming social disadvantage under 8(a) program (if not, please select ‘Not Claiming Social Disadvantage’)</Label>
            <ErrorMessage>{error?.message}</ErrorMessage>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={field.value}
              onChange={field.onChange}
              sx={{ background: 'white' }}
              renderValue={(selected: any) => (
                Array.isArray(selected) &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (

                <Chip key={value} label={socialDisadvantages.find(el => el.value === value)?.label} />
              ))}
            </Box>
              )}
            >
              {socialDisadvantages.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                  disabled={(name.value !== 'not_claiming' && field.value.includes('not_claiming')) || (name.value === 'not_claiming' && field.value.length && !field.value.includes('not_claiming'))}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>}
      />

    </>
  )
}

export default SocialDisadvantages
