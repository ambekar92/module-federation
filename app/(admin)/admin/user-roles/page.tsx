import { Suspense } from 'react'
import UserRoleTable from './components/UserRoleTable'
import Search from './components/Search'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
 
  return {
    title: `User Role Table`,
    description: 'This is a description of my page',
  };
}


const UserRole = async ({ searchParams }: any) => {
  
  return (
  
    <div>
      <section className="padding-y-2 border-bottom border-base-lighter">
        <h1>User Role</h1>
      </section>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <UserRoleTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default UserRole
