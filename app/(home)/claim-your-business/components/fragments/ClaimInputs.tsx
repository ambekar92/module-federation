import React from 'react';
import { Button, ButtonGroup, Grid, Label, TextInput } from '@trussworks/react-uswds';
import { Control, UseFormHandleSubmit, FieldErrors, SubmitHandler, Controller, UseFormStateReturn } from 'react-hook-form';
import { claimBusinessInputDetails, getBusinessesClaimed, getLostBusinessProfile } from '../utils/helpers';
import { ClaimBusinessInputs } from '../utils/types';
import Styles from '../ClaimMyBusiness.module.scss';

interface IClaimInputs {
  claimFormComplete: () => void;
  handleOpen: () => void;
  control: Control<ClaimBusinessInputs>;
  errors: FieldErrors<ClaimBusinessInputs>;
  handleSubmit: UseFormHandleSubmit<ClaimBusinessInputs>;
  isValid: boolean;
	touchedFields: UseFormStateReturn<ClaimBusinessInputs>['touchedFields'];
	// eslint-disable-next-line no-unused-vars
	setError: (name: keyof ClaimBusinessInputs, error: {
    type: string;
    message?: string;
    shouldFocus?: boolean;
  }) => void;
}

const fieldKeys: (keyof ClaimBusinessInputs)[] = ['uei', 'cageCode', 'bankAccountNumber', 'tin'];

const ClaimInputs = ({ claimFormComplete, handleOpen, control, errors, handleSubmit, isValid, setError, touchedFields }: IClaimInputs) => {
  const onSubmit: SubmitHandler<ClaimBusinessInputs> = async (data) => {
    try {
      const isClaimed = await getBusinessesClaimed(data.uei);
      if (isClaimed) {
        setError('serverError', { type: 'submit', message: 'already claimed' })
        handleOpen();
        return;
      }

      const isLostProfile = await getLostBusinessProfile(data.uei);
      if (isLostProfile) {
        handleOpen()
        setError('serverError', {
          type: 'submit',
          message: 'not found'
        })
        handleOpen();
        return;
      }

      claimFormComplete();
    } catch (error) {
      // console.error('Error submitting form:', error);
    }
  };

  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      // Filter out everything but digits
      return text.replace(/\D/g, '');
    }
    // Filter out non-alphanumeric characters (as per the original function)
    return text.replace(/[^a-zA-Z0-9]/g, '');
  };

  return (
    <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
      <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        {fieldKeys.map(key => (
          <div key={key}>
            <Label htmlFor={`input-${key}`} requiredMarker={claimBusinessInputDetails[key].required}>
              {claimBusinessInputDetails[key].displayName}
            </Label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id={`input-${key}`}
                  type="text"
                  maxLength={claimBusinessInputDetails[key].maxlength}
                  className={errors[key] ? 'icon width-full' : ''}
                  onChange={(e) => field.onChange(filterText(e.target.value, key === 'tin'))}
                  validationStatus={errors[key] ? 'error' : touchedFields[key] ? 'success' : undefined}
                  value={field.value!}
                />
              )}
            />
            <div className={`${Styles.mt_small} usa-input-helper-text`}>
              <span className={errors[key] && 'error-message'}>
                {claimBusinessInputDetails[key].fieldHelper}
              </span>
            </div>

          </div>
        ))}
        <p className="text-bold text-red text-right">If you are not a Qualified Owner, DO NOT PROCEED.</p>
        <div className="float-right">
          <ButtonGroup type="default">
            <Button type="submit" disabled={!isValid}>
							Find
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </Grid>
  );
};

export default ClaimInputs;
