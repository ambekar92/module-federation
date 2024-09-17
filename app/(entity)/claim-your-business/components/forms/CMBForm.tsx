'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Grid,
  GridContainer
} from '@trussworks/react-uswds';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClaimBusinessSchema } from '../../utils/schemas';
import { ClaimBusinessInputs, CmbResponseType } from '../../utils/types';
import CMBFormHeader from '../layout/CMBFormHeader';
import CMBFormSummaryBoxes from '../layout/CMBFormSummaryBoxes';
import ErrorModal from '../modals/ErrorModal';
import ClaimInputs from './CMBInputs';
import { validateSamEntity } from '@/app/services/api/application-service/validateSamEntity';

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
    try {
      const responseData = await validateSamEntity(formData);

      if (responseData.message === 'No matching record found') {
        setServerError('not found');
      } else if (responseData.message === 'This business has already been claimed') {
        setServerError('already claimed');
      } else if (responseData.message.includes('Thank you for your interest!')) {
        setServerError('early access');
      } else if (responseData.message === 'This business has not been claimed yet') {
        claimFormComplete(responseData);
        return;
      } else {
        setServerError('server error');
      }
      handleOpen();
    } catch (error) {
      console.error(error);
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
