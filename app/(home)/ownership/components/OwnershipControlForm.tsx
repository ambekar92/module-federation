'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { GridContainer } from '@trussworks/react-uswds';
import { useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { z } from 'zod';
import Header from './fragments/Header';
import {
  FirmOwnership, EligiblePrograms,
  ControlAndOperation, SupportingDocs
} from './steps/_index';
import store from './store/store';
import { OwnershipFormDataSchema } from './utils/schema';
import OwnershipStepIndicator from './fragments/OwnershipStepIndicator';

type Inputs = z.infer<typeof OwnershipFormDataSchema>
function OwnershipControlForm() {
  // Form Setup
  const {
    register,
    reset,
    control,
    watch,
    setValue,
    trigger,
    getValues
  } = useForm<Inputs>({
    resolver: zodResolver(OwnershipFormDataSchema),
    mode: 'onBlur',
    defaultValues: {
      socialDisadvantages: [],
      ownershipPercentage: undefined,
    }
  })

  return (
    <section className="ownership">
      <Provider store={store}>
        <form className="ownership-form">
          <GridContainer containerSize="widescreen">
            <OwnershipStepIndicator />
            <Header />

            <FirmOwnership
              control={control}
              setValue={setValue}
              trigger={trigger}
              getValues={getValues}
              reset={reset}
              watch={watch}
            />

            <EligiblePrograms
              watch={watch}
              getValues={getValues}
              register={register}
            />

            <ControlAndOperation
              control={control}
              setValue={setValue}
              reset={reset}
              trigger={trigger}
              getValues={getValues}
            />

            <SupportingDocs
              control={control}
            />
          </GridContainer>
        </form>
      </Provider>
    </section>
  )
}
export default OwnershipControlForm
