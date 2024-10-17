'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonGroup } from '@mui/material'
import { Button, ModalRef } from '@trussworks/react-uswds'
import { FormProvider, useForm } from 'react-hook-form'
import { YesNo } from '../../application/components/control-and-operations/constants-types'
import { defaultValues, entitySchema, NewControllingEntity, newControllingEntitySchema } from '../utils/schemas'
import { Step } from '../utils/types'
import ConnectionVerification from './ConnectionVerification'
import ControllingEntityForm from './ControllingEntityForm'
import ControllingEntitySearch from './ControllingEntitySearch'
import ControllingEntityTypeSelection from './ControllingEntityTypeSelection'
import EntityOwned from './EntityOwned'
import NewControllingEntitySummary from './NewControllingEntitySummary'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

const DynamicAcknowledgementModal = dynamic(() => import('./AcknowledgementModal'))

const SearchEntities = () => {
  const methods = useForm({
    defaultValues: {
      isEntityOwned: YesNo.No,
      controllingEntityType: '',
      entity: '',
      isConnectionVerified: null,
      step: Step.EntityOwned
    },
    resolver: zodResolver(entitySchema),
  });

  const methodsNewEntity = useForm<NewControllingEntity>({
    defaultValues,
    resolver: zodResolver(newControllingEntitySchema)
  });

  const step = methods.watch('step');
  const entity = methods.watch('entity');
  const isConnectionVerified = methods.watch('isConnectionVerified');

  const modalRef = useRef<ModalRef>(null);

  function handlePrevious() {
    switch(step) {
      case Step.ControllingEntity:
        methods.setValue('step', Step.EntityOwned);
        methods.setValue('controllingEntityType', '');
        break;
      case Step.ConnectionVerified:
        methods.setValue('step', Step.ControllingEntity);
        methods.setValue('isConnectionVerified', null);
        break;
    }
  }

  function handleNext() {
    if (step === Step.ConnectionVerified) {
      // make a call to backend to save the data - pending confirmed payload and method [mdev]
      // upon success, show dialof
      modalRef.current?.toggleModal();
    } else {
      methods.setValue('step', Step.ConnectionVerified)
    }
  }

  return (
    <>
      <DynamicAcknowledgementModal controllingEntityName={entity} controllingEntityType={methods.getValues('controllingEntityType')} modalRef={modalRef} />
      <FormProvider {...methodsNewEntity}>
        {step === Step.NewEntityFormSummary && <NewControllingEntitySummary setStep={methods.setValue} />}
        {step === Step.NewEntityForm && <ControllingEntityForm setStep={methods.setValue} />}
      </FormProvider>
      {step !== Step.NewEntityForm && step !== Step.NewEntityFormSummary &&<FormProvider {...methods}>
        <EntityOwned />
        <ControllingEntityTypeSelection />
        <ControllingEntitySearch />
        <ConnectionVerification />
        {step !== Step.EntityOwned &&
        <>
          <hr />
          <ButtonGroup style={{display: 'flex', justifyContent: 'space-between', marginTop: '3rem'}}>
            <Button type='button' outline onClick={handlePrevious}>Previous</Button>
            <Button type='button'
              disabled={!entity || (step === Step.ConnectionVerified && (!isConnectionVerified || isConnectionVerified === YesNo.No))}
              onClick={handleNext}>{step !==  Step.ConnectionVerified ? 'Next' : 'Submit'}</Button>
          </ButtonGroup>
        </>}
      </FormProvider>}
    </>
  )
}

export default SearchEntities
