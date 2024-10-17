import { z } from 'zod'
import { YesNo } from '../../application/components/control-and-operations/constants-types'

export type EntityTypeOption = {
  value: string
  label: string
}

export enum Step {
  EntityOwned = 'entity-owned',
  ControllingEntity = 'controlling-entity',
  ConnectionVerified = 'connection-verified',
  NewEntityForm = 'new-entity-form',
  NewEntityFormSummary = 'entity-form-summary'
}

export type EntityOption = {
  id: string
  type: string
  legal_business_name: string,
  step?: Step
}
