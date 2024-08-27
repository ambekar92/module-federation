'use client'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  selectApplication,
  setIsEditingOwnedEntity,
  setOwnedEntity,
} from '../../redux/applicationSlice'
import {
  useApplicationDispatch,
  useApplicationSelector,
} from '../../redux/hooks'
import { Show } from '@/app/shared/components/Show'
import EntityForm from './EntityForm'
import { EntityFormType } from './schema'
import EntityList from './shared/EntityList'

function Entity() {
  const { ownedEntity } = useApplicationSelector(selectApplication)
  const dispatch = useApplicationDispatch()
  const [entityBeingEdited, setEntityBeingEdited] =
    useState<EntityFormType | null>(null)

  const handleEdit = (index: number) => {
    dispatch(setIsEditingOwnedEntity(true))
    setEntityBeingEdited(ownedEntity)
  }

  function handleAdd(entity: EntityFormType) {
    dispatch(setOwnedEntity(entity))
    dispatch(setIsEditingOwnedEntity(false))
  }

  const handleDelete = () => {
    dispatch(setOwnedEntity(null))
  }

  return (
    <>
      <h3 className="margin-y-0 padding-bottom-2">
        Controlling Entity Information
      </h3>
      <EntityForm handleAddEntity={handleAdd} editedItem={entityBeingEdited} />
      <Show>
        <Show.When isTrue={ownedEntity ? true : false}>
          <EntityList
            entities={[ownedEntity] as any}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Show.When>
      </Show>
    </>
  )
}

export default Entity
