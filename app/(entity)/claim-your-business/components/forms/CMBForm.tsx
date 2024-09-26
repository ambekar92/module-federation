'use client'

import { VALIDATE_SAM_ROUTE } from '@/app/constants/local-routes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Grid,
  GridContainer
} from '@trussworks/react-uswds';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClaimBusinessSchema } from '../../utils/schemas';
import { ClaimBusinessInputs, CmbResponseType } from '../../utils/types';
import CMBFormHeader from '../layout/CMBFormHeader';
import CMBFormSummaryBoxes from '../layout/CMBFormSummaryBoxes';
import ErrorModal from '../modals/ErrorModal';
import ClaimInputs from './CMBInputs';

interface CMBFormProps {
  claimFormComplete: (responseData: CmbResponseType) => void;
}

function CMBForm({ claimFormComplete }: CMBFormProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
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

  const onSubmit = async (formData: ClaimBusinessInputs) => {
    const { uei, tin, cageCode, bankAccountNumber } = formData;
    const params = {
      uei: uei || '',
      tax_identifier_number: tin || '',
      cage_code: cageCode || '',
      account_hash: bankAccountNumber || ''
    };

    try {
      const response = await axios.post(VALIDATE_SAM_ROUTE, params);

      const data = response.data;

      if (data.message === 'No matching record found') {
        setServerError('not found');
      } else if (data.message === 'This business has already been claimed') {
        setServerError('already claimed');
      } else if (data.message === 'Thank you for your interest!' || ((data.message && data.message.length > 0) && data.message.includes('Thank you for your interest!'))) {
        setServerError('early access');
      } else if (data.message === 'This business has not been claimed yet') {
        claimFormComplete(data);
        return;
      } else {
        setServerError('server error');
      }
      handleOpen();
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Error validating SAM entity:', error);
      }
      setServerError('server error');
      handleOpen();
    }
  };

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
