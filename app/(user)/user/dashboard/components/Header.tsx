import { Grid } from '@trussworks/react-uswds'
import { useIsReviewersDashboard } from '../hooks/useIsReviewersDashboard'
import HeaderOverview from './HeaderOverview'

const Header = () => {
  const isReviewersDashboard = useIsReviewersDashboard();

  return (
    <>
      <Grid className="mobile:grid-col-12 desktop:grid-col-12 border-bottom-1px display-flex flex-align-center flex-row flex-justify">
        <h2 className='margin-right-2'>
          {!isReviewersDashboard ? 'My Tasks' : 'Analyst Overview'}
        </h2>
      </Grid>

      {isReviewersDashboard && <HeaderOverview />}
    </>
  )
}

export default Header
