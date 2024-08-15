import { Show } from '@/app/shared/components/Show'
import { Grid } from '@trussworks/react-uswds'
import { useCurrentPath } from '../hooks/useCurrentPath'
import HeaderOverview from './HeaderOverview'

const Header = () => {
  const { isTasksDashboard, isReviewersDashboard } = useCurrentPath();

  const getHeader = () => {
    if(isTasksDashboard) {
      return 'My Tasks'
    } else {
      return 'Analyst Overview'
    }
  }

  return (
    <>
      <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
        <h2 className='margin-right-2'>
          {getHeader()}
        </h2>
      </Grid>

      <Show>
        <Show.When isTrue={isReviewersDashboard}>
          <HeaderOverview />
        </Show.When>
      </Show>
    </>
  )
}

export default Header
