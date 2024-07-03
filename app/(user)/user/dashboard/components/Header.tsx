import { Grid } from '@trussworks/react-uswds'
import { useSession } from 'next-auth/react'
import HeaderOverview from './HeaderOverview'
import { Show } from '@/app/shared/components/Show'

const Header = () => {
    const sessionData = useSession()
  return (
    <>
        <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
          <h2 className='margin-right-2'>{sessionData.data?.permissions[0].slug === 'external_user' ? 'My Tasks':'Analyst Overview'}</h2>  
        </Grid> 

<Show>
  <Show.When isTrue={sessionData.data?.permissions[0].slug !== 'external_user'}>
  
  <HeaderOverview />
  </Show.When>
  </Show>        


    </>
  )
}

export default Header