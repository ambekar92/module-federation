'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Grid,
  GridContainer
} from '@trussworks/react-uswds';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { ClaimBusinessSchema } from '../../utils/schemas';
import { ClaimBusinessInputs, CmbResponseType } from '../../utils/types';
import CMBFormHeader from '../layout/CMBFormHeader';
import CMBFormSummaryBoxes from '../layout/CMBFormSummaryBoxes';
import ErrorModal from '../modals/ErrorModal';
import ClaimInputs from './CMBInputs';
import { VALIDATE_SAM_ROUTE } from '@/app/constants/local-routes';
import { superFetcher } from '@/app/services/superFetcher';
import axios from 'axios';

interface CMBFormProps {
  claimFormComplete: (responseData: CmbResponseType) => void;
}

function CMBForm({ claimFormComplete }: CMBFormProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
  const [submitKey, setSubmitKey] = useState<string | null>(null);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ClaimBusinessInputs>({
    resolver: zodResolver(ClaimBusinessSchema),
    mode: 'onBlur',
    defaultValues: {
      uei: '',
      cageCode: '',
      bankAccountNumber: '',
      tin: '',
    },
  });

  const { data, error } = useSWR<CmbResponseType>(
    submitKey && submitKey,
    { revalidateOnFocus: false }
  );

  const onSubmit = async (formData: ClaimBusinessInputs) => {
    const { uei, tin, cageCode, bankAccountNumber } = formData;
    const params = new URLSearchParams({
      uei: uei || '',
      tax_identifier_number: tin || '',
      cage_code: cageCode || '',
      account_hash: bankAccountNumber || ''
    });
    setSubmitKey(`${VALIDATE_SAM_ROUTE}?${params.toString()}`);
  };

  if (error) {
    if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
      console.error('Error validating SAM entity:', error);
    }
    setServerError('server error');
    handleOpen();
    setSubmitKey(null);
  } else if (data) {
    if (data.message === 'No matching record found') {
      setServerError('not found');
    } else if (data.message === 'This business has already been claimed') {
      setServerError('already claimed');
    } else if (data.message === 'Thank you for your interest!' || ((data.message && data.message.length > 0) && data.message.includes('Thank you for your interest!'))) {
      setServerError('early access');
    } else if (data.message === 'This business has not been claimed yet') {
      claimFormComplete(data);
      setSubmitKey(null);
      return;
    } else {
      setServerError('server error');
    }
    handleOpen();
    setSubmitKey(null);
  }

  return (
    <GridContainer containerSize="widescreen">
      <ErrorModal
        open={open}
        handleClose={handleClose}
        error={serverError}
      />
      <CMBFormHeader />
      <Grid row gap>
        <CMBFormSummaryBoxes />
        <ClaimInputs
          control={control}
          errors={errors}
          touchedFields={touchedFields}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Grid>
    </GridContainer>
  );
}

export default CMBForm;
