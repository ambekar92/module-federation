import { Suspense } from 'react'
import EntitiesTable from './components/EntitiesTable'

import Search from './components/Search'

const Entities = async ({ searchParams }: any) => {
  return (
    <div>
      <section
        className="padding-y-2 border-bottom border-base-lighter"
      >
        <div style={{ fontWeight: '700', fontSize: '40px' }}>
          Business Management
        </div>
      </section>
      <div
        className="padding-left-0 padding-top-1"
        style={{ fontWeight: '700', fontSize: '32px' }}
      >
        Business Search
      </div>
      <div className="padding-y-2">
        Search Entities based on various criteria.
      </div>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <EntitiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default Entities
