import { EntityTypeOption, EntityOption } from './types'

export const controllingEntityTypeOptions: EntityTypeOption[] = [
  { label: 'Agricultural Co-Op (AGCO)', value: 'AGCO' },
  { label: 'American Indian Tribe (AIT)', value: 'AIT' },
  { label: 'Alaska Native Corporation (ANC)', value: 'ANC' },
  { label: 'National Hawaiian Organization (NHO)', value: 'NHO' },
  { label: 'Community Development Corporation (CDC)', value: 'CDC' },
]

export const controllingEntities: EntityOption[] = [
  { id: '1', legal_business_name: 'Agricultural Co-Op Entity 1', type: 'AGCO' },
  { id: '2', legal_business_name: 'Agricultural Co-Op Entity 2', type: 'AGCO' },
  {
    id: '3',
    legal_business_name: 'American Indian Tribe Entity 1',
    type: 'AIT',
  },
  {
    id: '4',
    legal_business_name: 'American Indian Tribe Entity 2',
    type: 'AIT',
  },
  {
    id: '5',
    legal_business_name: 'Alaska Native Corporation Entity 1',
    type: 'ANC',
  },
  {
    id: '6',
    legal_business_name: 'Alaska Native Corporation Entity 2',
    type: 'ANC',
  },
  {
    id: '7',
    legal_business_name: 'National Hawaiian Organization Entity 1',
    type: 'NHO',
  },
  {
    id: '8',
    legal_business_name: 'National Hawaiian Organization Entity 2',
    type: 'NHO',
  },
  {
    id: '9',
    legal_business_name: 'Community Development Corporation Entity 1',
    type: 'CDC',
  },
  {
    id: '10',
    legal_business_name: 'Community Development Corporation Entity 2',
    type: 'CDC',
  },
]
