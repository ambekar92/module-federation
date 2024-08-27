import React from 'react'
import { Suspense } from 'react'
import ApplicationTable from './components/ApplicationTable'
import Search from './components/Search'
import Spinner from '@/app/shared/components/spinner/Spinner'

const Applications = async ({ searchParams }: any) => {
  return (
    <div>
      <section className="padding-y-2 border-bottom border-base-lighter">
        <h1 style={{ fontWeight: '700', fontSize: '40px' }}>Application Management</h1>
      </section>

      <section>
        <h2 className="padding-y-2">Application Search</h2>
        <Search />
        <Suspense fallback={<Spinner center />}>
          <ApplicationTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}

export default Applications
