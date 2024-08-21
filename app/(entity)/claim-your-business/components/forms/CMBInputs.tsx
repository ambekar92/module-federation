/* eslint-disable no-unused-vars */
import { VALIDATE_SAM_ENTITY_ROUTE } from '@/app/constants/routes';
import { toolTipCmbInputs } from '@/app/constants/tooltips';
import fetcher from '@/app/services/fetcher';
import InputHelperText from '@/app/shared/components/inputs/InputHelperText';
import Tooltip from '@/app/shared/components/tooltip/Tooltip';
import {
  Button,
  ButtonGroup,
  Grid,
  Label,
  TextInput,
} from '@trussworks/react-uswds';
import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormStateReturn,
} from 'react-hook-form';
import useSWR from 'swr';
import {
  claimBusinessInputDetails
} from '../../utils/helpers';
import { ClaimBusinessInputs, CmbResponseType } from '../../utils/types';
import Styles from '../ClaimMyBusiness.module.scss';

interface IClaimInputs {
  claimFormComplete: (responseData: CmbResponseType) => void;
  handleOpen: () => void;
  control: Control<ClaimBusinessInputs>;
  errors: FieldErrors<ClaimBusinessInputs>;
  handleSubmit: UseFormHandleSubmit<ClaimBusinessInputs>;
  isValid: boolean;
  touchedFields: UseFormStateReturn<ClaimBusinessInputs>['touchedFields'];
  setError: (
    name: keyof ClaimBusinessInputs,
    error: {
      type: string;
      message?: string;
      shouldFocus?: boolean;
    },
  ) => void;
}

const fieldKeys: (keyof ClaimBusinessInputs)[] = [
  'uei',
  'cageCode',
  'bankAccountNumber',
  'tin',
];

const ClaimInputs = ({
  claimFormComplete,
  handleOpen,
  control,
  errors,
  handleSubmit,
  setError,
  touchedFields,
}: IClaimInputs) => {
  const [queryParams, setQueryParams] = useState({
    uei: '',
    tin: '',
    cageCode: '',
    bankAccountNumber: '',
  });
  const [shouldFetchEntity, setShouldFetchEntity] = useState(false);

  const getEntityData = (uei: string, tin: string, cageCode: string, bankAccountNumber: string) =>
    `${VALIDATE_SAM_ENTITY_ROUTE}?uei=${uei}&tax_identifier_number=${tin}&cage_code=${cageCode}&account_hash=${bankAccountNumber}`;

  const { data: responseData, error: responseError } = useSWR<CmbResponseType>(
    () => (shouldFetchEntity ? getEntityData(queryParams.uei, queryParams.tin, queryParams.cageCode, queryParams.bankAccountNumber) : null),
    fetcher
  );

  useEffect(() => {
    if (responseError) {
      setShouldFetchEntity(false);
      setError('serverError', { type: 'submit', message: 'server error' });
      handleOpen();
      return;
    }

    if(responseData) {
      setShouldFetchEntity(false);

      // Comment lines 90-107 for testing if all businesses are claimed
      if(responseData.message === 'No matching record found') {
        setError('serverError', { type: 'submit', message: 'not found' });
        handleOpen();
        return;
      }
      if(responseData.message === 'This business has already been claimed') {
        setError('serverError', { type: 'submit', message: 'already claimed' });
        handleOpen();
        return;
      }
      if(responseData.message === 'Thank you for your interest! It looks like you don’t have early access. Please return to MySBA Certifications on September 9 to submit your application. We appreciate your patience and understanding. (should match what is shown at the design link).') {
        setError('serverError', { type: 'submit', message: 'early access' });
        handleOpen();
        return;
      }
      if(responseData.message === 'This business has not been claimed yet') {
        claimFormComplete(responseData);
        return;
      } else {
        setError('serverError', { type: 'submit', message: 'server error' });
        handleOpen();
        return;
      }

      // Uncomment line 110 to test
      // claimFormComplete(responseData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, responseError]);

  const handleBusinessClaim: SubmitHandler<ClaimBusinessInputs> = async (formData) => {
    setQueryParams({
      uei: formData.uei,
      tin: formData.tin,
      cageCode: formData.cageCode,
      bankAccountNumber: formData.bankAccountNumber,
    });
    setShouldFetchEntity(true)
  };

  const filterText = (text: string, onlyNumbers: boolean = false): string => {
    if (onlyNumbers) {
      return text.replace(/\D/g, '');
    }
    // Filter out non-alphanumeric characters (as per the original function)
    return text.replace(/[^a-zA-Z0-9]/g, '');
  };

  return (
    <Grid mobile={{ col: 12 }} desktop={{ col: 6 }}>
      <form onSubmit={handleSubmit(handleBusinessClaim)} className={Styles.form}>
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

export default ClaimInputs;
