import { z } from 'zod';

export enum Columns {
    UEI = 'UEI',
    BUSINESS_NAME = 'Business Name',
    OWNER_NAME = 'Owner Name',
}

export type ColumnKeys = 'uei' | 'legal_business_name' | 'owner_user'

export const schema = z.object({
  searchValue: z.string(),
  searchCriteria: z.string().default(Columns.UEI),
  entities: z.any(),
  page: z.number(),
  sortColumn: z.enum(['uei', 'legal_business_name' , 'owner_user']),
  isAsc: z.boolean(),
  loading: z.boolean(),
  error: z.boolean(),
})

export type SearchEntityType = z.infer<typeof schema>
