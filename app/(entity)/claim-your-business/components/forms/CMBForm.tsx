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

interface ClaimBusinessFormProps {
  // eslint-disable-next-line no-unused-vars
  claimFormComplete: (responseData: CmbResponseType) => void;
}

function ClaimBusinessForm({ claimFormComplete }: ClaimBusinessFormProps) {
  const [open, setOpen] = useState(false);

  // Handlers for the modal state
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, touchedFields },
  } = useForm<ClaimBusinessInputs>({
    resolver: zodResolver(ClaimBusinessSchema),
    mode: 'onBlur',
    defaultValues: {
      uei: '',
      cageCode: '',
      bankAccountNumber: '',
      tin: '',
      serverError: undefined,
    },
  });

  return (
    <GridContainer containerSize="widescreen">
      {/* Displays error modal if there is a server error */}
      <ErrorModal
        open={open}
        handleClose={handleClose}
        error={errors.serverError?.message}
      />
      <CMBFormHeader />
      <Grid row gap>
        <CMBFormSummaryBoxes />

        {/* Form inputs for claiming business */}
        <ClaimInputs
          handleOpen={handleOpen}
          claimFormComplete={claimFormComplete}
          control={control}
          errors={errors}
          setError={setError}
          handleSubmit={handleSubmit}
          isValid={isValid}
          touchedFields={touchedFields}
        />
      </Grid>
    </GridContainer>
  );
}

export default ClaimBusinessForm;
