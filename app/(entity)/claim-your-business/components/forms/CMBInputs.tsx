/* eslint-disable no-unused-vars */
import { VALIDATE_SAM_ENTITY_ROUTE } from '@/app/constants/routes';
import { fetcherGET } from '@/app/services/fetcher';
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
import { ClaimBusinessInputs, CmbResponse } from '../../utils/types';
import Styles from '../ClaimMyBusiness.module.scss';
import InputHelperText from '@/app/shared/components/inputs/InputHelperText';

interface IClaimInputs {
  claimFormComplete: (responseData: CmbResponse) => void;
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

  const { data: responseData, error: responseError } = useSWR(
    () => (shouldFetchEntity ? getEntityData(queryParams.uei, queryParams.tin, queryParams.cageCode, queryParams.bankAccountNumber) : null),
		fetcherGET<CmbResponse>
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
      if(responseData.message === 'This business has not been claimed yet') {
        claimFormComplete(responseData);
        return;
      } else {
        setError('serverError', { type: 'submit', message: 'server error' });
        handleOpen();
        return;
      }
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
