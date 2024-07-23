import { useSessionUCMS } from '@/app/lib/auth'
import { Show } from '@/app/shared/components/Show'
import { Grid } from '@trussworks/react-uswds'
import HeaderOverview from './HeaderOverview'
// import { isRole } from '@/middleware'
import { Role } from '@/app/shared/types/role'

const Header = () => {
  const sessionData = useSessionUCMS()
  // temporary function to replace isRole from @/middleware. will swich back to the one from @/middleware once determined which user role corresponds to analyst
  function isRole(permissions: any, role: any) {
    return false;
  }
  return (
    <>
      <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
        <h2 className='margin-right-2'>{isRole(sessionData.data?.permissions, Role.EXTERNAL) ? 'My Tasks' : 'Analyst Overview'}</h2>
      </Grid>

      <Show>
        <Show.When isTrue={!isRole(sessionData.data?.permissions, Role.EXTERNAL)}>
          <HeaderOverview />
        </Show.When>
      </Show>
    </>
  )
}

export default Header