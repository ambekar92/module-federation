
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Columns, schema, SearchEntityType } from './components/schema'
import EntitiesTable from './components/EntitiesTable'
import SearchByCriteria from './components/SearchByCriteria'
import Link from 'next/link'
import useSWR from 'swr'
import { GET_ENTITIES_ROUTE } from '@/app/constants/local-routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { Entity } from '@/app/shared/types/responses'

const Entities = () => {
  const { data: session } = useSessionUCMS()
  const { data: entityData } = useSWR<Entity[]>( `${GET_ENTITIES_ROUTE}?owner_user_id=${session.user_id}`);

  const methods = useForm<SearchEntityType>({
    defaultValues: {
      searchValue: '',
      searchCriteria: Columns.UEI,
      isAsc: true,
      sortColumn: 'legal_business_name',
      page: 1,
      loading: false,
      error: false
    },
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <h1> Business Search </h1>
      <FormProvider {...methods}>
        <SearchByCriteria />
        <EntitiesTable />
      </FormProvider>
    </div>
  )
}

export default Entities
