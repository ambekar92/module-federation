import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress'
import { useEffect } from 'react'
import Entity from '../components/entity-owned/Entity'
import EntityLayout from '../components/entity-owned/EntityLayout'
import { setDisplayStepNavigation } from '../redux/applicationSlice'
import { useApplicationDispatch } from '../redux/hooks'

function EntityOwned() {
  const dispatch = useApplicationDispatch()
  useUpdateApplicationProgress('Entity Owned')

  useEffect(() => {
    dispatch(setDisplayStepNavigation(true))
  }, [])

  return (
    <EntityLayout>
      <Entity />
    </EntityLayout>
  )
}
export default EntityOwned
