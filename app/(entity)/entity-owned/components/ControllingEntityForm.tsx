import { stateOptions } from '@/app/(user)/user/[userId]/components/user-details/fragments/FormOptions';
import Dropdown from '@/app/shared/form-builder/form-controls/Dropdown';
import Input from '@/app/shared/form-builder/form-controls/Input';
import MaskInput from '@/app/shared/form-builder/form-controls/MaskInput';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useFormContext } from 'react-hook-form';
import { controllingEntityTypeOptions } from '../utils/helpers';
import { NewControllingEntity } from '../utils/schemas';
import { Step } from '../utils/types';
import styles from './EntityOwned.module.scss';

const ControllingEntityForm = ({setStep}: {setStep: any}) => {
  const {formState, handleSubmit} = useFormContext<NewControllingEntity>();

  function onSubmit() {
    setStep('step', Step.NewEntityFormSummary)
  }

  return (
    <>
      <div  className={`${styles.form} bg-base-lightest`}>
        <div className={styles.questions}>
          <h3>Controlling Entity Information</h3>
          <Dropdown<NewControllingEntity> name='controllingEntityInfo.type' label='Entity Type' required={true} >
            <option value=''>--Select--</option>
            {controllingEntityTypeOptions.map((option, index) => (<>
              <option key={index} value={option.value}>{option.label}</option>
            </>))}
          </Dropdown>
          <Input<NewControllingEntity> name='controllingEntityInfo.name' label='Entity Name' required={true}/>
        </div>
        <div className={styles.questions}>
          <h3>Contact Information</h3>
          <div className={styles.grid3}>
            <Dropdown<NewControllingEntity> name='contactInfo.prefix' label='Prefix' required={true} >
              <option value=''>--Select--</option>
              <option value='mr'>Mr</option>
              <option value='mrs'>Mrs</option>
              <option value='ms'>Ms</option>
            </Dropdown>
            <Input<NewControllingEntity> name='contactInfo.firstName' label='First Name' required={true}/>
            <Input<NewControllingEntity> name='contactInfo.middleName' label='Middle Name' required={true}/>
          </div>
          <div className={styles.grid2}>
            <Input<NewControllingEntity> name='contactInfo.lastName' label='Last Name' required={true}/>
            <Dropdown<NewControllingEntity> name='contactInfo.suffix' label='Suffix' >
              <option value=''>--Select--</option>
              <option value='jr'>Jr</option>
              <option value='sr'>Sr</option>
              <option value='iii'>III</option>
            </Dropdown>
          </div>
          <Input<NewControllingEntity> name='contactInfo.email' label='Email Address' required={true}/>
          <MaskInput<NewControllingEntity> name='contactInfo.phone' label='Phone Number' maskType='tel' required={true}/>
        </div>
        <div className={styles.questions}>
          <h3>Location</h3>
          <Input<NewControllingEntity> name='location.country' label='Country' required={true}/>
          <Input<NewControllingEntity> name='location.street' label='Street Address' required={true}/>
          <Input<NewControllingEntity> name='location.county' label='County' required={true}/>
          <div className={styles.location}>
            <Input<NewControllingEntity> name='location.city' label='City' required={true}/>
            <Dropdown<NewControllingEntity> name='location.state' label='State' required={true} >
              {stateOptions}
            </Dropdown>
            <Input<NewControllingEntity> name='location.zip' label='Zip Code' required={true}/>
          </div>
        </div>
      </div>

      <hr />
      <ButtonGroup style={{display: 'flex', justifyContent: 'space-between', marginTop: '3rem'}}>
        <Button type='button' outline onClick={() => setStep('step', Step.ControllingEntity)}>Previous</Button>
        <Button type='button' onClick={handleSubmit(onSubmit)} >Next</Button>
      </ButtonGroup>

    </>
  )
}

export default ControllingEntityForm
