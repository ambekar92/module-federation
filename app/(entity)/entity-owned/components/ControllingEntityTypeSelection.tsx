import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Step } from '../utils/types'
import { Label } from '@trussworks/react-uswds'
import { controllingEntityTypeOptions } from '../utils/helpers'
import ToggleButtonGroup from '@/app/shared/form-builder/form-controls/ToggleButtonGroup'
import { EntityForm } from '../utils/schemas'

const ControllingEntityTypeSelection = () => {
  const {watch} = useFormContext<EntityForm>();

  const step = watch('step');
  return (
    <div>
      {step !== Step.EntityOwned &&
       <>
         <h2>Find Controlling Entity</h2>
         <p>
            From the the list below please select the Controlling Entity Type,
            followed by the Controlling Entity you would like to connect with.
         </p>
         <hr />
         <Label className="text-bold" htmlFor="input-radio-entity-type">
            Controlling Entity Type Selection
         </Label>
         <ToggleButtonGroup<EntityForm, string> name={'controllingEntityType'} options={controllingEntityTypeOptions} label={''}></ToggleButtonGroup>
       </>
      }
    </div>
  )
}

export default ControllingEntityTypeSelection
