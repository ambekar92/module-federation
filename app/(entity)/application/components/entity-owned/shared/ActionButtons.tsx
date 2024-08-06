import { Button, ButtonGroup } from '@trussworks/react-uswds'
import { FieldValues, useFormContext } from 'react-hook-form'
import {
  selectApplication,
  setIsEditingOwnedEntity,
} from '../../../redux/applicationSlice'
import {
  useApplicationDispatch,
  useApplicationSelector,
} from '../../../redux/hooks'
import { defaultValues } from '../constants'

const ActionButtons = ({ handleAddEntity }: { handleAddEntity: any }) => {
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext()

  const { isEditingOwnedEntity, ownedEntity } =
    useApplicationSelector(selectApplication)
  const dispatch = useApplicationDispatch()

  function onSubmit(data: FieldValues) {
    if (errors && Object.entries(errors).length > 0) {
      return
    }
    reset(defaultValues)
    handleAddEntity(data)
  }

  function handleCancel() {
    if (isEditingOwnedEntity) {
      reset(ownedEntity)
      return
    }
    reset(defaultValues)
  }

  return (
    <ButtonGroup className="margin-top-2">
      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={
          (errors && Object.entries(errors).length > 0) ||
          (ownedEntity && !isEditingOwnedEntity)
        }
      >
        {isEditingOwnedEntity ? 'Update' : 'Add'}
      </Button>
      <Button
        type="button"
        unstyled
        className="padding-x-2"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </ButtonGroup>
  )
}

export default ActionButtons
