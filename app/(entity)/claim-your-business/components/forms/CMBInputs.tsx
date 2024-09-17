'use client'

import { toolTipCmbInputs } from '@/app/constants/tooltips';
import InputHelperText from '@/app/shared/components/inputs/InputHelperText';
import Tooltip from '@/app/shared/components/tooltip/Tooltip';
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  TextInput,
} from '@trussworks/react-uswds';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  claimBusinessInputDetails
} from '../../utils/helpers';
import { ClaimBusinessInputs } from '../../utils/types';
import Styles from '../ClaimMyBusiness.module.scss';

interface ICMBInputs {
  control: Control<ClaimBusinessInputs>;
  errors: FieldErrors<ClaimBusinessInputs>;
  touchedFields: UseFormStateReturn<ClaimBusinessInputs>['touchedFields'];
  onSubmit: () => Promise<void>;
}

const fieldKeys: (keyof ClaimBusinessInputs)[] = [
  'uei',
  'cageCode',
  'bankAccountNumber',
  'tin',
];

const CMBInputs = ({
  control,
  errors,
  touchedFields,
  onSubmit
}: ICMBInputs) => {
  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      return text.replace(/\D/g, '');
    }
    return text.replace(/[^a-zA-Z0-9]/g, '');
  };

  return (
    <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
      <form onSubmit={onSubmit} className={Styles.form}>
        {fieldKeys.map((key) => (
          <div key={key} data-testid={`input-${key}`}>
            <Grid row className='margin-top-2'>
              <Label htmlFor={`input-${key}`} className='margin-top-0' requiredMarker={claimBusinessInputDetails[key].required}>
                {claimBusinessInputDetails[key].displayName}
              </Label>
              {toolTipCmbInputs[key] !== '' && <Tooltip text={toolTipCmbInputs[key]}/>}
            </Grid>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id={`input-${key}`}
                  type="text"
                  maxLength={claimBusinessInputDetails[key].maxlength}
                  className={errors[key] ? 'icon' : ''}
                  onChange={(e) => field.onChange(filterText(e.target.value, key === 'tin'))}
                  validationStatus={errors[key] ? 'error' : touchedFields[key] ? 'success' : undefined}
                  value={field.value!}
                />
              )}
            />
            <InputHelperText hasError={!!errors[key]} text={claimBusinessInputDetails[key].fieldHelper} />
          </div>
        ))}
        <p className="text-bold text-red text-right">
          If you are not a Qualifying Owner, DO NOT PROCEED.
        </p>
        <div className="float-right">
          <ButtonGroup type="default">
            <Button type="submit">Find</Button>
          </ButtonGroup>
        </div>
      </form>
    </Grid>
  );
};

export default CMBInputs;
