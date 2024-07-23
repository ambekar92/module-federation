import { Suspense } from 'react'
import EntitiesTable from './components/EntitiesTable'
import Search from './components/Search'

const Entities = async ({ searchParams }: any) => {
  return (
    <div>
      <h1>Entities</h1>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <EntitiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default Entities
