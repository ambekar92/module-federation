import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup';
import { Button, ButtonGroup } from '@trussworks/react-uswds';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { YesNo } from '../../application/components/control-and-operations/constants-types';
import { controllingEntityTypeOptions } from '../utils/helpers';
import { Step } from '../utils/types';
import { EntityForm } from '../utils/schemas';

const EntityOwned = () => {
  const { watch, setValue } = useFormContext<EntityForm>();
  const isEntityOwned = watch('isEntityOwned');
  const step = watch('step');
  const router = useRouter()

  return (
    <>
      {step === Step.EntityOwned && <>
        <h2>Claiming Entity Owned</h2>
        <div>
          <p>Entity owned refers to businesses that are owned and controlled by one of the following qualifying entities:</p>
          <ul>
            {controllingEntityTypeOptions.map(el => (<li style={{lineHeight: '2rem'}} key={el.value}>{el.label}</li>))}
          </ul>
        </div>
        <hr />
        <ToggleButtonGroup<EntityForm, YesNo>
          label='Are you claiming to be Entity-Owned?'
          name={'isEntityOwned'}
          options={[{ value: YesNo.Yes, label: YesNo.Yes }, { value: YesNo.No, label: YesNo.No }]}>
        </ToggleButtonGroup>
        <hr />
        <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <Button
            type='button' outline>Previous</Button>
          <Button
            type="button"
            disabled={!isEntityOwned}
            onClick={() => {
              if (isEntityOwned === YesNo.No) {
                // TODO populate application_id dynamically
                router.push('application/42/ownership')
              } else {
                setValue('step', Step.ControllingEntity)
              }
            }}>Next</Button>
        </ButtonGroup>

      </>}
    </>
  )
}

export default EntityOwned
