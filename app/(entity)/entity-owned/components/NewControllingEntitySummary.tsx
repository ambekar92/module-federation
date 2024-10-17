import { useSessionUCMS } from '@/app/lib/auth';
import { useCreateControllingEntity, useCreateControllingEntityUserInfo } from '@/app/services/mutations/entity-owned-service/useCreateControllingEntity';
import { NewControllingEntityPayload, NewControllingEntityUserInfoPayload } from '@/app/services/types/entity-owned-service/NewControllingEntityPayload';
import { Button, ButtonGroup, Card, Checkbox, ModalRef } from '@trussworks/react-uswds';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewControllingEntity } from '../utils/schemas';
import { Step } from '../utils/types';
import AcknowledgementModal from './AcknowledgementModal';
import styles from './EntityOwned.module.scss';

const NewControllingEntitySummary = ({setStep}: {setStep: any}) => {
  const methods = useFormContext<NewControllingEntity>();
  const session = useSessionUCMS();
  const [confirm, setConfirm] = React.useState(false);
  const {trigger: saveNewEntity, isMutating: savingNewEntity} = useCreateControllingEntity();
  const {trigger: saveUserInfo, isMutating: savingUserInfo} = useCreateControllingEntityUserInfo();

  async function onSubmit(data: NewControllingEntity) {
    const payload: NewControllingEntityPayload = {
      controlling_entity_type_id: data.controllingEntityInfo.type,
      legal_business_name: data.controllingEntityInfo.name,
      address1: data.location.street,
      address2: data.location.street,
      city: data.location.city,
      state: data.location.state,
      zip: data.location.zip,
      owner_user_id: session.data.user_id+'',
      notes: 'test notes',
      parent_id: '1' // TODO not sure where this comes from
    }
    const res = await saveNewEntity(payload);
    if (res) {
      const userInfoPayload: NewControllingEntityUserInfoPayload  = {
        application_id: '42', // will be coming from params once entity-owned is moved to application/application_id/
        email: data.contactInfo.email,
        entity_id: '1', // comes from applicationData.entity.entity_id, will be reused once moved to application/application_id
        application_role_id: session.data.permissions?.[0]?.id,
        first_name: data.contactInfo.firstName,
        last_name:  data.contactInfo.lastName,

      };
      saveUserInfo(userInfoPayload).then(() => {
        modalRef.current?.toggleModal();
      }).catch(e => console.error('failed to save user info'))

    }
  }
  const modalRef = useRef<ModalRef>(null)
  return (
    <>
      <AcknowledgementModal controllingEntityName={methods.getValues('controllingEntityInfo.name')}
        modalRef={modalRef}
        controllingEntityType={methods.getValues('controllingEntityInfo.type')} />

      <div className={styles.newEntityWrapper}>
        <h2>New Controlling Entity Summary</h2>
        <div className={styles.cards}>
          <Card style={{  margin: 0}} >
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Controlling Entity Information</h3>
              <div className={styles.cardContent}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <strong>Controlling Entity Type</strong><span>{methods.getValues('controllingEntityInfo.type')}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <strong>Controlling Entity Name</strong><span>{methods.getValues('controllingEntityInfo.name')}</span>
                </div>
              </div>
            </div>
          </Card>
          <Card style={{  margin: 0 }}>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Contact Information</h3>
              <div className={styles.cardContent}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Prefix</strong><span>{methods.getValues('contactInfo.prefix')}</span>
                    <strong>First Name</strong><span>{methods.getValues('contactInfo.firstName')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Last Name</strong><span>{methods.getValues('contactInfo.lastName')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Email</strong><span>{methods.getValues('contactInfo.email')}</span>
                  </div>
                </div>
                <div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Middle Name</strong><span>{methods.getValues('contactInfo.middleName')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Suffix</strong><span>{methods.getValues('contactInfo.suffix')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Phone Number</strong><span>{methods.getValues('contactInfo.phone')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card style={{  margin: 0 }}>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Location</h3>
              <div className={styles.cardContent}>
                <div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Country</strong><span>{methods.getValues('location.country')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>County</strong><span>{methods.getValues('location.county')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>State</strong><span>{methods.getValues('location.state')}</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Street Address</strong><span>{methods.getValues('location.street')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>City</strong><span>{methods.getValues('location.city')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <strong>Zip Code</strong><span>{methods.getValues('location.zip')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <hr style={{margin: '3rem 0'}}/>
        <Checkbox label='I confirm that the information I have provided is accurate.' name='confirm' id={'confirm'} onChange={() => setConfirm(prev => !prev)} />
        <hr style={{margin: '3rem 0'}}/>
        <ButtonGroup style={{display: 'flex', justifyContent: 'space-between', marginTop: '3rem'}}>
          <Button type='button' outline onClick={() => setStep('step', Step.NewEntityForm)}>Previous</Button>
          <Button type='button' onClick={methods.handleSubmit(onSubmit)} disabled={!confirm || savingNewEntity || savingUserInfo}>Submit</Button>
        </ButtonGroup>
      </div>
    </>
  )
}

export default NewControllingEntitySummary
