import { Button, ButtonGroup } from '@trussworks/react-uswds'
import { FieldValues, useFormContext } from 'react-hook-form'
import { selectApplication, setOwnerType, setOwnerTypeSelected } from '../../../redux/applicationSlice'
import { useApplicationDispatch, useApplicationSelector } from '../../../redux/hooks'
import { defaultValues as individualDefaultValues } from '../individual/constants'
import { defaultValues as orgDefaultValues } from '../organization/constants'
import { OwnershipType } from './types'

const ActionButtons = ({handleAddOwner}: {handleAddOwner: any}) => {
  const {reset, handleSubmit, formState: {errors}} = useFormContext();

  const { ownerType, isEditingOwner } = useApplicationSelector(selectApplication);
  const dispatch = useApplicationDispatch();

  function onSubmit(data: FieldValues) {
    if (errors && Object.entries(errors).length > 0) {return;}
    data.ownerType = ownerType as OwnershipType;
    const defaultVals = ownerType === 'individual' ? individualDefaultValues : orgDefaultValues;
    console.log('default values', defaultVals)
    reset(defaultVals)
    handleAddOwner(data)
    dispatch(setOwnerTypeSelected(false))
  }

  function handleCancel() {
    dispatch(setOwnerType(null))
    dispatch(setOwnerTypeSelected(false))
  }

  return (
    <ButtonGroup className='margin-top-2'>
      <Button type='button' onClick={handleSubmit(onSubmit)} disabled={errors && Object.entries(errors).length > 0}>
        {isEditingOwner
          ? 'Update'
          : 'Add'
        }
      </Button>
      <Button type='button' unstyled className='padding-x-2' onClick={handleCancel}>Cancel</Button>
    </ButtonGroup>
  )
}

export default ActionButtons
