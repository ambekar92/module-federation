import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup';
import { Alert } from '@trussworks/react-uswds';
import { useFormContext } from 'react-hook-form';
import { YesNo } from '../../application/components/control-and-operations/constants-types';
import { Step } from '../utils/types';
import { EntityForm } from '../utils/schemas';

const ConnectionVerification = () => {
  const { watch, getValues } = useFormContext<EntityForm>();
  const step = watch('step');
  const isConnectionVerified = watch('isConnectionVerified');
  const entity = watch('entity')
  return (
    <div>
      {step === Step.ConnectionVerified && !!entity  && <>
        <h2>Connection Verification</h2>
        <p>Are you sure you&apos;d like to connect {getValues('entity')}?</p>
        <ToggleButtonGroup<EntityForm, YesNo>
          label='Are you claiming to be Entity-Owned?'
          name={'isConnectionVerified'}
          options={[{ value: YesNo.Yes, label: YesNo.Yes }, { value: YesNo.No, label: YesNo.No }]}>
        </ToggleButtonGroup>

        {isConnectionVerified === YesNo.No && <Alert headingLevel='h2' type='warning'>
            To proceed, please select Yes or go back and select a new controlling entity you would like to connect with. This step is necessary to ensure proper validation and access.
        </Alert>}
      </>
      }
    </div>
  )
}

export default ConnectionVerification
