import { useApplicationId } from '@/app/shared/hooks/useApplicationIdResult'
import { useUpdateApplicationProgress } from '@/app/shared/hooks/useUpdateApplicationProgress'
import { useEffect } from 'react'
import EntityLayout from '../components/entity-owned/EntityLayout'
import Entity from '../components/entity-owned/Entity'
import { setDisplayStepNavigation } from '../redux/applicationSlice'
import { useApplicationDispatch } from '../redux/hooks'
import { QuestionnaireProps } from '../utils/types'

function EntityOwned({ contributorId }: QuestionnaireProps) {
  const dispatch = useApplicationDispatch()
  const { applicationId } = useApplicationId()
  useUpdateApplicationProgress('Ownership')

  useEffect(() => {
    dispatch(setDisplayStepNavigation(true))
  }, [])

  return (
    <EntityLayout applicationId={applicationId} contributorId={contributorId}>
      <Entity />
    </EntityLayout>
  )
}
export default EntityOwned
